import { Form, Formik } from "formik";
import React from "react";

export const FormContainer = ({
  btnText,
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          {children}
          {/* <button type="submit">{btnText}</button> */}
        </Form>
      )}
    </Formik>
  );
};
