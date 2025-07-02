import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slush - Bill Splitter",
  description: "Split bills easily with Slush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-[#f26d21] text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Slush</h1>
              <p className="text-sm">Pay Now, Win Later</p>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Slush LLC. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
