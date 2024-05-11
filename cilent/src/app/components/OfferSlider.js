import React, { useRef } from 'react'
import Offers from '../assets/offer.avif'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function OfferSlider() {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
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

    const goToNext = () => sliderRef.current?.slickNext();
    const goToPrev = () => sliderRef.current?.slickPrev();
    return (
        <>
            <div>
                <div className='max-w-[650px] pb-4' >
                    <div className='flex justify-between px-4'>
                        <p className='text-2xl font-bold text-[#222222]'>Deals for you</p>
                        <div className='text-sm'>
                            <button className='bg-gray-300 p-2 rounded-3xl' type="button" onClick={goToPrev}><FaArrowLeft /></button>
                            <button className='bg-gray-300 p-2 rounded-3xl ml-5' type="button" onClick={goToNext}><FaArrowRight /></button>
                        </div>
                    </div>
                    <div className='my-10 '>
                        <Slider ref={sliderRef}  {...settings}>
                            <div className='w-96'>
                                <div className="relative flex flex-col border-2 border-solid border-slate-200 bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center">
                                        <img src={Offers} className='h-16 w-16' alt='Offer' />
                                    </div>
                                    <div className="absolute top-5 left-20"> {/* Use a margin-top for spacing */}
                                        <p className="top-4 mx-4 text-lg font-semibold">60% Off Upto ₹120</p>
                                        <p className="top-4 mx-4 text-sm text-indigo-400 font-normal">USE AMEXMATCHDAY</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-96'>
                                <div className="relative flex flex-col border-2 border-solid border-slate-200 bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center">
                                        <img src={Offers} className='h-16 w-16' alt='Offer' />
                                    </div>
                                    <div className="absolute top-5 left-20"> {/* Use a margin-top for spacing */}
                                        <p className="top-4 mx-4 text-lg font-semibold">60% Off Upto ₹120</p>
                                        <p className="top-4 mx-4 text-sm text-indigo-400 font-normal">USE MEGASAVER</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-96'>
                                <div className="relative flex flex-col border-2 border-solid border-slate-200 bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center">
                                        <img src={Offers} className='h-16 w-16' alt='Offer' />
                                    </div>
                                    <div className="absolute top-5 left-20"> {/* Use a margin-top for spacing */}
                                        <p className="top-4 mx-4 text-lg font-semibold">60% Off Upto ₹120</p>
                                        <p className="top-4 mx-4 text-sm text-indigo-400 font-normal">USE TRYNEW</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}
