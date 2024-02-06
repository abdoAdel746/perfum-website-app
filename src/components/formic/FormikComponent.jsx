import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
export const FormikComponent = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Less Data")
      .max(6, "Large Data")
      .required("Name is Requierd...!"),
    email: Yup.string()
      .email("Email Formate Not Valid")
      .required("Email Requeird..!"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <h1>FormikComponent</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            {console.log(formik.touched)}
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name
              ? formik.errors.name
              : ""}
            {/* {console.log(formik)} */}
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""}
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <br />
            <button type="submit"> sign up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
