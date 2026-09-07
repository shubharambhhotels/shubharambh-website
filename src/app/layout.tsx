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
  metadataBase: new URL("https://shubharambhhotels.com"),
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": "Shubharambh Hotel & Banquet Hall",
            "description": "Luxury hotel and banquet hall in Pithoragarh, Uttarakhand. Gateway to Adi Kailash and Kailash Mansarovar.",
            "url": "https://shubharambhhotels.com",
            "telephone": "+919762622335",
            "email": "shubharambh.banquet2026@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Near Royal Cinema, Airport Line, Village Makholigaon",
              "addressLocality": "Pithoragarh",
              "addressRegion": "Uttarakhand",
              "postalCode": "262501",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 29.589872885453975,
              "longitude": 80.23610118077387
            },
            "image": "https://shubharambhhotels.com/images/shubharambh.jpeg",
            "priceRange": "₹₹",
            "checkinTime": "13:00",
            "checkoutTime": "11:00",
            "amenityFeature": [
              { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Restaurant", "value": true }
            ],
            "sameAs": [
              "https://www.facebook.com/61586732260917/",
              "https://www.instagram.com/shubharambhhall.in",
              "https://youtube.com/@shubharambhhotels"
            ]
          })
        }}
      />
    </head>
  
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
