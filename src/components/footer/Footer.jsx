import React from "react";
import "./footer.scss";
import { PiFacebookLogo } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export const Footer = () => {
  const phoneNumber = "+2001094210387";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <footer className="relative">
      <div className="flex columns-3">
        <div className="box">
          <img src="/public/assets/images/logo.png" alt="" />

          <div className="box__inner">
            <p>
              msentiment was incorporated in 2018, as a Fragrance & Cosmetics
              trading company in Malaysia. We source Fragrance & Cosmetics
              products worldwide and focusing on online retail business.
            </p>
            <div className="icons">
              <PiFacebookLogo />

              <FaInstagram />
              <RiTwitterXFill />
            </div>
          </div>
        </div>
        <div className="box">
          <h1>BRANCHES</h1>
          <div className="in__box">
            <div className="in__box__cont">
              <h2>Dubai</h2>
              <p>
                Main Boutique, Galleria Mall Al BarshaThe Dubai Mall, 1st
                FloorThe Address Downtown Hotel (The Spa)Zabeel Ladies Club
              </p>
            </div>
            <div className="in__box__cont">
              <h2>ksa</h2>
              <p>Line Furniture</p>
            </div>
            <div className="in__box__cont">
              <h2>Collaboration</h2>
              <p>
                Four Seasons Hotel DIFC The Address Hotel Downtown Mandarin
                Hotel Emirates Palace
              </p>
            </div>
          </div>
        </div>
        <div className="box">
          <h1>NEWSLETTER</h1>
          <p>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="whats">
            <img src="/public/assets/images/whatsapp.png" alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};
