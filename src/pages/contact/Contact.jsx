import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormContainer } from "./../../components/form/FormContainer";
import { FormControl } from "../../components/form/FormControl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./contact.scss";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiFacebookLogo } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Helmet } from "react-helmet-async";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";
import { Loading } from "../../components/common/loading/Loading";

export const Contact = () => {
  // Validation Schema using Yup
  const phoneNumber = "+20 1556655482";
  const [isloading, setisloading] = useState(false);

  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    lname: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    message: Yup.string().min(10, "Too Short!").required("Required"),
  });

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  // const onSubmit = (values) => {
  //   // Handle form submission logic here
  //   // For example, sending data to a server
  //   console.log(values);
  //   toast.success("Message sent successfully");
  // };
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const updateOrders = AxiosConfig({
      method: "post",
      url: `https://five5-08t6.onrender.com/emails`,
      data: {
        recipient: values.email,
        message: values.message,
        to_namef: values.fname,
        to_namel: values.lname,
      },
    });

    emailjs.init("your-emailjs-user-id");
    setisloading(true);

    // Use the values from the form
    const templateParams = {
      to_email: "aldesoky.abdo2@gmail.com",
      recipient: values.email, // Use email from form
      subject: values.subject, // Use subject from form
      message: values.message, // Use message from form
      to_name: values.name, // Use name from form
    };

    emailjs
      .send(
        "service_zny1ez2",
        "template_w1lb5gt",
        templateParams,
        "2RL6oOGLjpDNr5T_E"
      )
      .then(
        (result) => {
          console.log(result.text);
          setisloading(false);
          toast.success("Message sent successfully");
          setSubmitting(false); // Indicate that submission is complete
          resetForm(); // Reset Formik form
        },
        (error) => {
          console.log(error.text);
          toast.error("Message failed");
          setSubmitting(false); // Indicate that submission is complete
        }
      );
  };

  const address = "Shoubra El Khaima 2nd Police Department, cairo, egypt";

  const handleAddressClick = () => {
    const formattedAddress = encodeURIComponent(address);
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  };
  const email = "aldesoky.abdo2@gmail.com";

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="contact flex">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us</title>
      </Helmet>
      <div className="left_contact">
        <h1>Contact Information</h1>
        <h4>Say something to start a live chat!</h4>
        <div className="box">
          <div className="flex">
            <BsFillTelephoneOutboundFill />
            <span onClick={handleEmailClick}>{phoneNumber}</span>
          </div>
          <div className="flex">
            <MdEmail />

            <a href={`mailto:${"aldesoky.abdo2@gmail.com"}`}>
              aldesoky.abdo2@gmail.com
            </a>
          </div>
          <div className="flex">
            <FaMapMarkerAlt />
            <span onClick={handleAddressClick}>{address}</span>
          </div>
        </div>
        <div className="icons">
          <a href="https://www.facebook.com/3bdulrahman3del/" target="_black">
            <PiFacebookLogo />
          </a>
          <a href="https://www.facebook.com/3bdulrahman3del/" target="_black">
            <FaInstagram />
          </a>{" "}
          <a href="https://www.facebook.com/3bdulrahman3del/" target="_black">
            <RiTwitterXFill />
          </a>
        </div>
      </div>
      <ReactTooltip
        id="tool10"
        // data-tooltip-id="tool10"
        place="bottom"
        data-tooltip-variant="light"
        content="emailjs with yup"
      />
      <div className="rigt_contact">
        <FormContainer
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <div className="flex">
            <FormControl
              control="input"
              type="text"
              name="fname"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              label="First Name"
            />
            <FormControl
              control="input"
              type="text"
              name="lname"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              label="Last Name"
            />
          </div>
          <div className="flex">
            <FormControl
              control="input"
              type="email"
              name="email"
              placeholder="Subject"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              label="Email"
            />
            <FormControl
              control="input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              label="Phone Number"
            />
          </div>
          <div className="box relative">
            <FormControl
              control="textarea"
              type="textarea"
              maxlength="100"
              name="message"
              placeholder="Message"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 h-32"
              label="Message"
            />
            <img
              className="absolute"
              src="/public/assets/images/sned.png"
              alt=""
              srcset=""
            />
          </div>
          <button type="submit" className="" data-tooltip-id="tool10">
            {isloading ? <Loading className="loading_btn" /> : "send"}
          </button>
        </FormContainer>
      </div>
    </div>
  );
};
