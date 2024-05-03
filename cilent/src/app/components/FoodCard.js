import React, { useState, useRef, useEffect } from 'react'
import Sandwich from '../assets/sandwich.jpeg';
import Manchurain from '../assets/manchurian1.jpeg';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {  fetchTopFoods } from '../apis/ApiCall';

import CardSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

export default function FoodCard() {
  const sliderRef = useRef(null);
  const [foods, setFoods] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodsData = await fetchTopFoods(); // Call fetchFoods to get data
        setFoods(foodsData);
        // setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // Handle error if fetchFoods fails
        console.error('Error fetching foods:', error);
        // setLoading(false); // Set loading to false on error
      }
    };
    fetchData();
  }, []);


  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNavigate = (vendorId) => {
    navigate(`/food-details/${vendorId}`);
  }

  const removeHtmlTags = (html) => {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  const getFirstNWords = (text, n) => {
    const words = text.split(" ");
    return words.slice(0, n).join(" ");
  };

  return (
    <>
      <div className='mx-auto container py-5'>
        <div className='flex justify-between px-4'>
          <p className='text-xl text-[#222222] font-bold'>Best Food in Rajkot</p>
          <div className='text-sm'>
            <button className='bg-gray-300 p-2 rounded-3xl' type="button" onClick={goToPrev}><FaArrowLeft /></button>
            <button className='bg-gray-300 p-2 rounded-3xl ml-5' type="button" onClick={goToNext}><FaArrowRight /></button>
          </div>
        </div>
        <div className='cursor-pointer mt-5'>
          <CardSlider ref={sliderRef}  {...settings}>
            {foods && foods.map((food, index) => {
              const numWordsToShow = food.description.split(' ').length > 2 ? 10 : 20;
              const descriptionText = removeHtmlTags(food.description);
              return (
                <div key={index} className='px-3 transition duration-300 ease-out transform hover:scale-105' onClick={() => handleNavigate(food.vendorId)}>
                  <img src={`http://localhost:8080/images/${food.images[0]}`} className='rounded-xl w-full h-[280px] object-cover' alt={food.name} />
                  <div className="flex flex-col justify-between my-4 px-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-lg font-bold text-[#222222]">{food.name}</h3>
                      <p className="mt-1 text-sm font-bold text-[#222222]">{food.foodType}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-lg font-medium text-gray-900">₹{food.price}</p>
                      <p className="text-sm text-[#222222]">{food.category}</p>
                    </div>
                    <p className="mt-2 text-sm text-[#222222]">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                  </div>
                </div>
              );
            })}
          </CardSlider>
        </div>
      </div>
    </>
  )
}
