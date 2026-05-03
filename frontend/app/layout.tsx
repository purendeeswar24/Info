import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Purendeeswar Reddy Mure | AI/ML Engineer",
  description: "Building production-grade cloud-native AI & Multi-Agent systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
