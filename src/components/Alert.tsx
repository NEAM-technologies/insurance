"use client";

import { useAlertStore } from "@/store/useAlertStore";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoAlert } from "react-icons/io5";

const Alert = () => {
  const { type, message, icon: Icon, isVisible, hideAlert } = useAlertStore(
    (state) => state
  );

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideAlert]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="alert"
          initial={{
            right: "0",
          }}
          animate={{
            right: "1rem",
          }}
          exit={{
            right: "-50rem",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className={`fixed top-28 xl:top-60 flex h-fit w-64 sm:w-80 md:w-96 bg-white mr-6 md:mr-0 p-2 rounded-md shadow-xl border-t-4
            ${
              type === "success"
                ? "border-emerald-500 text-emerald-500"
                : type === "error"
                ? "border-rose-500 text-rose-500"
                : type === "info" && "border-blue-500 text-blue-500"
            } z-[1000000]`}
        >
          {/* alert body */}
          <div className="relative w-full">
            {/* Alert Heading */}
            <div className="flex items-center space-x-2 font-bold">
              {type === "success" ? (
                <span className="rounded-full bg-emerald-500 text-white">
                  <TiTick />
                </span>
              ) : type === "error" ? (
                <span className="rounded-full bg-rose-500 text-white">
                  <IoAlert />
                </span>
              ) : type === "info" ? (
                <span className="rounded-full bg-blue-500 text-white">
                  {/* Use an info icon or any other suitable icon */}
                  <IoAlert />
                </span>
              ) : null}
              <p className="flex-1 capitalize">{type}</p>
              <button onClick={hideAlert} className="">
                <MdClose size={20} />
              </button>
            </div>
            {/* Alert Body Content */}
            <p className="flex items-center gap-3 text-black text-sm text-wrap mt-1 px-6">
              {Icon && <Icon size={24} color="#3b82f6"/>}
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
