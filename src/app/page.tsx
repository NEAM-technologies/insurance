"use client";

// react/nextjs components
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Aceternity UI components
import { HoverEffect } from "@/components/ui/CardHoverEffect";

// json data
import {
  insuranceOptions,
  knowledgeCenter,
  projects,
  reviews,
} from "@/data/index";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<TabKeys>("viewall");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    product: "Auto Insurance",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      alert("Please fill out the required fields.");
      return;
    }
    console.log("Form submitted:", formData);
    // Add further form submission logic here
  };

  return (
    <div className="mb-20">
      <div className="relative h-96 lg:h-[410px] w-full flex flex-col lg:flex-row items-center justify-start pb-12 lg:pb-0">
        <div className="w-3/5 hidden lg:flex items-center justify-center z-10">
          <h2 className="w-6/12 text-3xl text-[#ff3448b9] font-lulo font-extrabold uppercase">
            Your one stop solution for personalized insurance coverage.
          </h2>
        </div>
        <Image
          src="/familyImg.jpg"
          alt="Image with a family"
          height={1000}
          width={1000}
          className="absolute h-full w-full hidden lg:flex object-cover"
        />
        <Image
          src="/familyImgimp.jpg"
          alt="Image with a family"
          height={1000}
          width={1000}
          className="h-full w-full lg:hidden object-contain"
        />
        <h2 className="text-xl text-center font-lulo font-extrabold uppercase">
          Your one stop solution for personalized insurance <br />
          coverage.
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
      <div className="h-40 w-full flex items-center justify-center bg-[#fbdbdc]">
        <Image src="/logobox.png" alt="logo" height={100} width={100} />
        <p className="w-2/5 text-2xl text-gray-600 text-center font-lulo">20 YEARS OF COMBINED EXPERTISE 15 PARTNERS ACROSS NORTH CAROLINA</p>
      </div>

      <div className="h-fit w-full flex flex-col items-center justify-center my-10">
        <h2 className="text-[#ff3447]">Compare your Rates in Minutes!</h2>
        <p>
          FREE & No obligation, compare quotes from top providers and save more
          on your policy today.
        </p>
        <div className="flex items-center justify-center">
          <p className="max-w-xl">
            Get the fastest and most accurate free quote by clicking this link!
            Our system retrieves your information directly from your current
            provider, making the process quick, simple, and hassle-free.
          </p>
          <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
            Invert it
          </button>
        </div>
        <div>
          <span>OR</span>
          <p>Use our Forms</p>
          <div className="flex flex-col md:flex-row items-center space-y-8">
            {insuranceOptions.map((option) => (
              <div key={option.id} className="flex flex-col items-center">
                <div className="h-32 w-32 text-xl text-white font-semibold bg-black rounded-full flex items-center justify-center">
                  {option.id}
                </div>
                <h3 className="text-center">{option.title}</h3>
                <p className="text-center">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[#ff3447]">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row items-center space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 max-w-sm text-center">
              <Image src="/quotes.png" alt="quotes" height={50} width={50} />
              <p className="mt-2 text-gray-700">{review.review}</p>
              <h3 className="text-xl font-semibold">{review.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[#ff3447]">Knowledge Center</h2>
        <div className="container mx-auto p-4">
          {/* Tabs */}
          <div className="-full flex items-center justify-center space-x-4 mb-6">
            {["View All", "Save Money", "Tips", "Guides"].map((tab, index) => (
              <button
                key={index}
                onClick={() =>
                  setActiveTab(tab.toLowerCase().replace(" ", "") as TabKeys)
                }
                className={`px-4 py-2 rounded ${
                  activeTab === tab.toLowerCase().replace(" ", "")
                    ? "bg-red-500 text-white"
                    : "text-gray-700"
                } hover:text-red-500`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {knowledgeCenter[activeTab]?.map((item) => (
              <div
                key={item.id}
                className="h-40 w-96 bg-white p-4 border-[1.25px] border-gray-300 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            )) || <p>No content available for this tab.</p>}
          </div>
        </div>
      </div>

      <div className="h-[900px] flex items-center justify-start">
        <div className="h-full w-10/12">
          <Image
            src="/businessWoman.jpg"
            alt="Business Woman"
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-full w-5/12 flex flex-col items-center justify-center gap-16">
          <div className="w-80 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Contact an agent now.</h2>
            <p>
              Got other questions? Schedule a consultation with an agent for a
              personalized plan.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-80 mx-auto">
            <h2>Contact information</h2>
            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Product Chosen */}
            <div className="mb-4">
              <label
                htmlFor="product"
                className="block text-sm font-medium text-gray-700"
              >
                Product Chosen
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full text-white font-semibold bg-[#ff3448ce] px-4 py-4 rounded-full hover:bg-red-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 p-4 flex flex-col lg:flex-row">
        {/* Contact Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold">You Insurance Agency</h2>
          <p className="text-lg">
            257 Timber Dr <br />
            Garner, NC 27529
          </p>
          <p className="mt-4 text-lg">
            <span className="font-semibold"> Anthony You</span> <br />
            Agency Owner
          </p>
          <Link href="mailto:ayou@youinsuranceagency.com">
            ayou@youinsuranceagency.com
          </Link>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Office Phone:</span> <br />
            <p className="underline">919-341-0606</p>
          </p>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Office Hours:</span> <br />
            Monday - Friday: 8:30 AM to 5:30 PM
          </p>
        </div>

        {/* Map */}
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.671208999865!2d-78.60746068497464!3d35.70346918018957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac597576317ccf%3A0xf1688db2c903007c!2s257%20Timber%20Dr%2C%20Garner%2C%20NC%2027529!5e0!3m2!1sen!2sus!4v1697808512955!5m2!1sen!2sus"
            title="Location Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
