"use client";

// react/nextjs components
import React, { useState, useEffect } from "react";
import Image from "next/image";

// framer motion components
import { AnimatePresence } from "framer-motion";

// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// global store
import useLoadingStore from "@/store/useLoadingStore";
import useLifeFormStore from "@/store/useLifeFormStore";
import { useAlertStore } from "@/store/useAlertStore";

// custom components
import LifeQuestions from "@/components/insurance/LifeQuestions";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaWpforms } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const sections = [
  { name: "Name", id: "name" },
  { name: "Date of Birth", id: "dateOfBirth" },
  { name: "Gender", id: "gender" },
  { name: "Email", id: "email" },
  { name: "Phone Number", id: "phoneNumber" },
  { name: "Height", id: "height" },
  { name: "Weight", id: "weight" },
  { name: "Address", id: "address" },
  { name: "Marital Status", id: "maritalStatus" },
  { name: "Tobacco Use", id: "tobaccoUse" },
  { name: "Health Conditions", id: "healthConditions" },
  { name: "Coverage Type", id: "coverageType" },
  { name: "Coverage Amount", id: "coverageAmount" },
  { name: "Complete Screen", id: "completeScreen" },
];

const requiredFields: Record<string, string[]> = {
  name: ["firstName", "lastName"],
  dateOfBirth: ["dobDate"],
  gender: ["gender"],
  email: ["email"],
  phoneNumber: ["phoneNumber"],
  height: ["feet", "inches"],
  weight: ["weight"],
  address: ["street", "city", "state", "zip"],
  maritalStatus: ["maritalStatus"],
  tobaccoUse: ["tobaccoUse"],
  healthConditions: ["healthConditions"],
  coverageType: ["coverageType"],
  coverageAmount: ["coverageAmount"],
};

