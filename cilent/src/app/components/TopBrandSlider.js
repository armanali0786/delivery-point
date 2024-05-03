import React, { useRef } from 'react'
import BurgerKing from '../assets/brand/burgerKing.avif';
import BigBite from '../assets/brand/bigbite.avif';
import Desert from '../assets/brand/desert.avif';
import TeaPost from '../assets/brand/teapost.avif';

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import BrandSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TopBrand() {
    const sliderRef = useRef(null);

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

    return (
        <>
            <div className='container mx-auto py-10'>
                <div className='relative px-4'>
                    <p className='text-xl font-bold text-[#222222]'>Top Brands For You</p>
                    <div className='absolute top-[106px] flex justify-between w-[97.5%] z-10 text-sm'>
                        <button className='bg-gray-300 p-2 rounded-3xl' type="button" onClick={goToNext}><FaArrowLeft /></button>
                        <button className='bg-gray-300 p-2 rounded-3xl ml-5' type="button" onClick={goToPrev}><FaArrowRight /></button>
                    </div>
                </div>
                <div className='mt-5 cursor-pointer px-3 cursor-pointer' >
                    <BrandSlider ref={sliderRef} {...settings}>
                        <div className='flex text-center !justify-center'>
                            <img src={BurgerKing} className='mx-auto rounded-full h-[150px] object-contain' />
                        </div>
                        <div className='flex text-center !justify-center'>
                            <img src={BigBite} className='mx-auto rounded-full h-[150px] object-contain' />
                        </div>
                        <div className='flex text-center !justify-center'>
                            <img src={Desert} className=' mx-auto rounded-full h-[150px] object-contain' />
                        </div>
                        <div className='flex text-center !justify-center'>
                            <img src={TeaPost} className='mx-auto rounded-full h-[150px] object-contain' />
                        </div>
                        <div className='flex text-center !justify-center'>
                            <img src={BurgerKing} className='mx-auto rounded-full h-[150px] h-30 object-contain' />
                        </div>
                    </BrandSlider>
                </div>
            </div>
        </>
    )
}
