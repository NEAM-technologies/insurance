// react/nextjs components
import React, { useEffect, useState } from "react";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useAutoInsuranceStore from "@/store/useAutoInsuranceStore";
import { useAlertStore } from "@/store/useAlertStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";

type VechileQuestionsProps = {
  completeSection: (section: string) => void;
  vehicleDetails: AutoYear[];
};

const VechileQuestions: React.FC<VechileQuestionsProps> = ({
  completeSection,
  vehicleDetails,
}) => {
  const { icon: Icon, setAlert } = useAlertStore();
  const { vehicleForm, setVehicleForm } = useAutoInsuranceStore();
  const [dropdownState, setDropdownState] = useState({
    v1Year: { isOpen: false, selectedOption: "Select Vechile year" },
    v1Make: { isOpen: false, selectedOption: "Select Vechile make" },
    v1Model: { isOpen: false, selectedOption: "Select Vechile model" },
    v2Year: { isOpen: false, selectedOption: "Select Vechile year" },
    v2Make: { isOpen: false, selectedOption: "Select Vechile make" },
    v2Model: { isOpen: false, selectedOption: "Select Vechile model" },
  });

  const hasEmptyFields = Object.values(vehicleForm).some(
    (value) => value === "" || value === null || value === undefined
  );

  const toggleDropdown = (
    field: "v1Year" | "v1Make" | "v1Model" | "v2Year" | "v2Make" | "v2Model"
  ) => {
    setDropdownState((prev) => {
      const newState = {
        v1Year: { ...prev.v1Year, isOpen: false },
        v1Make: { ...prev.v1Make, isOpen: false },
        v1Model: { ...prev.v1Model, isOpen: false },
        v2Year: { ...prev.v2Year, isOpen: false },
        v2Make: { ...prev.v2Make, isOpen: false },
        v2Model: { ...prev.v2Model, isOpen: false },
      };

      newState[field] = {
        isOpen: !prev[field].isOpen,
        selectedOption: prev[field].selectedOption,
      };

      return newState;
    });
  };

  const handleOptionClick = (
    field: "v1Year" | "v1Make" | "v1Model" | "v2Year" | "v2Make" | "v2Model",
    option: string
  ) => {
    setDropdownState((prev) => ({
      ...prev,
      [field]: { isOpen: false, selectedOption: option },
    }));
    handleInputChange({ field, value: option });
  };

  const resetSecondVehicleFields = () => {
    setVehicleForm({
      ...vehicleForm,
      v2Year: "",
      v2Make: "",
      v2Model: "",
      v2Use: "",
      v2Miles: "",
      v2Ownership: "",
      v2Coverage: "",
      v2CollisionDeductible: "",
      v2ComprehensiveDeductible: "",
    });
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { field: keyof VehicleFormData; value: string }
  ) => {
    let field: keyof VehicleFormData;
    let value: string;

    if ("field" in e) {
      // Direct update
      field = e.field;
      value = e.value;
    } else {
      // Event-based update
      field = e.target.name as keyof VehicleFormData;
      value = e.target.value;
    }

    // Update the form state
    setVehicleForm({ ...vehicleForm, [field]: value });
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
        !target.closest(".dropdownYear1") &&
        !target.closest(".dropdownMake1") &&
        !target.closest(".dropdownModel") &&
        !target.closest(".dropdownYear2") &&
        !target.closest(".dropdownMake2") &&
        !target.closest(".dropdownMode2")
      ) {
        // Close the dropdowns by setting all `isOpen` states to false
        setDropdownState((prev) => ({
          v1Year: { ...prev.v1Year, isOpen: false },
          v1Make: { ...prev.v1Make, isOpen: false },
          v1Model: { ...prev.v1Model, isOpen: false },
          v2Year: { ...prev.v2Year, isOpen: false },
          v2Make: { ...prev.v2Make, isOpen: false },
          v2Model: { ...prev.v2Model, isOpen: false },
        }));
      }
    };

    document.addEventListener("click", closePopupsOnOutsideClick);

    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setDropdownState]);

  useEffect(() => {
    if (vehicleForm.secondVehicle === "No") {
      resetSecondVehicleFields();
    }
  }, [vehicleForm.secondVehicle]);

  return (
    <div className="space-y-12">
      {[0, 2].map((_, sectionIndex) => {
        if (sectionIndex === 1 && vehicleForm.secondVehicle !== "Yes") {
          return null;
        }
        const yearKey = sectionIndex === 0 ? "v1Year" : "v2Year";
        const makeKey = sectionIndex === 0 ? "v1Make" : "v2Make";
        const modelKey = sectionIndex === 0 ? "v1Model" : "v2Model";
        const vehicleUseKey = sectionIndex === 0 ? "v1Use" : "v2Use";
        const dailyMilesKey = sectionIndex === 0 ? "v1Miles" : "v2Miles";
        const ownershipKey = sectionIndex === 0 ? "v1Ownership" : "v2Ownership";
        const coverageKey = sectionIndex === 0 ? "v1Coverage" : "v2Coverage";
        const collisionDeductibleKey =
          sectionIndex === 0
            ? "v1CollisionDeductible"
            : "v2CollisionDeductible";
        const comprehensiveDeductibleKey =
          sectionIndex === 0
            ? "v1ComprehensiveDeductible"
            : "v2ComprehensiveDeductible";

        return (
          <div key={sectionIndex} className="space-y-12">
            {/* Car Details */}
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
                Let&apos;s get started, what car do you drive?
              </p>
              {/* Car Year */}
              <div className="relative w-3/5 mx-auto">
                <button
                  onClick={() => toggleDropdown(yearKey)}
                  className={`${
                    sectionIndex === 0 ? "dropdownYear1" : "dropdownYear2"
                  } h-16 w-full flex items-center justify-between text-lg ${
                    dropdownState[yearKey].isOpen || vehicleForm[yearKey]
                      ? "text-black"
                      : "text-gray-400"
                  } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
                >
                  {vehicleForm[yearKey]
                    ? vehicleForm[yearKey]
                    : dropdownState[yearKey].selectedOption}
                  <FaChevronDown
                    size={18}
                    className={`${
                      dropdownState[yearKey].isOpen || vehicleForm[yearKey]
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                {dropdownState[yearKey].isOpen && (
                  <div
                    className={`${
                      sectionIndex === 0 ? "dropdownYear1" : "dropdownYear2"
                    } custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-y-scroll`}
                  >
                    {vehicleDetails.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(yearKey, item.year)}
                        className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                      >
                        {item.year}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Car Make */}
              {vehicleForm[yearKey] && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-3/5 mx-auto">
                    <button
                      onClick={() => toggleDropdown(makeKey)}
                      className={`${
                        sectionIndex === 0 ? "dropdownMake1" : "dropdownMake2"
                      } h-16 w-full flex items-center justify-between text-lg ${
                        dropdownState[makeKey].isOpen || vehicleForm[makeKey]
                          ? "text-black"
                          : "text-gray-400"
                      } font-semibold text-left bg-white mx-auto mt-4 px-4 border border-black/20 rounded-lg shadow-md`}
                    >
                      {vehicleForm[makeKey]
                        ? vehicleForm[makeKey]
                        : dropdownState[makeKey].selectedOption}
                      <FaChevronDown
                        size={18}
                        className={`${
                          dropdownState[makeKey].isOpen || vehicleForm[makeKey]
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    {dropdownState[makeKey].isOpen && (
                      <div
                        className={`${
                          sectionIndex === 0 ? "dropdownMake1" : "dropdownMake2"
                        } custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-y-scroll`}
                      >
                        {[
                          ...new Set(
                            vehicleDetails
                              .find(
                                (item) => item.year === vehicleForm[yearKey]
                              )
                              ?.vehicles.map((vehicle) => vehicle.make) || []
                          ),
                        ]
                          .sort()
                          .map((uniqueMake, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleOptionClick(makeKey, uniqueMake)
                              }
                              className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                            >
                              {uniqueMake}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Car Model */}
              {vehicleForm[yearKey] && vehicleForm[makeKey] && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-3/5 mx-auto">
                    <button
                      onClick={() => toggleDropdown(modelKey)}
                      className={`${
                        sectionIndex === 0 ? "dropdownModel1" : "dropdownModel2"
                      } h-16 w-full flex items-center justify-between text-lg ${
                        dropdownState[modelKey].isOpen || vehicleForm[modelKey]
                          ? "text-black"
                          : "text-gray-400"
                      } font-semibold text-left bg-white mx-auto mt-4 px-4 border border-black/20 rounded-lg shadow-md`}
                    >
                      {vehicleForm[modelKey]
                        ? vehicleForm[modelKey]
                        : dropdownState[modelKey].selectedOption}
                      <FaChevronDown
                        size={18}
                        className={`${
                          dropdownState[modelKey].isOpen ||
                          vehicleForm[modelKey]
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    {dropdownState[modelKey].isOpen && (
                      <div
                        className={`${
                          sectionIndex === 0
                            ? "dropdownModel1"
                            : "dropdownModel2"
                        } custom-scrollbar absolute left-1/2 transform -translate-x-1/2 max-h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-y-scroll`}
                      >
                        {vehicleDetails
                          .find((item) => item.year === vehicleForm[yearKey])
                          ?.vehicles.filter(
                            (vehicle) => vehicle.make === vehicleForm[makeKey]
                          )
                          .sort((a, b) => {
                            const modelA = String(a.model || "");
                            const modelB = String(b.model || "");
                            return modelA.localeCompare(modelB);
                          })
                          .map((uniqueModel, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                handleOptionClick(modelKey, uniqueModel.model);
                                if (
                                  vehicleForm[yearKey] &&
                                  vehicleForm[makeKey]
                                ) {
                                  setAlert(
                                    "info",
                                    "New car discount applied",
                                    AiFillCar
                                  );
                                }
                              }}
                              className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                            >
                              {uniqueModel.model}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Car Usage */}
            {vehicleForm[yearKey] &&
              vehicleForm[makeKey] &&
              vehicleForm[modelKey] && (
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
                    What do you use your {vehicleForm[makeKey]}{" "}
                    {vehicleForm[modelKey]} for?
                  </p>
                  <div
                    id="model"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {[
                      "Getting to Work",
                      "Running Errands",
                      "Pleasure",
                      "Uber / Lyft",
                    ].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          vehicleForm[vehicleUseKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() =>
                          handleInputChange({
                            field: vehicleUseKey,
                            value: option,
                          })
                        }
                      >
                        {vehicleForm[vehicleUseKey] === option ? (
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

            {/* Miles Driven */}
            {vehicleForm[yearKey] &&
              vehicleForm[makeKey] &&
              vehicleForm[modelKey] &&
              vehicleForm[vehicleUseKey] && (
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
                    How many miles per day do you drive?
                  </p>
                  <p className="text-gray-500 text-center mt-4">
                    Most drivers average around 30 miles per day
                  </p>
                  <div
                    id="vehicleUse"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["5", "10", "20", "30+"].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          vehicleForm[dailyMilesKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() => {
                          handleInputChange({
                            field: dailyMilesKey,
                            value: option,
                          });
                          if (["5", "10"].includes(option)) {
                            setAlert(
                              "info",
                              "Low mileage discount applied",
                              IoSpeedometer
                            );
                          }
                        }}
                      >
                        {vehicleForm[dailyMilesKey] === option ? (
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

            {/* Car Owner */}
            {vehicleForm[yearKey] &&
              vehicleForm[makeKey] &&
              vehicleForm[modelKey] &&
              vehicleForm[vehicleUseKey] &&
              vehicleForm[dailyMilesKey] && (
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
                    Do you own your {vehicleForm[makeKey]}{" "}
                    {vehicleForm[modelKey]}?
                  </p>
                  <p className="text-gray-500 text-center mt-4">
                    Drivers who lease or finance may need more coverage
                  </p>
                  <div
                    id="dailyMiles"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Own", "Lease", "Finance", "Other"].map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                            vehicleForm[ownershipKey] === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: ownershipKey,
                              value: option,
                            })
                          }
                        >
                          {vehicleForm[ownershipKey] === option ? (
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

            {/* Coverage */}
            {vehicleForm[yearKey] &&
              vehicleForm[makeKey] &&
              vehicleForm[modelKey] &&
              vehicleForm[vehicleUseKey] &&
              vehicleForm[dailyMilesKey] &&
              vehicleForm[ownershipKey] && (
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
                    Would You Like Full Coverage or Liability Only?
                  </p>
                  <p className="text-gray-500 text-center mt-4">
                    Liability covers damage you cause other drivers or their
                    property. Full coverage applies to damage to your vehicle.
                  </p>
                  <div
                    id="vehicleOwnership"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Full Coverage", "Liability Only"].map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                            vehicleForm[coverageKey] === option
                              ? "bg-red-500 text-white"
                              : "bg-[#ebebeb]"
                          } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                          onClick={() =>
                            handleInputChange({
                              field: coverageKey,
                              value: option,
                            })
                          }
                        >
                          {vehicleForm[coverageKey] === option ? (
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

            {vehicleForm[yearKey] &&
              vehicleForm[makeKey] &&
              vehicleForm[modelKey] &&
              vehicleForm[vehicleUseKey] &&
              vehicleForm[dailyMilesKey] &&
              vehicleForm[ownershipKey] &&
              vehicleForm[coverageKey] === "Full Coverage" && (
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
                    Select Deductible for Collision
                  </p>
                  <div
                    id="coverageType"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {[
                      "$1000",
                      "$750",
                      "$500",
                      "$250",
                      "$200",
                      "$100",
                      "$50",
                      "$0",
                    ].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          vehicleForm[collisionDeductibleKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() =>
                          handleInputChange({
                            field: collisionDeductibleKey,
                            value: option,
                          })
                        }
                      >
                        {vehicleForm[collisionDeductibleKey] === option ? (
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

            {vehicleForm[yearKey] &&
              vehicleForm[makeKey] &&
              vehicleForm[modelKey] &&
              vehicleForm[vehicleUseKey] &&
              vehicleForm[dailyMilesKey] &&
              vehicleForm[ownershipKey] &&
              vehicleForm[coverageKey] === "Full Coverage" &&
              vehicleForm[collisionDeductibleKey] && (
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
                    Select Deductible for Comprehensive
                  </p>
                  <div
                    id="collisionDeductible"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {[
                      "$1000",
                      "$750",
                      "$500",
                      "$250",
                      "$200",
                      "$100",
                      "$50",
                      "$0",
                    ].map((option, index) => (
                      <div
                        key={index}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          vehicleForm[comprehensiveDeductibleKey] === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() =>
                          handleInputChange({
                            field: comprehensiveDeductibleKey,
                            value: option,
                          })
                        }
                      >
                        {vehicleForm[comprehensiveDeductibleKey] === option ? (
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

            {/* Second Vehicle */}
            {sectionIndex !== 1 &&
              vehicleForm.v1Year &&
              vehicleForm.v1Make &&
              vehicleForm.v1Model &&
              vehicleForm.v1Use &&
              vehicleForm.v1Miles &&
              vehicleForm.v1Ownership &&
              (vehicleForm.v1Coverage === "Liability Only" ||
                (vehicleForm.v1Coverage === "Full Coverage" &&
                  vehicleForm.v1CollisionDeductible &&
                  vehicleForm.v1ComprehensiveDeductible)) && (
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
                    Want to add a second vehicle?
                  </p>
                  <p className="text-gray-500 text-center mt-4">
                    You can save up to 25% by having multiple vehicles on the
                    same policy
                  </p>
                  <div
                    id="secondVehicle"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8"
                  >
                    {["Yes", "No"].map((option, idx) => (
                      <div
                        key={idx}
                        className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                          vehicleForm.secondVehicle === option
                            ? "bg-red-500 text-white"
                            : "bg-[#ebebeb]"
                        } pl-4 rounded-lg hover:bg-red-500 hover:text-white shadow-md cursor-pointer`}
                        onClick={() => {
                          handleInputChange({
                            field: "secondVehicle",
                            value: option,
                          });
                          if (option === "Yes") {
                            setAlert(
                              "info",
                              "Multi-car discount applied",
                              FaCarSide
                            );
                          }
                        }}
                      >
                        {vehicleForm.secondVehicle === option ? (
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

      {/* Next Button */}
      {vehicleForm.secondVehicle === "No" ||
      (vehicleForm.secondVehicle === "Yes" && !hasEmptyFields) ? (
        <div id="secondVehicle" className="flex justify-center">
          <motion.button
            id="purchaseYear"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            onClick={() => completeSection("vehicle")}
            className="w-3/4 sm:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg shadow-md hover:bg-red-700 hover:scale-95"
          >
            Next Step
          </motion.button>
        </div>
      ) : null}
    </div>
  );
};

export default VechileQuestions;
