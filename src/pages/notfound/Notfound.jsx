import React from "react";
import "./notfound.scss";
import {  NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const Notfound = () => {
  return (
    <div className="error_page flex columns-3">
      <Helmet>
        <title>404 - Page not found</title>
      </Helmet>
      <span>4</span>
      <div className="box">
        <img
          src="/public/assets/images/weddingBackground.png"
          alt=""
          srcset=""
        />
        <NavLink
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
          }}
          to={""}
        >
          <button>Back Home</button>
        </NavLink>
      </div>
      <span>4</span>
    </div>
  );
};
