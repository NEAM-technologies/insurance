"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";

// framer motion components
import { AnimatePresence, motion } from "framer-motion";

// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// global store
import useLoadingStore from "@/store/useLoadingStore";

// custom components
import HomeQuestions from "@/components/insurance/home/HomeQuestions";
import OwnerQuestions from "@/components/insurance/home/OwnerQuestions";
import CoverageQuestions from "@/components/insurance/home/CoverageQuestions";
import CompleteScreen from "@/components/insurance/CompleteScreen";

// icons
import { FaCheck } from "react-icons/fa";

const sections = [
  { name: "Home", id: "home" },
  { name: "Owner", id: "owner" },
  { name: "Coverage", id: "coverage" },
  { name: "Complete", id: "complete" },
];

const HomeInsurancePage = () => {
  const { setLoading } = useLoadingStore();
  const storedCompletedSections = localStorage.getItem("completedSections");
  const storedCurrentSection = localStorage.getItem("currentSection");

  const [currentSection, setCurrentSection] = useState(
    storedCurrentSection ? Number(storedCurrentSection) : 0
  );
  const [completedSections, setCompletedSections] = useState<
    Record<string, string>
  >(
    storedCompletedSections
      ? JSON.parse(storedCompletedSections)
      : {
          home: "pending",
          owner: "pending",
          coverage: "pending",
          complete: "pending",
        }
  );

  useEffect(() => {
    // Save the current section and completed sections
    localStorage.setItem("currentSection", currentSection.toString());
    localStorage.setItem(
      "completedSections",
      JSON.stringify(completedSections)
    );
  }, [currentSection, completedSections]);

  const completeSection = (section: string) => {
    setCompletedSections((prev) => {
      const updatedSections = { ...prev };
      updatedSections[section] = "done"; // Mark the current section as complete

      // Find the next section (if any) and mark it as 'in-progress'
      const nextSectionIndex =
        sections.findIndex((sec) => sec.id === section) + 1;
      if (nextSectionIndex < sections.length) {
        const nextSectionId = sections[nextSectionIndex].id;
        if (sections[nextSectionIndex].id === "complete") {
          updatedSections[nextSectionId] = "done";
        } else {
          updatedSections[nextSectionId] = "in-progress"; // Mark the next section as in-progress
        }
      }

      return updatedSections;
    });

    const element = document.getElementById("indicator");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }

    setCurrentSection(currentSection + 1);
  };

  const handleSectionClick = (index: number) => {
    const sectionId = sections[index].id;
    // Only allow click if the section is either 'in-progress' or 'complete'
    if (completedSections[sectionId] !== "pending") {
      setCurrentSection(index);
    }
  };

  const renderSectionContent = () => {
    switch (sections[currentSection].id) {
      case "home":
        return <HomeQuestions completeSection={completeSection} />;
      case "owner":
        return <OwnerQuestions completeSection={completeSection} />;
      case "coverage":
        return <CoverageQuestions completeSection={completeSection} />;
      case "complete":
        return <CompleteScreen />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="bg-[#f5f3f3ac] mt-12 py-5">
        <DotLottieReact
          src="https://lottie.host/e01068ed-3f7e-4924-a818-c16e7ddd507c/akYIFiUVuA.lottie"
          loop
          autoplay
          className="w-60 mx-auto"
        />
        <h1 className="w-5/6 md:w-full text-2xl md:text-4xl text-center font-raleway mx-auto">
          Hi there, let&apos;s help you find the best savings{" "}
          <br className="hidden md:flex" /> on your home insurance, tailored
          just for you!
        </h1>
      </div>

      {/* Tabs Navigation */}
      <div className="h-14 w-full sm:w-4/5 md:w-7/12 lg:w-6/12 xl:w-5/12 flex items-center justify-between mx-auto px-6 md:px-0">
        {sections.map((section, index) => (
          <button
            key={section.id}
            disabled={
              completedSections[section.id] === "pending" ||
              index === currentSection
            }
            onClick={() => handleSectionClick(index)}
            className="flex items-center gap-1 md:gap-2"
          >
            {/* Checkmark only for completed sections */}
            {completedSections[section.id] === "done" && (
              <FaCheck className="text-sm sm:text-base md:text-lg xl:text-xl text-red-700" />
            )}
            <span
              className={`text-sm sm:text-base md:text-lg ${
                index === currentSection ||
                completedSections[section.id] === "in-progress"
                  ? "text-black"
                  : completedSections[section.id] !== "pending"
                  ? "text-red-700"
                  : "text-gray-400 cursor-not-allowed"
              } text-nowrap font-semibold`}
            >
              {section.name}
            </span>
          </button>
        ))}
      </div>
      {/* Progress Indicator */}
      <div id="indicator" className="h-1 w-full bg-gray-200">
        <div
          className="h-1 bg-red-500 transition-all"
          style={{
            width: `${((currentSection + 1) / sections.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Section Content with Transition */}
      <div className="w-4/5 md:w-[45%] bg-white mx-auto mt-10">
        <AnimatePresence mode="wait">
          <div key={sections[currentSection].id} className="h-full w-full">
            {renderSectionContent()}
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default HomeInsurancePage;
