import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sunday-studio.example"),
  title: "Sunday Studio | Infinity Wall & Production Stage in Lahore",
  description:
    "Sunday Studio is Lahore's largest infinity-wall stage with premium lighting, audio, and concierge production support.",
  keywords: [
    "Sunday Studio",
    "Infinity Wall Lahore",
    "Production Stage",
    "Creative Studio Pakistan",
    "LED Lighting Stage",
    "Video Production",
  ],
  openGraph: {
    title: "Sunday Studio | Infinity Wall & Production Stage in Lahore",
    description:
      "Book the largest infinity wall in Lahore with cinematic lighting, acoustic treatment, and concierge crew support.",
    url: "https://sunday-studio.example",
    siteName: "Sunday Studio",
    images: [
      {
        url: "/og-sunday-studio.svg",
        width: 1200,
        height: 630,
        alt: "Sunday Studio infinity wall with cinematic glow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunday Studio | Infinity Wall & Production Stage in Lahore",
    description:
      "Award-winning production stage with the biggest infinity wall in Lahore, tuned lighting, and concierge crew.",
    images: ["/og-sunday-studio.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
