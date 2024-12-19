"use client";

// react/nextjs components
import React, { useEffect } from "react";
import Image from "next/image";

// global states
import useLoadingStore from "@/store/useLoadingStore";

const Loader = () => {
  const loading = useLoadingStore((state) => state.loading);

  // Add/remove overflow hidden to the body when loading state changes
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling again when loading is false
    }

    return () => {
      document.body.style.overflow = ""; // Clean up when the component is unmounted
    };
  }, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 h-full w-full flex flex-col items-center justify-center bg-white z-[1000]">
      {/* Outer Spinner */}
      <div className="relative flex items-center justify-center mt-20 md:mt-0 animate-bounce-further">
        <div className="h-28 w-28 border-8 border-red-800 border-t-transparent rounded-full animate-spin" />
        {/* Inner Spinner rotating opposite */}
        <div className="absolute h-20 w-20 border-8 border-red-700 border-b-transparent rounded-full animate-reverse-spin" />
        <div className="absolute h-12 w-12 flex items-center justify-center text-2xl text-red-500 font-raleway bg-white rounded-full shadow-xl">
          $
        </div>
      </div>
      <Image
        src="/handv3.png"
        alt="logo"
        height={250}
        width={250}
        priority
        className="h-40 w-80 -rotate-12"
      />
      <p className="text-center text-3xl text-red-500 font-semibold italic mt-12">
        Insure with You!
      </p>
    </div>
  );
};

export default Loader;
