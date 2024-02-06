import React from "react";
import './button.scss'

export const Button = ({ text, ...otherProps }) => {
    return (
      <button {...otherProps}>
        {text}
      </button>
    );
  };