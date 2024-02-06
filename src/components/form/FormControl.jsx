import React from "react";
import { Input } from "./Input"
;
export const FormControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case 'textarea':
      return <Input {...rest} />;

  }
};
