import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-indigo-100 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fade-in">

        {/* Icon */}
        <div className="text-6xl mb-4">🎉</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Thank You!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6">
          Your order has been placed successfully.
          <br />
          We’re preparing your items for delivery 🚚
        </p>

        {/* Order badge */}
        <div className="bg-indigo-50 text-indigo-600 text-sm font-medium px-4 py-2 rounded-full inline-block mb-6">
          Order Confirmed ✔
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/shop")}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition"
        >
          Continue Shopping
        </button>

        {/* Secondary text */}
        <p className="text-xs text-gray-400 mt-4">
          You will receive an email confirmation shortly.
        </p>
      </div>

    </div>
  );
};

export default ThankYou;