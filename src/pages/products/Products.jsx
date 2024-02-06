import React, { useRef, useEffect, useState } from "react";
import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";
import { Card } from "../../components/common/card/Card";
import { slice } from "lodash";
import "./products.scss";
import { Helmet } from "react-helmet-async";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../components/common/button/Button";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const Products = () => {
  const ref = useRef();
  const [areProductsShown, setAreProductsShown] = useState(true);

  const [getAllProducts, setAllProducts] = useState([]);
  const [index, setIndex] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const [filter, setFilter] = useState("full"); // Default filter is "full"

  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [isBandsExpanded, setIsBandsExpanded] = useState(true);
  const [isColorsExpanded, setIsColorsExpanded] = useState(true);
  const [isPricesExpanded, setIsPricesExpanded] = useState(true);

  const [isCategoriesFading, setIsCategoriesFading] = useState(false);
  const [isColorsFading, setIsColorsFading] = useState(false);
  const [isBandsFading, setIsBandsFading] = useState(false);
  const [isPricesFading, setIsPricesFading] = useState(false);

  const [recomended, setrecomended] = useState([]);

  const navigate = useNavigate();

  const price_range1 = "0-100";
  const price_range2 = "100-500";
  const price_range3 = "500-1000";
  const price_range4 = "1000-2000";

  // State for checkboxes
  const [categoryFilters, setCategoryFilters] = useState({
    EnchantingFlorals: false,
    TimelessElegance: false,
    OrientalAllure: false,
    FreshSerenity: false,
    ModernSpice: false,
    MysticalWoods: false,
  });

  const [colorFilters, setColorFilters] = useState({
    gold: false,
    orange: false,
    blue: false,
  });

  const [brandFilters, setBrandFilters] = useState({
    LuxeAura: false,
    OpulentoScents: false,
    EtherealElegance: false,
    VelvetWhisper: false,
    CelestiaFragrance: false,
  });

  const [priceFilters, setPriceFilters] = useState({
    priceFilter1: false,
    priceFilter2: false,
    priceFilter3: false,
    priceFilter4: false,
  });
  const [maxprice, setmaxprice] = useState([]);

  const getAllProductsByFilter = async (filter) => {
    const { data } = await AxiosConfig({ url: "/items", method: "get" });

    let filteredData;
    switch (filter) {
      case "isFeatured":
        filteredData = data.filter((product) => product.isFeatured === 1);
        break;
      case "isTrending":
        filteredData = data.filter((product) => product.isTrending === 1);
        break;
      case "isNewArrival":
        filteredData = data.filter((product) => product.isNewArrival === 1);
        break;
      case "priceAscending":
        filteredData = data.slice().sort((a, b) => a.price - b.price);
        break;
      case "priceDescending":
        filteredData = data.slice().sort((a, b) => b.price - a.price);
      case "full":
      default:
        filteredData = data; // No filter applied
    }

    const maxprice = data.reduce((maxItem, currentItem) => {
      return currentItem.price > maxItem.price ? currentItem : maxItem;
    }, data[0]);
    setmaxprice(maxprice);

    const recomended = data.filter((word) =>
      word.isRecomended == 1 ? word : 0
    );
    setrecomended(recomended);

    setAllProducts(filteredData);
    setIsCompleted(false); // Reset isCompleted when fetching new data
  };
  // console.log(maxprice);

  const filterProducts = (data) => {
    const isPriceWithinRange = (price, range) => {
      const [min, max] = range.split("-").map(Number);
      return price >= min && price <= max;
    };

    const matchesAnyFilterInGroup = (filters, productAttribute) => {
      const filterKeys = Object.keys(filters);
      const selectedFilters = filterKeys.filter((key) => filters[key]);

      if (selectedFilters.length === 0) {
        return true;
      }

      return selectedFilters.some((filterKey) => {
        if (filterKey === "priceFilter1") {
          return isPriceWithinRange(productAttribute, price_range1);
        }
        if (filterKey === "priceFilter2") {
          return isPriceWithinRange(productAttribute, price_range2);
        }
        if (filterKey === "priceFilter3") {
          return isPriceWithinRange(productAttribute, price_range3);
        }

        if (filterKey === "priceFilter4") {
          return isPriceWithinRange(productAttribute, price_range4);
        }
        return false;
      });
    };

    const filteredProducts = data.filter((product) => {
      const categoryMatch = matchesAnyFilterInGroup(
        categoryFilters,
        product.category
      );
      const colorMatch = matchesAnyFilterInGroup(colorFilters, product.color);
      const brandMatch = matchesAnyFilterInGroup(brandFilters, product.brand);
      const priceMatch = matchesAnyFilterInGroup(priceFilters, product.price);

      return categoryMatch && colorMatch && brandMatch && priceMatch;
    });

    return filteredProducts;
  };

  useEffect(() => {
    const filteredProducts = filterProducts(getAllProducts);
    setAreProductsShown(filteredProducts.length > 0);
  }, [
    getAllProducts,
    categoryFilters,
    colorFilters,
    brandFilters,
    priceFilters,
  ]);

  const initialPosts = slice(filterProducts(getAllProducts), 0, index);

  const loadMore = () => {
    const remainingProducts = filterProducts(getAllProducts).length - index;
    const nextIndex = Math.min(
      index + 1,
      filterProducts(getAllProducts).length
    );

    setIndex(nextIndex);

    if (nextIndex >= filterProducts(getAllProducts).length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const handleFilterChange = (category) => {
    console.log("Selected filter:", category); // Debugging

    setFilter(category);
    setIndex(5); // Reset index when changing the filter
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (filterType, filterValue) => {
    switch (filterType) {
      case "category":
        setCategoryFilters({
          ...categoryFilters,
          [filterValue]: !categoryFilters[filterValue],
        });
        break;
      case "color":
        setColorFilters({
          ...colorFilters,
          [filterValue]: !colorFilters[filterValue],
        });
        break;
      case "brand":
        setBrandFilters({
          ...brandFilters,
          [filterValue]: !brandFilters[filterValue],
        });
        break;
      case "price":
        setPriceFilters({
          ...priceFilters,
          [filterValue]: !priceFilters[filterValue],
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getAllProductsByFilter(filter);
  }, [filter]);

  const toggleCategories = () => {
    setIsCategoriesFading(true);
    setTimeout(() => {
      setIsCategoriesExpanded(!isCategoriesExpanded);
      setIsCategoriesFading(false);
    }, 300);
  };

  const toggleColors = () => {
    setIsColorsFading(true);
    setTimeout(() => {
      setIsColorsExpanded(!isColorsExpanded);
      setIsColorsFading(false);
    }, 300);
  };

  const toggleBrands = () => {
    setIsBandsFading(true);
    setTimeout(() => {
      setIsBandsExpanded(!isBandsExpanded);
      setIsBandsFading(false);
    }, 300);
  };

  const togglePrices = () => {
    setIsPricesFading(true);
    setTimeout(() => {
      setIsPricesExpanded(!isPricesExpanded);
      setIsPricesFading(false);
    }, 300);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <div className="main">
        <h1>products</h1>
        <div className="location">
          <h2>
            <span onClick={() => navigate(`/`)}>Home</span>/ Products
          </h2>
        </div>
      </div>
      <section className="products flex">
        <div className="left_products">
          <div className="box">
            <div className="header" onClick={toggleCategories}>
              <h1>Categories</h1>
              <span
                className={`icon-transition ${
                  isCategoriesFading ? "fade-out" : ""
                }`}
              >
                {isCategoriesExpanded ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`footer-wrapper ${
                isCategoriesExpanded ? "expanded" : ""
              }`}
            >
              <div className="footer">
                <label>
                  <span>Enchanting Florals</span>
                  <input
                    type="checkbox"
                    checked={categoryFilters.EnchantingFlorals}
                    onChange={() =>
                      handleCheckboxChange("category", "EnchantingFlorals")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>Timeless Elegance</span>
                  <input
                    type="checkbox"
                    checked={categoryFilters.TimelessElegance}
                    onChange={() =>
                      handleCheckboxChange("category", "TimelessElegance")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>Oriental Allure</span>
                  <input
                    type="checkbox"
                    checked={categoryFilters.OrientalAllure}
                    onChange={() =>
                      handleCheckboxChange("category", "OrientalAllure")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>Fresh Serenity</span>
                  <input
                    type="checkbox"
                    checked={categoryFilters.FreshSerenity}
                    onChange={() =>
                      handleCheckboxChange("category", "FreshSerenity")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>Modern Spice</span>
                  <input
                    type="checkbox"
                    checked={categoryFilters.ModernSpice}
                    onChange={() =>
                      handleCheckboxChange("category", "ModernSpice")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>Mystical Woods</span>
                  <input
                    type="checkbox"
                    checked={categoryFilters.MysticalWoods}
                    onChange={() =>
                      handleCheckboxChange("category", "MysticalWoods")
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="header" onClick={toggleColors}>
              <h1>colors</h1>
              <span
                className={`icon-transition ${
                  isColorsFading ? "fade-out" : ""
                }`}
              >
                {isColorsExpanded ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`footer-wrapper ${isColorsExpanded ? "expanded" : ""}`}
            >
              <div className="footer">
                <label>
                  <span>Gold</span>
                  <input
                    type="checkbox"
                    checked={colorFilters.gold}
                    onChange={() => handleCheckboxChange("color", "gold")}
                  />
                  <span className="checkmark"></span>
                </label>
                <label>
                  <span> Orange</span>
                  <input
                    type="checkbox"
                    checked={colorFilters.orange}
                    onChange={() => handleCheckboxChange("color", "orange")}
                  />
                  <span className="checkmark"></span>
                </label>
                <label>
                  <span>Blue</span>
                  <input
                    type="checkbox"
                    checked={colorFilters.blue}
                    onChange={() => handleCheckboxChange("color", "blue")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="header" onClick={toggleBrands}>
              <h1>brands</h1>
              <span
                className={`icon-transition ${isBandsFading ? "fade-out" : ""}`}
              >
                {isBandsExpanded ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`footer-wrapper ${isBandsExpanded ? "expanded" : ""}`}
            >
              <div className="footer">
                <label>
                  <span>LuxeAura</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.LuxeAura}
                    onChange={() => handleCheckboxChange("brand", "LuxeAura")}
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span> OpulentoScents</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.OpulentoScents}
                    onChange={() =>
                      handleCheckboxChange("brand", "OpulentoScents")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>EtherealElegance</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.EtherealElegance}
                    onChange={() =>
                      handleCheckboxChange("brand", "EtherealElegance")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span> VelvetWhisper</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.VelvetWhisper}
                    onChange={() =>
                      handleCheckboxChange("brand", "VelvetWhisper")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>CelestiaFragrance</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.CelestiaFragrance}
                    onChange={() =>
                      handleCheckboxChange("brand", "CelestiaFragrance")
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="header" onClick={togglePrices}>
              <h1>prices</h1>
              <span
                className={`icon-transition ${
                  isPricesFading ? "fade-out" : ""
                }`}
              >
                {isPricesExpanded ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`footer-wrapper ${isPricesExpanded ? "expanded" : ""}`}
            >
              <div className="footer">
                <label>
                  <span>{price_range1}</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.priceFilter1}
                    onChange={() =>
                      handleCheckboxChange("price", "priceFilter1")
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <label>
                  <span> {price_range2}</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.priceFilter2}
                    onChange={() =>
                      handleCheckboxChange("price", "priceFilter2")
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <label>
                  <span>{price_range3}</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.priceFilter3}
                    onChange={() =>
                      handleCheckboxChange("price", "priceFilter3")
                    }
                  />
                  <span className="checkmark"></span>
                </label>

                <label>
                  <span>{price_range4}</span>
                  <input
                    type="checkbox"
                    checked={brandFilters.priceFilter4}
                    onChange={() =>
                      handleCheckboxChange("price", "priceFilter4")
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div
            className="box"
            onClick={() =>
              navigate(`/singleItem/${maxprice.category}/${maxprice.id}`)
            }
          >
            <div className="header">
              <h1>top valuable product</h1>
            </div>
            <div>
              <div className="footer relative">
                <h2>{maxprice.price} USD</h2>
                <div className="circle absolute"></div>
                <img src={maxprice.product_image} alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
        <div className="right_prdocuts">
          <div className="up_card flex">
            <span>sort by</span>
            <select
              onChange={(e) => handleFilterChange(e.target.value)}
              value={filter}
            >
              <option value="full">Full</option>
              <option value="isFeatured">Features</option>
              <option value="isTrending">Trends</option>
              <option value="isNewArrival">News Arrival</option>
              <option value="priceAscending">priceAscending</option>
              <option value="priceDescending">priceDescending</option>
            </select>
          </div>
          <ReactTooltip
            id="tool5"
            // data-tooltip-id="tool2"
            place="bottom"
            data-tooltip-variant="light"
            content="{AnimatePresence, motion } with framer-motion"
          />
          {areProductsShown ? (
            <div className="down_card" data-tooltip-id="tool5">
              <AnimatePresence>
                {initialPosts.map((data, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ transform: "scale(0)" }}
                    animate={{ transform: "scale(1)" }}
                    exit={{ transform: "scale(0)" }}
                  >
                    <Card key={data.id} data={data} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <p>No products match the selected filters.</p>
          )}

          {!isCompleted && areProductsShown && (
            <div className="load_btn">
              <Button
                onClick={loadMore}
                type="button"
                className="btn_standard"
                text="Load More"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
