import React from "react";
import { Link } from "react-router";
import { FaUtensils } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center px-6 text-center">
      <FaUtensils className="text-7xl text-red-400 mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-amber-700 mb-4">
        404 - Recipe Not Found!
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! Looks like this recipe got lost in the kitchen. 🍲 <br />
        Let’s get you back to something delicious.
      </p>
      <Link
        to="/"
        className="btn btn-warning text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
      >
        🔙 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
