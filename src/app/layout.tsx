// react/nextjs components
import type { Metadata } from "next";

// styling
import "./globals.css";

// custom components
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileNavbar from "@/components/MobileNavbar";
import HeadSection from "@/components/HeadSection";
import Footer from "@/components/Footer";
import LetsChat from "@/components/LetsChat";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";

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
        <Loader/>
        <Alert/>
        <DesktopNavbar />
        <MobileNavbar />
        <HeadSection/>
        <div className="lg:mt-[21rem] xl:mt-[13.3rem]">{children}</div>
        <Footer/>
        <LetsChat />
      </body>
    </html>
  );
}
