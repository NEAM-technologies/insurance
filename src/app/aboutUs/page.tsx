"use client";

// react/nextjs components
import React, { useState } from "react";
import Image from "next/image";

// framer motion components
import { motion } from "framer-motion";

// icons
import { BiLogoLinkedin } from "react-icons/bi";

// data
import { teamMembers } from "@/data";
import Link from "next/link";

const Page = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleReadMore = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-center gap-12 pt-16 pb-8">
      <div className="w-5/6 md:w-4/6 space-y-10">
        <h1 className="text-5xl text-red-600 text-center font-poppins mx-auto">
          About Us
        </h1>
        <div className="space-y-6">
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            At You Insurance Agency, we believe in providing personalized
            insurance solutions with a community-first approach. Founded by
            Anthony You, a seasoned entrepreneur with a passion for innovation,
            our mission is to bring a personal touch to insurance.
          </p>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            With a focus on trust, transparency, and tailored advice, You
            Insurance Agency is dedicated to helping you safeguard your future.
            Whether you need auto, home, or life insurance, or any other
            specialized coverage, we&apos;re here every step of the way.
          </p>
        </div>
      </div>

      <Image
        src="/owner.webp"
        alt="logo"
        height={2500}
        width={2500}
        className="w-5/6 md:w-4/6 mx-auto"
      />

      <div className="w-5/6 md:w-4/6 space-y-10">
        <h1 className="text-5xl text-red-600 text-center font-poppins mx-auto">
          Our Story
        </h1>
        <div className="space-y-6">
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            Every business starts with a vision. Anthony&apos;s journey began
            after successfully building and selling a previous business,
            inspiring him to create a local agency that prioritizes customer
            relationships over impersonal service.
          </p>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            As he transitioned from that success, a lingering thought grew into
            a compelling vision: to create an insurance company that felt more
            like a supportive friend and less like a faceless entity.
          </p>
        </div>
      </div>

      <div className="w-5/6 md:w-4/6 space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl text-red-600 font-poppins mx-auto">
            From One Vision to the Next
          </h2>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            Selling his previous venture was both an end and a beginning. It
            provided a rare opportunity to reflect on what truly mattered in
            business and in life. The idea of starting You Insurance Agency
            wasn't just about entering the home and auto insurance market; it
            was about revolutionizing it. The vision is to move away from the
            impersonal experiences often associated with insurance and build a
            company that prioritized the community and personalized service.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl text-red-600 font-poppins mx-auto">
            Our Mission: Community First
          </h2>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            In North Carolina, where neighborhoods thrive on connections and
            trust, we saw a chance to weave these values into the fabric of You
            Insurance Agency. Our mission is simple yet profound: to provide
            home, auto, and life insurance with a personal touch. We believe in
            putting people first, understanding their needs, and offering
            support every step of the way.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl text-red-600 font-poppins mx-auto">
            Looking Ahead
          </h2>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            As we continue to grow, our focus remains steadfast on the people of
            North Carolina. We are driven by a passion to make insurance
            straightforward, empathetic, and accessible. We aim to be the first
            call you make when you need guidance and the ally you trust when
            protecting your most important assets.
          </p>
          <p className="text-gray-600 font-light leading-7 tracking-wide">
            At You Insurance Agency, we&apos;re here to listen, to help, and to
            be a part of your community—every step of the way.
          </p>
        </div>
      </div>

      <div className="w-full md:w-4/6 flex flex-col items-center gap-8">
        <h2 className="text-5xl text-red-600 font-poppins">The Team</h2>
        <p className="text-2xl text-red-800 font-medium">
          Dedication. Expertise. Passion.
        </p>
        <p className="w-2/3 text-gray-600 font-light leading-7 tracking-wide">
          We are a dedicated team of professionals who genuinely care about
          protecting what matters to you. At You Insurance Agency, you're not
          just a client - you're part of this family, and we're here to support
          you every step of the way.
        </p>
      </div>

      <div className="w-5/6 md:w-4/6 grid grid-cols-1 md:grid-cols-2 gap-20 mt-10">
        {teamMembers.map(({ id, role, name, image, description, link }) => (
          <div
            key={id}
            className="h-auto flex flex-col md:flex-row items-start gap-6 bg-[#d9d9d9] p-4 rounded-md"
          >
            <Image
              src={image}
              height={2000}
              width={2000}
              alt={name}
              className="h-60 md:h-80 w-full md:w-1/2 rounded-md object-fill md:object-contain"
            />
            <div className="space-y-4 md:pt-12 w-full">
              <h3 className="text-xl font-medium">{role}</h3>
              <p className="text-xl text-red-500 font-semibold">{name}</p>
              <motion.div
                animate={{ height: expanded[id] ? "auto" : "5rem" }}
                initial={false}
                transition={{ duration: 0.1 }}
                className={`overflow-hidden transition-all ${
                  expanded[id] ? "" : "line-clamp-3"
                }`}
              >
                <p className="text-sm text-gray-600 font-light leading-7 pr-5">{description}</p>
              </motion.div>
              <div className="w-11/12 flex items-center justify-between">
                <button
                  onClick={() => toggleReadMore(id)}
                  className="text-sm font-semibold text-blue-600 hover:text-red-600 hover:underline underline-offset-2"
                >
                  {expanded[id] ? "Read Less" : "Read More"}
                </button>
                <Link href={link} target="blank" rel="noopener noreferrer" className="hover:scale-95">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-600">
                    <BiLogoLinkedin size={16} color="white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
