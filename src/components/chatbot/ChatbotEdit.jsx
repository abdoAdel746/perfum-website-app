import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import "./chatbot.scss";
import { FaRobot } from "react-icons/fa6";

export const ChatbotEdit = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible((prevVisibility) => !prevVisibility);
  };

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  return (
    <>
      <FaRobot className="svg_bot" onClick={toggleChatbot} />
      {/* <span className="svg_bot" onClick={toggleChatbot}> */}

      {isChatbotVisible && (
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
          className="chatbot"
        />
      )}
    </>
  );
};
