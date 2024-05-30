import React, { useState, useEffect } from "react";
import { CardHover } from "./CardHover";
import { fetchRestaurants } from "../apis/ApiCall";
import Loading from '../components/Loading';
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
      <p className='py-5 px-4 text-2xl font-bold text-[#222222]'>Top Restaurant at your Location</p>
      {/* <CardHover restaurants={restaurants} /> */}
      {loading ? (
        <div className='text-center mt-5'>
           <p className='flex justify-center'><Loading /></p>
        </div>
      ) : (
        <CardHover restaurants={restaurants} />
      )}
    </div>
  );
}

