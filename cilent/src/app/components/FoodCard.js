import React, { useState, useRef, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { fetchTopFoods } from '../apis/ApiCall';
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
        const foodsData = await fetchTopFoods(); 
        setFoods(foodsData);
        // setLoading(false); 
      } catch (error) {
        // Handle error if fetchFoods fails
        console.error('Error fetching foods:', error);
        // setLoading(false); 
      }
    };
    fetchData();
  }, []);


  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
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
          <div className='text-sm flex justify-between'>
            <button className='bg-gray-300 p-2 rounded-3xl mr-2' type="button" onClick={goToPrev}>
              <FaArrowLeft />
            </button>
            <button className='bg-gray-300 p-2 rounded-3xl ml-2' type="button" onClick={goToNext}>
              <FaArrowRight />
            </button>
          </div>

        </div>
        <div className='cursor-pointer py-5'>
          <CardSlider ref={sliderRef}  {...settings}>
            {foods && foods.map((food, index) => {
              const numWordsToShow = food.description.split(' ').length > 2 ? 8 : 10;
              const descriptionText = removeHtmlTags(food.description);
              return (
                <div key={index} className='px-3 transition duration-300 ease-out transform hover:scale-105 mb-5' onClick={() => handleNavigate(food.vendorId)}>
                  <img src={`http://localhost:8080/images/${food.images[0]}`} className='rounded-xl w-full h-[200px] object-cover' alt={food.name} />
                  <div className="p-2">
                    <h3 className="text-[16px] font-medium">{food.name}</h3>
                    <p className="text-zinc-600 text-sm">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                    <div className="flex items-center mt-2">
                      <span className="text-green-500 text-sm font-bold">⭐ {food.rating}.0</span>
                      <span className="text-zinc-500 text-xs ml-2 font-bold">{food.readyTime} min</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold">₹{food.price}</span>
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Free delivery</span>
                    </div>
                  </div>
                </div>

                // <div className="bg-zinc-100 p-4">
                //   <div className="max-w-screen-xl mx-auto">
                //       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                //         <img src={`http://localhost:8080/images/${food.images[0]}`} alt="Food Image" className="w-full h-32 sm:h-32 object-cover"/>
                //           <div className="p-4">
                //             <h3 className="text-lg font-semibold">{food.name}</h3>
                //             <p className="text-zinc-600 text-sm">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                //             <div className="flex items-center mt-2">
                //               <span className="text-green-500 text-sm">⭐ {food.rating}</span>
                //               <span className="text-zinc-500 text-xs ml-2">{food.readyTime} min</span>
                //             </div>
                //             <div className="mt-3 flex items-center justify-between">
                //               <span className="text-sm font-semibold">₹{food.price}</span>
                //               <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Free delivery</span>
                //             </div>
                //           </div>
                //       </div>
                //   </div>
                // </div>

              );
            })}
          </CardSlider>
        </div>
      </div>
    </>
  )
}
