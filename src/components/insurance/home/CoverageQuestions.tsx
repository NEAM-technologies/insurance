// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useHomeOwnerStore from "@/store/useHomeInsuranceStore";
import { useAlertStore } from "@/store/useAlertStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdShield } from "react-icons/md";
import { MdCalculate } from "react-icons/md";

// data
import { insuranceCompanies } from "@/data";

type CoverageQuestionsProps = {
  completeSection: (section: string) => void;
};

const CoverageQuestions: React.FC<CoverageQuestionsProps> = ({
  completeSection,
}) => {
  const { homeForm, ownerForm, coverageForm, setCoverageForm } =
    useHomeOwnerStore();
  const { icon: Icon, setAlert } = useAlertStore();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Select your insurance company"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleInputChange({ field: "insuredCompany", value: option });
    setIsOpen(false);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { field: keyof CoverageFormData; value: string }
  ) => {
    let field: keyof CoverageFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof CoverageFormData;
      value = e.target.value;
    }

    // Update the form state
    setCoverageForm({ ...coverageForm, [field]: value });

    if (field === "currentlyInsured") {
      if (value === "No") {
        if (window.scrollY < 500) {
          window.scrollBy({
            top: 400,
            behavior: "smooth",
          });
        }
        return;
      }
    }

    const scrollToElement = () => {
      const element = document.getElementById(field);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const windowHeight = window.innerHeight;

        // Check if the element is not in the center of the screen
        if (
          elementTop < windowHeight / 4 ||
          elementBottom > (windowHeight * 3) / 4
        ) {
          // Scroll to the element if it's not centered
          window.scrollBy({
            top: rect.top - windowHeight / 2 + (rect.height / 2 - 150),
            behavior: "smooth",
          });
        }
      }
    };

    // Create an observer to detect when the element is rendered
    const observer = new MutationObserver(() => {
      const element = document.getElementById(field);
      if (element) {
        observer.disconnect(); // Stop observing once the element is found
        scrollToElement(); // Trigger the scroll
      }
    });

    // Observe the DOM for changes in the body or parent element
    observer.observe(document.body, { childList: true, subtree: true });
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".selectDropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div className="w-full space-y-12">
      {/* Currently Insured Question */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
          Are you currently insured?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["Yes", "No"].map((option, index) => (
            <div
              key={index}
              className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                coverageForm.currentlyInsured === option
                  ? "bg-red-500 text-white"
                  : "bg-[#ebebeb]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
              onClick={() => {
                handleInputChange({ field: "currentlyInsured", value: option });
                if (option === "Yes") {
                  setAlert("info", "Insured discount applied", MdShield);
                }
              }}
            >
              {coverageForm.currentlyInsured === option ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              {option}
            </div>
          ))}
        </div>
      </motion.div>

      {coverageForm.currentlyInsured === "Yes" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            What company are you insured with?
          </p>
          {/* Selected Option Display */}
          <div id="currentlyInsured" className="relative w-3/5 mx-auto">
            <button
              onClick={toggleDropdown}
              className={`selectDropdown h-16 w-full flex items-center justify-between md:text-lg ${
                isOpen || coverageForm.insuredCompany
                  ? "text-black"
                  : "text-gray-400"
              } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
            >
              {selectedOption}
              <FaChevronDown
                size={18}
                className={`${
                  isOpen || coverageForm.insuredCompany
                    ? "text-black"
                    : "text-gray-400"
                }`}
              />
            </button>
            {isOpen && (
              <div className="selectDropdown custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg overflow-y-scroll">
                {insuranceCompanies.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.title)}
                    className="h-12 w-full px-4 py-2 text-sm md:text-base text-left font-semibold flex items-center gap-4 hover:bg-red-100"
                  >
                    <Image
                      src={option.imgUrl}
                      alt={option.title}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {option.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {coverageForm.insuredCompany &&
        coverageForm.currentlyInsured === "Yes" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Number of Stories Question */}
            <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
              <IoIosCheckmarkCircle
                size={28}
                color="red"
                className="hidden sm:flex mt-1"
              />
              How long have you been with Allstate?
            </p>
            <div
              id="insuredCompany"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {[
                "Less than a year",
                "1-2 years",
                "2-3 years",
                "3-5 years",
                "5-10 years",
                "10+ years",
              ].map((option, index) => (
                <div
                  key={index}
                  className={`h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                    coverageForm.yearsWithCompany === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                  onClick={() =>
                    handleInputChange({
                      field: "yearsWithCompany",
                      value: option,
                    })
                  }
                >
                  {coverageForm.yearsWithCompany === option ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <FaRegCircle size={20} />
                  )}
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        )}

      {coverageForm.yearsWithCompany &&
        coverageForm.insuredCompany &&
        coverageForm.currentlyInsured === "Yes" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Number of Stories Question */}
            <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
              <IoIosCheckmarkCircle
                size={28}
                color="red"
                className="hidden sm:flex mt-1"
              />
              When does your policy expire?
            </p>
            <p className="text-gray-500 text-center mt-4">
              It&apos;s ok to guess if you aren&apos;t sure.
            </p>
            <div
              id="yearsWithCompany"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {[
                "Not Sure",
                "A Few Days",
                "2 weeks",
                "1 Month",
                "2 Months",
                "3 Months",
                "4-5 Months",
                "5 Months +",
              ].map((option, index) => (
                <div
                  key={index}
                  className={`h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                    coverageForm.policyExpires === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                  onClick={() =>
                    handleInputChange({
                      field: "policyExpires",
                      value: option,
                    })
                  }
                >
                  {coverageForm.policyExpires === option ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <FaRegCircle size={20} />
                  )}
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        )}

      {/* Rebuild Cost Question */}
      {(coverageForm.currentlyInsured === "No" ||
        (coverageForm.policyExpires &&
          coverageForm.yearsWithCompany &&
          coverageForm.insuredCompany &&
          coverageForm.currentlyInsured === "Yes")) && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            Last question {ownerForm.firstName}, how much would it cost to
            rebuild your home?
          </p>
          <p className="w-10/12 text-gray-500 md:text-center md:mx-auto mt-4">
            Rebuild cost is different from market value. If you&nbsp;re not sure
            we recommend using $150 per sq ft.
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mt-6">
              {errorMessage}
            </p>
          )}
          <div
            id="policyExpires"
            className="relative h-14 w-3/5 flex items-center gap-1 font-bold mx-auto mt-8 text-xl p-4 border border-black/20 rounded-lg shadow-md"
          >
            $
            <input
              type="text"
              name="costToRebuildHome"
              value={
                coverageForm.costToRebuildHome
                  ? new Intl.NumberFormat("en-US").format(
                      Number(coverageForm.costToRebuildHome.replace(/,/g, ""))
                    )
                  : ""
              }
              onChange={(e) => {
                const input = e.target.value.replace(/,/g, ""); // Remove commas for validation
                if (/^\d*$/.test(input)) {
                  // Validate that input is only numbers
                  setCoverageForm({
                    ...coverageForm,
                    costToRebuildHome: input,
                  });
                  setErrorMessage(""); // Clear error message if input is valid
                } else {
                  setErrorMessage("Input must be numeric");
                }
              }}
              placeholder="Rebuilt Cost"
              className="h-full w-full text-base md:text-xl font-semibold tracking-wider placeholder:text-base md:placeholder:text-lg placeholder:font-normal focus:outline-none"
            />
            {!coverageForm.costToRebuildHome && (
              <button
                onClick={() => {
                  const rebuildCost = new Intl.NumberFormat("en-US").format(
                    Number(homeForm.squareFootage) * 150
                  );
                  setCoverageForm({
                    ...coverageForm,
                    costToRebuildHome: rebuildCost,
                  });
                }}
                className="absolute group right-4 md:right-10 xl:right-6 text-gray-400 font-medium hover:scale-[98%]"
              >
                <MdCalculate
                  size={32}
                  color="#9ca3af"
                  className="animate-pulse"
                />
                <div className="absolute -top-8 right-0 w-40 hidden group-hover:flex bg-gray-600 text-sm text-white font-medium px-3 py-1 rounded shadow-md">
                  Calculate rebuild cost
                </div>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {coverageForm.costToRebuildHome.length > 2 &&
        coverageForm.policyExpires &&
        coverageForm.yearsWithCompany &&
        coverageForm.insuredCompany &&
        coverageForm.currentlyInsured === "Yes" && (
          <div id="costToRebuildHome" className="w-full flex justify-center">
            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              onClick={() => completeSection("coverage")}
              className="w-3/4 sm:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg hover:bg-red-700 hover:scale-95"
            >
              Submit
            </motion.button>
          </div>
        )}

      {coverageForm.costToRebuildHome.length > 2 &&
        coverageForm.currentlyInsured === "No" && (
          <div id="costToRebuildHome" className="w-full flex justify-center">
            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              onClick={() => completeSection("coverage")}
              className="w-3/4 sm:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg hover:bg-red-700 hover:scale-95"
            >
              Submit
            </motion.button>
          </div>
        )}
    </div>
  );
};

export default CoverageQuestions;
