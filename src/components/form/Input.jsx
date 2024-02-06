import { ErrorMessage, Field } from "formik";
import React from "react";
import { TextError } from "./TextError";
import './input.scss'

export const Input = ({ label, name, type, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="feild_name">
        <div>
          <Field type={type} name={name} {...rest} />
          <span class="left"></span>
        </div>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
