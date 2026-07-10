import React, { useState, useEffect } from "react";
import { CardHover } from "./CardHover";
import { fetchRestaurants } from "../apis/ApiCall";
import LoadingState from './ui/LoadingState';
export default function RestroCard() {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRestaurants();
        setRestaurants(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="container mx-auto py-10">
      <p className='py-5 px-4 text-2xl font-bold text-gray-900'>Top Restaurant at your Location</p>
      {/* <CardHover restaurants={restaurants} /> */}
      {loading ? (
        <LoadingState count={6} className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6" />
      ) : (
        <CardHover restaurants={restaurants} />
      )}
    </div>
  );
}

