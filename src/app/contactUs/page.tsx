"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";

// icons
import { FaChevronDown } from "react-icons/fa";

// data
import { phoneCodes } from "@/data";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Code");
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    code: "",
    phone: "",
    message: "",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setContactFormData({
      ...contactFormData,
      code: option,
    });
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const hasEmptyFields = !contactFormData.email || !contactFormData.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(contactFormData);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".PhoneCodes")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div className="flex flex-col items-center gap-12 pt-16 pb-8">
      <div className="relative w-5/6 md:w-4/6">
        <Image
          src="/talkToUs.webp"
          alt="logo"
          height={2500}
          width={2500}
          className="h-40 md:h-full w-full mx-auto"
        />
        <div className="absolute top-3/4 md:top-1/2 left-1/2 h-16 md:h-24 w-40 md:w-60 flex items-center justify-center bg-white transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl md:text-4xl text-red-500 text-center">
            Talk to Us!
          </h1>
        </div>
      </div>
      <div className="w-5/6 md:w-4/6">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl text-red-500 mb-3">Address</h2>
            <p>257 Timber Drive</p>
            <p>Garner, NC 27529</p>
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="text-2xl text-red-500 mb-3">Contact</h2>
            <p>Anthony You - Agency Owner</p>
            <p>ayou@youinsuranceagency.com</p>
            <p className="mt-3">Office Phone: 919-341-0606</p>
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="text-2xl text-red-500 mb-3">Operating Hours</h2>
            <p>Monday - Friday: 8:30AM - 5:30PM</p>
          </div>
        </div>
      </div>

      <div className="md:h-[650px] w-5/6 md:w-4/6 flex flex-col p-12 bg-[#d0cfcf]">
        <div className="w-full md:w-5/6 text-3xl md:text-5xl text-red-400 mx-auto mb-10">
          Got Questions?
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-5/6 space-y-6 mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-20">
            <div className="w-full md:w-1/2">
              <label htmlFor="firstName" className="text-sm text-gray-500">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={contactFormData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full bg-transparent border-b border-black focus:"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="lastName" className="text-sm text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={contactFormData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full bg-transparent border-b border-black focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactFormData.email}
              onChange={handleChange}
              className="mt-1 block w-full bg-transparent border-b border-black focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-6 md:gap-10">
            <div className="relative w-20 md:w-80">
              <label htmlFor="code" className="text-sm text-gray-500">
                Code
              </label>
              <button
                onClick={toggleDropdown}
                className={`PhoneCodes h-16 w-full flex items-center justify-between text-lg ${
                  isOpen || contactFormData.code
                    ? "text-black"
                    : "text-gray-500"
                } border-b border-black`}
              >
                {selectedOption}
                <FaChevronDown
                  size={18}
                  className={`${
                    isOpen || contactFormData.code
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="PhoneCodes custom-scrollbar absolute left-1/2 transform -translate-x-1/2 h-64 w-full bg-gray-200 border border-black/20 rounded-lg shadow-lg overflow-y-scroll">
                  {phoneCodes
                    .sort((a, b) =>
                      a.country
                        .toLowerCase()
                        .localeCompare(b.country.toLowerCase())
                    ) // Sort by country name
                    .map((option, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleOptionClick(
                            `${option.shortName} ${option.code}`
                          )
                        }
                        className="w-full px-4 py-2 text-sm md:text-base hover:bg-white/50"
                      >
                        <div className="flex gap-3">
                          <span>{option.shortName}</span>
                          <span>{option.code}</span>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="phone" className="text-sm text-gray-500">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactFormData.phone}
                onChange={handleChange}
                className="h-16 w-full bg-transparent border-b border-black focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-sm text-gray-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={contactFormData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full bg-transparent border-b border-black focus:outline-none"
              required
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={hasEmptyFields}
              className={`h-16 w-60 ${
                hasEmptyFields ? "bg-red-400" : "bg-red-600"
              } text-white py-2 px-4 rounded-md hover:bg-red-70`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
