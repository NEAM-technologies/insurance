import React, { useState, useEffect } from "react";
import Image from "next/image";
import Lottie from "react-lottie";
import animationData from "@/data/confetti.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CompleteScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    "Confirming Form Details",
    "Processing Form",
    "Submitting Application",
    "Notifying Our Agent",
    "Done",
  ];

  // Check localStorage for completion state on initial render
  useEffect(() => {
    const completed = localStorage.getItem("isCompleted");
    if (completed === "true") {
      setIsCompleted(true);
    }
  }, []);

  // Handle the step progression and completion
  useEffect(() => {
    if (!isCompleted && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isCompleted) {
      setIsCompleted(true);
      localStorage.setItem("isCompleted", "true");
    }
  }, [currentStep, isCompleted, steps.length]);

  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      {!isCompleted ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="relative flex items-center justify-center">
            <div className="h-40 w-40 border-8 border-red-800 border-t-transparent rounded-full animate-spin" />
            <div className="absolute h-32 w-32 border-8 border-red-700 border-b-transparent rounded-full animate-reverse-spin" />
            <div className="absolute h-24 w-24 flex items-center justify-center text-4xl text-red-500 font-raleway bg-white rounded-full shadow-2xl">
              $
            </div>
          </div>
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-raleway">{steps[currentStep]}</h1>
            <p className="text-gray-400">
              Please wait while we process your request.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <div className="relative">
            <Lottie options={defaultOptions} height={300} width={300} />
            <Image
              src="/logobox.png"
              alt="logo"
              height={50}
              width={50}
              className="absolute top-[43%] left-[47%] animate-pulse"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <span className="text-4xl md:text-5xl font-raleway">
              Thank you!
            </span>
            <h2 className="text-lg md:text-xl font-medium text-gray-500">
              An agent will send your quotes to the email address you provided.
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteScreen;
