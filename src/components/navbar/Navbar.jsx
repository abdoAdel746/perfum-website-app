import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopCart } from "./../common/ShopCart";
import { Search } from "./../search/Search";
import { Login } from "../../pages/login/Login";
import { Register } from "../../pages/register/Register";
import { useNavigate } from "react-router-dom";
import { reinitializeStore } from "../common/store";
import { Checkout } from "./../../pages/checkout/Checkout";
import "./navbar.scss";
import { IoIosSearch } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { useMatch, NavLink } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { Wishlist } from "./../wishlist/Wishlist";

export const Navbar = () => {
  const usertoken = localStorage.getItem("user token");
  const user_id = localStorage.getItem("user id");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored user authentication data
    reinitializeStore(user_id);
    window.dispatchEvent(new Event("storage"));

    localStorage.removeItem("user token");
    localStorage.removeItem("user email");
    localStorage.removeItem("user id");
    localStorage.removeItem("user name");

    // Redirect to login or home page
    navigate("/login");
    window.location.reload();
  };

  const [scroll, setscroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setscroll(window.scrollY > 10);
    });
  }, []);

  const matchhome = useMatch("/");
  const matchproduct = useMatch("/Products");
  const matchGift = useMatch("/Gift");
  const matchContact = useMatch("/Contact");
  const matchAbout = useMatch("/About");
  const matchWedding = useMatch("/Wedding");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <header className={scroll ? "header_shadow" : ""}>
        <nav className="">
          <div className="up columns-3 gap-0">
            <div className="inline-flex"></div>
            <div className=" flex justify-center">
              <img src="/public/assets/images/logo.png" alt="logo" />
            </div>

            <div className=" flex justify-end columns-3 gap-5">
              <ShopCart />
              <Search />
              <Wishlist />
              <div className="">
                <FaRegUser
                  className="text-2xl cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownVisible && (
                  <div className="absolute drop_menu">
                    <h1>
                      hello,{" "}
                      {localStorage.getItem("user name")
                        ? localStorage.getItem("user name")
                        : "guest"}
                    </h1>
                    <ul>
                      {usertoken == null ? (
                        <>
                          <NavLink to={"/Login"} onClick={toggleDropdown}>
                            <li>login</li>
                          </NavLink>
                          <NavLink to={"/Register"} onClick={toggleDropdown}>
                            <li>register</li>
                          </NavLink>
                        </>
                      ) : (
                        ""
                      )}

                      {/* {usertoken != null ? <li>My Account</li> : ""} */}
                      <NavLink to={"/Checkout"} onClick={toggleDropdown}>
                        <li>cart</li>
                      </NavLink>

                      {usertoken != null ? (
                        <NavLink to={"/Oldorder"} onClick={toggleDropdown}>
                          <li>old orders</li>
                        </NavLink>
                      ) : (
                        ""
                      )}
                    </ul>

                    {usertoken != null ? (
                      <h2 onClick={handleLogout} className="logout_button" aria-label="logout">
                        Logout
                      </h2>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="down flex justify-between items-center p-4">
            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
              to={""}
            >
              Home
              {matchhome ? (
                <img
                  src="/public/assets/images/Arrow.svg"
                  className="absolute"
                  alt="arrow"
                />
              ) : (
                ""
              )}
            </NavLink>
            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
              to={"/Products"}
            >
              Products
              {matchproduct ? (
                <img
                  src="/public/assets/images/Arrow.svg"
                  className="absolute"
                />
              ) : (
                ""
              )}
            </NavLink>
            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
              to={"/Gift"}
            >
              Gift Perfums
              {matchGift ? (
                <img
                  src="/public/assets/images/Arrow.svg"
                  className="absolute"
                />
              ) : (
                ""
              )}
            </NavLink>
            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
              to={"/Wedding"}
            >
              Wedding Service
              {matchWedding ? (
                <img
                  src="/public/assets/images/Arrow.svg"
                  className="absolute"
                />
              ) : (
                ""
              )}
            </NavLink>
            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
              to={"/About"}
            >
              About
              {matchAbout ? (
                <img
                  src="/public/assets/images/Arrow.svg"
                  className="absolute"
                />
              ) : (
                ""
              )}
            </NavLink>

            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
              to={"/Contact"}
            >
              Contact
              {matchContact ? (
                <img
                  src="/public/assets/images/Arrow.svg"
                  className="absolute"
                />
              ) : (
                ""
              )}
            </NavLink>

            {/* {usertoken != null ? (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      ) : (
        <>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
            to={"/Login"}
          >
            login
          </NavLink>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
            to={"/Register"}
          >
            register
          </NavLink>
        </>
      )}
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
          };
        }}
        to={"/Checkout"}
      >
        Checkout
      </NavLink>

      <NavLink
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
          };
        }}
        to={"/Oldorder"}
      >
        Oldorder
      </NavLink>
      
      <Wishlist /> */}
          </div>
        </nav>
      </header>
    </>
  );
};
