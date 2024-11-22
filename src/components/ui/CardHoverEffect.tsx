// react/nextjs components
import Link from "next/link";
import Image from "next/image";

// libraries and utilities
import { cn } from "@/lib/utils";


// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    lottieUrl?: string;
    link: string;
  }[];
  className?: string;
}) => {

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 lg:py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
        >
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
  item: {
    title: string;
    lottieUrl?: string;
    link: string;
  };
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="h-[12.5rem] bg-black/40 rounded-2xl hover:bg-black/60 mx-auto hover:scale-105 shadow-xl z-0">
      <div
        className={cn(
          "relative h-[12.5rem] w-[96%] flex items-center justify-center bg-white p-8 border group-hover:border-gray-300 rounded-2xl shadow-xl overflow-hidden",
          className
        )}
      >
        <div className="relative w-full flex flex-col items-center justify-center gap-3 z-50">
          <div className="h-fit w-fit">
            {item.lottieUrl ? (
              <div className="relative">
                <DotLottieReact src={item.lottieUrl} loop autoplay />
                {item.title === "Renters" && (
                  <Image
                    src="/house.png"
                    alt="Image with a house"
                    height={100}
                    width={100}
                    className="absolute top-0 right-0 -z-10"
                  />
                )}
              </div>
            ) : (
              <p>No media available</p>
            )}
          </div>
          <div>{children}</div>
        </div>
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
