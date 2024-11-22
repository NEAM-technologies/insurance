"use client";

// react/nextjs components
import React, { useState } from "react";

// icons
import { FaSmile, FaPaperclip } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const LetsChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [message, setMessage] = useState("");
  //   const [messages, setMessages] = useState([
  //     {
  //       sender: "You Insurance Agency",
  //       text: "Hello! How can we assist you today?",
  //     },
  //   ]);

  //   const handleSendMessage = () => {
  //     if (message.trim()) {
  //       setMessages([...messages, { sender: "You", text: message }]);
  //       setMessage("");
  //     }
  //   };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the chat modal */}
      {!isModalOpen && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-4 text-xl text-white font-extralight bg-[#f15e63] px-6 py-3 rounded-full fixed bottom-5 right-5 shadow-lg"
        >
          <BiSolidMessageRoundedDetail />
          Let's Chat!
        </button>
      )}
      {/* Chat Modal */}
      {isModalOpen && (
        <div className="fixed bottom-5 right-5 w-[22rem] h-[500px] bg-gray-50 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="h-20 flex items-center justify-between p-5">
            <div className="flex flex-col">
              <h3 className="text-xl text-gray-700 tracking-wide">
                You Insurance Agency
              </h3>
              <div className="flex items-center justify-center gap-3 pl-1">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <p>We&apos;ll reply as soon as we can</p>
              </div>
            </div>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-black"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[22rem] bg-[#d0cfcf] overflow-y-auto"></div>

          {/* Message Input */}
          <div className="h-16 flex items-center justify-between p-5">
            <input
              type="text"
              //   value={message}
              //   onChange={(e) => setMessage(e.target.value)}
              //   onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Write your message..."
              className="bg-transparent border-0 focus:outline-none"
            />
            <div className="flex gap-4">
              <button>
                <FaSmile className="text-gray-400" />
              </button>
              <button>
                <FaPaperclip className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetsChat;
