import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Johnson Law | Experienced Legal Counsel",
  description: "Dedicated legal professional providing comprehensive legal services including corporate law, family law, real estate law, and estate planning.",
  keywords: ["Johnson Law", "lawyer", "attorney", "legal counsel", "corporate law", "family law", "real estate law", "estate planning"],
  authors: [{ name: "Robert Johnson, Esq." }],
  openGraph: {
    title: "Johnson Law | Experienced Legal Counsel",
    description: "Dedicated legal professional providing comprehensive legal services with over 15 years of experience.",
    url: "https://johnsonlaw.com",
    siteName: "Johnson Law",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnson Law | Experienced Legal Counsel",
    description: "Dedicated legal professional providing comprehensive legal services with over 15 years of experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
