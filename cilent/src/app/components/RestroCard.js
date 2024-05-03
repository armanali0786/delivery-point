import React,{useState, useEffect} from "react";
import { CardHover } from "./CardHover";
import {fetchRestaurants} from "../apis/ApiCall";
export  default function RestroCard() {

  const [restaurants , setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRestaurants(); 
        setRestaurants(response);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-8 py-10">
      <p className='py-5 text-2xl font-bold text-[#222222]'>Top Restaurant at your Location</p>
      <CardHover restaurants={restaurants} />
    </div>
  );
}

