import React, {  useState } from "react";
import * as Yup from "yup";
import { FormContainer } from "./../../components/form/FormContainer";
import { FormControl } from "../../components/form/FormControl";
import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {  NavLink } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

import "./register.scss";

export const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    cart: [{}],
    wishlist: [{}],
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string(), // Address is optional
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // const [userData, setUserData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   password: "",
  //   address: "",
  // });

  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);

  const registerFetchUserData = async (user_data) => {
    setisloading(true);

    try {
      const { data } = await AxiosConfig({
        baseURL: "http://localhost:3000/register",
        method: "post",
        data: {
          ...user_data,
          name: `${user_data.firstName} ${user_data.lastName}`,
        },
      });
      localStorage.setItem("user token", JSON.stringify(data.accessToken));
      console.log("newUser: ", data);

      // Fetch the new user's ID
      const response = await AxiosConfig({
        baseURL: `http://localhost:3000/users?email=${user_data.email}?name=${user_data.firstName}_${user_data.lastName}`,
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });

      const newUser = response.data.find(
        (user) => user.email === user_data.email
      );

      if (user_data) {
        // localStorage.setItem("user id", user_data.id);
        localStorage.setItem("user email", user_data.email);
        localStorage.setItem(
          "user name",
          `${user_data.firstName} ${user_data.lastName}`
        );
      }

      toast.success("Account created successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setisloading(false);
    }
  };

  const onSubmit = (values) => {
    registerFetchUserData(values);
  };

  return (
    <div className="flex register">
      <div className="left_login">
        <h1>welcome back !</h1>
        <p>login to your hoem and enjpy smell new world</p>
      </div>

      <div className="right_login">
        <h2 className="">PERSONAL INFORMATION</h2>
        <FormContainer
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <div className="box_feilds">
            <FormControl
              control="input"
              type="text"
              name="firstName"
              placeholder="First Name"
              label="First Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FormControl
              control="input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <FormControl
            control="input"
            type="text"
            name="address"
            placeholder="Address (Optional)"
            label="Address"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FormControl
            control="input"
            type="email"
            name="email"
            placeholder="Email Address"
            label="Email Address"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="box_feilds">
            <FormControl
              control="input"
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FormControl
              control="input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="box">
            <button type="submit" className="">
              {isloading ? <FiLoader /> : "register"}
            </button>
            <NavLink to={"/Login"}>
              <span>or login now</span>
            </NavLink>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};
