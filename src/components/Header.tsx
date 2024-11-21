"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    // Media queries for small and large mobiles
    const smallMobileQuery = window.matchMedia("(max-width: 1024px)");

    // Set the initial states
    setIsSmallMobile(smallMobileQuery.matches);

    // Handlers for changes in media queries
    const handleSmallMobileChange = (event: MediaQueryListEvent) => {
      setIsSmallMobile(event.matches);
    };

    // Add event listeners
    smallMobileQuery.addEventListener("change", handleSmallMobileChange);

    // Cleanup listeners on unmount
    return () => {
      smallMobileQuery.removeEventListener("change", handleSmallMobileChange);
    };
  }, []);
  return (
    <div className="bg-white space-y-3 pb-1">
      <div className="h-1 w-full bg-[#790d6c] z-10"></div>
      <div className="h-[22rem] lg:h-[100px] xl:w-[65%] flex flex-col xl:flex-row items-center xl:justify-between gap-2 xl:gap-0 mx-auto">
        <div className="xl:w-[20%] z-0">
          <Image
            src={isSmallMobile ? "/lglogo.jpg" : "/logo.png"}
            alt="logo"
            height={isSmallMobile ? "300" : "100"}
            width={isSmallMobile ? "300" : "100"}
            className=""
          />
        </div>
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
      <nav className="hidden xl:flex items-center justify-center text-black font-medium tracking-wide p-2">
        <ul className="w-10/12 flex items-center justify-between">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/home">Home Insurance</a>
          </li>
          <li>
            <a href="/life">About Insurance</a>
          </li>
          <li>
            <a href="/services">Contact Insurance</a>
          </li>
          <li>
            <a href="/life">Contact Us</a>
          </li>
          <li>
            <a href="/services">Blog</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
