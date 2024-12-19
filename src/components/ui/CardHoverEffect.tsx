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
import useCommercialFormStore from "@/store/useCommercialFormStore";

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
  const { resetCommercialForm } = useCommercialFormStore();

  const resetPage = () => {
    resetHomeForm();
    resetLifeForm();
    resetAutoForm();
    resetCommercialForm();
    localStorage.removeItem("completedSections");
    localStorage.removeItem("currentSection");
    localStorage.removeItem("isCompleted");
  };

  return (
    <div
      className={cn(
        "md:w-4/5 lg:w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 mx-auto lg:m-0",
        className
      )}
    >
      {items.map((item, _) => (
        <Link
          href={item?.link}
          onClick={resetPage}
          key={item?.title}
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
    <div className="xs:h-36 md:h-48 lg:h-fit xs:max-w-52 md:max-w-80 lg:w-full bg-black/40 mx-auto pr-[10px] rounded-2xl hover:bg-black/60 hover:scale-[98%] shadow-xl">
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
                  className={`relative z-10 ${
                    item.title === "Auto" && "scale-x-[-1]"
                  }`}
                />
                {item.title === "Renters" && (
                  <Image
                    src="/house.png"
                    alt="Image with a house"
                    height={100}
                    width={100}
                    className="absolute -top-2 right-0 h-10 md:h-20 w-16 md:w-24 z-0"
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
    <h4 className={cn("text-xl text-black font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
