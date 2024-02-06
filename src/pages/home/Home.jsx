import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";
import React, {  useEffect, useState } from "react";
import "./home.scss";
import { addItem } from "../../components/common/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Card } from "../../components/common/card/Card";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { RoughNotation } from "react-rough-notation";
// import Typed from "typed.js";
import ScrollReveal from "scrollreveal";
import TypeIt from "typeit-react";
import {  useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { jwtDecode } from "jwt-decode";

export const Home = () => {
  const token = localStorage.getItem("user token");
  if (token) {
    const decoded = jwtDecode(token);
    // console.log("decoded: ", decoded);
  }

  const navigate = useNavigate();
  const [allporoducts, setAllProducts] = useState([]);
  const [maxSoldItem, setMaxSoldItem] = useState([]);
  const [maxSoldItemprice, setMaxSoldItemprice] = useState([]);
  const [trenProduct, setTrendProduct] = useState([]);
  const [mostresent, setResent] = useState([]);
  const [newstarrival, setnewstarrival] = useState([]);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const addToCartfun = (item) => {
    console.log(item);
    dispatch(addItem(item));
  };

  const getAllpProducts = async () => {
    const { data } = await AxiosConfig({ url: "/items", method: "get" });
    setAllProducts(data);

    const maxSoldItem = data.reduce((maxItem, currentItem) => {
      return currentItem.sold > maxItem.sold ? currentItem : maxItem;
    }, data[0]);
    setMaxSoldItemprice(maxSoldItem.price);
    setMaxSoldItem(maxSoldItem);

    const trenProduct = data.filter((word) =>
      word.trend == "yes" ? word : ""
    );
    setTrendProduct(trenProduct);

    const mostresent = data
      .filter((item) => item.recentview === 1)
      .sort((a, b) => b.recentview - a.recentview)
      .slice(0, 3);

    setResent(mostresent);

    const newstarrival = data.filter((word) =>
      word.arrival == "new" ? word : ""
    );
    setnewstarrival(newstarrival);
  };
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    getAllpProducts();
    AOS.init({
      disable: "mobile",
    });
  }, []);
  const [showAnnotation, setShowAnnotation] = useState(false);

  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      duration: 2000,
      opacity: 0,
      origin: "top",
      reset: false,
      distance: "100%",
      easing: "ease",
    });

    // Configure the elements you want to animate
    sr.reveal("#recent", {
      delay: 150,
      origin: "right",
    });
    sr.reveal("#sold", {
      delay: 150,
      origin: "left",
    });
    sr.reveal("#trend", {
      delay: 1000,
      origin: "left",
    });
    sr.reveal("#newset", {
      delay: 1000,
      origin: "right",
    });

    const handleScroll = () => {
      // You can adjust this threshold as needed
      const scrollThreshold = 500;

      // Get the current scroll position
      const scrollY = window.scrollY || window.pageYOffset;

      // Check if the scroll position meets your condition
      // console.log(scrollY);
      if (
        (scrollY >= 300 && scrollY <= 800) ||
        (scrollY >= 890 && scrollY <= 1600) ||
        (scrollY >= 1600 && scrollY <= 2200) ||
        (scrollY >= 2250 && scrollY <= 2900) ||
        (scrollY >= 2900 && scrollY <= 3600) ||
        (scrollY >= 3600 && scrollY <= 4400)
      ) {
        setShowAnnotation(true);
      } else {
        setShowAnnotation(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const header_name = useRef(null);

  // useEffect(() => {
  //   const typed = new Typed(header_name.current, {
  //     strings: ['Perfumes de la Hommes', 'is the best perfum'],
  //     typeSpeed: 50,
  //   });

  //   return () => {
  //     typed.destroy();
  //   };
  // }, []);
  // ScrollReveal().reveal('#brand',{
  //   duration: 1500,
  //   opacity: 1,
  //   distance: "50%",
  //   origin: "top",
  //   reset: true
  // });

  const recentItems = useSelector((state) => state.recentView.recentItems);
  // console.log(recentItems);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <section className="header_cont flex columns-2 bg-red-500">
        <div className="left">
          {/* <LazyLoad height={562}> */}
          <img
            src="/public/assets/images/home_header.webp"
            srcset="
                      /public/assets/images/home_header.webp 280w,
                      /public/assets/images/home_header.webp 480w,
                      /public/assets/images/home_header.webp 560w,
                      /public/assets/images/home_header.webp 840w,
                      /public/assets/images/home_header.webp 960w,
                      /public/assets/images/home_header.webp 1440w"
            sizes="(min-width: 768px) 480px, 87.5vw"
            alt="Image description"
            // className="w-full h-full"
            fetchpriority="high"
          />
          {/* </LazyLoad> */}
        </div>
        <div className="right  flex-col">
          <ReactTooltip
            id="tool1"
            place="bottom"
            data-tooltip-variant="light"
            content="TypeIt"
          />
          <h1 data-tooltip-id="tool1">
            <TypeIt
              // speed="10"
              // autoStart = "true"
              getBeforeInit={(instance) => {
                instance
                  .type("t")
                  .pause(206)
                  .type("h")
                  .pause(153)
                  .type("e")
                  .pause(342)
                  .type(" ")
                  .pause(328)
                  .type("b")
                  .pause(120)
                  .type("e")
                  .pause(224)
                  .type("s")
                  .pause(312)
                  .type("t")
                  .pause(416)
                  .type(" ")
                  .pause(609)
                  .type("f")
                  .pause(136)
                  .type("u")
                  .pause(216)
                  .type("c")
                  .pause(232)
                  .type("😬")
                  .pause(400)
                  .delete(1)
                  .pause(216)
                  .delete(1)
                  .pause(216)
                  .delete(1)
                  .pause(192)
                  .delete(1)
                  .pause(1441)
                  .type("p")
                  .pause(367)
                  .type("e")
                  .pause(352)
                  .type("r")
                  .pause(328)
                  .type("f")
                  .pause(160)
                  .type("u")
                  .pause(296)
                  .type("m")
                  .pause(384)
                  .type(" ")
                  .pause(272)
                  .type("a")
                  .pause(231)
                  .type("t")
                  .pause(169)
                  .type(" ")
                  .pause(168)
                  .type("a")
                  .pause(112)
                  .type("l")
                  .pause(151)
                  .type("l")
                  .move(-7, { speed: 449 })
                  .type("e")
                  .move(7, { speed: 247 })
                  .pause(406)
                  .delete(1)
                  .pause(184)
                  .delete(1)
                  .pause(505)
                  .delete(1)
                  .pause(35)
                  .delete(1)
                  .pause(26)
                  .delete(1)
                  .pause(39)
                  .delete(1)
                  .pause(38)
                  .delete(1)
                  .pause(23)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(35)
                  .delete(1)
                  .pause(24)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(30)
                  .delete(1)
                  .pause(34)
                  .delete(1)
                  .pause(35)
                  .delete(1)
                  .pause(39)
                  .delete(1)
                  .pause(22)
                  .delete(1)
                  .pause(43)
                  .delete(1)
                  .pause(23)
                  .delete(1)
                  .pause(47)
                  .delete(1)
                  .pause(28)
                  .delete(1)
                  .pause(27)
                  .delete(1)
                  .pause(1188)
                  .type("c")
                  .pause(247)
                  .type("o")
                  .pause(520)
                  .type("n")
                  .pause(287)
                  .type("t")
                  .pause(121)
                  .type("a")
                  .pause(455)
                  .type("c")
                  .pause(1329)
                  .type("t")
                  .pause(736)
                  .type(" ")
                  .pause(344)
                  .delete(1)
                  .pause(336)
                  .type("u")
                  .pause(328)
                  .delete(1)
                  .pause(136)
                  .type("s")
                  .pause(72)
                  .type("s")
                  .pause(1008)
                  .delete(1)
                  .pause(232)
                  .delete(1)
                  .pause(816)
                  .type("w")
                  .pause(264)
                  .type("h")
                  .pause(256)
                  .type("e")
                  .pause(272)
                  .type("n")
                  .pause(672)
                  .type(" ")
                  .pause(416)
                  .type("a")
                  .pause(600)
                  .type("v")
                  .pause(344)
                  .type("a")
                  .pause(328)
                  .type("i")
                  .pause(272)
                  .type("l")
                  .pause(192)
                  .type("a")
                  .pause(1536)
                  .type("b")
                  .pause(224)
                  .type("l")
                  .pause(2416)
                  .delete(1)
                  .pause(501)
                  .delete(1)
                  .pause(47)
                  .delete(1)
                  .pause(27)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(21)
                  .delete(1)
                  .pause(47)
                  .delete(1)
                  .pause(19)
                  .delete(1)
                  .pause(40)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(29)
                  .delete(1)
                  .pause(26)
                  .delete(1)
                  .pause(40)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(24)
                  .delete(1)
                  .pause(37)
                  .delete(1)
                  .pause(41)
                  .delete(1)
                  .pause(21)
                  .delete(1)
                  .pause(43)
                  .delete(1)
                  .pause(26)
                  .delete(1)
                  .pause(2516)
                  .type("c")
                  .pause(248)
                  .type("o")
                  .pause(368)
                  .type("m")
                  .pause(448)
                  .type("e")
                  .pause(208)
                  .type(" ")
                  .pause(177)
                  .type("t")
                  .pause(160)
                  .type("o")
                  .pause(417)
                  .type(" ")
                  .pause(335)
                  .type("u")
                  .pause(136)
                  .type("s")
                  .pause(505)
                  .type("e")
                  .pause(399)
                  .type(" ")
                  .pause(1256)
                  .delete(1)
                  .pause(224)
                  .delete(1)
                  .pause(408)
                  .type(" ")
                  .pause(416)
                  .type("t")
                  .pause(168)
                  .type("o")
                  .pause(152)
                  .type(" ")
                  .pause(200)
                  .type("h")
                  .pause(127)
                  .type("e")
                  .pause(160)
                  .type("l")
                  .pause(152)
                  .type("p")
                  .pause(496)
                  .type(" ")
                  .pause(504)
                  .type("y")
                  .pause(88)
                  .type("p")
                  .pause(208)
                  .type("u")
                  .pause(817)
                  .delete(1)
                  .pause(176)
                  .delete(1)
                  .pause(624)
                  .type("o")
                  .pause(248)
                  .type("u")
                  .pause(248)
                  .type("😃");

                // Remember to return it!
                return instance;
              }}
            />
          </h1>

          {/* <p id="header_name"></p> */}
          {/* ref={header_name} */}
          <h4>
            Experience the Italian flair with Dolce Velluto, a petite symphony
            of sophistication and allure.
          </h4>
          <img src="/public/assets/images/home2.png" alt="" />
        </div>
        <div className="flex columns-2 absolute center_header">
          <h5>latriva</h5>
          <div className="box">
            <img src="/public/assets/images/left_arrow.svg" alt="" />
          </div>
        </div>
      </section>

      <section className="brand_secton">
        <div className="brand__header">
          <ReactTooltip
            id="tool2"
            place="bottom"
            data-tooltip-variant="light"
            content="RoughNotation"
          />
          {showAnnotation ? (
            <RoughNotation
              data-tooltip-id="tool2"
              type="highlight"
              show={true}
              color="#333d3d"
            >
              <h4>best Perfum</h4>
            </RoughNotation>
          ) : (
            "."
          )}

          {/* <div className="line"></div> */}
        </div>
        <div className="brand__body flex">
          <div
            className="left"
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="500"
          >
            <h1>brought the new perfum in the wolrd</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Facilisis risus in et arcu
              egestas mus bibendum mattis vitae. Ac proin facilisis lacinia
              massa habitasse faucibus elementum. Et pharetra enim egestas
              consequat. Proin ut malesuada mattis ullamcorper sit ultrices.
            </p>
            <button className="byn_standard" aria-label="show more">show more</button>
          </div>
          <div className="right relative">
            <div className="box absolute">
              <div className="absolute box1"> </div>
              <div className="absolute box2"> </div>
              <ReactTooltip
                id="tool3"
                // data-tooltip-id="tool2"
                place="bottom"
                data-tooltip-variant="light"
                content="aos"
              />
              <img
                data-tooltip-id="tool3"
                src="/public/assets/images/perfum1.png"
                alt=""
                data-aos="fade-down"
                data-aos-anchor-placement="top-center"
                data-aos-duration="1000"
                data-aos-delay="300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="fragnaces_section">
        <div className="fragnaces_header">
          {showAnnotation ? (
            <RoughNotation type="highlight" show={true} color="#333d3d">
              <h4>FINE FRAGRANCES</h4>
            </RoughNotation>
          ) : (
            "."
          )}
          {/* <div className="line"></div> */}
        </div>
        <div className="fragnaces__body flex ">
          <div className="right relative">
            <div className="box absolute">
              <div className="absolute box1"> </div>
              <div className="absolute box2">new Design </div>
              <img
                src="/public/assets/images/perfum2.png"
                alt=""
                data-aos="flip-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                data-aos-offset="300"
                data-aos-delay="300"
              />
            </div>
          </div>
          <div
            className="left"
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="500"
          >
            <h1>brought the new perfum in the wolrd</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Facilisis risus in et arcu
              egestas mus bibendum mattis vitae. Ac proin facilisis lacinia
              massa habitasse faucibus elementum. Et pharetra enim egestas
              consequat. Proin ut malesuada mattis ullamcorper sit ultrices.
            </p>
            <button className="byn_standard" aria-label="show more">show more</button>
          </div>
        </div>
      </section>

      <ReactTooltip
        id="tool4"
        // data-tooltip-id="tool2"
        place="bottom"
        data-tooltip-variant="light"
        content="ScrollReveal"
      />
      <section data-tooltip-id="tool4" className="best_sold_section" id="sold">
        <div className="best_sold_header">
          {showAnnotation ? (
            <RoughNotation type="highlight" show={true} color="#333d3d">
              <h4>most sold</h4>
            </RoughNotation>
          ) : (
            "."
          )}
          {/* <div className="line"></div> */}
        </div>
        <div className="best_sold__body flex">
          <div className="left">
            {maxSoldItem ? (
              <div>
                <h5>{maxSoldItem.category}</h5>
                <h1>{maxSoldItem.product_name}</h1>
                <div className="price flex columns-2">
                  <div className="left__price">
                    {maxSoldItem.discount != 0 && maxSoldItem.stoke != 0 ? (
                      <div>
                        <span className="price_after_discount">
                          {console.log(maxSoldItemprice)}$
                          {(maxSoldItemprice * maxSoldItem.discount) / 100}
                        </span>
                        <span className="real_price text-gray-500 text-sm line-through ml-2">
                          ${maxSoldItemprice}
                        </span>
                      </div>
                    ) : (
                      <span>${maxSoldItem.price}</span>
                    )}

                    {/* {maxSoldItem.price} */}
                  </div>
                  <div className="right__price">
                    <div className="box">
                      <span> {maxSoldItem.sold}</span>
                      <span>sold</span>
                    </div>
                  </div>
                </div>
                <div className="add_cart flex">
                  {maxSoldItem.stoke == 0 ? (
                    <div className="outofstock">Out of Stock</div>
                  ) : (
                    <>
                      <button
                        onClick={() => addToCartfun(maxSoldItem)}
                        className="byn_standard"
                        aria-label="add to cart"
                      >
                        Add to Cart
                      </button>
                      <img src="/public/assets/images/left_arrow.svg" alt="" />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p>no product sold</p>
            )}
          </div>
          <div className="right ">
            <div className="box">
              <img
                onClick={() =>
                  navigate(
                    `/singleItem/${maxSoldItem.category}/${maxSoldItem.id}`
                  )
                }
                src={maxSoldItem.product_image}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {/* {console.log(recentItems.length)} */}
      {recentItems.length > 0 && (
        <section className="recent_viewd_section" id="recent">
          <div className="recent_viewd_header">
            {showAnnotation ? (
              <RoughNotation type="highlight" show={true} color="#333d3d">
                <h4>recent view</h4>
              </RoughNotation>
            ) : (
              "."
            )}
            {/* <div className="line"></div> */}
          </div>

          <div className="recent_viewd__body flex">
            {
              Array.isArray(recentItems) && recentItems.length > 0
                ? recentItems
                    .slice(-3)
                    .reverse()
                    .map((item) => (
                      <>
                        {item.singleItem?.id && (
                          <Card
                            key={item.singleItem.id}
                            data={item.singleItem}
                          />
                        )}
                      </>
                    ))
                : ""
              // <p>No most recent products found.</p>
            }
          </div>

          {/* <Card key={item.singleItem.id} data={item.singleItem} /> */}

          {/* {mostresent && (
          <div className="recent_viewd__body flex">
            {Array.isArray(mostresent) && mostresent.length > 0 ? (
              mostresent
                .slice(0, 5)
                .map((mostresent) => (
                  <Card key={mostresent.id} data={mostresent} />
                ))
            ) : (
              <p>No most resent products found.</p>
            )}
          </div>
        )} */}
        </section>
      )}

      <section className="trend_section" id="trend">
        <div className="trend_header">
          {showAnnotation ? (
            <RoughNotation type="highlight" show={true} color="#333d3d">
              <h4>trending categories</h4>
            </RoughNotation>
          ) : (
            "."
          )}
          {/* <div className="line"></div> */}
        </div>
        {trenProduct ? (
          <div className="trend_categories relative">
            <div className="absolute grid">
              {trenProduct.slice(0, 4).map((i) => (
                <div
                  className="box"
                  key={i.id}
                  style={{
                    backgroundImage: `url(${i.product_image_category})`,
                  }}
                >
                  <div className="in_box">{i.category}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>no product trend</p>
        )}
      </section>

      <section className="newsest_section" id="newset">
        <div className="newsest_header">
          {showAnnotation ? (
            <RoughNotation type="highlight" show={true} color="#333d3d">
              <h4>newst arrival</h4>
            </RoughNotation>
          ) : (
            "."
          )}
          {/* <div className="line"></div> */}
        </div>
        {newstarrival ? (
          <div className="newst_categories__body relative ">
            <div className="flex">
              {newstarrival.slice(0, 5).map((i) => (
                <div
                  class="box"
                  key={i.id}
                  onClick={() => navigate(`/singleItem/${i.category}/${i.id}`)}
                >
                  <img src={i.product_image_background} />
                  <div class="overlay">
                    <h3>{i.product_name}</h3>
                    <p>{i.category}</p>
                  </div>
                </div>
              ))}

              {/* <div
                className="box"
                key={i.id}
                style={{
                  backgroundImage: `url(${i.product_image_background})`,
                }}
              ></div> */}
            </div>
          </div>
        ) : (
          <p>no product trend</p>
        )}
      </section>
    </>
  );
};

/*
      <h1>Product with Max Sold:</h1>
      {maxSoldItem ? (
        <div>
          <p>ID: {maxSoldItem.id}</p>
          <p>Name: {maxSoldItem.product_name}</p>
          </div>
          ) : (
            <p>no product sold</p>
          )}
    
          <h1>trend categories:</h1>
          {trenProduct ? (
            <div>
              <button className="btn" id="sad">
                ID: {trenProduct.slice(0, 1).map((i) => i.id)}
              </button>
              <p>name: {trenProduct.slice(0, 1).map((i) => i.category)}</p>
            </div>
          ) : (
            <p>no product trend</p>
          )}
*/
