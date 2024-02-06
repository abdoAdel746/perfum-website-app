import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";
import { Card } from "../../components/common/card/Card";
import "./singleproduct.scss";
import VanillaTilt from "vanilla-tilt";
import { addRecent } from "../../components/common/recentview/Recentview";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../components/wishlist/WishlistSlice";
import { addItem } from "../../components/common/CartSlice";
import { FaHeart } from "react-icons/fa6";
import { LuBellRing } from "react-icons/lu";
import toast from "react-hot-toast";
import { Loading } from "../../components/common/loading/Loading";
import { FaRegHeart } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";
import { Tooltip as ReactTooltip } from "react-tooltip";
// Tilt.js
function Tilt(props) {
  const { options, singleItem, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <img ref={tilt} {...rest} src={singleItem.product_image} />;
}

export const Singleproduct = () => {
  /* 
  {
    reverse:           false,  // reverse the tilt direction
    max:               35,     // max tilt rotation (degrees)
    perspective:       1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:             1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:             300,    // Speed of the enter/exit transition
    transition:        true,   // Set a transition on enter/exit.
    axis:              null,   // What axis should be disabled. Can be X or Y.
    reset:             true,   // If the tilt effect has to be reset on exit.
    easing:            "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:             false,   // if it should have a "glare" effect
    "max-glare":       1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender": false   // false = VanillaTilt creates the glare elements for you, otherwise
                               // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
} */
  const options = {
    scale: 1.1,
    speed: 1000,
    max: 30,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: true,
  };

  const [singleItem, setSingleItem] = useState({});
  const { id } = useParams();
  async function displayItemDetails(id) {
    const { data } = await AxiosConfig({ url: `/items/${id}`, method: "get" });
    setSingleItem(data);
    console.log(singleItem);
  }
  useEffect(() => {
    displayItemDetails(id);
  }, [id]);

  const dispatch = useDispatch();
  useEffect(() => {
    let isEffectActive = true;

    if (id && isEffectActive) {
      console.log("Dispatching addrecent with productId:", id);

      dispatch(
        addRecent({
          singleItem: singleItem,
        })
      );
    }

    return () => {
      isEffectActive = false;
    };
  }, [singleItem, dispatch]);

  const wishlistItems = useSelector((state) => state.wishlist);
  const [isLiked, setIsLiked] = useState(false);
  const [isloading, setisloading] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    setisloading(true);
    e.preventDefault();
    emailjs.init("service_y9h5hak");

    const templateParams = {
      to_email: "aldesoky.abdo2@gmail.com", // Your email address
      recipient: "amrshaf6@gmail.com",
      subject: "auto reply",
      message: "اول ما يوصل هبلغك يحب",
      to_name: "gust",
    };

    emailjs
      .send(
        "service_y9h5hak",
        "template_th1w595",
        templateParams,
        "2RL6oOGLjpDNr5T_E"
      )
      .then(
        (result) => {
          toast.success("هنبلغك اول ما البضاعه توصل");
          setisloading(false);
          console.log(result.text);
        },
        (error) => {
          toast.error("فيه بروبليم");
        }
      );
  };

  const toggleIcon = (id1) => {
    {
      wishlistItems.map((item) =>
        id1 === item.id ? setIsLiked(!isLiked) : setIsLiked(isLiked)
      );
    }
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(singleItem));
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handleAddToCart = () => {
    dispatch(addItem(singleItem));
  };

  return (
    <div className="single_page flex columns-2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{singleItem.product_name}</title>
      </Helmet>
      <div className="left_single">
        <ReactTooltip
          id="tool11"
          // data-tooltip-id="tool11"
          place="bottom"
          data-tooltip-variant="light"
          content="vanila Tilt"
        />
        <h2>1/1</h2>
        <Tilt
          className="box"
          data-tooltip-id="tool11"
          options={options}
          singleItem={singleItem}
        />
        <button onClick={() => toggleIcon(id)}>
          {wishlistItems.some((item) => item.id === singleItem.id) ? (
            <FaHeart
              className="heart"
              onClick={() => handleRemoveFromWishlist(singleItem.id)}
            />
          ) : (
            <FaRegHeart
              className="heart"
              onClick={() => handleAddToWishlist(singleItem.id)}
            />
          )}
        </button>
        {/* <img src={singleItem.product_image} alt="" /> */}
      </div>
      <div className="right_single">
        <div className="box">
          <h1>{singleItem.product_name}</h1>
          <h3>
            {" "}
            {singleItem.discount != 0 && singleItem.stoke != 0 ? (
              <div>
                <span className="price_after_discount">
                  {singleItem.price - (singleItem.price * singleItem.discount) / 100}
                </span>
                <span className="real_price text-gray-500 text-sm line-through">
                  ${singleItem.price}
                </span>
              </div>
            ) : (
              <span>${singleItem.price}</span>
            )}
          </h3>
          <p>incl. local Tax & Shipping.</p>
        </div>
        <div className="box">
          <h2>Describtion</h2>
          <p>{singleItem.product_description}</p>
        </div>
        <div className="box">
          <div className="upper_box flex">
            <div>
              <span>categeroy item</span>
              <span>{singleItem.category}</span>
            </div>
            <div>categeroy guide</div>
          </div>
          {/* <div className="down_box flex">
            <div className="flex">
              <span>134mm</span>
              <span>small</span>
            </div>
            <div className="flex">
              <span>134mm</span>
              <span>Medium</span>
            </div>
            <div className="flex">
              <span>134mm</span>
              <span>large</span>
            </div>
          </div> */}
        </div>
        {/* <div className="box">
          <div className="flex">
            <span>Select Color</span>
            <span>Gold</span>
          </div>
          <div className="flex">
            <div className="circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <circle
                  cx="13"
                  cy="13"
                  r="13"
                  fill="url(#paint0_linear_67_1317)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_67_1317"
                    x1="26"
                    y1="-6"
                    x2="2.5"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#AE7B4B" />
                    <stop offset="0.28125" stop-color="#AE7B4B" />
                    <stop
                      offset="0.46875"
                      stop-color="#B6895E"
                      stop-opacity="0.8"
                    />
                    <stop offset="0.682292" stop-color="#E9DDD2" />
                    <stop offset="1" stop-color="#AE7B4B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <circle
                  cx="13"
                  cy="13"
                  r="13"
                  fill="url(#paint0_linear_67_1318)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_67_1318"
                    x1="26"
                    y1="-6"
                    x2="2.5"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#CFCFCF" />
                    <stop offset="0.28125" stop-color="#CFCFCF" />
                    <stop
                      offset="0.46875"
                      stop-color="#CFCFCF"
                      stop-opacity="0.8"
                    />
                    <stop offset="0.682292" stop-color="#949494" />
                    <stop offset="1" stop-color="#CFCFCF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  fill="url(#paint0_linear_67_1321)"
                />
                <circle cx="16" cy="16" r="15.5" stroke="#1E1E1E" />
                <defs>
                  <linearGradient
                    id="paint0_linear_67_1321"
                    x1="29"
                    y1="-3"
                    x2="5.5"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#BBA14F" />
                    <stop offset="0.28125" stop-color="#B59452" />
                    <stop offset="0.427083" stop-color="#BBA14F" />
                    <stop offset="0.645833" stop-color="#E9E3D2" />
                    <stop offset="0.84375" stop-color="#BBA14F" />
                    <stop offset="1" stop-color="#BBA14F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div> */}
        <div className="box">
          {singleItem.stoke != 0 ? (
            <div>
              <button
                onClick={() => {
                  // editSoldValue(id);
                  handleAddToCart();
                }}
              >
                add to cart
              </button>
            </div>
          ) : (
            <form className="cf" ref={form} onSubmit={sendEmail}>
              <button type="submit" className="">
                {isloading ? (
                  <Loading className="loading_btn" />
                ) : (
                  <LuBellRing />
                )}
              </button>
            </form>
          )}
        </div>
        {/* <div className="box">
          <h2>Describtion</h2>
          <p>{singleItem.product_description}</p>
          <ul>
            <li>99.7% pure titanium front</li>
            <li>99.7% pure titanium front</li>
            <li>99.7% pure titanium front</li>
            <li>99.7% pure titanium front</li>
            <li>99.7% pure titanium front</li>
            <li>99.7% pure titanium front</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};
