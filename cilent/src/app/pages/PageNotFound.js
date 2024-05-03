import React from 'react';
import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="container h-[550px] flex items-center justify-center bg-gray-100">
      <div className="w-full p-8  rounded-lg">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="mt-4 text-4xl font-semibold text-gray-900">We are sorry, Page not found!</h2>
          <p className="mt-2 text-sm text-gray-600">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <NavLink to="/" className="mt-6 inline-block px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 uppercase font-semibold text-sm transition duration-200">
            Back To HomePage
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
