"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";

// firebase components
import { getAutoInsuranceCollection, getAutoYear } from "@/lib/firebase";

// framer motion components
import { AnimatePresence } from "framer-motion";

// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// global store
import useLoadingStore from "@/store/useLoadingStore";
import useAutoInsuranceStore from "@/store/useAutoInsuranceStore";

// custom components
import VechileQuestions from "@/components/insurance/auto/VechileQuestions";
import DriverQuestions from "@/components/insurance/auto/DriverQuestions";
import FinalDetails from "@/components/insurance/auto/FinalDetails";
import CompleteScreen from "@/components/insurance/CompleteScreen";

// icons
import { FaCheck } from "react-icons/fa";

const sections = [
  { name: "Vehicle", id: "vehicle" },
  { name: "Drivers", id: "drivers" },
  { name: "Final Details", id: "finalDetails" },
  { name: "Complete", id: "complete" },
];

const AutoInsurancePage = () => {
  const { setLoading } = useLoadingStore();
  const { vehicleForm } = useAutoInsuranceStore();
  const [year, setYear] = useState<AutoYear[]>([]);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleData[]>([]);
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
          vehicle: "pending",
          drivers: "pending",
          finalDetails: "pending",
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
      case "vehicle":
        return (
          <VechileQuestions
            completeSection={completeSection}
            year={year}
            vehicleDetails={vehicleDetails}
          />
        );
      case "drivers":
        return <DriverQuestions completeSection={completeSection} />;
      case "finalDetails":
        return <FinalDetails completeSection={completeSection} />;
      case "complete":
        return <CompleteScreen />;
      default:
        return null;
    }
  };

  const completedPercentage =
  (Object.values(completedSections).filter((status) => status === "done")
    .length /
    Object.keys(completedSections).length) *
  100;


  useEffect(() => {
    const fetchAutoYear = async () => {
      setLoading(true);
      try {
        const result = await getAutoYear();
        if (result.success) {
          const dataToStore = {
            data: result.data,
            timestamp: new Date().getTime(), // Current time in milliseconds
          };
          localStorage.setItem("autoYear", JSON.stringify(dataToStore)); // Save to local storage
          setYear(result.data);
        }
      } catch (e) {
        console.error("Error fetching auto year:", e);
        setYear([]); // Set an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    const checkAndFetchData = () => {
      const storedData = localStorage.getItem("autoYear");
      const now = new Date().getTime();

      if (storedData) {
        const { data, timestamp } = JSON.parse(storedData);

        // Check if one day (24 hours) has passed
        if (now - timestamp < 24 * 60 * 60 * 1000) {
          setYear(data); // Use the cached data
          setLoading(false);
          return;
        }
      }

      // Fetch new data if no data or it's expired
      fetchAutoYear();
    };

    checkAndFetchData();
  }, []);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      const { v1Year, v2Year } = vehicleForm;

      // Ensure at least one year is specified before fetching
      if (v1Year || v2Year) {
        setLoading(true);

        try {
          // Fetch data for v1Year or v2Year
          const result = await getAutoInsuranceCollection(v1Year || v2Year);
          if (result.success) {
            setVehicleDetails(result.data);
          }
        } catch (error) {
          return [];
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInsuranceData();
  }, [vehicleForm.v1Year, vehicleForm.v2Year]);

  return (
    <>
      <div className="bg-[#f5f3f3ac] mt-12 py-5">
        <DotLottieReact
          src="https://lottie.host/f678cace-d7cd-432e-993c-604366bd2ab7/wxmJGyQ24V.lottie"
          loop
          autoplay
          className="w-60 mx-auto scale-x-[-1]"
        />
        <h1 className="w-5/6 md:w-full text-2xl md:text-3xl lg:text-4xl text-center font-raleway mx-auto">
          Hi there, let&apos;s help you find the best savings
          <br className="hidden md:flex" /> on your car insurance, tailored just
          for you!
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
              className={`text-xs sm:text-base md:text-lg ${
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
            width: `${completedPercentage}%`,
          }}
        />
      </div>

      {/* Section Content with Transition */}
      <div className="w-4/5 xl:w-[45%] bg-white mx-auto mt-10">
        <AnimatePresence mode="wait">
          <div key={sections[currentSection].id} className="h-full w-full">
            {renderSectionContent()}
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AutoInsurancePage;
