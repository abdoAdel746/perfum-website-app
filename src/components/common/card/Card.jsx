import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  checkforprodcuct,
} from "../../wishlist/WishlistSlice";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { FaHeart } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import toast from "react-hot-toast";
import { Loading } from "../loading/Loading";
// import jsonData from "../../../../public/assets/data/data.json";

import { AxiosConfig } from "../../../axiosconfig/AxiosConfig";

export const Card = (data) => {
  const [isloading, setisloading] = useState(false);

  const { product_name, category, product_image, discount, stoke, id, price } =
    data.data;

  const wishlistItems = useSelector((state) => state.wishlist);

  // console.log(product_image);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(data.data));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(data.data));
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handlechekfisaddedttowishlist = (itemId) => {
    dispatch(checkforprodcuct(itemId));
  };

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
    // emailjs
    //   .sendForm(
    //     "service_y9h5hak",
    //     "template_th1w595",
    //     form.current,
    //     '2RL6oOGLjpDNr5T_E'
    //   )

    emailjs
      .send(
        "service_y9h5hak",
        "template_th1w595",
        templateParams,
        "2RL6oOGLjpDNr5T_E"
      )
      .then(
        (result) => {
          toast.success("we will contact you when the perfum available");
          setisloading(false);
          // console.log(result.text);
        },
        (error) => {
          toast.error("فيه بروبليم");
        }
      );
  };

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // console.log("wishlistItems changed");
  }, [wishlistItems]);

  const toggleIcon = (id1) => {
    {
      wishlistItems.map((item) =>
        id1 === item.id ? setIsLiked(!isLiked) : setIsLiked(isLiked)
      );
    }
  };

  // const updateSoldValue = async (itemId) => {
  //   try {
  //     // Send a PATCH request to update the sold value
  //     const currentDataResponse = await AxiosConfig({
  //       method: "get",
  //       url: `http://localhost:8000/items/${itemId}`,
  //     });

  //     const currentItem = currentDataResponse.data;

  //     // Step 2: Update the item with the new sold value
  //     const updatedDataResponse = await AxiosConfig({
  //       method: "patch",
  //       url: `http://localhost:8000/items/${itemId}`,
  //       data: {
  //         sold: currentItem.sold + 1, // Increment the sold value
  //       },
  //     });

  //     // console.log(currentDataResponse.data);
  //     // toast.success("Sold count updated successfully");
  //   } catch (error) {
  //     console.error(error);
  //     // toast.error("Error updating sold count");
  //   }
  // };

  // const editSoldValue = (itemId) => {
  //   updateSoldValue(itemId);
  // };

  const upldaterecent = async (itemId) => {
    try {
      // Send a PATCH request to update the sold value
      const currentDataResponse = await AxiosConfig({
        method: "get",
        url: `http://localhost:8000/items/${itemId}`,
      });

      const currentItem = currentDataResponse.data;

      // Step 2: Update the item with the new sold value
      const updatedDataResponse = await AxiosConfig({
        method: "patch",
        url: `http://localhost:8000/items/${itemId}`,
        data: {
          sold: currentItem.sold + 1, // Increment the sold value
        },
      });

      // console.log(currentDataResponse.data);
      // toast.success("Sold count updated successfully");
    } catch (error) {
      console.error(error);
      // toast.error("Error updating sold count");
    }
  };

  return (
    <>
      <div className="product">
        <div
          className="up"
          onClick={() => {
            upldaterecent(id);
            navigate(`/singleItem/${category}/${id}`);
          }}
        >
          <img src={product_image} alt={product_name} />
          {discount != 0 && stoke != 0 ? (
            <span className="discount">{discount}%</span>
          ) : (
            ""
          )}
        </div>

        <div className="down">
          <h5>{category}</h5>
          <h1>{product_name}</h1>
          <div className="box flex columns-2">
            <div className="price flex columns-2">
              <div className="left__price">
                <div className="price_now flex">
                  {discount != 0 && stoke != 0 ? (
                    <div>
                      <span className="price_after_discount">
                        {price - (price * discount) / 100}
                      </span>
                      <span className="real_price text-gray-500 text-sm line-through">
                        ${price}
                      </span>
                    </div>
                  ) : (
                    <span>${price}</span>
                  )}
                </div>
                {stoke == 0 ? (
                  <div className="outofstock">Out of Stock</div>
                ) : (
                  ""
                )}
              </div>
              <div className="right">
                <button aria-label="heart" onClick={() => toggleIcon(id)}>
                  {wishlistItems.some((item) => item.id === id) ? (
                    <FaHeart
                      className="heart"
                      onClick={() => handleRemoveFromWishlist(id)}
                    />
                  ) : (
                    <FaRegHeart
                      className="heart"
                      onClick={() => handleAddToWishlist(id)}
                    />
                  )}
                </button>
                {stoke != 0 ? (
                  <div>
                    <CiCirclePlus
                      onClick={() => {
                        // editSoldValue(id);
                        handleAddToCart();
                      }}
                      className="add"
                    />
                  </div>
                ) : (
                  <form className="cf" ref={form} onSubmit={sendEmail}>
                    <button aria-label="submit"  type="submit" className="">
                      {isloading ? (
                        <Loading className="loading_btn" />
                      ) : (
                        <LuBellRing />
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
<img
  className="w-full h-64 object-cover"
  src={product_image}
  alt={product_name}
/>
<div className="px-6 py-4">
  <h4 onClick={() => navigate(`/singleItem/${category}/${id}`)}>
    {product_name}
  </h4>
  <p className="text-gray-700 text-base mb-2">{category}</p>

  {discount != 0 && stoke != 0 ? (
    <span className="bg-green-500 text-white py-1 px-2 rounded-full mr-2">
      {discount}%
    </span>
  ) : (
    ""
  )}

  {stoke == 0 ? (
    <span className="bg-red-500 text-white py-1 px-2 rounded-full mr-2">
      Out of Stock
    </span>
  ) : (
    ""
  )}
  {discount != 0 ? (
    <div>
      <span className="text-green-500 text-xl font-bold ml-2">
        ${(oldPrice * discount) / 100}
      </span>
      <span className="text-gray-500 text-sm line-through">
        ${oldPrice}
      </span>
    </div>
  ) : (
    <span
      className={`text-gray-500 text-sm ${
        (oldPrice * discount) / 100 ? "line-through" : ""
      }`}
    >
      ${oldPrice}
    </span>
  )}
</div>

<div className="px-6 pt-4 pb-2">
  {stoke != 0 ? (
    <div>
      <button
        onClick={handleAddToWishlist}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Add to Wishlist
      </button>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  ) : (
    <form className="cf" ref={form} onSubmit={sendEmail}>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        reminder me
      </button>
    </form>
  )}
</div>
</div> */
}
