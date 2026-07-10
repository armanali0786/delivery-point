import React, { useRef } from 'react'
import BurgerKing from '../assets/brand/burgerKing.avif';
import BigBite from '../assets/brand/bigbite.avif';
import Desert from '../assets/brand/desert.avif';
import TeaPost from '../assets/brand/teapost.avif';

import BrandSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionHeader from './ui/SectionHeader';

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
                <SectionHeader title="Top Brands For You" onPrev={goToPrev} onNext={goToNext} />
                <div className='mt-2 cursor-pointer px-3'>
                    <BrandSlider ref={sliderRef} {...settings}>
                        <div className='flex !justify-center px-2'>
                            <img src={BurgerKing} className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] rounded-full object-cover border border-gray-100 shadow-sm' alt="Burger King" />
                        </div>
                        <div className='flex !justify-center px-2'>
                            <img src={BigBite} className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] rounded-full object-cover border border-gray-100 shadow-sm' alt="Big Bite" />
                        </div>
                        <div className='flex !justify-center px-2'>
                            <img src={Desert} className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] rounded-full object-cover border border-gray-100 shadow-sm' alt="Desert" />
                        </div>
                        <div className='flex !justify-center px-2'>
                            <img src={TeaPost} className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] rounded-full object-cover border border-gray-100 shadow-sm' alt="Tea Post" />
                        </div>
                        <div className='flex !justify-center px-2'>
                            <img src={BurgerKing} className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] rounded-full object-cover border border-gray-100 shadow-sm' alt="Burger King" />
                        </div>
                    </BrandSlider>
                </div>
            </div>
        </>
    )
}
