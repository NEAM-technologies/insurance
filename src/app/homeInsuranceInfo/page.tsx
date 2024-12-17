"use client";

// react/nextjs components
import React, { useEffect, useState } from "react";
import Image from "next/image";

// icons
import { FaChevronDown } from "react-icons/fa";

// data
import { phoneCodes } from "@/data";
import Link from "next/link";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Code");
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    code: "",
    phone: "",
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

  const hasEmptyFields =
    !contactFormData.email || !contactFormData.code || !contactFormData.phone;

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
      <div className="w-5/6 md:w-4/6 space-y-10 mt-10">
        <h2 className="text-3xl lg:text-5xl text-[#ff3447] text-center lg:text-left xl:text-nowrap font-extrabold italic px-1">
          Compare Home Insurance Quotes in Minutes!
        </h2>
        <p>
          Get the best rates by comparing home insurance quotes quickly. Protect
          your property, belongings, and family from unexpected events with
          coverage tailored to your needs.
        </p>

        <Link
          href="/homeInsurance"
          target="blank"
          rel="noopener noreferrer"
          className="h-20 w-80 flex items-center justify-center bg-red-800/90 pb-2 pr-1 rounded-full hover:scale-95"
        >
          <span
            className="h-full w-full flex items-center justify-center lg:text-xl text-white font-medium uppercase bg-[#ff3448dc] border-2 border-transparent rounded-full transition
              duration-200 hover:bg-red-500
              hover:border-[#e87a85ef]"
          >
            Home Insurance Quote
          </span>
        </Link>
      </div>
      <div className="h-60 lg:h-52 w-full flex flex-col lg:flex-row items-center justify-center bg-[#fbdbdc]">
        <Image src="/logobox.png" alt="logo" height={100} width={100} />
        <p className="max-w-2xl lg:w-2/5 lg:text-2xl text-gray-600 text-center font-lulo mt-4 lg:mt-0">
          20 YEARS OF COMBINED EXPERTISE 15 PARTNERS ACROSS NORTH CAROLINA
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-12 md:gap-40 -mt-12">
        <div className="w-full md:w-2/5">
          <Image
            src="/homePhoto.webp"
            height={2000}
            width={2000}
            alt="Photo of a House"
            className="h-80 md:h-[1100px] w-full object-fill"
          />
        </div>
        <div className="w-5/6 md:w-4/6 space-y-8 mx-auto md:pt-14">
          <h2 className="text-5xl text-red-600 font-poppins mx-auto">
            Secure Your Home,
            <br />
            Secure Your Future
          </h2>
          <p className="text-lg text-red-800">
            Protect Your Biggest Investment - Insure with You!
          </p>

          <div className="pt-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col space-y-8 md:space-y-4">
                <div className="md:h-72 flex flex-col gap-8 md:gap-4">
                  <span className="text-4xl text-red-500">01</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Tailored Coverage Plans
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      Every home is unique, and so are your insurance needs.
                      Whether you own a single-family home, a condo, or a rental
                      property, we offer customizable insurance policies to
                      ensure you have the right coverage.
                    </p>
                  </div>
                </div>
                <div className="md:h-72 flex flex-col gap-8 md:gap-4">
                  <span className="text-4xl text-red-500">02</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Affordable & Competitive Rates
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      We work with top-tier insurance providers to offer
                      competitive pricing without sacrificing protection. Our
                      agents will help you find the best rates and coverage for
                      your budget.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-8 md:space-y-4">
                <div className="md:h-72 flex flex-col gap-8 md:gap-4">
                  <span className="text-4xl text-red-500">03</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Reliable Claims Support
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      When disaster strikes, you need fast and reliable support.
                      Our claims process is streamlined and efficient, so you
                      can get the help you need quickly -whether it&apos;s repairing
                      damage or replacing stolen property.
                    </p>
                  </div>
                </div>
                <div className="md:h-72 flex flex-col gap-8 md:gap-4">
                  <span className="text-4xl text-red-500">04</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Dedicated Customer Service
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      At You Insurance Agency, we are with you every step of the
                      way. From selecting your policy to filing a claim, our
                      team is available to answer your questions and provide
                      support whenever you need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="https://app.usecanopy.com/c/you-insurance-agency"
            target="blank"
            rel="noopener noreferrer"
            className="h-20 w-80 flex items-center justify-center bg-red-800/90 mx-auto pb-2 pr-1 rounded-full hover:scale-95"
          >
            <span
              className="h-full w-full flex items-center justify-center lg:text-xl text-white text-center font-medium uppercase bg-[#ff3448dc] border-2 border-transparent rounded-full transition
              duration-200 hover:bg-red-500
              hover:border-[#e87a85ef]"
            >
              Get A Quote Today?
            </span>
          </Link>
        </div>
      </div>
      <div className="w-5/6 md:w-4/6 space-y-28 mt-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 flex flex-col space-y-8">
            <h2 className="text-5xl text-red-600 font-poppins">
              Condo Insurance
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                Owning a condo is a major investment, and you need the right
                coverage to protect your unit and personal property. We offer
                personal property coverage, liability protection, and flexible
                policy options.
              </p>
              <p className="text-gray-600">
                With customizable plans and affordable rates, You Insurance
                Agency ensures that your condo is protected from unexpected
                events like fire, theft, or water damage. Get a FREE quote today
                and secure peace of mind in your condo living.
              </p>
            </div>
            <Link
              href="https://app.usecanopy.com/c/you-insurance-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 w-72 flex items-center justify-center bg-red-800/90 pb-2 pr-1 rounded-full hover:scale-95"
            >
              <span
                className="h-full w-full flex items-center justify-center lg:text-xl text-white text-center font-medium uppercase bg-[#ff3448dc] border-2 border-transparent rounded-full transition
              duration-200 hover:bg-red-500 hover:border-[#e87a85ef]"
              >
                Get A Quote Today!
              </span>
            </Link>
          </div>
          <div className="h-[22rem] w-full md:w-1/3">
            <Image
              src="/CondoImage.webp"
              alt="Condo Insurance"
              width={400}
              height={300}
              className="h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="h-[22rem] w-full md:w-1/3">
            <Image
              src="/FamilyHome.webp"
              alt="Renters Insurance"
              width={400}
              height={300}
              className="h-full rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 flex flex-col space-y-8">
            <h2 className="text-5xl text-red-600 font-poppins">
              Renters Insurance
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                Even if you don&apos;t own a home, protecting your belongings is
                important. Our renters insurance covers your personal property
                from theft, fire, and other risks, while also offering liability
                protection.
              </p>
              <p className="text-gray-600">
                Whether you&apos;re renting an apartment or house, we provide
                affordable plans that safeguard your possessions and offer peace
                of mind. Get a FREE quote today and protect your lifestyle that
                fits your budget.
              </p>
            </div>
            <Link
              href="https://app.usecanopy.com/c/you-insurance-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 w-72 flex items-center justify-center bg-red-800/90 pb-2 pr-1 rounded-full hover:scale-95"
            >
              <span
                className="h-full w-full flex items-center justify-center lg:text-xl text-white text-center font-medium uppercase bg-[#ff3448dc] border-2 border-transparent rounded-full transition
              duration-200 hover:bg-red-500 hover:border-[#e87a85ef]"
              >
                Get A Quote Today!
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-5/6 md:w-4/6 space-y-10 mt-10">
        <h2 className="text-5xl text-red-600 text-center font-poppins mx-auto">
          How Much Home Insurance Do I Need?
        </h2>
        <div className="space-y-6">
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      <div className="w-5/6 md:w-4/6 space-y-10 mt-10">
        <h2 className="text-5xl text-red-600 text-center font-poppins mx-auto">
          Homeowners Insurance Basics
        </h2>
        <div className="space-y-6">
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      <div className="w-5/6 md:w-4/6 flex flex-col p-12 bg-[#d0cfcf] mt-10">
        <div className="w-full md:w-5/6 text-3xl md:text-5xl text-red-400 mx-auto mb-6">
          Schedule a Consultation
        </div>
        <div className="w-full md:w-5/6 text-gray-500 mb-10 mx-auto">
          Want to learn more? Book a free consultation today and find the right
          auto insurance plan for you.
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
                required
              />
            </div>
          </div>

          <div className="h-28 w-full flex items-center justify-center">
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
