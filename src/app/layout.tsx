import type { Metadata } from "next";
import { Playfair_Display, Hind } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import SessionProvider from "@/components/ui/SessionProvider";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const hind = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shubharambhpithoragarh.com"),
  title: {
    default: "Shubharambh Hotel & Banquet Hall — Pithoragarh, Uttarakhand",
    template: "%s | Shubharambh Hotel Pithoragarh",
  },
  description:
    "Luxury hotel and banquet hall in Pithoragarh, Uttarakhand. Gateway to Adi Kailash, Kailash Mansarovar and Kumaon Himalayas. Book rooms, weddings, events.",
  keywords: [
    "hotel in Pithoragarh",
    "best hotel Pithoragarh",
    "Adi Kailash stay",
    "Kailash Mansarovar route hotel",
    "banquet hall Pithoragarh",
    "wedding venue Pithoragarh",
    "luxury stay Kumaon",
    "hotel near Naini Saini Airport",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shubharambhhotels.com",
    siteName: "Shubharambh Hotel & Banquet Hall",
    title: "Shubharambh Hotel & Banquet Hall — Pithoragarh",
    description: "Where the Himalayas welcome your soul.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubharambh Hotel & Banquet Hall — Pithoragarh",
    description: "Where the Himalayas welcome your soul.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${hind.variable}`}>
      <body>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SessionProvider>
      </body>
    </html>
  );
}
