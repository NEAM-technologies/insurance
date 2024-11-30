"use client";

// react/nextjs components
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// framer motion components
import { motion } from "framer-motion";

// state components
import useLifeFormStore from "@/store/useLifeFormStore";

// data
import {
  coverageAmount,
  coverageType,
  healthConditions,
  steps,
  usStates,
  validationSchema,
} from "@/data";

// icons
import { IoIosCheckmarkCircle, IoIosMail } from "react-icons/io";
import { FaGift, FaPhone } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";

const Page = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { currentStep, setCurrentStep, formData, setFormData } =
    useLifeFormStore();
  const [message, setMessage] = useState<string | null>(null);

  // Safe access function for nested properties
  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split(".");
    return keys.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  // Function to check if a specific field is empty
  const isFieldEmpty = (field: string, formData: LifeFormData) => {
    const value = getNestedValue(formData, field);

    // Handle empty strings or arrays
    if (typeof value === "string") {
      return value.trim() === "";
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return false; // Handle other cases (like objects or undefined)
  };

  // Handle Next Step with Validation and Update Message
  const handleNextStep = () => {
    // Get the fields for the current step from the validationSchema
    const currentFields = validationSchema[currentStep];

    // Loop through the fields for the current step and check if any are empty
    for (const field of currentFields) {
      if (isFieldEmpty(field, formData)) {
        setMessage(`Please fill in the necessary fields.`);
        setTimeout(() => setMessage(null), 5000);
        return; // Stop the function from progressing to the next step if any field is empty
      }
    }

    // If all fields are filled, proceed to the next step
    setMessage(null); // Clear the message
    setCurrentStep(currentStep + 1);
  };

  const validateDateInput = (name: string, value: string): string | null => {
    const numValue = parseInt(value);

    if (name === "dobMonth") {
      if (numValue < 1 || numValue > 12)
        return "Please enter a valid month (1-12).";
    } else if (name === "dobDay") {
      if (numValue < 1 || numValue > 31)
        return "Please enter a valid day (1-31).";
    } else if (name === "dobYear") {
      if (numValue > 2006) return "You must be at least 18 years old.";
    }

    return null;
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Only apply validation for the dob fields
    if (name.startsWith("dob")) {
      // Validate if the value contains only digits
      if (!/^\d*$/.test(value)) {
        setMessage("Date values must be numeric.");
        return;
      }

      let validationMessage = validateDateInput(name, value);

      // If validation fails, set message and stop execution
      if (validationMessage) {
        setMessage(validationMessage);
        return;
      }
    }

    // Handle input changes for different fields
    if (name.startsWith("dob")) {
      const updatedDob = { ...formData.dob };

      if (name === "dobMonth") updatedDob.month = value;
      if (name === "dobDay") updatedDob.day = value;
      if (name === "dobYear") updatedDob.year = value;

      setFormData({
        ...formData,
        dob: updatedDob,
      });
    } else if (name.startsWith("address.")) {
      // Handle address fields
      const addressKey = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressKey]: value,
        },
      });
    } else if (name === "feet" || name === "inches") {
      // Ensure the value is numeric
      if (!/^\d*$/.test(value)) {
        setMessage("Height values must be numeric.");
        return;
      }
      // Update height fields (feet and inches)
      const updatedHeight = { ...formData.height, [name]: value };
      setFormData({
        ...formData,
        height: updatedHeight,
      });
    } else {
      // Handle other fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setMessage(null);
  };

  // Toggle health condition
  const toggleHealthCondition = (condition: string) => {
    useLifeFormStore.setState((prevData) => {
      const isConditionSelected =
        prevData.formData.healthConditions.includes(condition);

      return {
        ...prevData,
        formData: {
          ...prevData.formData,
          healthConditions: isConditionSelected
            ? prevData.formData.healthConditions.filter(
                (item) => item !== condition
              )
            : [...prevData.formData.healthConditions, condition],
        },
      };
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const stepWidth = scrollRef.current.scrollWidth / steps.length;
      const scrollPosition = Math.max(0, (currentStep - 1) * stepWidth);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentStep, steps.length]);

  return (
    <div className="relative space-y-8 lg:mt-[13.3rem] pb-12 border-4">
      {/* Stepper */}
      <div>
        <div
          ref={scrollRef}
          className="w-full flex items-center space-x-2 text-sm sm:text-base font-medium text-center text-gray-500 bg-gray-200 p-3 sm:p-4 rtl:space-x-reverse overflow-hidden"
        >
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={handleNextStep}
              className={`flex items-center text-lg ${
                index + 1 <= currentStep ? "text-red-700" : "text-gray-500"
              } ${index + 1 === currentStep && "animate-pulseCustom"}`}
              style={{ flex: "0 0 calc(100% / 6)", scrollSnapAlign: "center" }}
            >
              <span
                className={`h-8 w-8 flex items-center justify-center text-sm font-semibold me-2 border-2 rounded-full shrink-0 ${
                  index + 1 <= currentStep
                    ? "border-red-600"
                    : "border-gray-500"
                }`}
              >
                {index + 1}
              </span>
              {step}
              {index + 1 < steps.length && (
                <svg
                  className="w-4 h-4 ms-2 sm:ms-4 rtl:rotate-180"
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
              )}
            </button>
          ))}
        </div>
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-full bg-red-700"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      {currentStep > 1 && (
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
          className="absolute top-1/3 left-2 hover:scale-105"
        >
          <MdArrowBackIos size={50} color="#6f1212" />
        </button>
      )}
      {/* Step Content */}
      <form onSubmit={handleSubmit} className=" w-full max-w-4xl mx-auto">
        {/* Step 1: First and Last Name */}
        {currentStep === 1 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl">
              Let&apos;s get started!
              <span className="font-raleway"> What is Your Name?</span>
            </p>

            <div className="w-11/12 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="h-20 w-full text-xl p-4 border-2 rounded-lg shadow-md focus:outline-none"
              />
            </div>

            <div className="w-11/12 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="h-20 w-full text-xl p-4 border-2 rounded-lg shadow-md focus:outline-none"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Date of Birth */}
        {currentStep === 2 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl font-raleway">What is Your Date of Birth?</p>
            <div className="flex items-center gap-6">
              <FaGift size={36} color="#b91c1c" />
              <div className="bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <div className="h-full w-full bg-white rounded-lg shadow-md focus:outline-none">
                  {/* Month Input */}
                  <input
                    type="text"
                    name="dobMonth"
                    value={formData.dob.month}
                    onChange={handleInputChange}
                    placeholder="MM"
                    maxLength={2}
                    className="h-16 max-w-72 text-xl text-center bg-transparent focus:outline-none"
                  />
                  <span className="text-3xl text-red-700">/</span>

                  {/* Day Input */}
                  <input
                    type="text"
                    name="dobDay"
                    value={formData.dob.day}
                    onChange={handleInputChange}
                    placeholder="DD"
                    maxLength={2}
                    className="h-16 max-w-72 text-xl text-center bg-transparent focus:outline-none"
                  />
                  <span className="text-3xl text-red-700">/</span>

                  {/* Year Input */}
                  <input
                    type="text"
                    name="dobYear"
                    value={formData.dob.year}
                    onChange={handleInputChange}
                    placeholder="YYYY"
                    maxLength={4}
                    className="h-16 max-w-72 text-xl text-center bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Gender */}
        {currentStep === 3 && (
          <motion.div
            className="w-11/12 space-y-12 mx-auto"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl text-center font-raleway">
              What is Your Gender?
            </p>
            {/* Male Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, gender: "Male" });
                  setCurrentStep(currentStep + 1);
                }}
                className="h-20 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
              >
                <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                  Male
                </div>
              </button>
              {/* Female Button */}
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, gender: "Female" });
                  setCurrentStep(currentStep + 1);
                }}
                className="h-20 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
              >
                <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                  Female
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Email */}
        {currentStep === 4 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl font-raleway">What is Your Email?</p>
            <div className="w-11/12 flex items-center gap-6 mx-auto ">
              <IoIosMail size={36} color="#b91c1c" />
              <div className="w-full bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    const email = e.target.value;
                    setFormData({ ...formData, email });
                  }}
                  onBlur={() => {
                    if (
                      !validateEmail(formData.email) &&
                      formData.email !== ""
                    ) {
                      alert("Please enter a valid email address");
                    }
                  }}
                  placeholder="Enter your email"
                  className="h-20 w-full text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Phone Number */}
        {currentStep === 5 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl font-raleway">What is Your Phone Number?</p>
            <div className="w-11/12 flex items-center gap-6 mx-auto ">
              <FaPhone size={36} color="#b91c1c" />
              <div className="w-full bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (rawValue.length <= 10) {
                      setFormData({
                        ...formData,
                        phoneNumber: formatPhoneNumber(rawValue),
                      });
                    }
                  }}
                  placeholder="(xxx) xxx-xxxx"
                  className="h-20 w-full text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 6: Height */}
        {currentStep === 6 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl font-raleway">How Tall Are You?</p>
            <div className="w-2/3 flex items-center justify-between">
              <div className="w-60 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <input
                  type="text"
                  name="feet"
                  value={formData.height.feet}
                  onChange={handleInputChange}
                  className="h-20 w-full text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                />
              </div>
              <span className="text-3xl text-red-700">ft.</span>
              <div className="w-60 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <input
                  type="text"
                  name="inches"
                  value={formData.height.inches}
                  onChange={handleInputChange}
                  className="h-20 w-full text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                />
              </div>
              <span className="text-3xl text-red-700">in.</span>
            </div>
          </motion.div>
        )}

        {/* Step 7: Weight */}
        {currentStep === 7 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl font-raleway">How Much Do you Weigh?</p>
            <div className="flex items-center gap-2 mx-auto">
              <div className="w-40 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Ensure the value is numeric or an empty string (allowing deletion)
                    if (/^\d*$/.test(value)) {
                      handleInputChange(e); // Call your original handler if the value is numeric
                    } else {
                      setMessage("Weight values must be numeric");
                    }
                  }}
                  className="h-20 w-full text-2xl text-center p-4 border-2 rounded-lg shadow-md focus:outline-none"
                />
              </div>
              <span className="text-3xl text-red-700">lbs.</span>
            </div>
          </motion.div>
        )}

        {/* Step 8: Address */}
        {currentStep === 8 && (
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-12"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl font-raleway">What is Your Address?</p>
            <div className="w-11/12 space-y-5 mx-auto">
              <div className="flex items-center gap-10">
                <div className="w-2/3 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="h-14 w-full text-2xl p-4 border-2 rounded-lg shadow-md focus:outline-none"
                  />
                </div>
                <div className="w-1/3 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                  <input
                    type="text"
                    name="address.unit"
                    value={formData.address.unit}
                    onChange={handleInputChange}
                    placeholder="Unit #"
                    className="h-14 w-full text-2xl p-4 border-2 rounded-lg shadow-md focus:outline-none"
                  />
                </div>
              </div>
              <div className="w-full bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="h-14 w-full text-2xl p-4 border-2 rounded-lg shadow-md focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-10">
                <div className="w-2/4 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                  <select
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="h-14 w-full text-2xl px-4 py-2 border-2 rounded-lg shadow-md focus:outline-none"
                  >
                    <option value="">Select a state</option>
                    {usStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-2/4 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
                  <input
                    type="text"
                    name="address.zip"
                    value={formData.address.zip}
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
                    className="h-14 w-full text-2xl p-4 border-2 rounded-lg shadow-md focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 9: Marriage status */}
        {currentStep === 9 && (
          <motion.div
            className="w-11/12 space-y-12 mx-auto"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl text-center font-raleway">
              Are You Married?
            </p>
            {/* Yes Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, maritalStatus: "Yes" });
                  setCurrentStep(currentStep + 1);
                }}
                className="h-20 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
              >
                <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                  Yes
                </div>
              </button>
              {/* No Button */}
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, maritalStatus: "No" });
                  setCurrentStep(currentStep + 1);
                }}
                className="h-20 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
              >
                <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                  No
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 10: Tobacco Usage */}
        {currentStep === 10 && (
          <motion.div
            className="w-11/12 space-y-12 mx-auto"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl text-center font-raleway">
              Do You Use Tobacco?
            </p>
            {/* Yes Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, tobaccoUse: "Yes" });
                  setCurrentStep(currentStep + 1);
                }}
                className="h-20 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
              >
                <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                  Yes
                </div>
              </button>
              {/* No Button */}
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, tobaccoUse: "No" });
                  setCurrentStep(currentStep + 1);
                }}
                className="h-20 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
              >
                <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                  No
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 11: Health Conditions */}
        {currentStep === 11 && (
          <motion.div
            className="w-11/12 space-y-12 mx-auto"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl text-center font-raleway">
              Do You Have Any of the Following Health Conditions?
            </p>

            <div className="grid grid-cols-3 gap-4">
              {healthConditions.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleHealthCondition(item)}
                  className={`h-14 w-60 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95 ${
                    formData.healthConditions.includes(item)
                      ? "bg-red-800"
                      : "bg-red-700"
                  }`}
                >
                  <div
                    className={`h-full flex items-center justify-center text-lg font-semibold text-white ${
                      formData.healthConditions.includes(item)
                        ? "bg-red-800"
                        : "bg-red-700"
                    } rounded-lg shadow-md focus:outline-none`}
                  >
                    {item}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 12: Coverage Type */}
        {currentStep === 12 && (
          <motion.div
            className="w-11/12 space-y-12 mx-auto"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-4xl text-center font-raleway">
              What Coverage Are You Interested in?
            </p>

            <div
              className="grid grid-cols-2
             gap-4"
            >
              {coverageType.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, coverageType: item });
                    setCurrentStep(currentStep + 1);
                  }}
                  className="h-16 w-96 bg-red-800/80 pr-1 pb-1 rounded-lg shadow-lg hover:scale-95"
                >
                  <div className="h-full flex items-center justify-center text-2xl font-semibold text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                    {item}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 13: Coverage Amount */}
        {currentStep === 13 && (
          <motion.div
            className="w-11/12 space-y-12 mx-auto"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-2xl text-center font-semibold">
              Last Step, {formData.firstName}
            </p>
            <p className="text-4xl text-center font-raleway">
              What Coverage Amount Are You Interested in?
            </p>

            <div
              className="grid grid-cols-2
             gap-4"
            >
              {coverageAmount.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, coverageAmount: item })
                  }
                  className={`h-16 w-96 ${
                    formData.coverageAmount.includes(item)
                      ? "bg-red-800/80"
                      : "bg-red-700"
                  } pr-1 pb-1 rounded-lg shadow-lg hover:scale-95`}
                >
                  <div
                    className={`h-full flex items-center justify-center text-2xl font-semibold text-white ${
                      formData.coverageAmount.includes(item)
                        ? "bg-red-800/80"
                        : "bg-red-700"
                    } rounded-lg shadow-md focus:outline-none`}
                  >
                    {item}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation buttons */}
        <div className="w-3/5 flex flex-col items-center justify-center gap-4 mx-auto">
          {/* Feedback message */}
          <div className="h-8 text-red-500 text-center mt-4">{message}</div>
          {![3, 9, 10, 12, 13].includes(currentStep) && (
            <button
              type="button"
              onClick={handleNextStep}
              className="h-16 w-96 text-xl text-white font-semibold bg-[#459ce8]  pr-1 pb-1 rounded-lg shadow-xl hover:bg-[#368ee5] hover:scale-95"
            >
              <div className="h-full w-full flex items-center justify-center bg-[#459ce8] rounded-lg shadow-xl hover:bg-[#368ee5]">
                Continue
              </div>
            </button>
          )}
          {currentStep === steps.length && (
            <button
              type="submit"
              className="h-16 w-72 text-xl text-white font-semibold bg-[#459ce8] pr-1 pb-1 rounded-lg shadow-xl hover:bg-[#368ee5] hover:scale-95"
            >
              <div className="h-full w-full flex items-center justify-center bg-[#459ce8] rounded-lg shadow-xl hover:bg-[#368ee5]">
                View Rates
              </div>
            </button>
          )}
        </div>
      </form>
      {[1, 4, 8, 12].includes(currentStep) && (
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/owner.jpeg"
            alt="owner"
            height={50}
            width={50}
            className="rounded-full"
          />
          <span className="flex gap-1 text-gray-400">
            <IoIosCheckmarkCircle size={22} color="red" />
            {currentStep === 1 && "Your Information is safe & secure"}
            {currentStep === 4 && "No Spam Guaranteed"}
            {currentStep === 8 &&
              "Insurance companies require this in order to provide an accurate quote."}
            {currentStep === 12 &&
              "‘Not Sure’ if you don’t know what coverage you want."}
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;
