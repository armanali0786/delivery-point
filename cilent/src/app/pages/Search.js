import React, { useEffect, useState } from 'react'

import FoodSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoMdStar } from "react-icons/io";
import { fetchFoods } from '../apis/ApiCall';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowForward } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../cart/cartSlice";


const foodsImage = [
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


export default function Search() {
    const [searchData, setSearchData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('query');
    const [searchText, setSearchText] = useState();
    const [expandedDescription, setExpandedDescription] = useState({});

    const [hover, setHover] = useState(false);

    const dispatch = useDispatch();

    const handleCartAction = (item) => {
        if (item.inCart) {
            dispatch(removeItem(item.id));
        } else {
            dispatch(addToCart({ ...item, quantity: 1 }));
        }
    };


    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
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


    const fetchSearchData = async () => {
        try {
            const response = await fetchFoods();
            setSearchData(response);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    }

    useEffect(() => {
        fetchSearchData();
    }, [searchTerm])


    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchText)}`);
        }
    };

    const handleSearch = (foodName) => {
        if (foodName.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(foodName.trim())}`);
        }
    };

    const handleSearchButton = (e) => {
        e.preventDefault();
        if (searchText.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
        }
    };


    const filteredFoods = searchData.filter((food) => {
        if (food && food.name && searchTerm) {
            const foodName = food.name.toLowerCase();
            const searchTermLower = searchTerm.toLowerCase();
            return foodName.includes(searchTermLower);
        }
        return false;
    });

    const toggleDescription = (foodId) => {
        setExpandedDescription((prev) => ({
            ...prev,
            [foodId]: !prev[foodId]
        }));
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const isEmpty = filteredFoods.length === 0;

    return (
        <>
            <div class="bg-gray-100 flex justify-center items-center py-10">
                <div class="w-full max-w-[860px] mx-auto rounded-lg p-14">
                    <form onSubmit={handleSearchButton}>
                        <div class="sm:flex items-center border border-2 border-gray-400 overflow-hidden px-2 py-1 justify-between">
                            <input class="text-base text-black bg-gray-100 flex-grow outline-none px-2 py-2 " type="text"
                                value={searchText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search foods and restaurants"
                            />
                            <div class="flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                                <button type="submit" class="p-1.5 ms-2 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='my-5 cursor-pointer px-3'>
                        <FoodSlider {...settings}>
                            {foodsImage.map((food, index) => (
                                <div key={index}>
                                    <div className='flex items-center' onClick={() => handleSearch(food.name)}>
                                        <img src={food.image} alt={food.name} className='mx-auto rounded-full h-[100px] h-20 object-contain' />
                                    </div>
                                </div>
                            ))}
                        </FoodSlider>
                    </div>
                    {isEmpty ? (
                        <div className=" flex justify-center bg-gray-200 p-5">
                            <div className="text-center">
                                No Food Found
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-200 rounded-lg">
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
                                    {filteredFoods.map((food, index) => {
                                        const numWordsToShow = food.description.split(' ').length > 2 ? 10 : 20;
                                        const descriptionText = removeHtmlTags(food.description);
                                        return (
                                            <div key={food.id} href={food.href} className='group bg-white rounded-xl w-full max-h-[320px]'>
                                                <div className='flex justify-between items-center px-4 cursor-pointer' onClick={() => handleNavigate(food.vendorId)}>
                                                    <div >
                                                        <h3 className="mt-4 text-sm text-gray-800">{food.name}</h3>
                                                        <div className='flex items-center my-1'>
                                                            <span> <IoMdStar /> </span>{food.rating} .
                                                            <p className='mx-1 text-gray-800'>20-25 MINS</p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-1 text-2xl text-black !font-extrabold bg-gray-400 p-2 rounded-full " onMouseEnter={() => setHover(true)}
                                                        onMouseLeave={() => setHover(false)}>{hover ? <MdArrowForward /> : <MdArrowOutward />}</p>
                                                </div>
                                                <hr className='mt-3' />
                                                <div className='px-3 py-3'>
                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <p className='text-sm font-bold'>{food.name}</p>
                                                            <p className='flex text-lg'>₹{food.price}</p>
                                                        </div>

                                                        <div className='relative'>
                                                            <img src={`https://delivery-point.onrender.com/images/${food.images[0]}`} className='h-28 w-36 rounded-lg' />
                                                            {/* <button
                                                                    className='absolute bottom-0 right-5 bg-white rounded-lg text-lg border-2 w-20 text-[#1C9D34] hover:bg-gray-300 font-bold'
                                                                    onClick={() => handleCartAction(food)}
                                                                > Add
                                                                </button> */}
                                                        </div>
                                                    </div>
                                                    <div className='py-2'>
                                                        <p className='text-[14px] text-left'>{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
