// CartItem.js
import React, { useState } from 'react';

const CartItem = ({ product, quantity, onRemove, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center space-x-4 py-2">
      <div className="flex-shrink-0">
        <img
          src={product.image} // Replace with your product image URL
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onDecrement(product)}
          className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600"
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={() => onIncrement(product)}
          className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600"
        >
          +
        </button>
        <button
          onClick={() => onRemove(product)}
          className="text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
