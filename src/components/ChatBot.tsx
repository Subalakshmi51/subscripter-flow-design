
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Hi there! How can I help you choose the right subscription plan?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Our Pro plan is perfect for small teams up to 5 people! It includes 50GB storage and API access.",
        "The Business plan includes advanced features like custom branding and priority support.",
        "Yes, you can upgrade or downgrade your plan at any time!",
        "All plans come with a free trial period so you can test before you commit.",
        "Our Enterprise plan includes a dedicated account manager and unlimited users.",
      ];

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={toggleChat}
          className={`rounded-full shadow-lg w-14 h-14 p-0 ${
            isOpen
              ? "bg-red-500 hover:bg-red-600"
              : "bg-brand-purple hover:bg-brand-purple-dark"
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-white rounded-xl shadow-xl overflow-hidden z-40 border flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-brand-purple text-white p-4">
              <h3 className="font-semibold">Subscription Assistant</h3>
              <p className="text-xs text-white/80">We typically reply in a few minutes</p>
            </div>

            <div className="flex-1 p-4 max-h-96 overflow-y-auto flex flex-col space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-brand-purple text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/logo.png" />
                          <AvatarFallback className="bg-brand-purple text-white text-xs">
                            Bot
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold">Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about our plans..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:border-brand-purple"
              />
              <Button
                onClick={handleSendMessage}
                className="rounded-l-none bg-brand-purple hover:bg-brand-purple-dark"
              >
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
