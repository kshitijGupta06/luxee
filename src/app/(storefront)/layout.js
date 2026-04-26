import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/frontend/components/Navbar";
import Footer from "@/frontend/components/Footer";
import ToastProvider from "@/frontend/components/ToastProvider";
import BackToTop from "@/frontend/components/BackToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Emkay Home — Luxury Customized Glass Decor & Gifts",
  description:
    "Discover handcrafted luxury glass decor, vases, candle holders, lamps, and drinkware. Personalize your gifts with custom engravings. Premium quality, artisan craftsmanship.",
  keywords:
    "glass decor, luxury vases, candle holders, customized gifts, handcrafted glass, premium home decor, Emkay Home",
  openGraph: {
    title: "Emkay Home — Luxury Customized Glass Decor & Gifts",
    description:
      "Handcrafted luxury glass decor for refined living. Personalized gifts, premium vases, candle holders & more.",
    type: "website",
    url: "https://emkayhome.in",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <ToastProvider />
        <Navbar />
        <main style={{ minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
