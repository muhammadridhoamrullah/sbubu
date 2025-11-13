import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LocalFont from "next/font/local";

const momoTrust = LocalFont({
  src: "../../public/fonts/MomoTrustDisplay-Regular.ttf",
  variable: "--font-momo-trust",
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
  title: "SBUBU",
  description:
    "A Next.js boilerplate with built-in authentication and authorization.",
  icons: {
    icon: "/sbubu-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${momoTrust.className} antialiased `}>{children}</body>
    </html>
  );
}
