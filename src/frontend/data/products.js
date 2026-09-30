export const categories = [
  {
    id: 'vases',
    name: 'Vases',
    description: 'Handcrafted glass vases that elevate any space',
    image: '/images/categories/vases.jpg',
    slug: 'vases'
  },
  {
    id: 'candle-holders',
    name: 'Candle Holders',
    description: 'Elegant candle holders for ambient lighting',
    image: '/images/categories/candle-holders.jpg',
    slug: 'candle-holders'
  },
  {
    id: 'lamps',
    name: 'Lamps',
    description: 'Artisan lamps that illuminate with style',
    image: '/images/categories/lamps.jpg',
    slug: 'lamps'
  },
  {
    id: 'drinkware',
    name: 'Drinkware',
    description: 'Premium glass drinkware for refined taste',
    image: '/images/categories/drinkware.jpg',
    slug: 'drinkware'
  }
];

export const products = [
  // === VASES ===
  {
    id: 'cute-cacti',
    name: 'Cute Cacti',
    slug: 'cute-cacti',
    category: 'vases',
    price: 899,
    originalPrice: null,
    description: 'A charming cactus-shaped glass vase, perfect for adding a playful touch to your decor. Each piece is hand-blown and unique.',
    images: [
      ...['/images/products/emerald-amber-vase.jpg', '/images/products/bud-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'bud-vase',
    name: 'Bud Vase',
    slug: 'bud-vase',
    category: 'vases',
    price: 899,
    originalPrice: null,
    description: 'A delicate bud vase crafted from premium glass. Ideal for single stems and small floral arrangements.',
    images: [
      ...['/images/products/bud-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'stoned',
    name: 'Stoned',
    slug: 'stoned',
    category: 'vases',
    price: 2400,
    originalPrice: null,
    description: 'A stone-textured glass vase that blends rustic charm with modern elegance. A true statement piece.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/centerpiece-bowl.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'floret-vase-set-of-2',
    name: 'Floret (Set of 2)',
    slug: 'floret-vase-set-of-2',
    category: 'vases',
    price: 2999,
    originalPrice: 3499,
    description: 'A set of two elegant floret vases with a floral-inspired design. Perfect for pairing together or placing separately.',
    images: [
      ...['/images/products/emerald-amber-vase.jpg', '/images/products/bud-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'abyssal-carve',
    name: 'Abyssal Carve',
    slug: 'abyssal-carve',
    category: 'vases',
    price: 6499,
    originalPrice: null,
    description: 'A deep-carved glass masterpiece inspired by oceanic depths. This premium vase is a statement piece for luxury spaces.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'blooming-tale',
    name: 'Blooming Tale (Set of 2)',
    slug: 'blooming-tale',
    category: 'vases',
    price: 2899,
    originalPrice: 3499,
    description: 'A set of two vases that tell the tale of blooming flowers. Artistic hand-painted details on premium glass.',
    images: [
      ...['/images/products/centerpiece-bowl.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'frosty-cailoux',
    name: 'Frosty Cailoux',
    slug: 'frosty-cailoux',
    category: 'vases',
    price: 999,
    originalPrice: 1499,
    description: 'A frosted glass vase with pebble-like texture. The matte finish adds a sophisticated, modern feel.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/bud-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'golden-rush-miniatures',
    name: 'Golden Rush Miniatures',
    slug: 'golden-rush-miniatures',
    category: 'vases',
    price: 499,
    originalPrice: null,
    description: 'Petite gold-toned glass miniatures that add a touch of luxury to any shelf or tabletop.',
    images: [
      ...['/images/products/bud-vase.jpg', '/images/products/sculptural-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'swirl-vase',
    name: 'Swirl Vase',
    slug: 'swirl-vase',
    category: 'vases',
    price: 1299,
    originalPrice: 1999,
    description: 'A mesmerizing swirl-patterned glass vase that captures movement in stillness. Handcrafted perfection.',
    images: [
      ...['/images/products/centerpiece-bowl.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'veloura-vase',
    name: 'Veloura Vase',
    slug: 'veloura-vase',
    category: 'vases',
    price: 1899,
    originalPrice: null,
    description: 'A velvet-finished glass vase with a rich, tactile surface. Luxury meets artisanship.',
    images: [
      ...['/images/products/emerald-amber-vase.jpg', '/images/products/sculptural-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'bloom-vase-set-of-2',
    name: 'Bloom Vase (Set of 2)',
    slug: 'bloom-vase-set-of-2',
    category: 'vases',
    price: 1599,
    originalPrice: null,
    description: 'A pair of bloom-shaped glass vases with a vintage floral mouth design. Handcrafted green-toned artistry.',
    images: [
      ...['/images/products/bud-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'strip-tease',
    name: 'Strip - Tease',
    slug: 'strip-tease',
    category: 'vases',
    price: 1499,
    originalPrice: null,
    description: 'A striking black and brown striped glass vase. Bold design that commands attention in any room.',
    images: [
      ...['/images/products/bud-vase.jpg', '/images/products/sculptural-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'sun-kissed',
    name: 'Sun Kissed',
    slug: 'sun-kissed',
    category: 'vases',
    price: 1299,
    originalPrice: null,
    description: 'Warm sun-kissed green-toned glass vases that bring an earthy, natural vibe to your home.',
    images: [
      ...['/images/products/emerald-amber-vase.jpg', '/images/products/centerpiece-bowl.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'hand-mudra-vase',
    name: 'Hand-Mudra Vase',
    slug: 'hand-mudra-vase',
    category: 'vases',
    price: 2999,
    originalPrice: null,
    description: 'Inspired by traditional Indian hand mudras, this vase features an artistic sculptural design on premium glass.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'modern-sleek',
    name: 'Modern Sleek',
    slug: 'modern-sleek',
    category: 'vases',
    price: 1799,
    originalPrice: null,
    description: 'A sleek, contemporary vase with clean lines and modern proportions. Minimalist perfection.',
    images: [
      ...['/images/products/bud-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'elegant-curves',
    name: 'Elegant Curves',
    slug: 'elegant-curves',
    category: 'vases',
    price: 2199,
    originalPrice: null,
    description: 'Graceful curves define this elegant glass vase. A timeless piece that complements any interior.',
    images: [
      ...['/images/products/emerald-amber-vase.jpg', '/images/products/bud-vase.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },

  // === CANDLE HOLDERS ===
  {
    id: 'antique-love-set-of-2',
    name: 'Antique Love (Set of 2)',
    slug: 'antique-love-candle-holders-set-of-2',
    category: 'candle-holders',
    price: 1299,
    originalPrice: 1499,
    description: 'A set of two vintage-inspired glass candle holders with antique charm. Perfect for romantic evenings.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'aurora-bloom',
    name: 'Aurora Bloom',
    slug: 'aurora-bloom',
    category: 'candle-holders',
    price: 1799,
    originalPrice: null,
    description: 'A bloom-shaped candle holder that casts enchanting aurora-like patterns when lit. A magical centerpiece.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'contemporary-candle-holder',
    name: 'Contemporary Candle Holder',
    slug: 'contemporary-candle-holder',
    category: 'candle-holders',
    price: 1499,
    originalPrice: null,
    description: 'Sleek modern design meets artisan glass craftsmanship. A sophisticated addition to any contemporary space.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'copper-touch-set-of-2',
    name: 'Copper Touch (Set of 2)',
    slug: 'copper-touch-set-of-2',
    category: 'candle-holders',
    price: 1299,
    originalPrice: 1499,
    description: 'Glass candle holders with copper accents that shimmer in candlelight. Warm elegance for your home.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'diamond-candle-holder',
    name: 'Diamond',
    slug: 'diamond-candle-holder',
    category: 'candle-holders',
    price: 600,
    originalPrice: null,
    description: 'A diamond-cut glass candle holder that refracts light into dazzling patterns. Simple yet stunning.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'double-dose-set-of-2',
    name: 'Double Dose (Set of 2)',
    slug: 'double-dose-set-of-2',
    category: 'candle-holders',
    price: 999,
    originalPrice: 1199,
    description: 'A double set of elegant glass candle holders that create a symmetrical, luxurious display.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'dua-tea-light',
    name: 'Dua Tea-Light',
    slug: 'dua-tea-light',
    category: 'candle-holders',
    price: 350,
    originalPrice: null,
    description: 'A delicate tea-light holder with an ethereal glow. Handcrafted from the finest glass.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'gold-flake-set-of-2',
    name: 'Gold Flake (Set of 2)',
    slug: 'gold-flake-set-of-2',
    category: 'candle-holders',
    price: 1499,
    originalPrice: 1699,
    description: 'Glass candle holders adorned with real gold flakes suspended within. Pure luxury in every detail.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'radiant-rose',
    name: 'Radiant Rose',
    slug: 'radiant-rose',
    category: 'candle-holders',
    price: 999,
    originalPrice: null,
    description: 'A rose-inspired glass candle holder with radiant, warm glow. Perfect for special moments.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'heart-beat',
    name: 'Heart Beat',
    slug: 'heart-beat',
    category: 'candle-holders',
    price: 799,
    originalPrice: null,
    description: 'A heart-shaped glass candle holder that pulses with warm candlelight. A perfect gift for loved ones.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'ribbed-vase-set-of-2',
    name: 'Ribbed Vase (Set of 2)',
    slug: 'ribbed-vase-set-of-2',
    category: 'candle-holders',
    price: 2299,
    originalPrice: 2999,
    description: 'A pair of ribbed glass pieces that double as vases and candle holders. Versatile luxury for your home.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'vintage-candle-holder',
    name: 'Vintage',
    slug: 'vintage-candle-holder',
    category: 'candle-holders',
    price: 799,
    originalPrice: null,
    description: 'A vintage-style glass candle holder with old-world charm. Timeless elegance for any occasion.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'woobly-candle-holder',
    name: 'Woobly',
    slug: 'woobly-candle-holder',
    category: 'candle-holders',
    price: 899,
    originalPrice: null,
    description: 'A playfully wobbly glass candle holder that adds personality and warmth to any room.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'glimmer',
    name: 'Glimmer',
    slug: 'glimmer',
    category: 'candle-holders',
    price: 1299,
    originalPrice: null,
    description: 'A shimmering glass candle holder that creates magical light effects. Pure luxury and sophistication.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'jewel',
    name: 'Jewel',
    slug: 'jewel',
    category: 'candle-holders',
    price: 1599,
    originalPrice: null,
    description: 'A jewel-toned glass candle holder with gemstone-like reflections. Each piece is a work of art.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'eternal-glow',
    name: 'Eternal Glow',
    slug: 'eternal-glow',
    category: 'candle-holders',
    price: 999,
    originalPrice: null,
    description: 'A candle holder designed to create an eternal, warm glow. Handcrafted with love and precision.',
    images: [
      ...['/images/products/fluted-amber-candle-holder.jpg', '/images/products/mercury-tealight-set.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'moonlight-serenade',
    name: 'Moonlight Serenade',
    slug: 'moonlight-serenade',
    category: 'candle-holders',
    price: 1199,
    originalPrice: null,
    description: 'A candle holder that captures the magic of moonlight. Creates serene, calming ambiance.',
    images: [
      ...['/images/products/mercury-tealight-set.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },

  // === LAMPS ===
  {
    id: 'mini-mushroom-lamp',
    name: 'Mini Mushroom Lamp',
    slug: 'mini-mushroom-lamp',
    category: 'lamps',
    price: 1999,
    originalPrice: null,
    description: 'A whimsical mini mushroom-shaped glass lamp that casts a warm, ambient glow. Perfect for bedside tables.',
    images: [
      ...['/images/products/mushroom-marble-lamp.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'big-mushroom-lamp',
    name: 'Big Mushroom Lamp',
    slug: 'big-mushroom-lamp',
    category: 'lamps',
    price: 3499,
    originalPrice: null,
    description: 'A statement mushroom lamp with a generous marble glass shade. Creates enchanting light patterns in any room.',
    images: [
      ...['/images/products/mushroom-marble-lamp.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'robot-lamp',
    name: 'Robot Lamp',
    slug: 'robot-lamp',
    category: 'lamps',
    price: 2499,
    originalPrice: null,
    description: 'A fun robot-shaped glass lamp that combines industrial design with artisan glasswork. Great for modern spaces.',
    images: [
      ...['/images/products/mushroom-marble-lamp.jpg', '/images/products/fluted-amber-candle-holder.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },

  // === DRINKWARE ===
  {
    id: 'big-night',
    name: 'Big Night',
    slug: 'big-night',
    category: 'drinkware',
    price: 1299,
    originalPrice: null,
    description: 'Oversized glass for those special celebrations. Hand-blown with a distinctive, playful character.',
    images: [
      ...['/images/products/gold-rim-tumbler.jpg', '/images/products/ribbed-wine-goblets.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'palm-eden',
    name: 'Palm Eden',
    slug: 'palm-eden',
    category: 'drinkware',
    price: 999,
    originalPrice: null,
    description: 'Palm leaf-etched glasses that bring tropical paradise to your table. Premium glass with exquisite detail.',
    images: [
      ...['/images/products/ribbed-wine-goblets.jpg', '/images/products/gold-rim-tumbler.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'pour-me',
    name: 'Pour Me!',
    slug: 'pour-me',
    category: 'drinkware',
    price: 1499,
    originalPrice: null,
    description: 'An elegant glass carafe with artistic proportions. Pour in style with this handcrafted masterpiece.',
    images: [
      ...['/images/products/gold-rim-tumbler.jpg', '/images/products/ribbed-wine-goblets.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: true
  },
  {
    id: 'classic-hours-set-of-6',
    name: 'Classic Hours (Set of 6)',
    slug: 'classic-hours-set-of-6',
    category: 'drinkware',
    price: 2499,
    originalPrice: null,
    description: 'A set of six timeless hourglass-shaped glasses. Perfect for cocktails, water, or any beverage served with style.',
    images: [
      ...['/images/products/gold-rim-tumbler.jpg', '/images/products/ribbed-wine-goblets.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'pastel-swirl',
    name: 'Pastel Swirl',
    slug: 'pastel-swirl',
    category: 'drinkware',
    price: 1999,
    originalPrice: null,
    description: 'A gorgeous pastel pink swirl stem glass. Elegant and unique, perfect for special occasions.',
    images: [
      ...['/images/products/ribbed-wine-goblets.jpg', '/images/products/gold-rim-tumbler.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'sweetheart-sips',
    name: 'Sweetheart Sips',
    slug: 'sweetheart-sips',
    category: 'drinkware',
    price: 1499,
    originalPrice: null,
    description: 'Heart-themed drinking glasses that make every sip sweeter. Perfect for couple gifting.',
    images: [
      ...['/images/products/ribbed-wine-goblets.jpg', '/images/products/gold-rim-tumbler.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: true
  },
  {
    id: 'snack-server-set-of-4',
    name: 'Snack Server (Set of 4)',
    slug: 'snack-server-set-of-4',
    category: 'drinkware',
    price: 2999,
    originalPrice: null,
    description: 'A set of four artisan glass snack servers. Elevate your entertaining with these premium serving pieces.',
    images: [
      ...['/images/products/gold-rim-tumbler.jpg', '/images/products/ribbed-wine-goblets.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },

  // === DECOR ===
  {
    id: 'all-eyes-on-me',
    name: 'All Eyes on Me!',
    slug: 'all-eyes-on-me',
    category: 'vases',
    price: 1699,
    originalPrice: 1899,
    description: 'A statement glass fruit bowl that demands attention with its unique design. Modern art meets functional decor.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'am-i-fat',
    name: 'AM I FAT?',
    slug: 'am-i-fat',
    category: 'vases',
    price: 1999,
    originalPrice: 2999,
    description: 'A cheeky, round lustre glass vase with a playful personality. Fun meets luxury in this conversation-starter.',
    images: [
      ...['/images/products/emerald-amber-vase.jpg', '/images/products/centerpiece-bowl.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'bull-brilliance',
    name: 'Bull Brilliance',
    slug: 'bull-brilliance',
    category: 'vases',
    price: 3499,
    originalPrice: null,
    description: 'A brilliant glass bull sculpture that symbolizes strength and prosperity. A premium collector piece.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/centerpiece-bowl.jpg']
    ],
    featured: true,
    inStock: true,
    customizable: false
  },
  {
    id: 'moon-bunny',
    name: 'Moon Bunny',
    slug: 'moon-bunny',
    category: 'vases',
    price: 1299,
    originalPrice: null,
    description: 'An adorable white bunny glass figurine bathed in moonlight. Charming decor for any space.',
    images: [
      ...['/images/products/bud-vase.jpg', '/images/products/sculptural-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  },
  {
    id: 'modern-abstract',
    name: 'Modern Abstract',
    slug: 'modern-abstract',
    category: 'vases',
    price: 2499,
    originalPrice: null,
    description: 'An abstract glass sculpture that pushes creative boundaries. Bold, artistic, and unmistakably premium.',
    images: [
      ...['/images/products/sculptural-vase.jpg', '/images/products/emerald-amber-vase.jpg']
    ],
    featured: false,
    inStock: true,
    customizable: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning vases! The quality of glass and craftsmanship is unmatched. My living room looks so much more elegant now.',
    product: 'Abyssal Carve'
  },
  {
    id: 2,
    name: 'Rahul Mehra',
    location: 'Delhi',
    rating: 5,
    text: 'Ordered the Gold Flake candle holders as a gift. The packaging was premium and the product exceeded expectations. Will order again!',
    product: 'Gold Flake (Set of 2)'
  },
  {
    id: 3,
    name: 'Anita Desai',
    location: 'Bangalore',
    rating: 5,
    text: 'The customization option is amazing! Got a personalized message engraved on the vase for my anniversary. My wife loved it!',
    product: 'Hand-Mudra Vase'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'The mushroom lamp is a conversation starter! Beautiful design and the warm light it creates is magical. Premium quality throughout.',
    product: 'Big Mushroom Lamp'
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
