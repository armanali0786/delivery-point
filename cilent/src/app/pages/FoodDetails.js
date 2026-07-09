import React, { useRef, useEffect, useState } from 'react';
import Offers from '../assets/offer.avif'
import '../assets/styles/foodDetails.css'
import { fetchVendors, fetchVendorsById } from '../apis/ApiCall';
import { FaHeart, FaRegHeart } from "react-icons/fa";

import axios from 'axios'

import OfferSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from "react-redux";

import { addToCart, removeItem } from "../cart/cartSlice";
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from "../context/authContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupAddToCart from '../components/PopupAddToCart';
import SectionHeader from '../components/ui/SectionHeader';
import UiFoodCard from '../components/ui/FoodCard';
import RatingBadge from '../components/ui/RatingBadge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

export default function FoodDetails() {
    const { isLoggedIn } = useAuth();

    const { pincode } = useParams();

    const isPincode = isNaN(pincode);

    const [loading, setLoading] = useState(false);

    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [favouriteStatus, setFavouriteStatus] = useState(() => {
        return JSON.parse(localStorage.getItem('favouriteStatus')) || {};
    });

    const toggleModal = (foodId) => {
        setSelectedFoodId(foodId === selectedFoodId ? null : foodId);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            const response = await axios.post(`https://delivery-point.onrender.com/customer/${endpoint}`,
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

    const selectedFood = foods.find(food => food._id === selectedFoodId);

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-50 px-4">
                <div className='flex justify-center items-center py-16'>
                    {/* ---------------------  Restaurants Details  ------------------------------  */}
                    <div className='w-full max-w-[650px] rounded-2xl border border-gray-100 bg-white px-6 py-6 text-center shadow-sm'>
                        <div className='mt-1'>
                            <p className='flex justify-center text-lg font-bold text-gray-900'>{vendorData[0]?.name}</p>
                            <div className='flex items-center justify-center gap-2 mt-2'>
                                <RatingBadge rating={vendorData[0]?.rating} size="md" />
                                <span className='text-sm text-gray-500'>(10k + rating)</span>
                                <span className='text-sm font-semibold text-gray-900'>· ₹200 for two</span>
                            </div>
                            <p className='mt-2 text-primary-600 font-medium'>North Indian</p>
                            <div className='relative mt-4'>
                                <div className='flex items-start justify-center'>
                                    <div className='flex flex-col items-center'>
                                        <div className='mt-1 w-2 h-2 rounded-full bg-primary-500'></div>
                                        <div className='w-0.5 h-[30px] bg-gray-300'></div>
                                        <div className='w-2 h-2 rounded-full bg-primary-500'></div>
                                    </div>
                                </div>
                                <div className='absolute flex top-0 left-1/2 -translate-x-1/2 justify-center w-full text-left'>
                                    <p className='text-sm text-gray-500 px-5'>outlet</p>
                                    <p className='text-sm text-gray-700 px-3'>{vendorData[0]?.address}</p>
                                </div>
                                <div className='absolute flex top-8 left-1/2 -translate-x-1/2 justify-center w-full'>
                                    <p className='text-sm text-gray-500'>15 min to 45 min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center'>
                    <div className='w-full md:w-[750px] sm:w-[500px] pb-5 px-4'>
                        <SectionHeader title="Deals for you" onPrev={goToPrev} onNext={goToNext} />
                        <OfferSlider ref={sliderRef} {...settings}>
                            <div className='max-w-[350px] sm:w-64 w-full pb-5 pr-3'>
                                <div className="relative flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50 p-3">
                                    <img src={Offers} className='h-14 w-14 shrink-0' alt='Offer' />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">60% Off Upto ₹120</p>
                                        <p className="text-xs text-primary-600 font-medium">USE AMEXMATCHDAY</p>
                                    </div>
                                </div>
                            </div>
                            <div className='max-w-[350px] sm:w-64 w-full pb-5 pr-3'>
                                <div className="relative flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50 p-3">
                                    <img src={Offers} className='h-14 w-14 shrink-0' alt='Offer' />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">60% Off Upto ₹120</p>
                                        <p className="text-xs text-primary-600 font-medium">USE AMEXMATCHDAY</p>
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
                <div className='flex flex-col items-center gap-4 py-5 max-w-[750px] mx-auto'>
                    {foods.length > 0 ? (
                        foods.map((food) => (
                            <UiFoodCard
                                key={food._id}
                                variant="list"
                                className="w-full"
                                image={`https://delivery-point.onrender.com/images/${food.images}`}
                                name={food.name}
                                description={food.description}
                                price={food.price}
                                rating={food.rating}
                                onImageClick={() => toggleModal(food._id)}
                                cornerAction={isLoggedIn && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleFavourite(food._id); }}
                                        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow ${favouriteStatus[food._id] ? 'text-red-500' : 'text-gray-500'}`}
                                    >
                                        {favouriteStatus[food._id] ? <FaHeart /> : <FaRegHeart />}
                                    </button>
                                )}
                                action={<Button size="sm" variant="outline" onClick={() => handleCartAction(food, vendor)}>Add</Button>}
                            />
                        ))
                    ) : (
                        <p><Loading /></p>
                    )}
                </div>

                <Modal open={!!selectedFood} onClose={() => toggleModal(selectedFoodId)}>
                    {selectedFood && (
                        <div className="p-4">
                            <img src={`https://delivery-point.onrender.com/images/${selectedFood.images}`} className='h-56 w-full rounded-xl object-cover' alt={selectedFood.name} />
                            <div className="mt-4 flex items-start justify-between gap-3">
                                <div>
                                    <p className='text-lg font-bold text-gray-900'>{selectedFood.name}</p>
                                    <p className='text-base font-semibold text-gray-900'>₹{selectedFood.price}</p>
                                    <RatingBadge rating={selectedFood.rating} className="mt-1" />
                                </div>
                                <Button size="sm" onClick={() => handleCartAction(selectedFood, vendor)}>Add</Button>
                            </div>
                            <p className='mt-3 text-sm text-gray-600 text-left'>{selectedFood.description}</p>
                        </div>
                    )}
                </Modal>

                {showPopup &&
                    <PopupAddToCart

                    />}
            </div>
        </>
    );
}
