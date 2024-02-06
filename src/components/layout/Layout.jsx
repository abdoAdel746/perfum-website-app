import React from "react";
import { Navbar } from "./../navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./../footer/Footer";

import { ChatbotEdit } from "./../chatbot/ChatbotEdit";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <ChatbotEdit />
      <Outlet />
      <Footer />
    </>
  );
};
