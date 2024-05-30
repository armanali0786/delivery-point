import React, { useState, useRef, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { fetchTopFoods } from '../apis/ApiCall';
import CardSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

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

  // if (!Array.isArray(foods) || foods.length === 0) {
  //   return <p className='flex justify-center'><Loading /></p>;
  // }

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
          {foods && foods.length > 0 ? (
            <CardSlider ref={sliderRef}  {...settings}>
              {foods && foods.map((food, index) => {
                const numWordsToShow = food.description.split(' ').length > 2 ? 8 : 10;
                const descriptionText = removeHtmlTags(food.description);
                const numofNamesToShow = food.name.split(' ').length > 2 ? 6 : 10;
                const descriptionName = removeHtmlTags(food.name);
                return (
                  <div key={index} className='px-3 transition duration-300 ease-out transform hover:scale-105 mb-5' onClick={() => handleNavigate(food.vendorId)}>
                    <img src={`https://delivery-point.onrender.com/images/${food.images[0]}`} className='rounded-xl w-full h-[200px] object-cover' alt={food.name} />
                    <div className="p-2">
                      <h3 className="text-[16px] font-medium">{getFirstNWords(descriptionName, numofNamesToShow)}....</h3>
                      <p className="text-zinc-600 text-sm">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className='flex'>
                          <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                          </span>
                          <span className="text-green-500 text-sm font-bold ml-2">
                            {food.rating}.0</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-xs ml-2 font-bold">{food.readyTime} min</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold">₹{food.price}</span>
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Free delivery</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardSlider>
          ) : (
            <div className='text-center mt-5'>
              <p className='flex justify-center'><Loading /></p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
