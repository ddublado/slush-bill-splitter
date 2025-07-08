import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slush - Online Bill Splitter",
  description: "Need to split a bill fairly and quickly with some friends? Use our simple online cost splitting tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
