// react/nextjs components
import React, { useEffect, useState } from "react";

// date components
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

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

  const handleScroll = (id: string) => {
    const scrollToElement = (element: HTMLElement) => {
      if (!element) {
        return;
      }

      // Get the element's bounding rectangle
      const rect = element.getBoundingClientRect();

      // Calculate the element's center position relative to the viewport
      const elementCenterY = rect.top + window.scrollY + rect.height / 2;

      // Calculate the viewport's center position
      const viewportCenterY = window.innerHeight / 2;

      // Calculate the scroll position to center the element
      const scrollToY = elementCenterY - viewportCenterY;

      // Scroll to the calculated position smoothly
      window.scrollTo({
        top: scrollToY,
        behavior: "smooth",
      });
    };

    // Create an observer to detect when the element is rendered
    const observer = new MutationObserver(() => {
      const element = document.getElementById(id);
      if (element) {
        observer.disconnect(); // Stop observing once the element is found
        scrollToElement(element); // Pass the DOM element to the function
      }
    });

    // Observe the DOM for changes in the body or parent element
    observer.observe(document.body, { childList: true, subtree: true });
  };

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

  const resetSecondVehicleFields = () => {
    setDriverForm({
      ...driverForm,
      d2FirstName: "",
      d2LastName: "",
      d2DobDate: "",
      d2Gender: "",
      d2MaritalStatus: "",
      d2EducationLevel: "",
      d2Occupation: "",
      d2CreditScore: "",
      d2LicenseStatus: "",
      d2SR22Cert: "",
      d2Last3YAccidents: [
        {
          hasIncident: "",
          type: "",
          incidentDate: "",
          details: "",
          setNewIncident: "",
        },
      ],
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

    // Ensure selectedDate is a valid Date object
    const selected =
      selectedDate && selectedDate instanceof Date
        ? selectedDate
        : selectedDate
        ? new Date(selectedDate) // Convert to Date object if not already
        : null;

    // For Date of Birth validation (must be at least 18 years ago)
    if (type === "dob") {
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
    }

    // For Date of Incident validation (must be within the last 3 years)
    if (type !== "dob") {
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(currentYear - 3, 0, 1);

      // Check if the selected date is valid
      if (!selected || isNaN(selected.getTime())) {
        return "Please select a valid date.";
      }

      // Check if the selected date is within the last 3 years
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

      handleScroll("accidentDetails");
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
    // Check for incidents with "Yes" in d1Last3YAccidents or d2Last3YAccidents
    const d1HasIncident = driverForm.d1Last3YAccidents.some(
      (incident) =>
        incident.hasIncident === "Yes" || incident.setNewIncident === "Yes"
    );

    // If either d1 or d2 has incidents with "Yes", clear the second driver
    if (d1HasIncident) {
      setDriverForm({ ...driverForm, secondDriver: "" });
    }
  }, [driverForm.d1Last3YAccidents, driverForm.d2Last3YAccidents]);

  useEffect(() => {
    if (driverForm.secondDriver === "No") {
      resetSecondVehicleFields();
    }
  }, [driverForm.secondDriver]);

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
      
    </div>
  );
};

export default DriverQuestions;
