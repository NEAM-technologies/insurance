// react/nextjs components
import React, { useEffect, useState } from "react";

// firebase components
import { getAutoDetails } from "@/lib/firebase";

// framer-motion import
import { motion } from "framer-motion";

// global stores
import useAutoInsuranceStore from "@/store/useAutoInsuranceStore";
import useLoadingStore from "@/store/useLoadingStore";

// icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaCheckCircle, FaRegCircle } from "react-icons/fa";

type VechileQuestionsProps = {
  completeSection: (section: string) => void;
};

const VechileQuestions: React.FC<VechileQuestionsProps> = ({
  completeSection,
}) => {
  const { setLoading } = useLoadingStore();
  const { vehicleForm, setVehicleForm } = useAutoInsuranceStore();
  const [vehicleDetails, setVehicleDetails] = useState<AutoYear[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dropdownState, setDropdownState] = useState({
    year: { isOpen: false, selectedOption: "Select a year" },
    make: { isOpen: false, selectedOption: "Select a make" },
    model: { isOpen: false, selectedOption: "Select a model" },
  });

  const toggleDropdown = (field: "year" | "make" | "model") => {
    setDropdownState((prev) => ({
      ...prev,
      [field]: { ...prev[field], isOpen: !prev[field].isOpen },
    }));
  };

  const handleOptionClick = (
    field: "year" | "make" | "model",
    option: string
  ) => {
    setDropdownState((prev) => ({
      ...prev,
      [field]: { isOpen: false, selectedOption: option },
    }));
    handleInputChange({ field, value: option });
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
    const fetchAllData = async () => {
      setLoading(true);

      try {
        // Check if data exists in localStorage
        const cachedData = localStorage.getItem("vehicleDetails");
        const cacheTimestamp = localStorage.getItem("vehicleDetailsTimestamp");

        if (cachedData && cacheTimestamp) {
          const isCacheValid =
            new Date().getTime() - Number(cacheTimestamp) < 24 * 60 * 60 * 1000; // 1 day

          if (isCacheValid) {
            console.log("Using cached data");
            setVehicleDetails(JSON.parse(cachedData));
            return;
          }
        }

        // Fetch fresh data if no valid cache exists
        const yearResult = await getAutoDetails();
        if (yearResult.success) {
          setVehicleDetails(yearResult.data);

          // Save fetched data to localStorage
          localStorage.setItem(
            "vehicleDetails",
            JSON.stringify(yearResult.data)
          );
          localStorage.setItem(
            "vehicleDetailsTimestamp",
            new Date().getTime().toString()
          );

          console.log("Fetched new data: ", yearResult.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [setLoading]);

  return (
    <div className="space-y-12">
      {/* Car Year */}
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
          Let's get started, what car do you drive?
        </p>
        {/* Selected Option Display */}
        <div className="relative w-80 sm:w-96 mx-auto">
          <button
            onClick={() => toggleDropdown("year")}
            className={`selectDropdown h-16 w-full flex items-center justify-between text-lg ${
              dropdownState.year.isOpen || vehicleForm.year
                ? "text-black"
                : "text-gray-400"
            } font-semibold text-left bg-white mx-auto mt-8 px-4 border border-black/20 rounded-lg shadow-md`}
          >
            {dropdownState.year.selectedOption}
            <FaChevronDown
              size={18}
              className={`${
                dropdownState.year.isOpen || vehicleForm.year
                  ? "text-black"
                  : "text-gray-400"
              }`}
            />
          </button>
          {dropdownState.year.isOpen && (
            <div className="selectDropdown custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-y-scroll">
              {vehicleDetails.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick("year", item.year)}
                  className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                >
                  {item.year}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Car Make */}
        {vehicleForm.year && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-80 sm:w-96 mx-auto">
              <button
                onClick={() => toggleDropdown("make")}
                className={`selectDropdown h-16 w-full flex items-center justify-between text-lg ${
                  dropdownState.make.isOpen || vehicleForm.make
                    ? "text-black"
                    : "text-gray-400"
                } font-semibold text-left bg-white mx-auto mt-4 px-4 border border-black/20 rounded-lg shadow-md`}
              >
                {dropdownState.make.selectedOption}
                <FaChevronDown
                  size={18}
                  className={`${
                    dropdownState.make.isOpen || vehicleForm.make
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {dropdownState.make.isOpen && (
                <div className="selectDropdown custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-y-scroll">
                  {[
                    ...new Set(
                      vehicleDetails
                        .find((item) => item.year === vehicleForm.year)
                        ?.vehicles.map((vehicle) => vehicle.make) || []
                    ),
                  ]
                    .sort()
                    .map((uniqueMake, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick("make", uniqueMake)}
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
        {vehicleForm.make && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-80 sm:w-96 mx-auto">
              <button
                onClick={() => toggleDropdown("model")}
                className={`selectDropdown h-16 w-full flex items-center justify-between text-lg ${
                  dropdownState.model.isOpen || vehicleForm.model
                    ? "text-black"
                    : "text-gray-400"
                } font-semibold text-left bg-white mx-auto mt-4 px-4 border border-black/20 rounded-lg shadow-md`}
              >
                {dropdownState.model.selectedOption}
                <FaChevronDown
                  size={18}
                  className={`${
                    dropdownState.model.isOpen || vehicleForm.model
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {dropdownState.model.isOpen && (
                <div className="selectDropdown custom-scrollbar absolute left-1/2 transform -translate-x-1/2 max-h-64 w-full bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-y-scroll">
                  {vehicleDetails
                    .find((item) => item.year === vehicleForm.year)
                    ?.vehicles.filter(
                      (vehicle) => vehicle.make === vehicleForm.make
                    )
                    .sort()
                    .map((vehicle, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleOptionClick("model", vehicle.model)
                        }
                        className="w-full px-4 py-2 text-sm md:text-base text-left font-semibold hover:bg-red-100"
                      >
                        {vehicle.model}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Car Usage */}
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
          What do you use your {vehicleForm.make} {vehicleForm.model} for?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {[
            "Getting to Work",
            "Running Errands",
            "Pleasure",
            "Uber / Lyft",
          ].map((option, index) => (
            <div
              key={index}
              className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                vehicleForm.vehicleUse === option
                  ? "bg-red-500 text-white"
                  : "bg-[#ebebeb]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
              onClick={() =>
                handleInputChange({ field: "vehicleUse", value: option })
              }
            >
              {vehicleForm.vehicleUse === option ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              {option}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Miles Driven */}
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
          How many miles per day do you drive?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["5", "10", "20", "30+"].map((option, index) => (
            <div
              key={index}
              className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                vehicleForm.dailyMiles === option
                  ? "bg-red-500 text-white"
                  : "bg-[#ebebeb]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
              onClick={() =>
                handleInputChange({ field: "dailyMiles", value: option })
              }
            >
              {vehicleForm.dailyMiles === option ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              {option}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Car Owner */}
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
          Do you own your {vehicleForm.make} {vehicleForm.model}?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["Own", "Lease", "Finance", "Other"].map((option, index) => (
            <div
              key={index}
              className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                vehicleForm.vehicleOwnership === option
                  ? "bg-red-500 text-white"
                  : "bg-[#ebebeb]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
              onClick={() =>
                handleInputChange({ field: "vehicleOwnership", value: option })
              }
            >
              {vehicleForm.vehicleOwnership === option ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              {option}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Deductible Collision */}
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
          Select Deductible for Collision
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["$1000", "$750", "$500", "$250", "$200", "$100", "$50", "$0"].map(
            (option, index) => (
              <div
                key={index}
                className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                  vehicleForm.collisionDeductible === option
                    ? "bg-red-500 text-white"
                    : "bg-[#ebebeb]"
                } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
                onClick={() =>
                  handleInputChange({
                    field: "collisionDeductible",
                    value: option,
                  })
                }
              >
                {vehicleForm.collisionDeductible === option ? (
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

      {/* Deductible Comprehensive */}
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
          Select Deductible for Comprehensive
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["$1000", "$750", "$500", "$250", "$200", "$100", "$50", "$0"].map(
            (option, index) => (
              <div
                key={index}
                className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                  vehicleForm.comprehensiveDeductible === option
                    ? "bg-red-500 text-white"
                    : "bg-[#ebebeb]"
                } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
                onClick={() =>
                  handleInputChange({
                    field: "comprehensiveDeductible",
                    value: option,
                  })
                }
              >
                {vehicleForm.comprehensiveDeductible === option ? (
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

      {/* Second Vehicle */}
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
          Want to add a second vehicle?
        </p>
        <p
          className="text-gray-500 text-cen
        ter mt-4"
        >
          You can save up to 25% by having multiple vehicles on the same policy
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto mt-8">
          {["Yes", "No"].map((option, index) => (
            <div
              key={index}
              className={`h-14 md:h-16 w-full flex items-center gap-3 md:text-lg font-semibold ${
                vehicleForm.secondVehicle === option
                  ? "bg-red-500 text-white"
                  : "bg-[#ebebeb]"
              } pl-4 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer`}
              onClick={() =>
                handleInputChange({ field: "secondVehicle", value: option })
              }
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

      {/* Next Button */}
      {/* <div className="flex justify-center">
        <motion.button
          id="purchaseYear"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          onClick={() => completeSection("home")}
          className="w-3/4 md:w-1/2 text-lg md:text-xl font-semibold text-white bg-red-500 p-4 rounded-lg hover:bg-red-700 hover:scale-95"
        >
          Next Step
        </motion.button>
      </div> */}
    </div>
  );
};

export default VechileQuestions;
