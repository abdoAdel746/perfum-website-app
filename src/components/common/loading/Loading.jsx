import React from "react";
import "./loading.scss";

export const Loading =  ({ ...otherProps }) => {
  return (
    <div {...otherProps}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
