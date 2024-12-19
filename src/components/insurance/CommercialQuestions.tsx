"use client";

// react/nextjs components
import React, { useState } from "react";

// framer-motion import
import { motion } from "framer-motion";

// date components
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

// global store
import useCommercialFormStore from "@/store/useCommercialFormStore";

// custom components
import CompleteScreen from "@/components/insurance/CompleteScreen";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheckCircle, FaChevronDown, FaRegCircle } from "react-icons/fa";

// data
import {
  annualPayroll,
  annualRevenue,
  businessCoverageOptions,
  employeeNumber,
  usStates,
  yearsInBusiness,
} from "@/data";

type CommercialPageProps = {
  currentSection: number;
  sections: {
    name: string;
    id: string;
  }[];
};

const CommercialQuestions: React.FC<CommercialPageProps> = ({
  currentSection,
  sections,
}) => {
  const { commercialForm, setCommercialForm } = useCommercialFormStore();
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
      | React.ChangeEvent<HTMLTextAreaElement>
      | { field: keyof CommercialFormData; value: string }
  ) => {
    let field: keyof CommercialFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof CommercialFormData;
      value = e.target.value;
    }

    // Update the form state
    setCommercialForm({ ...commercialForm, [field]: value });
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

  const toggleCoverageType = (condition: string) => {
    useCommercialFormStore.setState((prevData) => {
      const isConditionSelected =
        prevData.commercialForm.coverageType.includes(condition);

      return {
        ...prevData,
        commercialForm: {
          ...prevData.commercialForm,
          coverageType: isConditionSelected
            ? prevData.commercialForm.coverageType.filter(
                (item) => item !== condition
              )
            : [...prevData.commercialForm.coverageType, condition],
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
                      value={commercialForm.firstName}
                      onChange={handleInputChange}
                      className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={commercialForm.lastName}
                      onChange={handleInputChange}
                      className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                    />
                  </div>
                </>
              )}

              {section.id === "email" &&
                commercialForm.firstName &&
                commercialForm.lastName && (
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
                        value={commercialForm.email}
                        onChange={handleInputChange}
                        className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                      />
                    </div>
                  </>
                )}

              {section.id === "phoneNumber" &&
                commercialForm.lastName &&
                commercialForm.email && (
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
                        value={commercialForm.phoneNumber}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          if (rawValue.length <= 10) {
                            setCommercialForm({
                              ...commercialForm,
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

              {section.id === "companyName" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is the Name of Your Business?
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-6 mt-6">
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Business Name"
                        value={commercialForm.companyName}
                        onChange={handleInputChange}
                        className="h-20 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                      />
                    </div>
                  </>
                )}

              {section.id === "legalEntity" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What is the legal entity type of your business?
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        "Sole Proprietorship",
                        "Partnership",
                        "LLC",
                        "S Corporation",
                        "C Corporation",
                        "Other",
                      ].map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.legalEntity === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "legalEntity",
                              value: option,
                            })
                          }
                        >
                          {commercialForm.legalEntity === option ? (
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

              {section.id === "briefDescription" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Brief Description of Your Business
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-6 mt-6">
                      <textarea
                        name="briefDescription"
                        placeholder="Describe your business"
                        value={commercialForm.briefDescription}
                        onChange={handleInputChange}
                        className="h-32 w-full text-lg sm:text-xl md:text-2xl px-8 py-4 border border-black/20 rounded-xl shadow-md focus:outline-none"
                      />
                    </div>
                  </>
                )}

              {section.id === "address" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        What&apos;s Your Business Address?
                      </p>
                    </div>
                    <div className="w-full space-y-5 ">
                      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
                        <input
                          type="text"
                          name="street"
                          value={commercialForm.street}
                          onChange={handleInputChange}
                          placeholder="Street"
                          className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                        />
                        <input
                          type="text"
                          name="unit"
                          value={commercialForm.unit}
                          onChange={handleInputChange}
                          placeholder="Unit #"
                          className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        name="city"
                        value={commercialForm.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="h-14 w-full text-sm md:text-lg p-4 border border-black/20 rounded-lg shadow-md focus:outline-none"
                      />
                      <div className="flex items-center gap-8">
                        <div className="relative w-1/2">
                          <button
                            onClick={toggleDropdown}
                            className={`selectDropdown h-14 w-full flex items-center justify-between text-sm md:text-lg ${
                              isOpen || commercialForm.state
                                ? "text-black"
                                : "text-gray-400"
                            } p-4 bg-white border border-black/20 rounded-lg shadow-md`}
                          >
                            {commercialForm.state
                              ? commercialForm.state
                              : selectedOption}
                            <FaChevronDown
                              size={18}
                              className={`${
                                isOpen || commercialForm.state
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
                          value={commercialForm.zip}
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

              {section.id === "yearsInBusiness" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Years in Business
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {yearsInBusiness.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.yearsInBusiness === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "yearsInBusiness",
                              value: option,
                            })
                          }
                        >
                          {commercialForm.yearsInBusiness === option ? (
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

              {section.id === "numOfPartners" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Number of Partners/Owners
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {Array.from({ length: 10 }, (_, index) => {
                        const year = index + 1;
                        const option = year.toString();

                        return (
                          <div
                            key={index}
                            className={`h-14 w-full flex items-center gap-3 font-semibold ${
                              commercialForm.numOfPartners === option
                                ? "bg-red-500 text-white"
                                : "bg-[#ebebeb]"
                            } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                            onClick={() =>
                              handleInputChange({
                                field: "numOfPartners",
                                value: option,
                              })
                            }
                          >
                            {commercialForm.numOfPartners === option ? (
                              <FaCheckCircle className="text-xl" />
                            ) : (
                              <FaRegCircle className="text-xl" />
                            )}
                            {year} {year === 10 ? "+" : ""}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

              {section.id === "numOfFullEmployees" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness &&
                commercialForm.numOfPartners && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Number of Full Time Employees
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {employeeNumber.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.numOfFullEmployees === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "numOfFullEmployees",
                              value: option,
                            })
                          }
                        >
                          {commercialForm.numOfFullEmployees === option ? (
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

              {section.id === "numOfPartEmployees" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness &&
                commercialForm.numOfPartners &&
                commercialForm.numOfFullEmployees && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Number of Part Time Employees
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {employeeNumber.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.numOfPartEmployees === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "numOfPartEmployees",
                              value: option,
                            })
                          }
                        >
                          {commercialForm.numOfPartEmployees === option ? (
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

              {section.id === "annualRevenue" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness &&
                commercialForm.numOfPartners &&
                commercialForm.numOfFullEmployees &&
                commercialForm.numOfPartEmployees && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Annual Revenue
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {annualRevenue.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.annualRevenue === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "annualRevenue",
                              value: option,
                            })
                          }
                        >
                          {commercialForm.annualRevenue === option ? (
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

              {section.id === "annualPayroll" &&
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness &&
                commercialForm.numOfPartners &&
                commercialForm.numOfFullEmployees &&
                commercialForm.numOfPartEmployees &&
                commercialForm.annualRevenue && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Annual Payroll
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {annualPayroll.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.annualPayroll === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: "annualPayroll",
                              value: option,
                            })
                          }
                        >
                          {commercialForm.annualPayroll === option ? (
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
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness &&
                commercialForm.numOfPartners &&
                commercialForm.numOfFullEmployees &&
                commercialForm.numOfPartEmployees &&
                commercialForm.annualRevenue &&
                commercialForm.annualPayroll && (
                  <>
                    <div className="h-20 w-full flex items-center gap-6">
                      <IoIosCheckmarkCircle
                        color="red"
                        className="hidden sm:flex text-2xl md:text-4xl mt-1"
                      />
                      <p className="flex items-start justify-center gap-2 text-2xl md:text-4xl font-raleway">
                        Choose the Coverage(s) That Interest You
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {businessCoverageOptions.map((option, index) => (
                        <div
                          key={index}
                          className={`h-14 w-full flex items-center gap-3 font-semibold ${
                            commercialForm.coverageType.includes(option)
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-6 rounded-md hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() => toggleCoverageType(option)}
                        >
                          {commercialForm.coverageType.includes(option) ? (
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
                commercialForm.lastName &&
                commercialForm.email &&
                commercialForm.phoneNumber &&
                commercialForm.companyName &&
                commercialForm.legalEntity &&
                commercialForm.briefDescription &&
                commercialForm.state &&
                commercialForm.zip &&
                commercialForm.yearsInBusiness &&
                commercialForm.numOfPartners &&
                commercialForm.numOfFullEmployees &&
                commercialForm.numOfPartEmployees &&
                commercialForm.annualRevenue &&
                commercialForm.annualPayroll &&
                commercialForm.coverageType && <CompleteScreen />}
            </motion.div>
          );
        }
        return null;
      })}
    </>
  );
};

export default CommercialQuestions;
