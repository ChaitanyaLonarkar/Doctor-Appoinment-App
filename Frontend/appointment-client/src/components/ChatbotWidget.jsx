import React, { useState } from "react";
import { chatbotAPI } from "../services/api";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello there👋  How can I assist you?" }]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    const question = { doc_id: 3, question: input };
    setInput("");

    // if (onSendMessage) {
    //   const botReply = await onSendMessage(userText);
    //   const botMsg = { sender: "bot", text: botReply };
    //   setMessages((prev) => [...prev, botMsg]);
    // }
    const response = await chatbotAPI.sendMessagetoBot(question);
    console.log(response.data, "botreply");
    const botMsg = { sender: "bot", text: response.data.answer };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 z-50 animate-pulse hover:animate-none"
        onClick={toggleChat}
      >
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fadeIn border-2 border-indigo-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-lg">
            <span className="font-semibold text-lg flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Chat Assistant
            </span>
            <button
              className="text-xl hover:text-gray-300 transition-all hover:rotate-90 duration-300"
              onClick={toggleChat}
            >
              ✖
            </button>
          </div>

          {/*Chat Messages*/}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-blue-50 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[75%] break-words whitespace-pre-wrap shadow-md transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white ml-auto text-right"
                    : "bg-white mr-auto border border-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-4 border-t-2 border-indigo-100 bg-white flex items-end space-x-2 rounded-b-2xl">
            <input style={{width:"75%"}}
              className="border-2 border-indigo-200 rounded-xl px-4 py-2 overflow-y-auto max-h-32 outline-none focus:border-indigo-500 transition-all duration-300"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
