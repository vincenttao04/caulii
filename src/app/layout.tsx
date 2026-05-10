import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
  title: "Caulii",
  description: "Swipe & Dine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="mx-auto w-full max-w-lg px-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
