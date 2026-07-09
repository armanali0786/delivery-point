import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FiMapPin, FiChevronDown, FiSearch, FiArrowRight } from "react-icons/fi";
import { useLocationContext } from "../context/locationContext";

const PROMO_CARDS = [
  {
    title: "Food Delivery",
    subtitle: "From your favourite restaurants",
    badge: "UPTO 60% OFF",
    to: "/menu",
  },
  {
    title: "Fast Delivery",
    subtitle: "Hot food delivered in 30 minutes",
    badge: "UPTO 50% OFF",
    to: "/menu",
  },
  {
    title: "Exclusive Deals",
    subtitle: "Handpicked offers, just for you",
    badge: "UPTO 40% OFF",
    to: "/search",
  },
];

const Hero = ({ appType, tagLine }) => {

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const { location, status, requestLocation } = useLocationContext() || {};

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchText)}`);
    }
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const locationLabel = location?.locality || location?.city
    ? [location.locality, location.city].filter(Boolean).join(', ')
    : status === 'requesting'
      ? 'Detecting location…'
      : status === 'denied'
        ? 'Location access denied'
        : 'Enter your delivery location';

  return (
    <div id="product" className="bg-primary-600">
      <div className="flex flex-col items-center justify-start font-sans pt-14 pb-24 px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">{appType}</p>
        <p className="mt-3 max-w-3xl text-center text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          {tagLine}
        </p>

        <div className="mt-8 flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={requestLocation}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-left shadow-md sm:w-64"
          >
            <FiMapPin className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="flex-1 truncate text-sm font-medium text-gray-700">{locationLabel}</span>
            <FiChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
          </button>

          <form onSubmit={handleSearchButton} className="flex flex-1 items-center gap-2 rounded-full bg-white px-5 py-3.5 shadow-md">
            <FiSearch className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full flex-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Search for restaurant, item or more"
            />
          </form>
        </div>
      </div>

      <div className="px-4">
        <div className="mx-auto grid max-w-5xl -translate-y-14 grid-cols-1 gap-5 sm:grid-cols-3">
          {PROMO_CARDS.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group flex flex-col justify-between rounded-2xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-1"
            >
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">{card.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{card.subtitle}</p>
                <span className="mt-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600">
                  {card.badge}
                </span>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-transform group-hover:translate-x-1">
                  <FiArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
