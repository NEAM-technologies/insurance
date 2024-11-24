"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// custom hooks
import { useMediaQuery } from "@/hooks/UseMediaQuery";

const DesktopNavbar = () => {
  const currentPathname = usePathname();
  const isSmallMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="fixed top-0 left-0 w-screen hidden lg:block bg-white shadow-md z-[1000]">
      <div className="h-1 w-full flex bg-[#790d6c] z-10"></div>
      <div className="h-72 xl:h-40 w-full md:w-4/5 xl:w-3/5 flex flex-col xl:flex-row items-center justify-between mx-auto">
        <Link href="/">
          <Image
            src="/lglogo.jpg"
            alt="logo"
            height={isSmallMobile ? "300" : "220"}
            width={isSmallMobile ? "300" : "220"}
          />
        </Link>
        {!isSmallMobile && (
          <p className="text-2xl xl:text-4xl text-[#f15e63] font-lulo">
            919-341-0606
          </p>
        )}
        <Link
          href="https://bit.ly/AutoQuoteForYou"
          target="blank"
          rel="noopener noreferrer"
          className="h-16 xl:h-[50px] w-[17rem] xl:w-64 flex items-center justify-center text-white text-xl xl:text-base xl:font-bold font-sans tracking-[0.2rem] uppercase bg-[#ff3941] rounded-full"
        >
          <span>Request a Quote</span>
        </Link>
        {isSmallMobile && (
          <p className="text-2xl xl:text-4xl text-[#f15e63] font-lulo">
            919-341-0606
          </p>
        )}
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
            href="/homeInsurance"
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
