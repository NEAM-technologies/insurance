// react/nextjs components
import React, { useEffect, useState } from "react";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useHomeOwnerStore from "@/store/useHomeInsuranceStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaCheckCircle, FaRegCircle } from "react-icons/fa";

// data
import { usStates } from "@/data";

type HomeQuestionsProps = {
  completeSection: (section: string) => void;
};

const HomeQuestions: React.FC<HomeQuestionsProps> = ({ completeSection }) => {
  const { homeForm, setHomeForm } = useHomeOwnerStore();
  const [errorMessage, setErrorMessage] = useState<string>("");
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
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { field: keyof HomeFormData; value: string }
  ) => {
    let field: keyof HomeFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof HomeFormData;
      value = e.target.value;
    }

    // Update the form state
    setHomeForm({ ...homeForm, [field]: value });

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
          Let&apos;s get started, what type of home do you live in?
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
                homeForm.homeType === option
                  ? "bg-red-500 text-white"
                  : "bg-[#ebebeb]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
              onClick={() =>
                handleInputChange({ field: "homeType", value: option })
              }
            >
              {homeForm.homeType === option ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              {option}
            </div>
          ))}
        </div>
      </motion.div>

      {homeForm.homeType && (
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
            What is your address?
          </p>
          <div id="homeType" className="space-y-5 mx-auto mt-8">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
              <input
                type="text"
                name="street"
                value={homeForm.street}
                onChange={handleInputChange}
                placeholder="Street"
                className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
              <input
                type="text"
                name="unit"
                value={homeForm.unit}
                onChange={handleInputChange}
                placeholder="Unit #"
                className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="city"
              value={homeForm.city}
              onChange={handleInputChange}
              placeholder="City"
              className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
            />
            <div className="flex items-center gap-8">
              <div className="relative w-1/2">
                <button
                  onClick={toggleDropdown}
                  className={`selectDropdown h-14 w-full flex items-center justify-between text-sm md:text-lg ${
                    isOpen || homeForm.state ? "text-black" : "text-gray-400"
                  } p-4 bg-white border border-black/20 rounded-lg shadow-md`}
                >
                  {homeForm.state ? homeForm.state : selectedOption}
                  <FaChevronDown
                    size={18}
                    className={`${
                      isOpen || homeForm.state ? "text-black" : "text-gray-400"
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
                value={homeForm.zip}
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
      )}

      {homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
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
              What year was your home built?
            </p>
            {homeForm.yearBuilt &&
              homeForm.yearBuilt.length < 4 &&
              errorMessage && (
                <p className="text-red-500 text-sm text-center mt-6">
                  {errorMessage}
                </p>
              )}
            <div id="zip" className="flex justify-center mt-8">
              <input
                type="text"
                name="yearBuilt"
                value={homeForm.yearBuilt}
                onChange={(e) => {
                  const { value } = e.target;
                  const currentYear = new Date().getFullYear();

                  // Ensure input is a valid 4-digit number and does not exceed the current year
                  if (
                    /^\d{0,4}$/.test(value) &&
                    (value === "" || Number(value) <= currentYear)
                  ) {
                    handleInputChange(e);
                    setErrorMessage(
                      `The year must be a number and less than or equal to ${currentYear}.`
                    );
                  }
                }}
                placeholder="YYYY"
                inputMode="numeric"
                maxLength={4}
                pattern="\d*"
                className="h-14 w-full md:w-3/5 text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
            </div>
          </motion.div>
        )}

      {homeForm.yearBuilt.length > 3 &&
        homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
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
              What is the square footage?
            </p>
            {homeForm.squareFootage &&
              Number(homeForm.squareFootage) < 101 &&
              errorMessage && (
                <p className="text-red-500 text-sm text-center mt-6">
                  Square Footage must be above 100
                </p>
              )}
            <div id="yearBuilt" className="flex justify-center mt-8">
              <input
                type="text"
                name="squareFootage"
                value={homeForm.squareFootage}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleInputChange(e);
                    setErrorMessage("Must be a number.");
                  }
                }}
                placeholder="Square Footage"
                className="h-14 w-full md:w-3/5 text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
            </div>
          </motion.div>
        )}

      {Number(homeForm.squareFootage) > 100 &&
        homeForm.yearBuilt.length > 3 &&
        homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
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
              How many stories is your home?
            </p>
            <div
              id="squareFootage"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {["1", "2", "3", "4+"].map((option, index) => (
                <div
                  key={index}
                  className={`h-14 md:h-16 w-full flex items-center gap-3 text-sm md:text-lg font-semibold ${
                    homeForm.stories === option
                      ? "bg-red-500 text-white"
                      : "bg-[#ebebeb]"
                  } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                  onClick={() =>
                    handleInputChange({ field: "stories", value: option })
                  }
                >
                  {homeForm.stories === option ? (
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

      {homeForm.stories &&
        Number(homeForm.squareFootage) > 100 &&
        homeForm.yearBuilt.length > 3 &&
        homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Number of Bedrooms Question */}
            <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
              <IoIosCheckmarkCircle
                size={28}
                color="red"
                className="hidden sm:flex mt-1"
              />
              How many bedrooms?
            </p>
            <div
              id="stories"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (option, index) => (
                  <div
                    key={index}
                    className={`h-14 md:h-16 w-full flex items-center gap-3 text-sm md:text-lg font-semibold ${
                      homeForm.bedrooms === option.toString()
                        ? "bg-red-500 text-white"
                        : "bg-[#ebebeb]"
                    } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                    onClick={() =>
                      handleInputChange({
                        field: "bedrooms",
                        value: option.toString(),
                      })
                    }
                  >
                    {homeForm.bedrooms === option.toString() ? (
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

      {homeForm.bedrooms &&
        homeForm.stories &&
        Number(homeForm.squareFootage) > 100 &&
        homeForm.yearBuilt.length > 3 &&
        homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Number of Bathrooms Question */}
            <p className="flex items-start justify-center gap-2 text-2xl md:text-3xl md:text-center font-raleway mx-auto">
              <IoIosCheckmarkCircle
                size={28}
                color="red"
                className="hidden sm:flex mt-1"
              />
              How many bathrooms?
            </p>
            <div
              id="bedrooms"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (option, index) => (
                  <div
                    key={index}
                    className={`h-14 md:h-16 w-full flex items-center gap-3 text-sm md:text-lg font-semibold ${
                      homeForm.bathrooms === option.toString()
                        ? "bg-red-500 text-white"
                        : "bg-[#ebebeb]"
                    } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                    onClick={() =>
                      handleInputChange({
                        field: "bathrooms",
                        value: option.toString(),
                      })
                    }
                  >
                    {homeForm.bathrooms === option.toString() ? (
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

      {homeForm.bathrooms &&
        homeForm.bedrooms &&
        homeForm.stories &&
        Number(homeForm.squareFootage) > 100 &&
        homeForm.yearBuilt.length > 3 &&
        homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
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
              What year did you purchase your home?
            </p>
            {homeForm.purchaseYear &&
              homeForm.purchaseYear.length < 4 &&
              errorMessage && (
                <p className="text-red-500 text-sm text-center mt-6">
                  {errorMessage}
                </p>
              )}
            <div id="bathrooms" className="flex justify-center mt-8">
              <input
                type="text"
                name="purchaseYear"
                value={homeForm.purchaseYear}
                onChange={(e) => {
                  const { value } = e.target;
                  const currentYear = new Date().getFullYear();

                  // Allow input if it's a valid partial year (up to 4 digits) or empty
                  if (/^\d{0,4}$/.test(value)) {
                    // Only perform range checks when the input is a complete 4-digit year
                    if (value.length === 4) {
                      if (
                        Number(value) <= currentYear &&
                        Number(value) >= Number(homeForm.yearBuilt)
                      ) {
                        handleInputChange(e); // Valid 4-digit year within range
                      }
                    } else {
                      setErrorMessage(
                        `Year must be numeric and between ${homeForm.yearBuilt} and ${currentYear}.`
                      );
                      handleInputChange(e); // Allow partial input (less than 4 digits)
                    }
                  }
                }}
                placeholder="YYYY"
                className="h-14 w-full md:w-3/5 text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
              />
            </div>
          </motion.div>
        )}

      {homeForm.purchaseYear.length > 3 &&
        homeForm.bathrooms &&
        homeForm.bedrooms &&
        homeForm.stories &&
        Number(homeForm.squareFootage) > 100 &&
        homeForm.yearBuilt.length > 3 &&
        homeForm.street &&
        homeForm.city &&
        homeForm.state &&
        homeForm.zip.length > 4 && (
          /* Next Button */
          <div className="flex justify-center">
            <motion.button
              id="purchaseYear"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              onClick={() => completeSection("home")}
              className="w-3/4 sm:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg hover:bg-red-700 hover:scale-95 shadow-md"
            >
              Next Step
            </motion.button>
          </div>
        )}
    </div>
  );
};

export default HomeQuestions;
