import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function LocationList() {
  return (
    <>
      <h1 className="text-4xl font-light px-5">Popular localities in and around You</h1>
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
    <div className="border-2 border-solid border-slate-200 bg-gray-200 p-4 rounded-lg transition duration-300 ease-out transform hover:scale-105">
      <p className="text-xl py-1">{name}</p>
      <span>{count} places</span>
      <i className="flex justify-end">
        <FaArrowRight />
      </i>
    </div>
  );
}
