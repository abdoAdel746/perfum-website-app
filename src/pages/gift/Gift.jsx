import React, { useRef, useEffect } from "react";
import "./gift.scss";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Memoji from "./Mojs";
import anime from "animejs/lib/anime.es.js";
import {  useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  margin: 11em 0;
  z-index: 9;
  position: relative;

  margin-bottom: -6em;
  #MemojiContainerRef {
    width: 200vw;
    height: 530vh;
    .canv {
      z-index: 9;
      top: 0;
      height: 45em;

      position: sticky;
      display: flex;
      justify-content: center;
      align-content: center;

      canvas {
        width: 65% !important;
        transform: translateX(-21%) !important;
        &:after {
          content: "a";
        }
        height: 78%;
        &:first-child {
          display: none;
        }
      }
    }
  }
`;

export const Gift = () => {
  const navigate = useNavigate();
  const phoneNumber = "+20 1556655482";
  // useEffect(() => {
  //   let box = document.querySelectorAll(".box");
  //   box.forEach((e) => {
  //      e.classList.add("removeBorder");
  //   });

  //   setTimeout(() => {
  //     let box = document.querySelectorAll(".box");
  //     box.forEach((e) => {
  //       e.classList.remove("removeBorder");
  //     });
  //   }, 2000);
  // }, []);

  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current = anime({
      targets: ".left_gift .box",
      translateX: function (el) {
        return el.getAttribute("data-x");
      },
      translateY: function (el, i) {
        return 50 + -50 * i;
      },
      rotate: function () {
        return anime.random(-360, 360);
      },
      duration: function () {
        return anime.random(500, 1800);
      },
      delay: function () {
        return anime.random(0, 400);
      },
      direction: "alternate",
    });
  }, []);

  return (
    <>
      <div className="flex columns-2 gifts">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gift Cards</title>
        </Helmet>
        <ReactTooltip
          id="tool6"
          // data-tooltip-id="tool2"
          place="bottom"
          data-tooltip-variant="light"
          content="animejs"
        />
        <div className="left_gift" data-tooltip-id="tool6">
          <div className="box" id="el" data-x="170"></div>
          <div className="box" data-x="10"></div>
          <div className="box" data-x="0"></div>
          <div className="box" data-x="50"></div>
          <div className="box" data-x="20"></div>
          <div className="box" data-x="30"></div>
          <div className="box" data-x="20"></div>
          <div className="box" data-x="50"></div>
        </div>
        <div className="right_gift">
          <h1>we produce best gifts</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Tortor ipsum ullamcorper sed
            cursus netus urna ipsum porttitor turpis. Amet tellus sagittis
            aliquet ut. Egestas id accumsan ut sollicitudin tellus ut. Vitae id
            sit etiam maecenas. Ultrices quisque ullamcorper sit tortor elit
            nulla donec aliquam suspendisse.
          </p>
          <div className="flex">
            <div id="asd" className="btn byn_standard" onClick={() => navigate(`/Contact`)}>
              contact us
            </div>
            <div className="btn" onClick={() => navigate(`/`)}>
              return home
            </div>
          </div>
          <div className="line"></div>
          <h5>Have any questions? </h5>
          <h5>Contact us!</h5>
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </div>
      </div>
      <ReactTooltip
        id="tool7"
        // data-tooltip-id="tool2"
        place="bottom"
        data-tooltip-variant="light"
        content="lottie-web with gsap with scrollscene"
      />
      <Wrapper data-tooltip-id="tool7">
        <Memoji />
      </Wrapper>
    </>
  );
};
