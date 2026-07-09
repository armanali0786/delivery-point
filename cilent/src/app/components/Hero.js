import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FiMapPin, FiSearch, FiArrowRight, FiZap, FiTag, FiTruck } from "react-icons/fi";
import { useLocationContext } from "../context/locationContext";
import { cn } from "../../utils/cn";

const PROMO_CARDS = [
  {
    title: "Food Delivery",
    subtitle: "From your favourite restaurants",
    badge: "UPTO 60% OFF",
    to: "/menu",
    icon: FiTruck,
  },
  {
    title: "Fast Delivery",
    subtitle: "Hot food delivered in 30 minutes",
    badge: "UPTO 50% OFF",
    to: "/menu",
    icon: FiZap,
    dark: true,
  },
  {
    title: "Exclusive Deals",
    subtitle: "Handpicked offers, just for you",
    badge: "UPTO 40% OFF",
    to: "/search",
    icon: FiTag,
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
    <div id="product">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-ink-900/30 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        {/* dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative flex flex-col items-center justify-start font-sans pt-16 pb-20 px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            🔥 {appType}
          </span>

          <h1 className="mt-5 max-w-3xl text-center text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {tagLine}
          </h1>

          <div className="mt-8 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row sm:items-stretch sm:rounded-full">
            <button
              type="button"
              onClick={requestLocation}
              className="flex items-center gap-2 px-5 py-3.5 text-left sm:w-64 sm:border-r sm:border-gray-100"
            >
              <FiMapPin className="h-5 w-5 shrink-0 text-primary-600" />
              <span className="flex-1 truncate text-sm font-medium text-gray-700">{locationLabel}</span>
            </button>

            <form onSubmit={handleSearchButton} className="flex flex-1 items-center gap-2 px-5 py-3.5">
              <FiSearch className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full flex-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="Search for restaurant, item or more"
              />
              <button type="submit" className="hidden shrink-0 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 sm:block">
                Search
              </button>
            </form>
          </div>
        </div>

        <svg className="relative block w-full text-white" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: '48px' }}>
          <path fill="currentColor" d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,70 L0,70 Z" />
        </svg>
      </div>

      <div className="bg-white px-4 pb-10">
        <div className="mx-auto -mt-6 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
          {PROMO_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.to}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl p-6 shadow-xl transition-transform duration-200 hover:-translate-y-1.5",
                  card.dark ? "bg-ink-900 text-white" : "bg-white text-gray-900 border border-gray-100"
                )}
              >
                <div>
                  <span className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    card.dark ? "bg-white/10 text-primary-400" : "bg-primary-50 text-primary-600"
                  )}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold">{card.title}</h3>
                  <p className={cn("mt-1 text-sm", card.dark ? "text-white/60" : "text-gray-500")}>{card.subtitle}</p>
                  <span className={cn(
                    "mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold",
                    card.dark ? "bg-primary-500/20 text-primary-300" : "bg-primary-50 text-primary-600"
                  )}>
                    {card.badge}
                  </span>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-transform group-hover:translate-x-1">
                    <FiArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
