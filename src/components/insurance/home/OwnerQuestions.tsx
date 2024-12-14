// react/nextjs components
import React, { useEffect, useState } from "react";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useHomeOwnerStore from "@/store/useHomeInsuranceStore";
import { useAlertStore } from "@/store/useAlertStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaCheckCircle, FaRegCircle } from "react-icons/fa";

// data
import { occupationOptions } from "@/data";

// icons
import { GiLovers } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdOutlineCreditScore } from "react-icons/md";

type OwnerQuestionsProps = {
  completeSection: (section: string) => void;
};

const degreeOptions = [
  "Associate Degree",
  "Bachelors Degree",
  "Masters Degree",
];

const goodCreditScore = ["Excellent (700-850)", "Good (600-700)"];

const OwnerQuestions: React.FC<OwnerQuestionsProps> = ({ completeSection }) => {
  const { ownerForm, setOwnerForm } = useHomeOwnerStore();
  const { icon: Icon, setAlert } = useAlertStore();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Select your occupation"
  );

  const currentYear = new Date().getFullYear();
  const eighteenYearsAgo = currentYear - 18;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleInputChange({ field: "occupation", value: option });
    setIsOpen(false);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { field: keyof OwnerFormData; value: string }
  ) => {
    let field: keyof OwnerFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof OwnerFormData;
      value = e.target.value;
    }

    // Update the form state
    setOwnerForm({ ...ownerForm, [field]: value });

    if (field === "lastName") {
      if (window.scrollY < 500) {
        window.scrollBy({
          top: 300,
          behavior: "smooth",
        });
      }
      return;
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
    <div className="space-y-12">
      {/* Name Question */}
      {
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        >
        <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center md:text-nowrap font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
            What is your name?
          </p>
          <p className="text-gray-500 text-center mt-4">
            The more we know about you, the more precise and tailored our quotes
            can be.
          </p>
          <div className="flex flex-col items-center gap-6 mt-8">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={ownerForm.firstName}
              onChange={handleInputChange}
                className="h-14 w-5/6 md:w-2/3 text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={ownerForm.lastName}
              onChange={handleInputChange}
                className="h-14 w-5/6 md:w-2/3 text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
            />
          </div>
        </motion.div>
      }

      {/* Date of Birth */}
      {ownerForm.firstName && ownerForm.lastName && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
        <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center md:text-nowrap font-raleway mx-auto">
        <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
            What is your date of birth?
          </p>

          <p
            className={`${
              Number(ownerForm.dobYear) >= 1900 &&
              Number(ownerForm.dobYear) <= eighteenYearsAgo
                ? "hidden"
                : ""
            } text-red-500 text-sm text-center mt-6`}
          >
            {errorMessage &&
            (ownerForm.dobMonth || ownerForm.dobDay || ownerForm.dobYear)
              ? errorMessage
              : "Date values must be numeric."}
          </p>

          <div
            id="dateofBirth"
            className="h-14 md:w-96 flex items-center justify-center mx-auto mt-8 p-4 border border-black/20 rounded-lg shadow-md"
          >
            {/* Month Input */}
            <input
              type="text"
              name="dobMonth"
              value={ownerForm.dobMonth}
              onChange={(e) => {
                const { value } = e.target;
                // Allow input only if the value is numeric and between 1 and 12
                if (/^\d{0,2}$/.test(value)) {
                  const numericValue = Number(value);
                  // Check if the value is between 1 and 12
                  if (
                    value === "" ||
                    (numericValue >= 1 && numericValue <= 12)
                  ) {
                    handleInputChange(e); // Valid input, update form state
                  } else {
                    setErrorMessage("Month must be between 1 and 12.");
                  }
                }
              }}
              placeholder="MM"
              className="h-full w-1/3 text-sm md:text-lg text-center focus:outline-none"
            />
            <span className="block text-3xl text-red-700">/</span>
            {/* Day Input */}
            <input
              type="text"
              name="dobDay"
              value={ownerForm.dobDay}
              onChange={(e) => {
                const { value } = e.target;
                // Allow input only if the value is numeric and between 1 and 12
                if (/^\d{0,2}$/.test(value)) {
                  const numericValue = Number(value);
                  // Check if the value is between 1 and 12
                  if (
                    value === "" ||
                    (numericValue >= 1 && numericValue <= 31)
                  ) {
                    handleInputChange(e); // Valid input, update form state
                  } else {
                    setErrorMessage("Month must be between 1 and 31.");
                  }
                }
              }}
              placeholder="DD"
              className="h-full w-1/3 text-sm md:text-lg text-center focus:outline-none"
            />
            <span className="block text-3xl text-red-700">/</span>
            {/* Year Input */}
            <input
              type="text"
              name="dobYear"
              value={ownerForm.dobYear}
              onChange={(e) => {
                const { value } = e.target;
                // Allow input if it's a valid partial year (up to 4 digits) or empty
                if (/^\d{0,4}$/.test(value)) {
                  // Only perform range checks when the input is a complete 4-digit year
                  if (value.length === 4) {
                    if (Number(value) <= eighteenYearsAgo) {
                      handleInputChange(e); // Valid 4-digit year within range
                    }
                  } else {
                    setErrorMessage("User must be at least 18 years old.");
                    handleInputChange(e); // Allow partial input (less than 4 digits)
                  }
                }
              }}
              placeholder="YYYY"
              className="h-full w-1/3 text-sm md:text-lg text-center focus:outline-none"
            />
          </div>
        </motion.div>
      )}

      {/* Gender */}
      {ownerForm.dobMonth &&
        ownerForm.dobDay &&
        Number(ownerForm.dobYear) >= 1900 &&
        Number(ownerForm.dobYear) <= eighteenYearsAgo &&
        ownerForm.firstName &&
        ownerForm.lastName && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
        <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl text-center md:text-nowrap font-raleway mx-auto">
        <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
              What is your gender?
            </p>
            <div
              id="dobYear"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto mt-8">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map(
                (option, index) => (
                  <div
                    key={index}
                    className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                      ownerForm.gender === option
                        ? "bg-red-500 text-white"
                        : "bg-[#ebebeb]"
                    } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
                    onClick={() =>
                      handleInputChange({ field: "gender", value: option })
                    }
                  >
                    {ownerForm.gender === option ? (
                      <FaCheckCircle size={20} />
                    ) : (
                      <FaRegCircle size={20} />
                    )}
                    {option}
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}

      {/* Marital Status */}
      {ownerForm.gender &&
        ownerForm.dobMonth &&
        ownerForm.dobDay &&
        Number(ownerForm.dobYear) >= 1900 &&
        Number(ownerForm.dobYear) <= eighteenYearsAgo &&
        ownerForm.firstName &&
        ownerForm.lastName && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
        <p className="flex items-start justify-center gap-2 text-xl md:text-2xl text-center md:text-nowrap font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
              Are you married?
            </p>
            <div className="grid grid-cols-2 gap-4 w-full mx-auto mt-8">
              {["Yes", "No"].map((option, index) => (
                <div
                  key={index}
                  className={`h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                    ownerForm.maritalStatus === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
                  onClick={() => {
                    handleInputChange({
                      field: "maritalStatus",
                      value: option,
                    });
                    if (option === "Yes") {
                      setAlert("info", "Marriage discount applied", GiLovers);
                    }
                  }}
                >
                  {ownerForm.maritalStatus === option ? (
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
        
      {/* Education Level */}
      {ownerForm.maritalStatus &&
        ownerForm.gender &&
        ownerForm.dobMonth &&
        ownerForm.dobDay &&
        Number(ownerForm.dobYear) >= 1900 &&
        Number(ownerForm.dobYear) <= eighteenYearsAgo &&
        ownerForm.firstName &&
        ownerForm.lastName && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
        <p className="flex items-start justify-center gap-2 text-xl md:text-2xl text-center md:text-nowrap font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
              What is your education level?
            </p>
            <div
              id="maritalStatus"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {[
                "Less than High School",
                "Some or No High School",
                "High School Diploma",
                "Some College",
                "Associate Degree",
                "Bachelors Degree",
                "Masters Degree",
                "Doctorate Degree",
              ].map((option, index) => (
                <div
                  key={index}
                  className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                    ownerForm.educationLevel === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
                  onClick={() => {
                    handleInputChange({
                      field: "educationLevel",
                      value: option,
                    });
                    if (degreeOptions.includes(option)) {
                      setAlert("info", "College degree discount applied", IoSchool);
                    }
                  }}
                >
                  {ownerForm.educationLevel === option ? (
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

      {/* Marital Status */}
      {ownerForm.maritalStatus &&
        ownerForm.gender &&
        ownerForm.dobMonth &&
        ownerForm.dobDay &&
        Number(ownerForm.dobYear) >= 1900 &&
        Number(ownerForm.dobYear) <= eighteenYearsAgo &&
        ownerForm.firstName &&
        ownerForm.lastName && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
        <p className="flex items-start justify-center gap-2 text-xl md:text-2xl text-center md:text-nowrap font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
              What is your occupation?
            </p>
            {/* Selected Option Display */}
            <div id="educationLevel" className="relative w-80 md:w-96">
              <button
                onClick={toggleDropdown}
                className={`selectDropdown h-16 w-full flex items-center justify-between text-lg ${
                  isOpen || ownerForm.occupation
                    ? "text-black"
                    : "text-gray-400"
                } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
              >
                {selectedOption}
                <FaChevronDown
                  size={18}
                  className={`${
                    isOpen || ownerForm.occupation
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="selectDropdown custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg overflow-y-scroll">
                  {occupationOptions
                    .sort((a, b) =>
                      a.toLowerCase().localeCompare(b.toLowerCase())
                    )
                    .map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                      >
                        {option}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

      {/* Credit Score */}
      {ownerForm.occupation &&
        ownerForm.maritalStatus &&
        ownerForm.gender &&
        ownerForm.dobMonth &&
        ownerForm.dobDay &&
        Number(ownerForm.dobYear) >= 1900 &&
        Number(ownerForm.dobYear) <= eighteenYearsAgo &&
        ownerForm.firstName &&
        ownerForm.lastName && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
        <p className="flex items-start justify-center gap-2 text-xl md:text-2xl text-center md:text-nowrap font-raleway mx-auto">
          <IoIosCheckmarkCircle
            size={28}
            color="red"
            className="hidden sm:flex mt-1"
          />
              What is your credit score?
            </p>
            <div
              id="occupation"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {[
                "Excellent (700-850)",
                "Good (600-700)",
                "Average (400-600)",
                "Poor (300-400)",
              ].map((option, index) => (
                <div
                  key={index}
                  className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                    ownerForm.creditScore === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
                  onClick={() => {
                    handleInputChange({ field: "creditScore", value: option });
                    if (goodCreditScore.includes(option)) {
                      setAlert("info", "Good credit discount applied", MdOutlineCreditScore);
                    }
                  }}
                >
                  {ownerForm.creditScore === option ? (
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
      {ownerForm.creditScore.length > 3 &&
        ownerForm.occupation &&
        ownerForm.maritalStatus &&
        ownerForm.gender &&
        ownerForm.dobMonth &&
        ownerForm.dobDay &&
        Number(ownerForm.dobYear) >= 1900 &&
        Number(ownerForm.dobYear) <= eighteenYearsAgo &&
        ownerForm.firstName &&
        ownerForm.lastName && (
          /* Next Button */
          <div id="creditScore" className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              onClick={() => completeSection("owner")}
              className="w-3/4 md:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg hover:bg-red-700 hover:scale-95"
            >
              Final Step
            </motion.button>
          </div>
        )}
    </div>
  );
};

export default OwnerQuestions;
