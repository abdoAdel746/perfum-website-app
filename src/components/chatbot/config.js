import { createChatBotMessage } from "react-chatbot-kit";

const user_name = localStorage.getItem("user name");

const config = {
  botName: "Erasoft",
  initialMessages: [createChatBotMessage(`Hello ${user_name || "guest"} `)],
};

export default config;
