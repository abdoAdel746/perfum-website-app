import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./SearchSlice";
import debounce from "lodash.debounce";
import { Card } from "../common/card/Card";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import "./search.scss";

export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [displayCount, setDisplayCount] = useState(2); // New state for display count
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const debouncedFetchProducts = useCallback(
    debounce((query) => {
      dispatch(fetchProducts(query));
    }, 300),
    []
  );

  useEffect(() => {
    if (searchText === "") {
      dispatch(fetchProducts(""));
    } else {
      debouncedFetchProducts(searchText);
    }
    return () => debouncedFetchProducts.cancel();
  }, [searchText, debouncedFetchProducts]);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);
    dispatch(fetchProducts(query));
  };

  useEffect(() => {
    // Reset displayCount whenever searchText changes
    setDisplayCount(2);
  }, [searchText]);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 2); // Load 2 more items
  };
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <div className="search">
        <IoIosSearch
          onClick={toggleModal}
          className="text-2xl"
          type="button"
          data-modal-target="default-modal"
        />

        {/* Main modal */}

        {modalVisible && (
          <div
            id="default_modal_search"
            tabIndex="-1"
            aria-hidden="true"
            className="cart_nav fixed"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="relative">
                <div className="flex close">
                  <div className=" flex justify-center">
                    <img src="/public/assets/images/logo.png" alt="logo" />
                  </div>
                  <button
                    onClick={toggleModal}
                    type="button"
                    data-modal-hide="default_modal_search"
                  >
                    <IoMdClose />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="border rounded p-2"
                  value={searchText}
                  onChange={handleInputChange}
                />
                {searchText && (
                  <div className="body">
                    <div className="flex_products">
                      {Array.isArray(products) && products.length > 0 ? (
                        products
                          .slice(0, displayCount)
                          .map((product) => (
                            <Card key={product.id} data={product} />
                          ))
                      ) : (
                        <p>No products found.</p>
                      )}
                    </div>
                    {products.length > displayCount && (
                      <button
                        onClick={handleLoadMore}
                        className="load"
                      >
                        Load More
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
