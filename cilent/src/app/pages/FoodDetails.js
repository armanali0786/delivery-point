import React, { useRef, useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Offers from '../assets/offer.avif'
import '../assets/styles/foodDetails.css'
import { fetchVendors, fetchVendorsById } from '../apis/ApiCall';
import { FaHeart } from "react-icons/fa";

import axios from 'axios'

import OfferSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  useDispatch } from "react-redux";

import { addToCart, removeItem } from "../cart/cartSlice";
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from "../context/authContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupAddToCart from '../components/PopupAddToCart';

export default function FoodDetails() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();


    // const { vendorId } = useParams();
    const { pincode } = useParams();

    const isPincode = isNaN(pincode);

    const [loading, setLoading] = useState(false);

    const [expandedDescription, setExpandedDescription] = useState({});

    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [favouriteStatus, setFavouriteStatus] = useState(() => {
        return JSON.parse(localStorage.getItem('favouriteStatus')) || {};
    });

    const toggleModal = (foodId) => {
        setSelectedFoodId(foodId === selectedFoodId ? null : foodId);
    };

    const toggleDescription = (foodId) => {
        setExpandedDescription((prev) => ({
            ...prev,
            [foodId]: !prev[foodId]
        }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const items = useSelector((state) => state.allCart.items);
    const token = localStorage.getItem('token');

    const [vendor, setVendor] = useState([]);


    const dispatch = useDispatch();

    const handleCartAction = (item, vendor) => {
        if (item.inCart) {
            dispatch(removeItem(item.id));
        } else {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            const vendorInfo = {
                vendorName: vendor[0].name,
                vendorAddress: vendor[0].address,
                vendorCoverImages: vendor[0].coverImages,
                vendorId: vendor[0]._id
            };
            dispatch(addToCart({ ...item, vendorInfo, quantity: 1 }));
        }
    };

    useEffect(() => {
        const fetchVendorsData = async () => {
            try {
                if (isPincode) {
                    const response = await fetchVendorsById(pincode);
                    setVendor(response);
                    setLoading(false);
                } else {
                    const response = await fetchVendors(pincode);
                    setVendor(response);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching foods:', error);
                setLoading(true);
            }
        };
        fetchVendorsData();
    }, []);

    const foods = vendor.flatMap(vendor => {
        return vendor.foods.map(food => {
            return {
                category: food.category,
                name: food.name,
                images: food.images[0],
                rating: food.rating,
                price: food.price,
                readyTime: food.readyTime,
                description: food.description,
                _id: food._id,
                favourite: food.favourite
            };
        });
    });

    const vendorData = vendor.map(vendor => {
        return {
            name: vendor.name,
            address: vendor.address,
            coverImages: vendor.coverImages,
            rating: vendor.rating,
            readyTime: vendor.readyTime,
        };
    });

    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
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


    const handleFavourite = async (foodId) => {
        try {
            const isCurrentlyFavourite = favouriteStatus[foodId] || false;
            const newFavouriteStatus = !isCurrentlyFavourite;

            const endpoint = newFavouriteStatus ? 'add-favourite' : 'remove-favourite';
            const response = await axios.post(`http://localhost:8080/customer/${endpoint}`,
                { foodId: foodId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setFavouriteStatus({ ...favouriteStatus, [foodId]: newFavouriteStatus });
                localStorage.setItem('favouriteStatus', JSON.stringify({ ...favouriteStatus, [foodId]: newFavouriteStatus }));
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };


    useEffect(() => {
        if (selectedFoodId) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
    }, [selectedFoodId]);

    return (
        <>
            <ToastContainer />
            <div className={`bg-gray-100 px-4 ${selectedFoodId ? 'overscroll-none' : 'overscroll-none'}`}>
                <div className='flex justify-center items-center py-16'>
                    {/* ---------------------  Restaurants Details  ------------------------------  */}
                    <div className='w-full max-w-[650px] pb-4 border border-1 border-gray-300 bg-slate-100 px-5 py-2 text-center rounded-xl shadow-2xl shadow-black-100'>
                        <div className='mt-1 cursor-pointer'>
                            <p className='flex text-lg font-bold'>{vendorData[0]?.name}</p>
                            <div className='flex items-center mt-1'>
                                <div className='flex items-center space-x-1'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                                    <span className='text-blue-800 text-md font-semibold px-2.5 py-0.5 rounded'>{vendorData[0]?.rating} (10k + rating),</span>
                                    <h5 className='text-lg font-semibold tracking-tight text-gray-800 dark:text-white'>₹200 for two</h5>
                                </div>
                            </div>
                            <p className='flex underline text-lg py-1'>North Indian</p>
                            <div className='relative'>
                                <div className='flex items-start'>
                                    <div className='flex flex-col items-center'>
                                        <div className='mt-1 w-2 h-2 rounded-lg bg-slate-500 text-[#282c3f]'></div>
                                        <div className='w-1 h-[30px] bg-slate-400'></div>
                                        <div className='w-2 h-2 rounded-lg bg-slate-500 text-[#282c3f]'></div>
                                    </div>
                                </div>
                                <div className='absolute flex top-0'>
                                    <p className='text-sm px-5'>outlet</p>
                                    <p className='text-sm px-3'>{vendorData[0]?.address}</p>
                                </div>
                                <div className='absolute flex top-8'>
                                    <p className='text-sm px-5'>15 min to 45 min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center'>
                    <div className='w-full md:w-[750px] sm:w-[500px] pb-5 px-4'>
                        <div className='flex justify-between items-center pb-5'>
                            <p className='text-2xl font-bold text-[#222222]'>Deals for you</p>
                            <div className='text-sm flex space-x-5'>
                                <button className='bg-gray-300 p-2 rounded-full' type="button" onClick={goToPrev}>
                                    <FaArrowLeft />
                                </button>
                                <button className='bg-gray-300 p-2 rounded-full' type="button" onClick={goToNext}>
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                        <OfferSlider ref={sliderRef} {...settings}>
                            <div className='max-w-[350px] sm:w-64 w-full pb-5'>
                                <div className="relative flex flex-col border-2 border-solid border-slate-200 bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center">
                                        <img src={Offers} className='h-16 w-16' alt='Offer' />
                                    </div>
                                    <div className="absolute top-5 left-20">
                                        <p className="top-4 mx-4 text-lg font-semibold sm:text-sm">60% Off Upto ₹120</p>
                                        <p className="top-4 mx-4 text-sm text-indigo-400 font-normal sm:text-sm">USE AMEXMATCHDAY</p>
                                    </div>
                                </div>
                            </div>
                            <div className='max-w-[350px] sm:w-64 w-full pb-5'>
                                <div className="relative flex flex-col border-2 border-solid border-slate-200 bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center">
                                        <img src={Offers} className='h-16 w-16' alt='Offer' />
                                    </div>
                                    <div className="absolute top-5 left-20">
                                        <p className="top-4 mx-4 text-lg font-semibold sm:text-sm">60% Off Upto ₹120</p>
                                        <p className="top-4 mx-4 text-sm text-indigo-400 font-normal sm:text-sm">USE AMEXMATCHDAY</p>
                                    </div>
                                </div>
                            </div>
                        </OfferSlider>
                    </div>
                </div>

                <div className='flex justify-center align-center font-bold text-lg pb-5'>
                    <button alt="MENU👇🏻" className='menu_button'>
                        <i>D</i>
                        <i>E</i>
                        <i>T</i>
                        <i>A</i>
                        <i>I</i>
                        <i>L</i>
                        <i>S</i>
                        <i>👇🏻</i>
                    </button>
                </div>
                <div className='flex flex-col items-center py-5'>
                    {foods.length > 0 ? (
                        foods.map((food) => (
                            <div key={food._id} className='w-full max-w-[750px] pb-4 border border-1 border-gray-300 bg-slate-100 px-5 py-2 text-center rounded-xl shadow-2xl shadow-black-100 mb-4 flex'>
                                <div className='flex justify-between w-full cursor-pointer'>
                                    <div className='flex-start'>
                                        <p className='flex text-lg font-bold'>{food.name}</p>
                                        <p className='flex text-lg'>₹{food.price}</p>
                                        <div className='flex items-center '>
                                            <div className='flex items-center space-x-1'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                                                <span className='text-blue-800 text-md font-semibold px-1 py-0.5 rounded'>{food.rating} (10k + rating),</span>
                                            </div>
                                        </div>
                                        {food.description.split(' ').length > 20 ? (
                                            <div className='md:w-[524px] sm:w-[300px]'>
                                                {expandedDescription[food._id] ? (
                                                    <p className='text-[14px] text-left'>{food.description}</p>
                                                ) : (
                                                    <p className='text-[14px] text-left'>{food.description.split(' ').slice(0, 20).join(' ') + '... '}
                                                        <span className='text-indigo-800 cursor-pointer' onClick={() => toggleDescription(food._id)}>Read more</span>
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className='text-[14px] text-left'>{food.description}</p>
                                        )}

                                    </div>
                                    <div className='flex-end my-2 relative'>
                                        {isLoggedIn && (
                                            <button className={`absolute right-2 top-2 ${favouriteStatus[food._id] ? 'text-[#ED3535]' : 'bg-black text-white'} bg-black p-1 rounded-lg text-start`}
                                                onClick={() => handleFavourite(food._id)}>
                                                <span><FaHeart /></span>
                                            </button>
                                        )}
                                        <img src={`http://localhost:8080/images/${food.images}`} className='h-28 w-48 rounded-lg' onClick={() => toggleModal(food._id)} />
                                        <button
                                            className='bg-white rounded-lg text-lg border-2 w-20 text-[#1C9D34] hover:bg-gray-300 font-bold'
                                            onClick={() => handleCartAction(food, vendor)}
                                        >Add
                                        </button>
                                    </div>
                                    {selectedFoodId === food._id && (
                                        <div
                                            id="popup-modal"
                                            className="fixed top-10 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden bg-[#242424] bg-opacity-60"
                                            onClick={() => toggleModal(food._id)}
                                        >
                                            <div
                                                className="relative p-4 w-full max-w-md bg-gray-200 rounded-lg shadow dark:bg-gray-100"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {/* Modal Content */}
                                                <div className='flex justify-end'>
                                                    <button
                                                        onClick={() => toggleModal(food._id)}
                                                        type="button"
                                                        className="end-2.5 bg-transparent text-black bg-white rounded-lg hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                            />
                                                        </svg>
                                                    </button>

                                                </div>
                                                <div className='flex-end my-2'>
                                                    <img src={`http://localhost:8080/images/${food.images}`} className='h-48 w-full rounded-lg' onClick={toggleModal} />

                                                </div>

                                                <div >
                                                    <div className='flex  justify-between'>
                                                        <p className='flex text-lg font-bold'>{food.name}</p>
                                                        <button
                                                            className='bg-white rounded-lg text-lg border-2 w-20 text-[#1C9D34] hover:bg-gray-300 font-bold'
                                                            onClick={() => handleCartAction(food, vendor)}
                                                        >Add
                                                        </button>
                                                    </div>

                                                    <p className='flex text-lg'>₹{food.price}</p>
                                                    <div className='flex items-center '>
                                                        <div className='flex items-center space-x-1'>
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                                                            <span className='text-blue-800 text-md font-semibold px-2.5 py-0.5 rounded'>{food.rating} (10k + rating),</span>
                                                        </div>
                                                    </div>
                                                    {/* <p className='text-[16px]'>{food.description}</p> */}
                                                    {food.description.split(' ').length > 20 ? (
                                                        <div className='w-[400px]'>
                                                            {expandedDescription[food._id] ? (
                                                                <p className='text-[14px] text-left'>{food.description}</p>
                                                            ) : (
                                                                <p className='text-[14px] text-left'>{food.description.split(' ').slice(0, 20).join(' ') + '... '}
                                                                    <span className='text-indigo-800 cursor-pointer' onClick={() => toggleDescription(food._id)}>Read more</span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className='text-[14px] text-left'>{food.description}</p>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p><Loading /></p>
                    )}
                </div>
                {showPopup &&
                    <PopupAddToCart

                    />}
            </div>
        </>
    );
}
