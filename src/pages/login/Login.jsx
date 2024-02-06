import React, { useState } from "react";
import { FormContainer } from "../../components/form/FormContainer";
import { FormControl } from "../../components/form/FormControl";
import * as Yup from "yup";
import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { reinitializeStore } from "../../components/common/store";
import {  NavLink } from "react-router-dom";

import "./login.scss";

export const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const loginFetchUserData = async (user_data) => {
    setisloading(true);
    try {
      const { data } = await AxiosConfig({
        baseURL: "http://localhost:3000/login",
        method: "post",
        data: user_data,
      });
      localStorage.setItem("user token", JSON.stringify(data.accessToken));
      const userProfile = await fetchUserProfile(
        data.accessToken,
        user_data.email
      );
      if (userProfile && userProfile.id) {
        console.log("users : ",userProfile.email);
        localStorage.setItem("user id", userProfile.id);
        localStorage.setItem("user email", userProfile.email);
        localStorage.setItem(
          "user name",
          `${userProfile.firstName} ${userProfile.lastName}`
        );
        reinitializeStore(userProfile.id);
      }
      // toast.success("Login successful");

      navigate("/");
      window.location.reload(false);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setisloading(false);
    }
  };

  const fetchUserProfile = async (accessToken, userEmail) => {
    try {
      const response = await AxiosConfig({
        baseURL: `http://localhost:3000/users?email=${userEmail}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userProfile = response.data.find(
        (user) => user.email === userEmail
      );
      return userProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const onSubmit = (values) => {
    loginFetchUserData(values);
  };
  return (
    <div className="flex login">
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
          <FormControl
            control="input"
            type="email"
            name="email"
            placeholder="e.g. mary@example.com"
            className=""
            label="Email Address"
          />
          <FormControl
            control="input"
            type="password"
            name="password"
            placeholder="strong password"
            className=""
            label="password"
          />
          <div className="box">
            <button type="submit" className="">
              {isloading ? <FiLoader /> : "login"}
            </button>
            <NavLink to={"/Register"}>
              <span>or register now</span>
            </NavLink>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};
