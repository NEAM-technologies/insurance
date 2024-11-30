"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";

// firebase components
import { getAutoInsuranceCollection, getAutoYear } from "../../../firebase";

// lottie components
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// icons
import { FaChevronDown } from "react-icons/fa";

const loadingStates: LoadingState[] = [
  { text: "Preparing to fetch data..." },
  { text: "Fetching data..." },
  { text: "Data fetched successfully!" },
];

const Page = () => {
  const [year, setYear] = useState<AutoYear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [vechileData, setVechileData] = useState<VechileData[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
  });

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
          Hi there, let&apos;s see how much we can save you on your car insurance.
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
