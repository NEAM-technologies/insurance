// react/nextjs components
import React, { useEffect, useState } from "react";

// date components
import { DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useAutoInsuranceStore from "@/store/useAutoInsuranceStore";
import { useAlertStore } from "@/store/useAlertStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaCheckCircle, FaRegCircle } from "react-icons/fa";

// data
import {
  ancidentDetails,
  occupationOptions,
  ticketDetails,
  usStates,
} from "@/data";

// icons
import { GiLovers } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdOutlineCreditScore } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { BsPersonVideo2 } from "react-icons/bs";

type DriverQuestionsProps = {
  completeSection: (section: string) => void;
};

const degreeOptions = [
  "Associate Degree",
  "Bachelors Degree",
  "Masters Degree",
];

const goodCreditScore = ["Excellent (700-850)", "Good (600-700)"];

const DriverQuestions: React.FC<DriverQuestionsProps> = ({
  completeSection,
}) => {
  const { driverForm, setDriverForm } = useAutoInsuranceStore();
  const { icon: Icon, setAlert } = useAlertStore();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [addNewIncident, setAddNewIncident] = useState<boolean>(false);
  const [dropdownState, setDropdownState] = useState({
    d1Occupation: {
      isOpen: false,
      selectedOption: "Select your occupation",
    },
    d1Last3YAccidents: {
      isOpen: false,
      selectedOption: "Select Incident Details",
    },
    d2Occupation: {
      isOpen: false,
      selectedOption: "Select your occupation",
    },
    d2Last3YAccidents: {
      isOpen: false,
      selectedOption: "Select Incident Details",
    },
  });

  const toggleDropdown = (
    field:
      | "d1Occupation"
      | "d1Last3YAccidents"
      | "d2Occupation"
      | "d2Last3YAccidents"
  ) => {
    setDropdownState((prev) => {
      const newState = {
        d1Occupation: { ...prev.d1Occupation, isOpen: false },
        d1Last3YAccidents: { ...prev.d1Last3YAccidents, isOpen: false },
        d2Occupation: { ...prev.d2Occupation, isOpen: false },
        d2Last3YAccidents: { ...prev.d2Last3YAccidents, isOpen: false },
      };

      newState[field] = {
        isOpen: !prev[field].isOpen,
        selectedOption: prev[field].selectedOption,
      };

      return newState;
    });
  };

  const handleOptionClick = (
    field:
      | "d1Occupation"
      | "d1Last3YAccidents"
      | "d2Occupation"
      | "d2Last3YAccidents",
    option: string,
    index?: number
  ) => {
    setDropdownState((prev) => ({
      ...prev,
      [field]: { isOpen: false, selectedOption: option },
    }));

    if (field === "d1Last3YAccidents" && index !== undefined) {
      const updatedIncidents = [...driverForm.d1Last3YAccidents];
      updatedIncidents[index] = {
        ...updatedIncidents[index],
        details: option,
      };
      handleInputChange({
        field: "d1Last3YAccidents",
        value: updatedIncidents,
      });
    } else if (field === "d2Last3YAccidents" && index !== undefined) {
      const updatedIncidents = [...driverForm.d2Last3YAccidents];
      updatedIncidents[index] = {
        ...updatedIncidents[index],
        details: option,
      };
      handleInputChange({
        field: "d2Last3YAccidents",
        value: updatedIncidents,
      });
    }

    if (field === "d1Occupation") {
      handleInputChange({
        field: "d1Occupation",
        value: option,
      });
    } else if (field === "d2Occupation") {
      handleInputChange({
        field: "d2Occupation",
        value: option,
      });
    }
  };

  // Date validation function for DOB and Date of Ticket
  const validateDate = (selectedDate: any, type: string) => {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

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

    // For Date of Ticket validation (must be within the last 3 years)
    if (type !== "dob") {
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(currentYear - 3, 0, 1);

      if (!selected || isNaN(selected.getTime())) {
        return "Please select a valid date.";
      }

      if (selected < threeYearsAgo || selected > currentDate) {
        return "Date must be within the last 3 years";
      }
    }

    return null; // No errors
  };

  // Handle Date Change for DOB and Date of Ticket
  const handleDateChange = (
    date: any,
    type: string,
    index: number | null,
    driverForm: any,
    handleInputChange: any,
    inputKey: string
  ) => {
    setErrorMessage(validateDate(date, type));
    const errorMessage = validateDate(date, type);
    if (errorMessage) {
      return;
    }

    // Update the appropriate field in driverForm
    if (type === "dob") {
      // Update DOB for the driver form (no index needed)
      const updatedDriverForm = { ...driverForm, dobDate: date.toString() };
      handleInputChange({
        field: inputKey,
        value: updatedDriverForm.dobDate,
      });
    } else if (type !== "dob" && index !== null) {
      // Update the Date of Ticket at the specific index
      const updatedIncidents = [...driverForm.d1Last3YAccidents];
      updatedIncidents[index] = {
        ...updatedIncidents[index],
        incidentDate: date.toString(),
      };
      handleInputChange({
        field: inputKey,
        value: updatedIncidents,
      });

      window.scrollTo({
        top: window.scrollY + 200,
        behavior: "smooth",
      });
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { field: keyof DriversFormData; value: string | Incident[] }
  ) => {
    let field: keyof DriversFormData;
    let value: string | Incident[];

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof DriversFormData;
      value = e.target.value;
    }
    // Update the form state
    setDriverForm({ ...driverForm, [field]: value });

    if (field === "d1LastName") {
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
    if (addNewIncident) {
      const newIncident: Incident = {
        hasIncident: "",
        type: "",
        incidentDate: "",
        details: "",
        setNewIncident: "",
      };

      // Add the new incident to the next index
      const updatedIncidents = [...driverForm.d1Last3YAccidents];
      updatedIncidents.push(newIncident);

      handleInputChange({
        field: "d1Last3YAccidents",
        value: updatedIncidents,
      });
      setAddNewIncident(false);
    }
  }, [addNewIncident]);

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the target click is outside of any of the dropdowns
      if (
        !target.closest(".dropdownOccupation1") &&
        !target.closest(".dropdownDetails1") &&
        !target.closest(".dropdownOccupation2") &&
        !target.closest(".dropdownDetails2")
      ) {
        // Close the dropdowns by setting all `isOpen` states to false
        setDropdownState((prev) => ({
          d1Occupation: { ...prev.d1Occupation, isOpen: false },
          d1Last3YAccidents: { ...prev.d1Last3YAccidents, isOpen: false },
          d2Occupation: { ...prev.d2Occupation, isOpen: false },
          d2Last3YAccidents: { ...prev.d2Last3YAccidents, isOpen: false },
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
      {[0, 2].map((_, sectionIndex) => {
        if (sectionIndex === 1 && driverForm.secondDriver !== "Yes") {
          return null;
        }

        const firstNameKey = sectionIndex === 0 ? "d1FirstName" : "d2FirstName";
        const lastNameKey = sectionIndex === 0 ? "d1LastName" : "d2LastName";
        const dobDateKey = sectionIndex === 0 ? "d1DobDate" : "d2DobDate";
        const genderKey = sectionIndex === 0 ? "d1Gender" : "d2Gender";
        const maritalStatusKey =
          sectionIndex === 0 ? "d1MaritalStatus" : "d2MaritalStatus";
        const educationLevelKey =
          sectionIndex === 0 ? "d1EducationLevel" : "d2EducationLevel";
        const occupationKey =
          sectionIndex === 0 ? "d1Occupation" : "d2Occupation";
        const creditScoreKey =
          sectionIndex === 0 ? "d1CreditScore" : "d2CreditScore";
        const licenseStatusKey =
          sectionIndex === 0 ? "d1LicenseStatus" : "d2LicenseStatus";
        const sr22CertKey = sectionIndex === 0 ? "d1SR22Cert" : "d2SR22Cert";
        const last3YAccidentsKey =
          sectionIndex === 0 ? "d1Last3YAccidents" : "d2Last3YAccidents";

        return (
          <div key={sectionIndex} className="space-y-12">
            {/* Name Question */}
            {
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
                  What is your name?
                </p>
                <p className="text-gray-500 text-center mt-4">
                  The more information we have, the more tailored your quotes
                  can be
                </p>
                <div className="w-3/5 flex flex-col items-center gap-6 mt-8 mx-auto">
                  <input
                    type="text"
                    name={firstNameKey}
                    placeholder="First Name"
                    value={driverForm[firstNameKey]}
                    onChange={handleInputChange}
                    className="h-16 w-full text-sm sm:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                  />
                  <input
                    type="text"
                    name={lastNameKey}
                    placeholder="Last Name"
                    value={driverForm[lastNameKey]}
                    onChange={handleInputChange}
                    className="h-16 w-full text-sm sm:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                  />
                </div>
              </motion.div>
            }
            {/* Date of Birth */}
            {driverForm[firstNameKey] && driverForm[lastNameKey] && (
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
                  What is your date of birth?
                </p>

                {errorMessage && (
                  <p className="text-red-500 text-sm text-center mt-6">
                    {errorMessage}
                  </p>
                )}

                <div
                  id={lastNameKey}
                  className="h-full w-3/5 text-xl mx-auto mt-8 pb-1 rounded-xl shadow-md"
                >
                  <DatePicker
                    className="h-full w-full text-xl mx-auto"
                    label="Date of birth"
                    isInvalid={
                      errorMessage === "Date must be at least 18 years ago"
                    }
                    value={
                      driverForm[dobDateKey]
                        ? parseDate(driverForm[dobDateKey])
                        : null
                    }
                    onChange={(date) =>
                      handleDateChange(
                        date,
                        "dob",
                        null,
                        driverForm,
                        handleInputChange,
                        dobDateKey
                      )
                    }
                  />
                </div>
              </motion.div>
            )}
            {/* Gender */}
            {driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    What is your gender?
                  </p>
                  <div
                    id={dobDateKey}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Male", "Female", "Non-binary", "Prefer not to say"].map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                            driverForm[genderKey] === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: genderKey,
                              value: option,
                            })
                          }
                        >
                          {driverForm[genderKey] === option ? (
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
            {driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    Are you married?
                  </p>
                  <div
                    id={genderKey}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Yes", "No"].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          driverForm[maritalStatusKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() => {
                          handleInputChange({
                            field: maritalStatusKey,
                            value: option,
                          });
                          if (option === "Yes") {
                            setAlert(
                              "info",
                              "Marriage discount applied",
                              GiLovers
                            );
                          }
                        }}
                      >
                        {driverForm[maritalStatusKey] === option ? (
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
            {driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    What is your education level?
                  </p>
                  <div
                    id={maritalStatusKey}
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
                          driverForm[educationLevelKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() => {
                          handleInputChange({
                            field: educationLevelKey,
                            value: option,
                          });
                          if (degreeOptions.includes(option)) {
                            setAlert(
                              "info",
                              "College degree discount applied",
                              IoSchool
                            );
                          }
                        }}
                      >
                        {driverForm[educationLevelKey] === option ? (
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
            {/* Occupation */}
            {driverForm[educationLevelKey] &&
              driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    What is your occupation?
                  </p>
                  <div
                    id={educationLevelKey}
                    className="relative w-3/5 mx-auto"
                  >
                    <button
                      onClick={() => toggleDropdown(occupationKey)}
                      className={`${
                        sectionIndex === 0
                          ? "dropdownOccupation1"
                          : "dropdownOccupation2"
                      } h-16 w-full flex items-center justify-between text-lg ${
                        dropdownState[occupationKey].isOpen ||
                        driverForm[occupationKey]
                          ? "text-black"
                          : "text-gray-400"
                      } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
                    >
                      {driverForm[occupationKey]
                        ? driverForm[occupationKey]
                        : dropdownState[occupationKey].selectedOption}
                      <FaChevronDown
                        size={18}
                        className={`${
                          dropdownState[occupationKey].isOpen ||
                          driverForm[occupationKey]
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    {dropdownState[occupationKey].isOpen && (
                      <div
                        className={`${
                          sectionIndex === 0
                            ? "dropdownOccupation1"
                            : "dropdownOccupation2"
                        } custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg overflow-y-scroll`}
                      >
                        {occupationOptions
                          .sort((a, b) =>
                            a.toLowerCase().localeCompare(b.toLowerCase())
                          )
                          .map((option, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleOptionClick(occupationKey, option)
                              }
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
            {driverForm[occupationKey] &&
              driverForm[educationLevelKey] &&
              driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    What is your credit score?
                  </p>
                  <div
                    id="creditScore"
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
                          driverForm[creditScoreKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() => {
                          handleInputChange({
                            field: creditScoreKey,
                            value: option,
                          });
                          if (goodCreditScore.includes(option)) {
                            setAlert(
                              "info",
                              "Good credit discount applied",
                              MdOutlineCreditScore
                            );
                          }
                        }}
                      >
                        {driverForm[creditScoreKey] === option ? (
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

            {/* License Status */}
            {driverForm[creditScoreKey] &&
              driverForm[occupationKey] &&
              driverForm[educationLevelKey] &&
              driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    What is the status of your driver&apos;s license?
                  </p>
                  <div
                    id="licenseStatus"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {[
                      "Active",
                      "Permit",
                      "Suspended",
                      "Foreign",
                      "Expired",
                      "Revoked",
                    ].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          driverForm[licenseStatusKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() =>
                          handleInputChange({
                            field: licenseStatusKey,
                            value: option,
                          })
                        }
                      >
                        {driverForm[licenseStatusKey] === option ? (
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

            {/* Require SR-22 */}
            {driverForm[licenseStatusKey] &&
              driverForm[creditScoreKey] &&
              driverForm[occupationKey] &&
              driverForm[educationLevelKey] &&
              driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    Do you require SR-22?
                  </p>

                  <p className="text-gray-500 text-center mt-4">
                    SR-22 is a certificate issued by the state that is sometimes
                    required for drivers that have a DUI or multiple incidents.
                  </p>
                  <div
                    id="sr22Cert"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Yes", "No"].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          driverForm[sr22CertKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() =>
                          handleInputChange({
                            field: sr22CertKey,
                            value: option,
                          })
                        }
                      >
                        {driverForm[sr22CertKey] === option ? (
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

            {/* Incidents in the last 3 years */}
            {driverForm[sr22CertKey] &&
              driverForm[licenseStatusKey] &&
              driverForm[creditScoreKey] &&
              driverForm[occupationKey] &&
              driverForm[educationLevelKey] &&
              driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
                <>
                  {/* Mapping over last3YAccidents */}
                  {driverForm[last3YAccidentsKey].map(
                    (incident, accidentIndex) => {
                      if (
                        accidentIndex > 0 &&
                        driverForm[last3YAccidentsKey][accidentIndex - 1]
                          .setNewIncident !== "Yes"
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={accidentIndex}
                          id="d1SR22Cert"
                          className="space-y-12"
                        >
                          {accidentIndex < 1 && (
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
                                Any Incidents in the last 3 years?
                              </p>

                              <p className="text-gray-500 text-center mt-4">
                                Such as tickets, accidents, claims, DUI, or
                                license suspension
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
                                {["Yes", "No"].map((option, idx) => (
                                  <div
                                    key={idx}
                                    className={`h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                                      driverForm[last3YAccidentsKey][
                                        accidentIndex
                                      ]?.hasIncident === option
                                        ? "bg-red-500 text-white"
                                        : "bg-[#ebebeb]"
                                    } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                                    onClick={() => {
                                      let updatedIncidents = [
                                        ...driverForm[last3YAccidentsKey],
                                      ];
                                      if (option === "Yes") {
                                        updatedIncidents[accidentIndex] = {
                                          ...updatedIncidents[accidentIndex],
                                          hasIncident: option,
                                          setNewIncident: option,
                                        };
                                        handleInputChange({
                                          field: last3YAccidentsKey,
                                          value: updatedIncidents,
                                        });
                                      } else if (option === "No") {
                                        updatedIncidents[accidentIndex] = {
                                          ...updatedIncidents[accidentIndex],
                                          hasIncident: option,
                                          type: "",
                                          incidentDate: "",
                                          details: "",
                                          setNewIncident: option,
                                        };

                                        updatedIncidents =
                                          updatedIncidents.slice(
                                            0,
                                            accidentIndex + 1
                                          );

                                        handleInputChange({
                                          field: last3YAccidentsKey,
                                          value: updatedIncidents,
                                        });

                                        if (
                                          accidentIndex < 1 &&
                                          driverForm[last3YAccidentsKey][0]
                                            .hasIncident !== "No"
                                        ) {
                                          setAlert(
                                            "info",
                                            "Safe driver discount applied",
                                            AiOutlineSafety
                                          );
                                        }
                                      }
                                    }}
                                  >
                                    {incident.hasIncident === option ? (
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
                          {/* Type of incident */}
                          {((accidentIndex < 1 &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              ?.hasIncident === "Yes") ||
                            (accidentIndex > 0 &&
                              driverForm[last3YAccidentsKey][accidentIndex - 1]
                                ?.setNewIncident === "Yes")) && (
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
                                Type of Incident
                              </p>
                              <div
                                id="AccidentsType"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                              >
                                {[
                                  "Ticket",
                                  "Accident",
                                  "Claim",
                                  "DUI",
                                  "License Suspension",
                                  "Other",
                                ].map((option, idx) => (
                                  <div
                                    key={idx}
                                    className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                                      driverForm[last3YAccidentsKey][
                                        accidentIndex
                                      ]?.type === option
                                        ? "bg-red-500 text-white"
                                        : "bg-[#ebebeb]"
                                    } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                                    onClick={() => {
                                      const updatedIncidents = [
                                        ...driverForm[last3YAccidentsKey],
                                      ];
                                      updatedIncidents[accidentIndex] = {
                                        ...updatedIncidents[accidentIndex],
                                        type: option,
                                      };
                                      handleInputChange({
                                        field: last3YAccidentsKey,
                                        value: updatedIncidents,
                                      });
                                    }}
                                  >
                                    {incident.type === option ? (
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

                          {/* Date of Incident */}
                          {((accidentIndex < 1 &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              ?.hasIncident === "Yes") ||
                            (accidentIndex > 0 &&
                              driverForm[last3YAccidentsKey][accidentIndex - 1]
                                ?.setNewIncident === "Yes")) &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              .type && (
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
                                  Date of {incident.type} Incident
                                </p>

                                {errorMessage && (
                                  <p className="text-red-500 text-sm text-center mt-6">
                                    {errorMessage}
                                  </p>
                                )}
                                <div className="relative h-full w-3/5 text-xl mx-auto mt-8 pb-1 rounded-xl shadow-md">
                                  <DatePicker
                                    className="h-full w-full text-xl mx-auto"
                                    label={`Date of ${incident.type}`}
                                    isInvalid={
                                      errorMessage ===
                                      "Date must be within the last 3 years"
                                    }
                                    value={
                                      incident.incidentDate
                                        ? parseDate(incident.incidentDate)
                                        : null
                                    }
                                    onChange={(date) =>
                                      handleDateChange(
                                        date,
                                        incident.type,
                                        accidentIndex,
                                        driverForm,
                                        handleInputChange,
                                        last3YAccidentsKey
                                      )
                                    }
                                  />
                                  <div className="absolute top-0 right-10 h-full w-[22rem]"></div>
                                </div>
                              </motion.div>
                            )}

                          {((accidentIndex < 1 &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              ?.hasIncident === "Yes") ||
                            (accidentIndex > 0 &&
                              driverForm[last3YAccidentsKey][accidentIndex - 1]
                                ?.setNewIncident === "Yes")) &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              .type &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              .incidentDate &&
                            validateDate(
                              parseDate(
                                driverForm[last3YAccidentsKey][accidentIndex]
                                  .incidentDate
                              ),
                              incident.type
                            ) === null && (
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
                                  {incident.type === "Ticket" ||
                                  incident.type === "Claim"
                                    ? `Type of ${incident.type}`
                                    : incident.type === "DUI"
                                    ? `What State was ${incident.type} in?`
                                    : incident.type === "Accident"
                                    ? "What happened in the accident?"
                                    : null}
                                </p>
                                {/* Selected Option Display */}
                                <div className="relative w-3/5 mx-auto">
                                  <button
                                    onClick={() =>
                                      toggleDropdown(last3YAccidentsKey)
                                    }
                                    className={`${
                                      sectionIndex === 0
                                        ? "dropdownDetails1"
                                        : "dropdownDetails2"
                                    } h-16 w-full flex items-center justify-between text-lg ${
                                      dropdownState[last3YAccidentsKey]
                                        .isOpen ||
                                      driverForm[last3YAccidentsKey][
                                        accidentIndex
                                      ].details
                                        ? "text-black"
                                        : "text-gray-400"
                                    } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
                                  >
                                    {driverForm[last3YAccidentsKey][
                                      accidentIndex
                                    ].details === "" ||
                                    driverForm[last3YAccidentsKey][
                                      accidentIndex
                                    ].details === null
                                      ? "Select Incident Details"
                                      : driverForm[last3YAccidentsKey][
                                          accidentIndex
                                        ].details}
                                    <FaChevronDown
                                      size={18}
                                      className={`${
                                        dropdownState[last3YAccidentsKey]
                                          .isOpen ||
                                        driverForm[last3YAccidentsKey][
                                          accidentIndex
                                        ].details
                                          ? "text-black"
                                          : "text-gray-400"
                                      }`}
                                    />
                                  </button>
                                  {dropdownState[last3YAccidentsKey].isOpen && (
                                    <div
                                      className={`${
                                        sectionIndex === 0
                                          ? "dropdownDetails1"
                                          : "dropdownDetails2"
                                      } custom-scrollbar absolute left-1/2 transform -translate-x-1/2 max-h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg overflow-y-scroll`}
                                    >
                                      {(() => {
                                        let options: string[] = [];
                                        if (
                                          incident.type === "Ticket" ||
                                          incident.type === "Claim"
                                        ) {
                                          options = ticketDetails;
                                        } else if (
                                          incident.type === "Accident"
                                        ) {
                                          options = ancidentDetails;
                                        } else if (incident.type === "DUI") {
                                          options = usStates;
                                        }

                                        return options
                                          .sort((a, b) =>
                                            a
                                              .toLowerCase()
                                              .localeCompare(b.toLowerCase())
                                          )
                                          .map((option, index) => (
                                            <button
                                              key={index}
                                              onClick={() => {
                                                handleOptionClick(
                                                  last3YAccidentsKey,
                                                  option,
                                                  accidentIndex
                                                );
                                                window.scrollTo({
                                                  top: window.scrollY + 200,
                                                  behavior: "smooth",
                                                });
                                              }}
                                              className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                                            >
                                              {option}
                                            </button>
                                          ));
                                      })()}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}

                          {((accidentIndex < 1 &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              ?.hasIncident === "Yes") ||
                            (accidentIndex > 0 &&
                              driverForm[last3YAccidentsKey][accidentIndex - 1]
                                ?.setNewIncident === "Yes")) &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              .type &&
                            driverForm[last3YAccidentsKey][accidentIndex]
                              .incidentDate &&
                            validateDate(
                              parseDate(
                                driverForm[last3YAccidentsKey][accidentIndex]
                                  .incidentDate
                              ),
                              incident.type
                            ) === null && (
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
                                  Any other incidents in the last 3 years?
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
                                  {["Yes", "No"].map((option, idx) => (
                                    <div
                                      key={idx}
                                      className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                                        driverForm[last3YAccidentsKey][
                                          accidentIndex
                                        ]?.setNewIncident === option
                                          ? "bg-red-500 text-white"
                                          : "bg-[#ebebeb]"
                                      } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                                      onClick={() => {
                                        let updatedIncidents = [
                                          ...driverForm[last3YAccidentsKey],
                                        ];
                                        if (option === "Yes") {
                                          updatedIncidents[accidentIndex] = {
                                            ...updatedIncidents[accidentIndex],
                                            hasIncident: option,
                                            setNewIncident: option,
                                          };
                                          handleInputChange({
                                            field: last3YAccidentsKey,
                                            value: updatedIncidents,
                                          });

                                          if (
                                            driverForm[last3YAccidentsKey]
                                              .length ===
                                            accidentIndex + 1
                                          ) {
                                            setAddNewIncident(true);
                                          }
                                        } else if (option === "No") {
                                          updatedIncidents[accidentIndex] = {
                                            ...updatedIncidents[accidentIndex],
                                            setNewIncident: option,
                                          };

                                          updatedIncidents =
                                            updatedIncidents.slice(
                                              0,
                                              accidentIndex + 1
                                            );

                                          handleInputChange({
                                            field: last3YAccidentsKey,
                                            value: updatedIncidents,
                                          });
                                        }
                                      }}
                                    >
                                      {incident.setNewIncident === option ? (
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
                        </div>
                      );
                    }
                  )}
                </>
              )}

            {/* Second Vehicle */}
            {sectionIndex !== 1 &&
              (driverForm[last3YAccidentsKey].length === 1
                ? driverForm[last3YAccidentsKey].some(
                    (incident) =>
                      incident.hasIncident === "No" ||
                      incident.setNewIncident === "No"
                  )
                : driverForm[last3YAccidentsKey].some(
                    (incident) => incident.setNewIncident === "No"
                  )) &&
              driverForm[sr22CertKey] &&
              driverForm[licenseStatusKey] &&
              driverForm[creditScoreKey] &&
              driverForm[occupationKey] &&
              driverForm[educationLevelKey] &&
              driverForm[maritalStatusKey] &&
              driverForm[genderKey] &&
              driverForm[dobDateKey] &&
              validateDate(parseDate(driverForm[dobDateKey]), "dob") === null &&
              driverForm[firstNameKey] &&
              driverForm[lastNameKey] && (
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
                    Want to add a second driver?
                  </p>
                  <p className="text-gray-500 text-center mt-4">
                    You can save up to 25% by having multiple vehicles on the
                    same policy
                  </p>
                  <div
                    id="SecondDriver"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Yes", "No"].map((option, idx) => (
                      <div
                        key={idx}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          driverForm.secondDriver === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() => {
                          handleInputChange({
                            field: "secondDriver",
                            value: option,
                          });
                          if (option === "Yes") {
                            setAlert(
                              "info",
                              "Multi-car discount applied",
                              BsPersonVideo2
                            );
                          }
                        }}
                      >
                        {driverForm.secondDriver === option ? (
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
          </div>
        );
      })}
      {(driverForm.secondDriver === "No" &&
        driverForm.d1Last3YAccidents.some(
          (incident) =>
            incident.hasIncident === "No" || incident.setNewIncident === "No"
        )) ||
      (driverForm.secondDriver === "Yes" &&
        driverForm.d2Last3YAccidents.some(
          (incident) =>
            incident.hasIncident === "No" || incident.setNewIncident === "No"
        )) ? (
        /* Next Button */
        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            onClick={() => completeSection("drivers")}
            className="w-3/4 md:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg shadow-md hover:bg-red-700 hover:scale-95"
          >
            Final Step
          </motion.button>
        </div>
      ) : null}
    </div>
  );
};

export default DriverQuestions;
