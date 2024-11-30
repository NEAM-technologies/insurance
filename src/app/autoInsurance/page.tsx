"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";

// firebase components
import { getAutoInsuranceCollection, getAutoYear } from "../../../firebase";

// framer motion components
import { motion } from "framer-motion";

// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// data
import { autoInsuranceQuestions } from "@/data";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";

const loadingStates: LoadingState[] = [
  { text: "Preparing to fetch data..." },
  { text: "Fetching data..." },
  { text: "Data fetched successfully!" },
];

const Page = () => {
  const [year, setYear] = useState<AutoYear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [vechileData, setVechileData] = useState<VechileData[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState<AutoFormData>({
    year: "",
    make: "",
    model: "",
    "What do you use your Chevrolet for?": "",
    "How many miles per day do you drive?": "",
    "Do you own your Chevrolet 4500HD?": "",
    "Would You Like Full Coverage or Liability Only?": "",
    "Select Deductible for Collision": "",
    "Select Deductible for Comprehensive": "",
    "Want to add a second vehicle?": "",
  });

  const handleOptionChange = (
    questionIndex: number,
    selectedOption: string | number
  ) => {
    const question = autoInsuranceQuestions[questionIndex].question;

    setFormData((prev) => ({
      ...prev,
      [question]: selectedOption,
    }));

    // Move to the next question
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = (type: string) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  // Function to handle selection and update the form data
  const handleSelection = (type: string, value: string) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log("Form Data:", formData);
    alert(`Form Submitted: ${JSON.stringify(formData)}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAutoYear();
        if (result.success) {
          setYear(result.data);
        } else {
          console.log("Failed to fetch auto insurance data.");
        }
      } catch (e) {
        console.log("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      if (formData.year) {
        setLoading(true);

        const result = await getAutoInsuranceCollection(formData.year);
        if (result.success) {
          setVechileData(result.data);
        } else {
          console.log("Failed to fetch data");
        }
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, [formData.year]);

  // if (loading) return <MultiStepLoader loadingStates={loadingStates} />;

  return (
    <div className="lg:mt-[13.3rem] mx-auto">
      <div className="bg-[#f5f3f3ac] mt-12 pb-8">
        <DotLottieReact
          src="https://lottie.host/f678cace-d7cd-432e-993c-604366bd2ab7/wxmJGyQ24V.lottie"
          loop
          autoplay
          className="w-60 mx-auto"
        />
        <h1 className="w-3/5 text-3xl text-center font-raleway mx-auto">
          Hi there, let&apos;s see how much we can save you on your car
          insurance.
        </h1>
      </div>
      <div>
        <div className="lg:w-2/4 flex items-center justify-between text-lg font-semibold tracking-wide mx-auto px-6 lg:px-4 py-4">
          <button>Vechiles</button>
          <button>Drivers</button>
          <button>Final Details</button>
          <button>Quotes</button>
        </div>
        <div className="h-1 w-full bg-gray-200">
          <div className="h-1 w-[25%] bg-red-400"></div>
        </div>
      </div>
      <div className="max-w-md space-y-20 mx-auto py-8">
        <div className="space-y-8">
          <p className="text-[22px] text-center font-raleway">
            Let&apos;s get started, what car do you drive?
          </p>
          <div className="space-y-4">
            {/* Year Dropdown */}
            <div className="space-y-1 px-3">
              <button
                className="w-full inline-flex items-center justify-between text-lg text-white font-semibold bg-red-700 mx-auto p-5 rounded-lg hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-gray-200"
                type="button"
                onClick={() => toggleDropdown("year")}
              >
                {formData.year || "Select Vehicle Year"}
                <svg
                  className="w-5 h-5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "year" && (
                <div className="h-60 w-full bg-red-800 p-2 rounded-lg">
                  <div className="custom-scrollbar h-full w-full flex flex-col items-center justify-between px-2 overflow-y-auto">
                    {year.map((data, index) => (
                      <div
                        key={index}
                        className="w-full text-white font-semibold p-2 rounded-lg hover:bg-red-500 cursor-pointer"
                        onClick={() => handleSelection("year", data.year)}
                      >
                        <span>{data.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Make Dropdown */}
            {formData.year && (
              <div className="space-y-1  px-3">
                <button
                  className="w-full inline-flex items-center justify-between text-lg text-white font-semibold bg-red-700 mx-auto p-5 rounded-lg hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-gray-200"
                  type="button"
                  onClick={() => toggleDropdown("make")}
                >
                  {formData.make || "Select Vehicle Make"}
                  <svg
                    className="w-5 h-5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {openDropdown === "make" && (
                  <div className="h-60 w-full bg-red-800 p-2 rounded-lg">
                    <div className="custom-scrollbar h-full w-full flex flex-col items-center justify-between px-2 overflow-y-auto">
                      {[...new Set(vechileData.map((data) => data.make))]
                        .sort()
                        .map((data, index) => (
                          <div
                            key={index}
                            className="w-full text-white font-semibold p-2 rounded-lg hover:bg-red-500 cursor-pointer"
                            onClick={() => handleSelection("make", data)}
                          >
                            <span>{data}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Model Dropdown */}
            {formData.make && (
              <div className="space-y-1  px-3">
                <button
                  className="w-full inline-flex items-center justify-between text-lg text-white font-semibold bg-red-700 mx-auto p-5 rounded-lg hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-gray-200"
                  type="button"
                  onClick={() => toggleDropdown("model")}
                >
                  {formData.model || "Select Vehicle Model"}
                  <svg
                    className="w-5 h-5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {openDropdown === "model" && (
                  <div className="h-fit w-full bg-red-800 p-2 rounded-lg">
                    <div className="custom-scrollbar h-full w-full flex flex-col items-center justify-between px-2 overflow-y-auto">
                      {vechileData
                        .filter((item) => item.make === formData.make)
                        .map((data, index) => (
                          <div
                            key={index}
                            className="w-full text-white font-semibold p-2 rounded-lg hover:bg-red-500 cursor-pointer"
                            onClick={() => handleSelection("model", data.model)}
                          >
                            <span>{data.model}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <div>
              <IoIosCheckmarkCircle size={22} color="red" />
              <p> What do you use your Chevrolet for?</p>
            </div>
            <div></div>
          </div>
          <div className="w-full">
            {autoInsuranceQuestions.map((question, index) => {
              // Render questions only if they are the current step or have already been answered
              return (
                index <= currentStep && (
                  <motion.div
                    key={index}
                    className="w-11/12 space-y-12 mx-auto"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    exit={{ y: -50 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-4xl text-center font-raleway">
                      {question.question}
                    </p>

                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleOptionChange(index, option)}
                          className="h-20 w-96 text-xl font-semibold bg-red-700 pr-1 pb-1 rounded-lg shadow-xl hover:bg-red-800 hover:scale-95"
                        >
                          <div className="h-full w-full flex items-center justify-center text-white bg-red-700 rounded-lg shadow-md focus:outline-none">
                            {option}
                          </div>
                        </button>
                      </div>
                    ))}

                    {question.note && (
                      <p className="text-lg text-center text-gray-500">
                        {question.note}
                      </p>
                    )}
                  </motion.div>
                )
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        {formData.model && (
          <div className="px-3">
            <button
              className="w-full text-xl font-semibold text-white bg-red-700 p-5 rounded-lg hover:bg-red-800"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
