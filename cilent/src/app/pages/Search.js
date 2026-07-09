import React, { useEffect, useState } from 'react'

import FoodSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiSearch } from 'react-icons/fi';
import { fetchFoods } from '../apis/ApiCall';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../cart/cartSlice";
import UiFoodCard from '../components/ui/FoodCard';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';


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
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('query');
    const [searchText, setSearchText] = useState();

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
        } finally {
            setLoading(false);
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

    const handleNavigate = (vendorId) => {
        navigate(`/food-details/${vendorId}`);
    }

    const removeHtmlTags = (html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const isEmpty = !loading && filteredFoods.length === 0;

    return (
        <>
            <div className="bg-gray-50 flex justify-center items-center py-10">
                <div className="w-full max-w-[860px] mx-auto rounded-lg p-6 sm:p-14">
                    <form onSubmit={handleSearchButton}>
                        <div className="sm:flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden px-2 py-1 justify-between shadow-sm focus-within:border-primary-500">
                            <input className="text-base text-gray-900 bg-transparent flex-grow outline-none px-4 py-2" type="text"
                                value={searchText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search foods and restaurants"
                            />
                            <div className="flex items-center px-1 rounded-lg space-x-4 mx-auto">
                                <button type="submit" className="p-2.5 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200">
                                    <FiSearch className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='my-5 cursor-pointer px-3'>
                        <FoodSlider {...settings}>
                            {foodsImage.map((food, index) => (
                                <div key={index}>
                                    <div className='flex flex-col items-center gap-2' onClick={() => handleSearch(food.name)}>
                                        <img src={food.image} alt={food.name} className='mx-auto rounded-full h-20 w-20 object-contain border border-gray-100 shadow-sm' />
                                        <span className="text-xs font-medium text-gray-600">{food.name.replace(/_/g, ' ')}</span>
                                    </div>
                                </div>
                            ))}
                        </FoodSlider>
                    </div>
                    {loading ? (
                        <LoadingState count={4} className="sm:grid-cols-2 lg:grid-cols-2" />
                    ) : isEmpty ? (
                        <EmptyState title="No food found" subtitle="Try searching for a different dish or restaurant." />
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {filteredFoods.map((food, index) => (
                                <UiFoodCard
                                    key={food.id || index}
                                    variant="list"
                                    onClick={() => handleNavigate(food.vendorId)}
                                    image={`https://delivery-point.onrender.com/images/${food.images[0]}`}
                                    name={food.name}
                                    description={removeHtmlTags(food.description)}
                                    price={food.price}
                                    rating={food.rating}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
