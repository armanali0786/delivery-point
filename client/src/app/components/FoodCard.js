import React, { useState, useRef, useEffect } from 'react'
import { fetchTopFoods } from '../apis/ApiCall';
import CardSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import LoadingState from './ui/LoadingState';
import SectionHeader from './ui/SectionHeader';
import UiFoodCard from './ui/FoodCard';
import Badge from './ui/Badge';
import { useLocationContext } from '../context/locationContext';

export default function FoodCard() {
  const sliderRef = useRef(null);
  const [foods, setFoods] = useState();
  const { location } = useLocationContext() || {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodsData = await fetchTopFoods();
        setFoods(foodsData);
      } catch (error) {
        console.error('Error fetching foods:', error);
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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  return (
    <>
      <div className='mx-auto container py-5'>
        <SectionHeader title={`Best Food in ${location?.city || 'Rajkot'}`} onPrev={goToPrev} onNext={goToNext} />
        <div className='py-3'>
          {foods && foods.length > 0 ? (
            <CardSlider ref={sliderRef}  {...settings}>
              {foods && foods.map((food, index) => (
                <div key={index} className="px-2">
                  <UiFoodCard
                    onClick={() => handleNavigate(food.vendorId)}
                    image={`https://delivery-point.onrender.com/images/${food.images[0]}`}
                    name={removeHtmlTags(food.name)}
                    description={removeHtmlTags(food.description)}
                    price={food.price}
                    rating={food.rating}
                    readyTime={food.readyTime}
                    badge={<Badge tone="success">Free delivery</Badge>}
                  />
                </div>
              ))}
            </CardSlider>
          ) : (
            <LoadingState count={4} className="sm:grid-cols-2 lg:grid-cols-4" />
          )}
        </div>
      </div>
    </>
  )
}
