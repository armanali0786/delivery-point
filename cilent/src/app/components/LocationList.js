import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function LocationList() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 px-5">Popular localities in and around You</h1>
      <div className="mt-5 flex flex-wrap">
        <div className="w-full md:w-1/3 p-4">
          <LocationListItem name="Rajkot Dudh Sagar" count={23} />
        </div>
        <div className="w-full md:w-1/3 p-4">
          <LocationListItem name="150 feet Ring Road" count={34} />
        </div>
        <div className="w-full md:w-1/3 p-4">
          <LocationListItem name="Nanavati Chawk" count={54} />
        </div>
      </div>
    </>
  );
}

function LocationListItem({ name, count }) {
  return (
    <div className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary-200">
      <div>
        <p className="text-lg font-semibold text-gray-900">{name}</p>
        <span className="text-sm text-gray-500">{count} places</span>
      </div>
      <FaArrowRight className="text-gray-300 group-hover:text-primary-600 transition-colors" />
    </div>
  );
}
