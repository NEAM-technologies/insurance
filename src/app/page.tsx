"use client";

// react/nextjs components
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Aceternity UI components
import { HoverEffect } from "@/components/ui/CardHoverEffect";

// custom hooks
import { useMediaQuery } from "@/hooks/UseMediaQuery";

// json data
import {
  insuranceOptions,
  knowledgeCenter,
  projects,
  reviews,
} from "@/data/index";

export default function Home() {
  const isSmallMobile = useMediaQuery("(max-width: 1024px)");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    product: "",
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
    <div className="lg:mt-[13.3rem] mb-20">
      <div className="relative h-96 lg:h-[410px] w-full">
        <div className="absolute top-0 left-10 xl:left-64 h-full hidden lg:flex items-center w-80">
          <h2 className="text-3xl text-[#ff3448b9] font-lulo font-extrabold uppercase">
            Your one stop solution for personalized insurance coverage.
          </h2>
        </div>
        <Image
          src={isSmallMobile ? "/familyImgimp.jpg" : "/familyImg.jpg"}
          alt="Image with a family"
          height={1500}
          width={1500}
          className="h-full w-full -my-24 md:my-0 object-contain xl:object-cover -z-10"
        />
        <h2 className="block lg:hidden text-xl text-gray-700 text-center font-extrabold tracking-wide uppercase">
          Your one stop solution for personalized insurance <br />
          coverage.
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
      <div className="h-60 lg:h-52 w-full flex flex-col lg:flex-row items-center justify-center bg-[#fbdbdc]">
        <Image src="/logobox.png" alt="logo" height={100} width={100} />
        <p className="max-w-2xl lg:w-2/5 lg:text-2xl text-gray-600 text-center font-lulo mt-4 lg:mt-0">
          20 YEARS OF COMBINED EXPERTISE 15 PARTNERS ACROSS NORTH CAROLINA
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-6 py-8">
        <h2 className="text-3xl lg:text-[44px] text-[#ff3447] text-center lg:text-left font-extrabold">
          Compare your Rates in Minutes!
        </h2>
        <p className="text-xl text-gray-600 text-center lg:text-left font-sans font-light px-3 lg:px-0">
          FREE & No obligation, compare quotes from top providers and save more
          on your policy today.
        </p>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          <p className="max-w-full lg:max-w-[36.5rem] text-[18px] lg:text-2xl text-[#f15e65] font-semibold px-6 lg:px-0">
            Get the fastest and most accurate free quote by clicking this link!
            Our system retrieves your information directly from your current
            provider, making the process quick, simple, and hassle-free.
          </p>
          <Link
            href="https://app.usecanopy.com/c/you-insurance-agency"
            target="blank"
            rel="noopener noreferrer"
            className="h-14 w-fit flex items-center justify-center bg-red-800/90 pb-2 pr-1 rounded-3xl hover:scale-95"
          >
            <span
              className="text-sm lg:text-xs text-white font-medium uppercase bg-[#ff3448dc]
              px-6 py-4 border-2 border-transparent rounded-3xl transition
              duration-200 hover:bg-red-500
              hover:border-[#e87a85ef]"
            >
              Click here now!
            </span>
          </Link>
        </div>
        <div className="w-full xl:w-3/6 flex flex-col items-center justify-center mt-5">
          <span className="text-7xl text-[#f15e63] font-bold mb-4">OR</span>
          <p className="text-3xl text-[#ff3447] font-poppins font-black -tracking-wide">
            Use our Forms
          </p>
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-0 mt-8">
            {insuranceOptions.map((option) => (
              <div
                key={option.id}
                className="flex flex-col items-center justify-center gap-5"
              >
                <div className="h-24 w-24 lg:h-32 lg:w-32 text-5xl lg:text-7xl text-white font-semibold bg-black rounded-full flex items-center justify-center">
                  {option.id}
                </div>
                <h3 className="w-1/2 text-3xl text-[#a33636] text-center font-extrabold mb-3">
                  {option.title}
                </h3>
                <p className="w-72 lg:max-w-44 text-2xl text-[#1d7adf] text-center">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:h-[450px] flex flex-col items-center justify-center gap-12 bg-[#eaf7ff] py-8">
        <h2 className="text-[28px] lg:text-5xl text-[#e21c21] font-extrabold">
          What Our Clients Say
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="h-60 max-w-[16.5rem] flex flex-col items-center justify-center gap-2 text-center p-4"
            >
              <Image src="/quotes.png" alt="quotes" height={50} width={50} />
              <p className="flex-1 lg:text-sm text-gray-700 font-poppins font-medium mt-2 ">
                {review.review}
              </p>
              <h3
                className={`text-lg lg:text-base text-[#b5423c] font-light tracking-wide ${
                  review.id === 2 && "mt-6 lg:mt-0"
                }`}
              >
                {review.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="h-fit flex flex-col items-center justify-center gap-8 py-12">
        <h2 className="text-[28px] lg:text-5xl text-[#e21c21] font-extrabold">
          Knowledge Center
        </h2>
        <div className="mx-auto">
          {/* Tabs */}
          <div className="w-full flex items-center justify-center lg:gap-4 mb-6">
            {["View All", "Save Money", "Tips", "Guides"].map((tab, index) => (
              <Link
                href="/"
                key={index}
                className="text-base hover:text-red-500 text-black px-4 py-2 rounded"
              >
                {tab}
              </Link>
            ))}
          </div>
          {/* Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeCenter.map(
              (item: {
                id: number;
                imageUrl: string;
                date: string;
                description: string;
              }) => (
                <div
                  key={item.id}
                  className="h-52 lg:h-40 w-72 lg:w-96 flex flex-col bg-white p-4 border-[1.25px] border-red-400 mx-auto lg:mx-0 transition"
                >
                  <div className="flex items-start justify-between">
                    <p className="w-3/5 mt-2 text-gray-600">
                      {item.description}
                    </p>
                    <Image
                      src={item.imageUrl}
                      alt="image"
                      height={80}
                      width={80}
                    />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600">{item.date}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:h-[900px] flex flex-col lg:flex-row items-center justify-start">
        <div className="h-full lg:w-10/12">
          <Image
            src="/businessWoman.jpg"
            alt="Business Woman"
            height={1500}
            width={1500}
            className="h-full w-full mb-8 lg:mb-0 object-cover"
          />
        </div>
        <div className="h-full w-full lg:w-5/12 flex flex-col items-center justify-center gap-16">
          <div className="w-80 space-y-8 mx-auto">
            <h2 className="text-5xl text-[#a33650] text-center font-bold mb-4">
              Contact an agent now
            </h2>
            <p className="text-xl text-gray-700 font-semibold">
              Got other questions? Schedule a consultation with an agent for a
              personalized plan.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-5/6 lg:mx-auto px-5 lg:px-0"
          >
            <h2 className="text-3xl text-[#a33650] mb-10">
              Contact Information
            </h2>

            {/* First Name and Last Name */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="w-full lg:w-1/2">
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
                  placeholder="e.g., John"
                  autoComplete="on"
                  required
                  className="mt-1 p-2 block w-full border border-red-400 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
                />
              </div>
              <div className="w-full lg:w-1/2">
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
                  placeholder="e.g., Doe"
                  autoComplete="on"
                  required
                  className="mt-1 p-2 block w-full border border-red-400 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="w-full lg:w-1/2">
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
                  placeholder="e.g., john.doe@example.com"
                  autoComplete="on"
                  required
                  className="mt-1 p-2 block w-full border border-red-400 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
                />
              </div>
              <div className="w-full lg:w-1/2">
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
                  placeholder="e.g., 123 Elm Street, Springfield"
                  autoComplete="on"
                  className="mt-1 p-2 block w-full border border-red-400 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
                />
              </div>
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
                placeholder="e.g., +1 234-567-8901"
                autoComplete="on"
                className="mt-1 p-2 block w-full border border-red-400 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
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
                placeholder="Auto Insurance"
                autoComplete="on"
                required
                className="mt-1 p-2 block w-full border border-red-400 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
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
    </div>
  );
}
