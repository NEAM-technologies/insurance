// react/nextjs components
import React, { useEffect, useState } from "react";

// framer-motion import
import { motion } from "framer-motion";

// date components
import { DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleInputChange({ field: "occupation", value: option });
    setIsOpen(false);
  };

  // Date validation function for DOB and Date of Ticket
  const validateDate = (selectedDate: any, type: string) => {
    const currentYear = new Date().getFullYear();

    const selected =
      selectedDate && selectedDate instanceof Date
        ? selectedDate
        : selectedDate
        ? selectedDate.toDate(getLocalTimeZone())
        : null;

    // For Date of Birth validation (must be at least 18 years ago)
    if (type === "dob") {
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(currentYear - 18, 0, 1);

      if (!selected || isNaN(selected.getTime())) {
        return "Please select a valid date.";
      }

      if (selected > eighteenYearsAgo) {
        return "Date must be at least 18 years ago";
      }
    }
    return null; // No errors
  };

  // Handle Date Change for DOB and Date of Ticket
  const handleDateChange = (
    date: any,
    type: string,
    driverForm: any,
    handleInputChange: any
  ) => {
    setErrorMessage(validateDate(date, type));
    const errorMessage = validateDate(date, type);
    if (errorMessage) {
      return;
    }

    // Update the appropriate field in home insurance form
    if (type === "dob") {
      // Update DOB for the driver form (no index needed)
      const updatedDriverForm = { ...driverForm, dobDate: date.toString() };
      handleInputChange({
        field: "dobDate",
        value: updatedDriverForm.dobDate,
      });
    }
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
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            What is your name?
          </p>
          <p className="text-gray-500 text-center mt-4">
            The more information we have, the more tailored your quotes can be
          </p>
          <div className="w-full md:w-3/5 flex flex-col items-center gap-6 mx-auto mt-8">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={ownerForm.firstName}
              onChange={handleInputChange}
              className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={ownerForm.lastName}
              onChange={handleInputChange}
              className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
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
          <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
            <IoIosCheckmarkCircle
              size={28}
              color="red"
              className="hidden sm:flex mt-1"
            />
            What is your date of birth?
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mt-6">
              {errorMessage}
            </p>
          )}

          <div
            id="lastName"
            className="h-full w-full md:w-3/5 text-xl mx-auto mt-8 pb-1 rounded-xl shadow-md"
          >
            <DatePicker
              className="h-full w-full text-xl mx-auto"
              label="Date of birth"
              isInvalid={errorMessage === "Date must be at least 18 years ago"}
              value={
                ownerForm["dobDate"] ? parseDate(ownerForm["dobDate"]) : null
              }
              onChange={(date) =>
                handleDateChange(date, "dob", ownerForm, handleInputChange)
              }
            />
          </div>
        </motion.div>
      )}

      {/* Gender */}
      {ownerForm["dobDate"] &&
        validateDate(parseDate(ownerForm["dobDate"]), "dob") === null &&
        ownerForm.firstName &&
        ownerForm.lastName && (
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
              What is your gender?
            </p>
            <div
              id="dobDate"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {["Male", "Female", "Non-binary", "Prefer not to say"].map(
                (option, index) => (
                  <div
                    key={index}
                    className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                      ownerForm.gender === option
                        ? "bg-red-500 text-white"
                        : "bg-[#ebebeb]"
                    } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
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
        ownerForm["dobDate"] &&
        validateDate(parseDate(ownerForm["dobDate"]), "dob") === null &&
        ownerForm.firstName &&
        ownerForm.lastName && (
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
              Are you married?
            </p>
            <div
              id="gender"
              className="grid grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {["Yes", "No"].map((option, index) => (
                <div
                  key={index}
                  className={`h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                    ownerForm.maritalStatus === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                  onClick={() => {
                    handleInputChange({
                      field: "maritalStatus",
                      value: option,
                    });
                    if (option === "Yes" && ownerForm.maritalStatus !== "Yes") {
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
        ownerForm["dobDate"] &&
        validateDate(parseDate(ownerForm["dobDate"]), "dob") === null &&
        ownerForm.firstName &&
        ownerForm.lastName && (
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
              What is your education level?
            </p>
            <div
              id="maritalStatus"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
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
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                  onClick={() => {
                    handleInputChange({
                      field: "educationLevel",
                      value: option,
                    });
                    if (
                      degreeOptions.includes(option) &&
                      ownerForm.educationLevel !== option
                    ) {
                      setAlert(
                        "info",
                        "College degree discount applied",
                        IoSchool
                      );
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
        ownerForm["dobDate"] &&
        validateDate(parseDate(ownerForm["dobDate"]), "dob") === null &&
        ownerForm.firstName &&
        ownerForm.lastName && (
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
              What is your occupation?
            </p>
            {/* Selected Option Display */}
            <div id="educationLevel" className="relative w-full md:w-3/5 mx-auto">
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
        ownerForm["dobDate"] &&
        validateDate(parseDate(ownerForm["dobDate"]), "dob") === null &&
        ownerForm.firstName &&
        ownerForm.lastName && (
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
              What is your credit score?
            </p>
            <div
              id="occupation"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
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
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                  onClick={() => {
                    handleInputChange({ field: "creditScore", value: option });
                    if (
                      goodCreditScore.includes(option) &&
                      ownerForm.creditScore !== option
                    ) {
                      setAlert(
                        "info",
                        "Good credit discount applied",
                        MdOutlineCreditScore
                      );
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
        ownerForm["dobDate"] &&
        validateDate(parseDate(ownerForm["dobDate"]), "dob") === null &&
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
              className="w-3/4 sm:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg hover:bg-red-700 hover:scale-95 shadow-md"
            >
              Final Step
            </motion.button>
          </div>
        )}
    </div>
  );
};

export default OwnerQuestions;
