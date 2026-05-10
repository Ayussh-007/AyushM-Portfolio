import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- High-End SEO Metadata Configuration ---
const siteConfig = {
  title: "Ayush Mhatre — AI & Data Science Engineer",
  description: "Cinematic futuristic developer portfolio showcasing AI systems, full-stack engineering, creative development, and immersive web experiences.",
  url: "https://ayushm-portfolio.vercel.app", // Replace with your final domain
  ogImage: "/images/hero/ayush-dark.png", // Recommended: specialized OG image 1200x630
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    "Ayush Mhatre",
    "AI Engineer",
    "Data Science",
    "Full-Stack Developer",
    "Creative Technologist",
    "Three.js Portfolio",
    "Next.js Developer",
    "Mumbai Engineer",
    "Immersive Web Design",
  ],
  authors: [{ name: "Ayush Mhatre" }],
  creator: "Ayush Mhatre",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@AyushMhatre", // Update if you have a handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
