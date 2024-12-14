// react/nextjs components
import Link from "next/link";
import Image from "next/image";

// libraries and utilities
import { cn } from "@/lib/utils";

// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// global store
import useLifeFormStore from "@/store/useLifeFormStore";
import useHomeInsuranceStore from "@/store/useHomeInsuranceStore";
import useAutoInsuranceStore from "@/store/useAutoInsuranceStore";

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
  const { resetLifeForm } = useLifeFormStore();
  const { resetHomeForm } = useHomeInsuranceStore();
  const { resetAutoForm } = useAutoInsuranceStore();

  const resetPage = () => {
    resetHomeForm();
    resetLifeForm();
    resetAutoForm();
    localStorage.removeItem("completedSections");
    localStorage.removeItem("currentSection");
    localStorage.removeItem("isCompleted");
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 lg:py-10",
        className
      )}
    >
      {items.map((item, _) => (
        <Link
          href={item?.link}
          onClick={resetPage}
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
    <div className="h-52 bg-black/40 pr-3 rounded-2xl hover:bg-black/60 hover:scale-[98%] shadow-xl">
      <div
        className={cn(
          "relative h-full w-full flex items-center justify-center bg-white p-8 rounded-2xl shadow-xl",
          className
        )}
      >
        <div className="relative w-full flex flex-col items-center justify-center gap-3">
          <div className="h-fit w-fit">
            {item.lottieUrl && (
              <div className="relative">
                <DotLottieReact
                  src={item.lottieUrl}
                  loop
                  autoplay
                  className="relative z-10"
                />
                {item.title === "Renters" && (
                  <Image
                    src="/house.png"
                    alt="Image with a house"
                    height={100}
                    width={100}
                    className="absolute top-0 right-0 z-0"
                  />
                )}
              </div>
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
