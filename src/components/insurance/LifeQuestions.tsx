"use client";

// react/nextjs components
import React, { useState } from "react";

// framer-motion import
import { motion } from "framer-motion";

// date components
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

// global store
import useLifeFormStore from "@/store/useLifeFormStore";

// custom components
import CompleteScreen from "@/components/insurance/CompleteScreen";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheckCircle, FaChevronDown, FaRegCircle } from "react-icons/fa";

// data
import {
  coverageAmount,
  coverageType,
  healthConditions,
  usStates,
} from "@/data";

type LifePageProps = {
  currentSection: number;
  sections: {
    name: string;
    id: string;
  }[];
};

const LifeQuestions: React.FC<LifePageProps> = ({
  currentSection,
  sections,
}) => {
  const { lifeForm, setLifeForm } = useLifeFormStore();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a state");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleInputChange({ field: "state", value: option });
    setIsOpen(false);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { field: keyof LifeFormData; value: string }
  ) => {
    let field: keyof LifeFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof LifeFormData;
      value = e.target.value;
    }

    // Update the form state
    setLifeForm({ ...lifeForm, [field]: value });
  };

  // Date validation function for DOB and Date of Ticket
  const validateDate = (selectedDate: any) => {
    const currentYear = new Date().getFullYear();

    // Ensure selectedDate is a valid Date object
    const selected =
      selectedDate && selectedDate instanceof Date
        ? selectedDate
        : selectedDate
        ? new Date(selectedDate) // Convert to Date object if not already
        : null;

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(currentYear - 18, 0, 1);

    // Ensure the selectedDate is a valid Date object before extracting the year
    const selectedYear =
      selected && !isNaN(selected.getTime()) ? selected.getFullYear() : null;

    // Ensure that the year part has at least 3 characters
    if (selectedYear && selectedYear.toString().length < 4) {
      return null; // Don't trigger validation yet if the year is less than 3 characters
    }

    // Check if the selected date is valid
    if (!selected || isNaN(selected.getTime())) {
      return "Please select a valid date.";
    }

    // Check if the selected date is at least 18 years ago
    if (selected > eighteenYearsAgo) {
      return "Date must be at least 18 years ago";
    }

    // Check if the selected year is greater than 1900
    if (selectedYear !== null && selectedYear <= 1900) {
      return "Date must be after the year 1900.";
    }
    return null; // No errors
  };

  // Handle Date Change for DOB and Date of Ticket
  const handleDateChange = (date: any) => {
    setErrorMessage(validateDate(date));
    const errorMessage = validateDate(date);
    if (errorMessage) {
      return;
    }
    const updatedForm = { ...lifeForm, dobDate: date.toString() };
    handleInputChange({
      field: "dobDate",
      value: updatedForm.dobDate,
    });
  };

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted =
      phone.length > 0
        ? `(${phone.substring(0, 3)}` +
          (phone.length > 3
            ? `) ${phone.substring(3, 6)}` +
              (phone.length > 6 ? `-${phone.substring(6, 10)}` : "")
            : "")
        : "";

    return formatted;
  };

  const toggleHealthCondition = (condition: string) => {
    useLifeFormStore.setState((prevData) => {
      const isConditionSelected =
        prevData.lifeForm.healthConditions.includes(condition);

      return {
        ...prevData,
        lifeForm: {
          ...prevData.lifeForm,
          healthConditions: isConditionSelected
            ? prevData.lifeForm.healthConditions.filter(
                (item) => item !== condition
              )
            : [...prevData.lifeForm.healthConditions, condition],
        },
      };
    });
  };

  return (
    <>
      {sections.map((section, index) => {
        if (currentSection === index) {
          return (
            <motion.div
              key={section.id}
              className="w-full flex flex-col gap-8"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.5 }}
            >
              {/* Render specific content based on section.id */}
              {section.id === "name" && (
                <>
                  <div className="h-20 w-full flex items-center gap-6">
                    <IoIosCheckmarkCircle
                      color="red"
                      className="hidden sm:flex text-2xl md:text-4xl mt-1"
                    />
                    <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                      Let&apos;s get started! What is Your Name?
                    </p>
                  </div>
                  <div className="w-full flex flex-col items-center gap-6 mt-6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={lifeForm.firstName}
                      onChange={handleInputChange}
                      className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={lifeForm.lastName}
                      onChange={handleInputChange}
                      className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                    />
                  </div>
                </>
              )}
              {section.id === "dateOfBirth" &&
                lifeForm.firstName &&
                lifeForm.lastName && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is your date of birth?
                      </p>
                    </div>
                    {errorMessage && (
                      <p className="text-red-500 text-sm text-center mt-6">
                        {errorMessage}
                      </p>
                    )}
                    <div className="w-full text-xl mt- p6b-1 rounded-xl shadow-md">
                      <DatePicker
                        size="lg"
                        radius="lg"
                        label="Date of birth"
                        isInvalid={
                          errorMessage === "Date must be at least 18 years ago"
                        }
                        value={
                          lifeForm["dobDate"]
                            ? parseDate(lifeForm["dobDate"])
                            : null
                        }
                        onChange={(date) => handleDateChange(date)}
                        className="h-full w-full text-xl"
                      />
                    </div>
                  </>
                )}

              {section.id === "gender" &&
                lifeForm.lastName &&
                lifeForm.dobDate && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is Your Gender?
                      </p>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      {["Male", "Female"].map((option, index) => (
                        <div
                          key={index}
                          className={`h-16 md:h-24 w-full flex items-center gap-3 text-2xl md:text-3xl font-semibold ${
                            lifeForm.gender === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-8 rounded-xl hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "gender",
                              value: option,
                            })
                          }
                        >
                          {lifeForm.gender === option ? (
                            <FaCheckCircle className="text-2xl md:text-3xl" />
                          ) : (
                            <FaRegCircle className="text-2xl md:text-3xl" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {section.id === "email" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is Your Email?
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-6 mt-6">
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={lifeForm.email}
                        onChange={handleInputChange}
                        className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                      />
                    </div>
                  </>
                )}

              {section.id === "phoneNumber" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is Your Phone Number?
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-6 mt-6">
                      <input
                        type="text"
                        name="phoneNumber"
                        value={lifeForm.phoneNumber}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          if (rawValue.length <= 10) {
                            setLifeForm({
                              ...lifeForm,
                              phoneNumber: formatPhoneNumber(rawValue),
                            });
                          }
                        }}
                        placeholder="(xxx) xxx-xxxx"
                        className="h-16 lg:h-20 w-full text-lg sm:text-xl md:text-2xl text-center tracking-widest p-4 border-2 rounded-lg shadow-md focus:outline-none"
                      />
                    </div>
                  </>
                )}

              {section.id === "height" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        How Tall Are You?
                      </p>
                    </div>
                    <div className="w-full flex items-center gap-6 mt-6">
                      <input
                        type="text"
                        name="feet"
                        value={lifeForm.feet}
                        onChange={handleInputChange}
                        className="h-16 lg:h-20 w-full text-lg sm:text-xl md:text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                      />
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold">
                        ft.
                      </span>
                      <input
                        type="text"
                        name="inches"
                        value={lifeForm.inches}
                        onChange={handleInputChange}
                        className="h-16 lg:h-20 w-full text-lg sm:text-xl md:text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                      />
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold">
                        in.
                      </span>
                    </div>
                  </>
                )}

              {section.id === "weight" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        How Much Do you Weigh?
                      </p>
                    </div>
                    <div className="w-full flex items-center gap-6 mt-6">
                      <input
                        type="text"
                        name="weight"
                        value={lifeForm.weight}
                        onChange={handleInputChange}
                        className="h-16 lg:h-20 w-full text-lg sm:text-xl md:text-2xl text-center tracking-widest p-4 border-2 rounded-lg shadow-md focus:outline-none"
                      />
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold">
                        lbs.
                      </span>
                    </div>
                  </>
                )}

              {section.id === "address" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is your address?
                      </p>
                    </div>
                    <div className="w-full space-y-5 ">
                      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
                        <input
                          type="text"
                          name="street"
                          value={lifeForm.street}
                          onChange={handleInputChange}
                          placeholder="Street"
                          className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                        />
                        <input
                          type="text"
                          name="unit"
                          value={lifeForm.unit}
                          onChange={handleInputChange}
                          placeholder="Unit #"
                          className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        name="city"
                        value={lifeForm.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                      />
                      <div className="flex items-center gap-8">
                        <div className="relative w-1/2">
                          <button
                            onClick={toggleDropdown}
                            className={`selectDropdown h-14 w-full flex items-center justify-between text-sm md:text-lg ${
                              isOpen || lifeForm.state
                                ? "text-black"
                                : "text-gray-400"
                            } p-4 bg-white border border-black/20 rounded-lg shadow-md`}
                          >
                            {lifeForm.state ? lifeForm.state : selectedOption}
                            <FaChevronDown
                              size={18}
                              className={`${
                                isOpen || lifeForm.state
                                  ? "text-black"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="selectDropdown custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg overflow-y-scroll">
                              {usStates
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
                        <input
                          type="text"
                          name="zip"
                          value={lifeForm.zip}
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
                  </>
                )}

              {section.id === "maritalStatus" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight &&
                lifeForm.state &&
                lifeForm.zip && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Are You Married?
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      {["Yes", "No"].map((option, index) => (
                        <div
                          key={index}
                          className={`h-16 md:h-24 w-full flex items-center gap-3 text-2xl md:text-3xl font-semibold ${
                            lifeForm.maritalStatus === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-8 rounded-xl hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "maritalStatus",
                              value: option,
                            })
                          }
                        >
                          {lifeForm.maritalStatus === option ? (
                            <FaCheckCircle className="text-2xl md:text-3xl" />
                          ) : (
                            <FaRegCircle className="text-2xl md:text-3xl" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {section.id === "tobaccoUse" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight &&
                lifeForm.state &&
                lifeForm.zip &&
                lifeForm.maritalStatus && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Do You Use Tobacco?
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      {["Yes", "No"].map((option, index) => (
                        <div
                          key={index}
                          className={`h-16 md:h-24 w-full flex items-center gap-3 text-2xl md:text-3xl font-semibold ${
                            lifeForm.tobaccoUse === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-8 rounded-xl hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "tobaccoUse",
                              value: option,
                            })
                          }
                        >
                          {lifeForm.tobaccoUse === option ? (
                            <FaCheckCircle className="text-2xl md:text-3xl" />
                          ) : (
                            <FaRegCircle className="text-2xl md:text-3xl" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {section.id === "healthConditions" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight &&
                lifeForm.state &&
                lifeForm.zip &&
                lifeForm.maritalStatus &&
                lifeForm.tobaccoUse && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Do You Have Any of the Following Health Conditions?
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {healthConditions.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            lifeForm.healthConditions.includes(option)
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() => toggleHealthCondition(option)}
                        >
                          {lifeForm.healthConditions.includes(option) ? (
                            <FaCheckCircle className="text-xl" />
                          ) : (
                            <FaRegCircle className="text-xl" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {section.id === "coverageType" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight &&
                lifeForm.state &&
                lifeForm.zip &&
                lifeForm.maritalStatus &&
                lifeForm.tobaccoUse &&
                lifeForm.healthConditions && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What Coverage Are You Interested in?
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {coverageType.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            lifeForm.coverageType === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "coverageType",
                              value: option,
                            })
                          }
                        >
                          {lifeForm.coverageType === option ? (
                            <FaCheckCircle className="text-xl" />
                          ) : (
                            <FaRegCircle className="text-xl" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {section.id === "coverageAmount" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight &&
                lifeForm.state &&
                lifeForm.zip &&
                lifeForm.maritalStatus &&
                lifeForm.tobaccoUse &&
                lifeForm.healthConditions &&
                lifeForm.coverageType && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Last Step {lifeForm.firstName}, What Coverage Amount Are
                        You Interested in?
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {coverageAmount.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            lifeForm.coverageAmount === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "coverageAmount",
                              value: option,
                            })
                          }
                        >
                          {lifeForm.coverageAmount === option ? (
                            <FaCheckCircle className="text-xl" />
                          ) : (
                            <FaRegCircle className="text-xl" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {section.id === "completeScreen" &&
                lifeForm.lastName &&
                lifeForm.dobDate &&
                lifeForm.gender &&
                lifeForm.email &&
                lifeForm.phoneNumber &&
                lifeForm.inches &&
                lifeForm.weight &&
                lifeForm.state &&
                lifeForm.zip &&
                lifeForm.maritalStatus &&
                lifeForm.tobaccoUse &&
                lifeForm.healthConditions &&
                lifeForm.coverageType &&
                lifeForm.coverageAmount && <CompleteScreen />}
            </motion.div>
          );
        }
        return null;
      })}
    </>
  );
};

export default LifeQuestions;
