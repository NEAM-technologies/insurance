// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useAutoInsuranceStore from "@/store/useAutoInsuranceStore";
import { useAlertStore } from "@/store/useAlertStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  FaChevronDown,
  FaCheckCircle,
  FaHome,
  FaRegCircle,
} from "react-icons/fa";
import { MdMilitaryTech, MdShield } from "react-icons/md";

// data
import { homeInsuranceCoverage, insuranceCompanies, usStates } from "@/data";

type FinalDetailsProps = {
  completeSection: (section: string) => void;
};

const FinalDetails: React.FC<FinalDetailsProps> = ({ completeSection }) => {
  const { driverForm, finalDetailsForm, setFinalDetailsForm } =
    useAutoInsuranceStore();
  const { icon: Icon, setAlert } = useAlertStore();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({
    state: {
      isOpen: false,
      selectedOption: "Select a State",
    },
    insuredCompany: {
      isOpen: false,
      selectedOption: "Select Company",
    },
  });

  const toggleDropdown = (field: "state" | "insuredCompany") => {
    setDropdownState((prev) => {
      const newState = {
        state: { ...prev.state, isOpen: false },
        insuredCompany: { ...prev.insuredCompany, isOpen: false },
      };

      newState[field] = {
        isOpen: !prev[field].isOpen,
        selectedOption: prev[field].selectedOption,
      };

      return newState;
    });
  };

  const handleOptionClick = (
    field: "state" | "insuredCompany",
    option: string
  ) => {
    setDropdownState((prev) => ({
      ...prev,
      [field]: { isOpen: false, selectedOption: option },
    }));
    handleInputChange({ field, value: option });
  };

  const validateNoInsurance = () => {
    const requiredFields: (keyof FinalDetailsFormData)[] = [
      "coverageNeed",
      "militaryService",
      "homeOwnership",
      "homeType",
      "street",
      "city",
      "state",
      "zip",
    ];

    return requiredFields.every(
      (field) => finalDetailsForm[field]?.trim() !== ""
    );
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { field: keyof FinalDetailsFormData; value: string }
  ) => {
    let field: keyof FinalDetailsFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof FinalDetailsFormData;
      value = e.target.value;
    }

    // Update the form state
    setFinalDetailsForm({ ...finalDetailsForm, [field]: value });

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

      // Check if the target click is outside of any of the dropdowns
      if (
        !target.closest(".dropdownCompany") &&
        !target.closest(".dropdownState")
      ) {
        // Close the dropdowns by setting all `isOpen` states to false
        setDropdownState((prev) => ({
          state: { ...prev.state, isOpen: false },
          insuredCompany: { ...prev.insuredCompany, isOpen: false },
        }));
      }
    };

    document.addEventListener("click", closePopupsOnOutsideClick);

    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setDropdownState]);

  return (
    <div className="space-y-12">
      {/* Currently Insured Question */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
          Do you currently have car insurance?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["Yes", "No"].map((option, index) => (
            <div
              key={index}
              className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                finalDetailsForm.currentlyCarInsured === option
                  ? "bg-red-500 text-white"
                  : "bg-[#edededac]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
              onClick={() => {
                handleInputChange({
                  field: "currentlyCarInsured",
                  value: option,
                });
                if (finalDetailsForm.currentlyCarInsured !== "Yes") {
                  setAlert("info", "Insured discount applied", MdShield);
                }
              }}
            >
              {finalDetailsForm.currentlyCarInsured === option ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              {option}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Insured Company */}
      {finalDetailsForm.currentlyCarInsured === "Yes" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
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
              onClick={() => toggleDropdown("insuredCompany")}
              className={`dropdownCompany h-16 w-full flex items-center justify-between md:text-lg ${
                dropdownState["insuredCompany"].isOpen ||
                finalDetailsForm.insuredCompany
                  ? "text-black"
                  : "text-gray-400"
              } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
            >
              {finalDetailsForm.insuredCompany
                ? finalDetailsForm.insuredCompany
                : dropdownState["insuredCompany"].selectedOption}
              <FaChevronDown
                size={18}
                className={`${
                  dropdownState["insuredCompany"].isOpen ||
                  finalDetailsForm.insuredCompany
                    ? "text-black"
                    : "text-gray-400"
                }`}
              />
            </button>
            {dropdownState["insuredCompany"].isOpen && (
              <div className="dropdownCompany custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg overflow-y-scroll">
                {insuranceCompanies.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleOptionClick("insuredCompany", option.title)
                    }
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

      {/* Coverage Need */}
      {finalDetailsForm.currentlyCarInsured === "No" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            How much coverage do you need?
          </p>

          <p className="text-gray-500 text-center mt-4">
            Most drivers select Standard, You can change it later if you want.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
            {homeInsuranceCoverage.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  handleInputChange({
                    field: "coverageNeed",
                    value: option.name,
                  });
                }}
                className={`group w-full flex items-start justify-center ${
                  finalDetailsForm.coverageNeed === option.name
                    ? "bg-red-500 text-white"
                    : "bg-[#edededac]"
                } border border-slate-200 rounded-lg shadow-md hover:bg-red-500 hover:text-white`}
              >
                <div className="pl-2 py-5">
                  {finalDetailsForm.coverageNeed === option.name ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <FaRegCircle size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mx-2 pt-3 pb-2 px-1 border-b border-gray-400">
                    <div className="text-lg sm:text-xl font-raleway">
                      {option.name}
                      <span
                        className={`group text-xl sm:text-2xl ${
                          finalDetailsForm.coverageNeed === option.name
                            ? "text-white"
                            : "text-red-700"
                        }  group-hover:text-white ml-2`}
                      >
                        {option.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start px-2 py-4">
                    <h5 className="md:text-lg font-semibold mb-2">
                      Bodily Injury:{" "}
                      <span className="font-normal">{option.bodilyInjury}</span>
                    </h5>
                    <p className="md:text-lg font-semibold">
                      Property Damage:{" "}
                      <span className="font-normal">
                        {option.propertyDamage}
                      </span>
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Military Status */}
      {(finalDetailsForm.currentlyCarInsured === "No" &&
        finalDetailsForm.coverageNeed) ||
      (finalDetailsForm.currentlyCarInsured === "Yes" &&
        finalDetailsForm.insuredCompany) ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            Have you or anyone in your family served in the military?
          </p>
          <p className="text-gray-500 text-center mt-4">
            Some insurance companies offer military discounts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
            {["Yes", "No"].map((option, index) => (
              <div
                key={index}
                className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                  finalDetailsForm.militaryService === option
                    ? "bg-red-500 text-white"
                    : "bg-[#edededac]"
                } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                onClick={() => {
                  handleInputChange({
                    field: "militaryService",
                    value: option,
                  });
                  if (finalDetailsForm.militaryService !== "Yes") {
                    setAlert(
                      "info",
                      "icon Military discount is applied",
                      MdMilitaryTech
                    );
                  }
                }}
              >
                {finalDetailsForm.militaryService === option ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaRegCircle size={20} />
                )}
                {option}
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Home Ownership */}
      {(finalDetailsForm.currentlyCarInsured === "No" &&
        finalDetailsForm.coverageNeed) ||
      (finalDetailsForm.currentlyCarInsured === "Yes" &&
        finalDetailsForm.insuredCompany &&
        finalDetailsForm.militaryService) ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            Do you own or rent your home?
          </p>
          <p className="text-gray-500 text-center mt-4">
            Home owners usually need more coverage than renters
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
            {["Own", "Rent"].map((option, index) => (
              <div
                key={index}
                className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                  finalDetailsForm.homeOwnership === option
                    ? "bg-red-500 text-white"
                    : "bg-[#edededac]"
                } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                onClick={() => {
                  handleInputChange({
                    field: "homeOwnership",
                    value: option,
                  });
                  if (finalDetailsForm.homeOwnership !== "Own") {
                    setAlert("info", "Homeowner discount applied", FaHome);
                  }
                }}
              >
                {finalDetailsForm.homeOwnership === option ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaRegCircle size={20} />
                )}
                {option}
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {(finalDetailsForm.currentlyCarInsured === "No" &&
        finalDetailsForm.coverageNeed) ||
      (finalDetailsForm.currentlyCarInsured === "Yes" &&
        finalDetailsForm.insuredCompany &&
        finalDetailsForm.militaryService &&
        finalDetailsForm.homeOwnership) ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            What type of home do you live in?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
            {[
              "Single Family Home",
              "Townhome",
              "Multi Family Home",
              "Condominium",
              "Duplex",
              "Mobile Home",
              "Apartment",
              "Tiny Homes",
            ].map((option, index) => (
              <div
                key={index}
                className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                  finalDetailsForm.homeType === option
                    ? "bg-red-500 text-white"
                    : "bg-[#edededac]"
                } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                onClick={() =>
                  handleInputChange({ field: "homeType", value: option })
                }
              >
                {finalDetailsForm.homeType === option ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaRegCircle size={20} />
                )}
                {option}
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {(finalDetailsForm.currentlyCarInsured === "No" &&
        finalDetailsForm.coverageNeed) ||
      (finalDetailsForm.currentlyCarInsured === "Yes" &&
        finalDetailsForm.insuredCompany &&
        finalDetailsForm.militaryService &&
        finalDetailsForm.homeOwnership &&
        finalDetailsForm.homeType) ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            Last question {driverForm.d1FirstName}, what is your address?
          </p>
          <p className="text-gray-500 text-center mt-4">
            Insurance rates vary depending on where you live.
          </p>
          <div id="homeType" className="space-y-5 mx-auto mt-8">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
              <input
                type="text"
                name="street"
                value={finalDetailsForm.street}
                onChange={handleInputChange}
                placeholder="Street"
                className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
              <input
                type="text"
                name="unit"
                value={finalDetailsForm.unit}
                onChange={handleInputChange}
                placeholder="Unit #"
                className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="city"
              value={finalDetailsForm.city}
              onChange={handleInputChange}
              placeholder="City"
              className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
            />
            <div className="flex items-center gap-8">
              <div className="relative w-1/2">
                <button
                  onClick={() => toggleDropdown("state")}
                  className={`dropdownState h-14 w-full flex items-center justify-between text-sm md:text-lg ${
                    dropdownState["state"].isOpen || finalDetailsForm.state
                      ? "text-black"
                      : "text-gray-400"
                  } p-4 bg-white border border-black/20 rounded-lg shadow-md`}
                >
                  {finalDetailsForm.state
                    ? finalDetailsForm.state
                    : dropdownState["state"].selectedOption}
                  <FaChevronDown
                    size={18}
                    className={`${
                      dropdownState["state"].isOpen || finalDetailsForm.state
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                {dropdownState["state"].isOpen && (
                  <div className="dropdownState custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg overflow-y-scroll">
                    {usStates
                      .sort((a, b) =>
                        a.toLowerCase().localeCompare(b.toLowerCase())
                      )
                      .map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick("state", option)}
                          className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                name="zip"
                value={finalDetailsForm.zip}
                onChange={(e) => {
                  const { value } = e.target;
                  // Ensure only numbers and limit to 5 characters
                  if (/^\d{0,5}$/.test(value)) {
                    handleInputChange(e); // Call your existing handleInputChange function
                  }
                }}
                placeholder="Zip Code"
                inputMode="numeric" // Show numeric keypad on mobile
                maxLength={5} // Limit to 5 characters
                pattern="\d*" // Accept only digits
                className="h-14 w-1/2 text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
      ) : null}

      {(finalDetailsForm.currentlyCarInsured === "No" &&
        validateNoInsurance()) ||
      (finalDetailsForm.currentlyCarInsured === "Yes" &&
        validateNoInsurance() &&
        finalDetailsForm.insuredCompany) ? (
        <div id="costToRebuildHome" className="w-full flex justify-center">
          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            onClick={() => completeSection("finalDetails")}
            className="w-3/4 sm:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg shadow-md hover:bg-red-700 hover:scale-95"
          >
            Submit
          </motion.button>
        </div>
      ) : null}
    </div>
  );
};

export default FinalDetails;
