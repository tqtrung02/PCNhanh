import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "PCNhanh - Mua PC, Laptop & Linh kiện",
  description:
    "PCNhanh - Website bán hàng PC, Laptop, Linh kiện máy tính và dịch vụ tại nhà. Lắp ráp PC, cài đặt, sửa chữa, bảo trì.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <CartProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

