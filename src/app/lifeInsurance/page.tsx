"use client";

// react/nextjs components
import React, { useState, useEffect } from "react";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    height: { feet: "", inches: "" },
    weight: "",
    address: "",
    addressUnit: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    email: "",
    tobaccoUse: "",
    healthConditions: [],
    coverageType: "",
    coverageAmount: "",
  });

  const totalSteps = 12;

  // Calculate percentage based on current step
  const percentageComplete = Math.round(
    currentStep === 1 ? 20 : 20 + ((currentStep - 2) / (totalSteps - 1)) * 80
  );

  // Update history state when currentStep changes
  useEffect(() => {
    window.history.pushState({ step: currentStep }, "", `?step=${currentStep}`);
  }, [currentStep]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  // Step components
  const steps = [
    {
      title: "What is Your Name?",
      content: (
        <>
          <p className="text-4xl">
            Let&apos;s get started!
            <span className="font-raleway"> What is Name</span>
          </p>
          <div className="w-11/12 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
              className="h-20 w-full text-lg p-4 border-2 rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <div className="w-11/12 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
              className="h-20 w-full text-lg p-4 border-2 rounded-lg shadow-md focus:outline-none"
            />
          </div>
        </>
      ),
    },
    {
      title: "What is Your Date of Birth?",
      content: (
        <div className="w-11/12 bg-black/20 pr-1 pb-1 rounded-lg shadow-lg hover:bg-gray-400">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
            className="h-20 w-full text-lg p-4 border-2 rounded-lg shadow-md focus:outline-none"
          />
        </div>
      ),
    },
    {
      title: "Gender",
      content: (
        <>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleInputChange}
            />
            Female
          </label>
        </>
      ),
    },
    {
      title: "Are You Married?",
      content: (
        <>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Yes"
              checked={formData.maritalStatus === "Yes"}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="No"
              checked={formData.maritalStatus === "No"}
              onChange={handleInputChange}
            />
            No
          </label>
        </>
      ),
    },
    {
      title: "How Tall Are You?",
      content: (
        <>
          <input
            type="number"
            name="height.feet"
            value={formData.height.feet}
            onChange={handleInputChange}
            placeholder="ft"
            required
          />
          <input
            type="number"
            name="height.inches"
            value={formData.height.inches}
            onChange={handleInputChange}
            placeholder="in"
            required
          />
        </>
      ),
    },
    {
      title: "How Much Do You Weigh?",
      content: (
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="lbs"
          required
        />
      ),
    },
    {
      title: "What is Your Address?",
      content: (
        <>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="addressUnit"
            value={formData.addressUnit}
            onChange={handleInputChange}
            placeholder="Unit #"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a state</option>
            {/* List of states */}
          </select>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="Zip"
            required
          />
        </>
      ),
    },
    {
      title: "What is Your Phone Number?",
      content: (
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="(xxx) xxx-xxxx"
          required
        />
      ),
    },
    {
      title: "What is Your Email?",
      content: (
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
          required
        />
      ),
    },
    {
      title: "Do You Use Tobacco?",
      content: (
        <>
          <label>
            <input
              type="radio"
              name="tobaccoUse"
              value="Yes"
              checked={formData.tobaccoUse === "Yes"}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="tobaccoUse"
              value="No"
              checked={formData.tobaccoUse === "No"}
              onChange={handleInputChange}
            />
            No
          </label>
        </>
      ),
    },
    {
      title: "Do You Have Any of the Following Health Conditions?",
      content: <>{/* List of conditions with checkboxes */}</>,
    },
    {
      title: "What Coverage Are You Interested in?",
      content: (
        <>
          <select
            name="coverageType"
            value={formData.coverageType}
            onChange={handleInputChange}
            required
          >
            <option value="Term 1 Year">Term 1 Year</option>
            {/* Add options for more terms */}
          </select>
        </>
      ),
    },
    {
      title: "What Coverage Amount Are You Interested in?",
      content: (
        <>
          <select
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={handleInputChange}
            required
          >
            <option value="50000">50,000</option>
            {/* Add options for coverage amounts */}
          </select>
        </>
      ),
    },
  ];

  return (
    <div className="lg:mt-[13.3rem] space-y-8 mx-auto pb-12">
      <div className="h-40 w-full flex flex-col items-center justify-center gap-3 bg-[#f5f3f3ac]">
        <p className="text-2xl">
          Compare Life Insurance Rates in
          <span className="font-raleway font-semibold"> North Carolina</span>
        </p>
        <div className="h-8 w-4/5 bg-gray-400 rounded">
          <div
            className={`h-full flex items-center justify-center bg-red-800 ${
              currentStep < totalSteps
                ? "rounded-l"
                : currentStep === totalSteps && "rounded-r"
            }`}
            style={{ width: `${percentageComplete}%` }}
          >
            <p className="text-xs text-white font-semibold">
              {percentageComplete}% Complete
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8 mx-auto">
        {steps[currentStep - 1]?.content}
      </div>

      <div className="w-fit flex justify-center gap-4 bg-red-800 mx-auto pb-1 rounded-lg hover:scale-95 shadow-lg">
        <button
          onClick={handleNextStep}
          className="h-16 w-48 flex items-center justify-center text-xl font-semibold bg-red-900 text-white rounded-lg hover:bg-red-800 shadow-lg"
        >
          {currentStep === totalSteps ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Page;
