import type { Metadata } from "next";
import "./globals.css";

// custom components
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileNavbar from "@/components/MobileNavbar";
import HeadSection from "@/components/HeadSection";
import LetsChat from "@/components/LetsChat";

export const metadata: Metadata = {
  title: "You Insurance Agency",
  description: "Your one stop solution for personalized insurance coverage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative antialiased`}>
        <DesktopNavbar />
        <MobileNavbar />
        <HeadSection/>
        {children}
        <LetsChat />
      </body>
    </html>
  );
}
