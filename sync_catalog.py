"""
sync_catalog.py
Auto-syncs images from public/images/catalog/{Folder} into src/frontend/data/products.js
Preserves testimonials and all helper functions.
Outputs PRICING_CATALOG.md for quick team review and price edits.
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_DIR = os.path.join(BASE_DIR, "public", "images", "catalog")
PRODUCTS_FILE = os.path.join(BASE_DIR, "src", "frontend", "data", "products.js")
PRICING_CATALOG_FILE = os.path.join(BASE_DIR, "PRICING_CATALOG.md")

CATEGORY_CONFIG = [
    {
        "id": "candle-holders",
        "name": "Candle Holders",
        "singular": "Candle Holder",
        "folder": "Candle Holders",
        "description": "Elegant candle holders for ambient lighting and soulful evenings",
        "slug": "candle-holders",
        "price_range": (899, 2299)
    },
    {
        "id": "hampers",
        "name": "Hampers",
        "singular": "Luxury Hamper",
        "folder": "Hampers",
        "description": "Curated luxury hampers for unforgettable gifting and celebrations",
        "slug": "hampers",
        "price_range": (2499, 4999)
    },
    {
        "id": "kitchenware",
        "name": "KitchenWare",
        "singular": "KitchenWare Piece",
        "folder": "KitchenWare",
        "description": "Artisan glassware, serveware, and refined culinary dining essentials",
        "slug": "kitchenware",
        "price_range": (999, 2699)
    },
    {
        "id": "t-light",
        "name": "T-Light",
        "singular": "T-Light Holder",
        "folder": "T-Light",
        "description": "Atmospheric tea-light holders with enchanting shimmer and warmth",
        "slug": "t-light",
        "price_range": (499, 1499)
    },
    {
        "id": "vases",
        "name": "Vases",
        "singular": "Glass Vase",
        "folder": "Vases",
        "description": "Handcrafted glass vases that elevate any space with sculptural elegance",
        "slug": "vases",
        "price_range": (899, 5499)
    }
]

IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif')

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[\s_-]+', '-', text).strip('-')

def clean_title(filename, singular_name, index):
    name, _ = os.path.splitext(filename)
    
    # If filename is already descriptive (e.g. "Red Candle Holder", "AMBER DRINKING GLASS", "Ribbed Vase")
    is_uuid = bool(re.match(r'^[0-9a-f]{8}-[0-9a-f]{4}', name, re.IGNORECASE))
    is_camera = bool(re.match(r'^(IMG|DSC|PHOTO|PIC)[-_]?[0-9]+', name, re.IGNORECASE))
    is_hex = bool(re.match(r'^[0-9A-F]{16,}', name))
    
    if is_uuid:
        return f"{singular_name} - Edition {index}"
    elif is_camera or is_hex:
        clean_code = re.sub(r'[^A-Za-z0-9]', '', name)
        return f"{singular_name} - Design #{index} ({clean_code[-4:]})"
    else:
        # User gave custom name
        words = re.sub(r'[-_]+', ' ', name).strip()
        return words.title()

def scan_and_generate():
    categories_output = []
    products_output = []
    
    search_dirs = [
        CATALOG_DIR,
        os.path.join(BASE_DIR, "public", "images"),
        os.path.join(BASE_DIR, "public")
    ]

    total_images_found = 0

    for cat in CATEGORY_CONFIG:
        found_folder = None
        for sdir in search_dirs:
            if not os.path.exists(sdir):
                continue
            p1 = os.path.join(sdir, cat["folder"])
            if os.path.isdir(p1):
                found_folder = p1
                break
            for sub in os.listdir(sdir):
                full_sub = os.path.join(sdir, sub)
                if os.path.isdir(full_sub) and slugify(sub) == slugify(cat["folder"]):
                    found_folder = full_sub
                    break
            if found_folder:
                break
        
        images = []
        rel_folder_prefix = f"/images/catalog/{cat['folder']}"
        if found_folder:
            rel_dir = os.path.relpath(found_folder, os.path.join(BASE_DIR, "public")).replace("\\", "/")
            rel_folder_prefix = f"/{rel_dir}"
            images = [
                f for f in sorted(os.listdir(found_folder))
                if os.path.splitext(f)[1].lower() in IMAGE_EXTENSIONS
            ]
        
        total_images_found += len(images)
        cat_thumb = f"{rel_folder_prefix}/{images[0]}" if images else f"/images/categories/{cat['id']}.jpg"
        
        categories_output.append({
            "id": cat["id"],
            "name": cat["name"],
            "description": cat["description"],
            "image": cat_thumb,
            "slug": cat["slug"]
        })

        low_p, high_p = cat["price_range"]
        count = len(images)
        step = (high_p - low_p) // max(count, 1)

        for i, img in enumerate(images):
            idx = i + 1
            title = clean_title(img, cat["singular"], idx)
            prod_slug = f"{cat['slug']}-{slugify(title)}-{idx}"
            
            base_calc = low_p + (i * step)
            rounded_price = round(base_calc / 100) * 100 - 1
            if rounded_price < low_p:
                rounded_price = low_p
            
            prod_img_path = f"{rel_folder_prefix}/{img}"
            is_featured = (i % 3 == 0)
            is_custom = (i % 2 == 0)
            
            products_output.append({
                "id": prod_slug,
                "name": title,
                "slug": prod_slug,
                "category": cat["id"],
                "price": rounded_price,
                "originalPrice": rounded_price + 500 if (i % 2 == 1) else None,
                "description": f"Artisanal handcrafted {title.lower()} created with premium crystal-clear glass, sculpted proportions, and contemporary luxury design. Ideal for sophisticated interior decor and bespoke gifting.",
                "images": [prod_img_path],
                "featured": is_featured,
                "inStock": True,
                "customizable": is_custom
            })

    print(f"Total images found across 5 categories: {total_images_found}")

    # Write src/frontend/data/products.js
    js_content = "// ==========================================================================\n"
    js_content += "// EMKAY HOME - PRODUCT CATALOG & CATEGORIES\n"
    js_content += f"// Total active products: {len(products_output)} (Matching WeTransfer folder upload)\n"
    js_content += "// ==========================================================================\n\n"
    
    js_content += "export const categories = " + json.dumps(categories_output, indent=2) + ";\n\n"
    js_content += "export const products = " + json.dumps(products_output, indent=2) + ";\n\n"
    
    js_content += """export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning vases! The quality of glass and craftsmanship is unmatched. My living room looks so much more elegant now.',
    product: 'Vases Collection'
  },
  {
    id: 2,
    name: 'Rahul Mehra',
    location: 'Delhi',
    rating: 5,
    text: 'Ordered the Candle Holders as a gift. The packaging was premium and the product exceeded expectations. Will order again!',
    product: 'Candle Holders Collection'
  },
  {
    id: 3,
    name: 'Anita Desai',
    location: 'Bangalore',
    rating: 5,
    text: 'The customization option is amazing! Got a personalized message engraved for my anniversary. My family loved it!',
    product: 'Custom Luxury Hamper'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'The T-Light holder creates a magical atmosphere. Warm, shimmering light and top notch artisanship.',
    product: 'T-Light Collection'
  }
];

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter(p => p.category === categorySlug);
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug);
}

