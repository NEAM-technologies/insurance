"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNavbar = () => {
  const currentPathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full hidden lg:block bg-white ${hasScrolled ? "shadow-md " : ""} z-50`}>
      <div className="h-1 w-full flex bg-[#790d6c] z-10"></div>
      <div className="h-72 xl:h-40 w-full md:w-4/5 flex flex-col xl:flex-row items-center justify-between mx-auto">
        <Link href="/">
          <Image
            src="/lglogo.jpg"
            alt="logo"
            height={280}
            width={280}
            priority
          />
        </Link>
        <p className="text-2xl xl:text-4xl text-[#f15e63] font-lulo">
          919-341-0606
        </p>
        <Link
          href="https://bit.ly/AutoQuoteForYou"
          target="blank"
          rel="noopener noreferrer"
          className="h-16 xl:h-[50px] w-[17rem] xl:w-64 flex items-center justify-center text-white text-xl xl:text-base xl:font-bold font-sans tracking-[0.2rem] uppercase bg-[#ff3941] rounded-full"
        >
          <span>Request a Quote</span>
        </Link>
      </div>
      <div className="h-12 flex items-center justify-center text-black font-medium tracking-wide p-2">
        <div className="w-11/12 flex items-center justify-between">
          <Link
            href="/"
            className={`${
              currentPathname === "/"
                ? "text-red-600 font-semibold"
                : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Home
          </Link>
          <Link
            href="/aboutUs"
            className={`${
              currentPathname === "/about" ? "text-yellow-400" : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            About
          </Link>
          <Link
            href="/autoInfo"
            className={`${
              currentPathname === "/home" ? "text-yellow-400" : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Auto Insurance
          </Link>
          <Link
            href="/homeInsuranceInfo"
            className={`${
              currentPathname === "/life"
                ? "text-red-600 font-semibold"
                : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Home Insurance
          </Link>
          <Link
            href="/lifeInsuranceInfo"
            className={`${
              currentPathname === "/services"
                ? "text-red-600 font-semibold"
                : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Life Insurance
          </Link>
          <Link
            href="/ourServices"
            className={`${
              currentPathname === "/life"
                ? "text-red-600 font-semibold"
                : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Services
          </Link>
          <Link
            href="/contactUs"
            className={`${
              currentPathname === "/services"
                ? "text-red-600 font-semibold"
                : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Contact Us
          </Link>
          <Link
            href="/blog"
            className={`${
              currentPathname === "/services"
                ? "text-red-600 font-semibold"
                : "text-black"
            } hover:text-red-600 transition-colors duration-200`}
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
