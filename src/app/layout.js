import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWithSidebar from "@/components/header/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing orders and products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      
      >
        <HeaderWithSidebar>{children}</HeaderWithSidebar>
      </body>
    </html>
  );
}