export function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}
"""

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Updated {PRODUCTS_FILE} successfully!")

    # Write PRICING_CATALOG.md for the user and team
    md_content = "# Emkay Home — Product Catalog & Price Sheet\n\n"
    md_content += f"> Total Products: **{len(products_output)}** across 5 folders.\n"
    md_content += "> [!TIP]\n"
    md_content += "> You can easily edit any price in `src/frontend/data/products.js` or adjust them below with your team.\n\n"
    
    current_cat = None
    for p in products_output:
        if p["category"] != current_cat:
            current_cat = p["category"]
            cat_name = next(c["name"] for c in categories_output if c["id"] == current_cat)
            cat_count = sum(1 for item in products_output if item["category"] == current_cat)
            md_content += f"\n## {cat_name} ({cat_count} items)\n\n"
            md_content += "| Image File | Product Name | Slug | Price (₹) | Strike Price | Customizable | Featured |\n"
            md_content += "|---|---|---|---|---|---|---|\n"
        
        orig_p = f"₹{p['originalPrice']}" if p["originalPrice"] else "-"
        feat = "Yes" if p["featured"] else "No"
        cust = "Yes" if p["customizable"] else "No"
        img_name = os.path.basename(p['images'][0])
        md_content += f"| `{img_name}` | **{p['name']}** | `{p['slug']}` | **₹{p['price']}** | {orig_p} | {cust} | {feat} |\n"

    with open(PRICING_CATALOG_FILE, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"Generated {PRICING_CATALOG_FILE} successfully!")

    return True

if __name__ == "__main__":
    scan_and_generate()
