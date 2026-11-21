import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit — Ask every AI model at once",
  description:
    "Orbit is an infinite canvas for AI work. Run Claude, GPT and Gemini side by side, with your code and research right next to them. No sign-up, free to try.",
  keywords: [
    "AI workspace",
    "infinite canvas",
    "multi-model AI",
    "Claude",
    "GPT",
    "Gemini",
    "side by side AI",
    "productivity",
    "chat",
    "notes",
    "code",
  ],
  metadataBase: new URL("https://orbit-tau-black.vercel.app"),
  openGraph: {
    title: "Orbit — Ask every AI model at once",
    description:
      "An infinite canvas for AI work. Run Claude, GPT and Gemini side by side, with your code and research right next to them.",
    url: "/home",
    siteName: "Orbit",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit — Ask every AI model at once",
    description:
      "An infinite canvas for AI work. Run Claude, GPT and Gemini side by side, with your code and research right next to them.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col overflow-hidden">{children}<Analytics /></body>
    </html>
  );
}
