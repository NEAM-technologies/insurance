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
        <h2 className="text-3xl lg:text-5xl text-[#ff3447] text-center lg:text-left font-extrabold italic px-1">
          Get Affordable Auto Insurance in Minutes!
        </h2>
        <p>
          Get Affordable Auto Insurance in Minutes! Your car is more than just a
          way to get around it&apos;s an essential part of your life. Protect your
          ride with auto insurance that&apos;s designed to keep you, your loved ones,
          and your vehicle safe on the road.
        </p>
        <p>Compare quotes, find the best coverage, and start saving today.</p>

        <Link
          href="/autoInsurance"
          target="blank"
          rel="noopener noreferrer"
          className="h-20 w-80 flex items-center justify-center bg-red-800/90 pb-2 pr-1 rounded-full hover:scale-95"
        >
          <span
            className="h-full w-full flex items-center justify-center lg:text-xl text-white font-medium uppercase bg-[#ff3448dc] border-2 border-transparent rounded-full transition
              duration-200 hover:bg-red-500
              hover:border-[#e87a85ef]"
          >
            Auto Insurance Quote
          </span>
        </Link>
      </div>
      <div className="h-60 lg:h-52 w-full flex flex-col lg:flex-row items-center justify-center bg-[#fbdbdc]">
        <Image src="/logobox.png" alt="logo" height={100} width={100} />
        <p className="max-w-2xl lg:w-2/5 lg:text-2xl text-gray-600 text-center font-lulo mt-4 lg:mt-0">
          20 YEARS OF COMBINED EXPERTISE 15 PARTNERS ACROSS NORTH CAROLINA
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row md:gap-40 -mt-12">
        <div className="w-full md:w-2/5">
          <Image
            src="/autoPhoto.webp"
            height={2000}
            width={2000}
            alt="Photo of Van"
            className="h-60 md:h-[1100px] w-full object-fill"
          />
        </div>
        <div className="w-5/6 md:w-2/5 space-y-8 mx-auto pt-14">
          <h2 className="text-5xl text-red-600 font-poppins mx-auto">
            Protect Your Ride,
            <br /> Your Family, and <br />
            Your Wallet
          </h2>
          <p className="text-lg text-red-800">
            Drive with confidence - Insure with You!
          </p>

          <div className="pt-4 pb-5 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
              <div className="flex flex-col space-y-4">
                <div className="md:h-72 flex flex-col gap-4">
                  <span className="text-4xl text-red-500">01</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Customized Coverage Plans
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      We don&apos;t believe in one-size-fits-all insurance. Our
                      agents work with you to create a plan that fits your needs
                      and budget, ensuring you only pay for what matters most to
                      you.
                    </p>
                  </div>
                </div>
                <div className="md:h-72 flex flex-col gap-4">
                  <span className="text-4xl text-red-500">02</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Competitive Rates
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      We offer affordable rates without compromising on
                      coverage. Get the protection that you need and that peace
                      of mind at a price you can afford.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="md:h-72 flex flex-col gap-4">
                  <span className="text-4xl text-red-500">03</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Fast Claims Process
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      Accidents happen, and when they do, we&apos;re here to help.
                      Our claims processes are quick and hassle-free, so you can
                      get back on the road in no time.
                    </p>
                  </div>
                </div>
                <div className="md:h-72 flex flex-col gap-4">
                  <span className="text-4xl text-red-500">04</span>
                  <div>
                    <h3 className="text-lg text-red-500 mb-4">
                      Superior Customer Service
                    </h3>
                    <p className="text-gray-600 font-light leading-7 tracking-wide">
                      At YouInsuranceAgency, you&apos;re more than just a policy
                      number. Our dedicated team is always available to assist
                      you with any questions or concerns, making sure your
                      insurance experience is smooth from start to finish.
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
            className="h-16 w-80 flex items-center justify-center bg-red-800/90 mx-auto pb-2 pr-1 rounded-full hover:scale-95"
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
      <div className="w-5/6 md:w-4/6 space-y-10 mt-10">
        <h2 className="text-5xl text-red-600 text-center font-poppins mx-auto">
          How to Lower Your Auto Insurance Premium
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
          Auto Insurance Coverage Types Explained
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