const LifeInsurancePage = () => {
  const { setLoading } = useLoadingStore();
  const { lifeForm } = useLifeFormStore();
  const { icon: Icon, setAlert } = useAlertStore();
  const storedCompletedSections = localStorage.getItem("completedSections");
  const storedCurrentSection = localStorage.getItem("currentSection");
  const [currentSection, setCurrentSection] = useState(
    storedCurrentSection ? Number(storedCurrentSection) : 0
  );
  const [completedSections, setCompletedSections] = useState<
    Record<string, string>
  >(
    storedCompletedSections
      ? JSON.parse(storedCompletedSections) // Use saved data if available
      : sections.reduce((acc, section) => {
          acc[section.id] = "pending"; // Set each section to "pending" by default
          return acc;
        }, {} as Record<string, string>)
  );

  const handleSectionClick = (index: number) => {
    const sectionId = sections[index].id;
    // Only allow click if the section is either 'in-progress' or 'complete'
    if (completedSections[sectionId] !== "pending") {
      setCurrentSection(index);
    }
  };

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections((prev) => {
      const updatedSections = {
        ...prev,
        [sectionId]: "done", // Mark the current section as complete
      };

      // Check if the next section is "completeScreen"
      const currentSectionIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      const nextSection = sections[currentSectionIndex + 1];

      if (nextSection && nextSection.id === "completeScreen") {
        updatedSections[nextSection.id] = "done";
      }

      return updatedSections;
    });

    // Move to the next section
    setCurrentSection((prev) => prev + 1);
  };

  const completedPercentage =
    (Object.values(completedSections).filter((status) => status === "done")
      .length /
      Object.keys(completedSections).length) *
    100;

  const isSectionComplete = (sectionId: string): boolean => {
    const fieldsToCheck = requiredFields[sectionId] || [];

    return fieldsToCheck.every((field) => {
      const value = lifeForm[field as keyof LifeFormData];

      // Special validation for email field
      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === "string" && emailRegex.test(value.trim());
      }

      // Special validation for phoneNumber field
      if (field === "phoneNumber") {
        const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/; // Regex for (222) 322-2222 format
        return typeof value === "string" && phoneRegex.test(value.trim());
      }

      // Special validation for numeric fields (feet, inches, weight)
      if (["feet", "inches", "weight"].includes(field)) {
        return typeof value === "string" && /^[0-9]+$/.test(value.trim());
      }

      // General validation for other fields
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return typeof value === "string" && value.trim() !== "";
    });
  };

  useEffect(() => {
    // Save the current section and completed sections
    localStorage.setItem("currentSection", currentSection.toString());
    localStorage.setItem(
      "completedSections",
      JSON.stringify(completedSections)
    );
  }, [currentSection, completedSections]);

  useEffect(() => {
    const container = document.getElementById("sections");
    if (container) {
      // Number of sections
      const totalSections = sections.length;

      // Calculate the scroll position based on the current section index
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const scrollPosition =
        (currentSection / (totalSections - 1)) * maxScrollLeft;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentSection]);

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
          src="https://lottie.host/5e792da9-6285-4bf2-a3c8-43d66b866341/weviWvRg9f.lottie"
          loop
          autoplay
          className="w-60 mx-auto"
        />
        <h1 className="w-5/6 md:w-full text-2xl md:text-3xl lg:text-4xl text-center font-raleway mx-auto">
          Hi there, protect your future with the best savings
          <br className="hidden md:flex" /> on life insurance, tailored just for
          you!
        </h1>
      </div>

      <div
        id="sections"
        className="scrollbar-hide h-16 flex items-center gap-20 mx-auto px-10 overflow-x-auto"
      >
        {sections.map((section, index) => (
          <button
            key={section.id}
            disabled={
              completedSections[section.id] === "pending" ||
              index === currentSection
            }
            onClick={() => handleSectionClick(index)}
            className={`h-3/5 w-[30rem] min-w-max flex items-center ${
              index === currentSection ||
              completedSections[section.id] === "in-progress"
                ? "text-black"
                : completedSections[section.id] !== "pending"
                ? "text-red-700"
                : "text-gray-400 cursor-not-allowed"
            } text-nowrap font-semibold`}
          >
            <div
              className={`h-8 w-8 flex items-center justify-center text-sm font-semibold me-2 border-2 ${
                index === currentSection ||
                completedSections[section.id] === "in-progress"
                  ? "border-black"
                  : completedSections[section.id] !== "pending"
                  ? "border-red-700"
                  : "border-gray-400 cursor-not-allowed"
              } rounded-full`}
            >
              {index + 1}
            </div>

            <span className="text-sm md:text-base text-nowrap">
              {section.name}
            </span>
            <svg
              className="w-4 h-4 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div id="indicator" className="h-1 w-full bg-gray-200">
        <div
          className="h-1 bg-red-500 transition-all"
          style={{
            width: `${completedPercentage}%`,
          }}
        />
      </div>

      {/* Section Content with Transition */}
      <div className="w-full flex bg-white mt-10 p-8">
        <Image
          src="/lifeInsuranceImage.png"
          alt="life Insurance Image"
          height={1667}
          width={2382}
          className="h-full w-[800px]"
        />
        <AnimatePresence mode="wait">
          <div className="w-full flex flex-col items-end justify-center gap-16 px-20">
            <LifeQuestions
              currentSection={currentSection}
              sections={sections}
            />

            {[0, 3, 7, 11].includes(currentSection) && (
              <div className="w-full flex items-center justify-center gap-2">
                <Image
                  src="/owner.jpeg"
                  alt="owner"
                  height={50}
                  width={50}
                  className="h-10 md:h-12 w-10 md:w-12 rounded-full"
                />
                <span className="flex gap-1 text-sm md:text-base text-gray-400">
                  <IoIosCheckmarkCircle size={22} color="red" />
                  {currentSection === 0 && "Your Information is safe & secure"}
                  {currentSection === 3 && "No Spam Guaranteed"}
                  {currentSection === 7 &&
                    "Insurance companies require this in order to provide an accurate quote."}
                  {currentSection === 11 &&
                    "Select ‘Not Sure’ if you don’t know what coverage you want."}
                </span>
              </div>
            )}

            {sections[currentSection].id !== "completeScreen" && (
              <button
                type="button"
                onClick={() => {
                  if (!isSectionComplete(sections[currentSection].id)) {
                    if (sections[currentSection].id === "email") {
                      setAlert(
                        "info",
                        "Please input a valid email address",
                        MdEmail
                      );
                    } else {
                      setAlert(
                        "info",
                        "Please check the input(s) and provide valid information.",
                        FaWpforms
                      );
                    }
                  } else {
                    markSectionComplete(sections[currentSection].id);
                  }
                }}
                className={`h-16 w-60 text-xl lg:text-2xl text-white font-semibold ${
                  !isSectionComplete(sections[currentSection].id)
                    ? "bg-[#83161c]"
                    : "bg-[#a81d24]"
                } pr-1 pb-1 rounded-xl shadow-xl hover:bg-[#97282e] hover:scale-[99%]`}
              >
                <div
                  className={`h-full w-full flex items-center justify-center ${
                    !isSectionComplete(sections[currentSection].id)
                      ? "bg-[#83161c]"
                      : "bg-[#a81d24]"
                  } rounded-xl shadow-xl hover:bg-[#97282e]`}
                >
                  {sections[currentSection].id === "coverageAmount"
                    ? "Submit"
                    : "Continue"}
                </div>
              </button>
            )}
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default LifeInsurancePage;
