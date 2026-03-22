import type { Metadata, Viewport } from "next";
import { Berkshire_Swash, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const berkshireSwash = Berkshire_Swash({
  weight: ["400"],
  variable: "--font-berkshire-swash",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Once Upon | Where Every Story Finds a Reader",
  description:
    "The reading app that grows with your child. Personalized stories, read-along audio, and a magical library designed to spark a lifelong love of books.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[--color-page-bg] text-zinc-950">
      <body
        className={`${berkshireSwash.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans min-h-[100dvh] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
