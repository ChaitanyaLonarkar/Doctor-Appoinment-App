import React, { useState } from "react";
import { chatbotAPI } from "../services/api";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    const question = { doc_id: 2, question: input };
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
        className="fixed bottom-6 right-6 bg-grey-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl cursor-pointer hover:scale-110 transition-transform duration-200 z-50"
        onClick={toggleChat}
      >
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-50 animate-fadeIn border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">Chat Assistant</span>
            <button
              className="text-lg hover:text-gray-300"
              onClick={toggleChat}
            >
              ✖
            </button>
          </div>

          {/*Chat Messages*/}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] break-words whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-200 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-3 border-t bg-white flex items-end space-x-2">
            <input style={{width:"75%"}}
              className=" border border-gray-300 rounded-lg px-3 py-2  overflow-y-auto max-h-32 outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
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
