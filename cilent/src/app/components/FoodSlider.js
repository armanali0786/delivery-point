import React, { useRef } from 'react'

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import BrandSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const foods = [
    { name: 'Burger', image: require('../assets/food/Burger.avif') },
    { name: 'Biryani', image: require('../assets/food/Biryani.avif') },
    { name: 'Cakes', image: require('../assets/food/Cakes.avif') },
    { name: 'Chinese', image: require('../assets/food/Chinese.avif') },
    { name: 'Chole_Bature', image: require('../assets/food/Chole_Bature.avif') },
    { name: 'Ice_Creams', image: require('../assets/food/Ice_Creams.avif') },
    { name: 'Idli', image: require('../assets/food/Idli.avif') },
    { name: 'Khichdi', image: require('../assets/food/Khichdi.avif') },
    { name: 'North_Indian', image: require('../assets/food/North_Indian.avif') },
    { name: 'Pasta', image: require('../assets/food/Pasta.avif') },
    { name: 'pizza', image: require('../assets/food/pizza.avif') },
    { name: 'Rolls', image: require('../assets/food/Rolls.avif') },
    { name: 'Shakes', image: require('../assets/food/Shakes.avif') },
    { name: 'South_Indian', image: require('../assets/food/South_Indian.avif') },
    { name: 'Thepla', image: require('../assets/food/Thepla.avif') },
    { name: 'Vada', image: require('../assets/food/Vada.avif') },
];

export default function FoodSlider({ slideToshow }) {
    const sliderRef = useRef(null);


    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: slideToshow,
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

    return (
        <>
            <div className='py-5'>
                <div className='flex justify-between px-4'>
                    <p className='text-2xl font-bold text-[#222222]'>What's on your mind?</p>
                    <div className='text-sm flex justify-between'>
                        <button className='bg-gray-300 p-2 rounded-3xl mr-2' type="button" onClick={goToPrev}>
                            <FaArrowLeft />
                        </button>
                        <button className='bg-gray-300 p-2 rounded-3xl ml-2' type="button" onClick={goToNext}>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
                <div className='mt-5 cursor-pointer px-3'>
                    <BrandSlider ref={sliderRef}  {...settings}>
                        {foods.map((food, index) => (
                            <div key={index}>
                                <div className='flex items-center'>
                                    <img src={food.image} alt={food.name} className='mx-auto rounded-full h-[150px] h-30 object-contain' />
                                </div>
                            </div>
                        ))}
                    </BrandSlider>
                </div>
            </div>
        </>
    )
}
