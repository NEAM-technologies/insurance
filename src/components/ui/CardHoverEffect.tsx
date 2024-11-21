"use client";

// react/nextjs components
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// libraries and utilities
import { cn } from "@/lib/utils";

// framer motion components
import { AnimatePresence, motion } from "framer-motion";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    imageUrl: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className={`absolute inset-0 ${
                  idx > 3 ? "top-4 left-4" : ""
                }  h-[12.5rem] w-60 bg-[#f5a7aa] block rounded-xl z-0`}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card item={item}>
            <CardTitle>{item.title}</CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  item,
  className,
  children,
}: {
  item: { title: string; imageUrl: string; link: string };
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-[12.5rem] w-60 flex items-center justify-center bg-white p-8 border group-hover:border-gray-300 rounded-lg shadow-lg overflow-hidden z-10",
        className
      )}
    >
      <div className="relative w-full flex flex-col items-center justify-center gap-3 z-50">
        <div className="h-28 w-full border">
          <Image src={item.imageUrl} alt={item.title} height={100} width={100}/>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
