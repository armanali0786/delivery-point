import React, { useState, useEffect } from 'react'
import '../assets/styles/foodCardHover.css'
import { fetchFoodInMin } from '../apis/ApiCall';
import { useNavigate } from 'react-router-dom';
export default function FoodCardHover() {

    const [foodInMin, setFoodInMin] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFoodInMin();
                setFoodInMin(response);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };
        fetchData();
    }, []);

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

    return (
        <>
            <div className="container mx-auto py-10">
                <p className='py-5 px-4 text-2xl font-bold text-[#222222]'>Foods in 30 Minutes</p>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {foodInMin && foodInMin.map((food, index) => {
                        const numWordsToShow = food.description.split(' ').length > 2 ? 10 : 20;
                        const descriptionText = removeHtmlTags(food.description);
                        const numofNameToShow = food.name.split(' ').length > 2 ? 6 : 10;
                        const descriptionName = removeHtmlTags(food.name);
                        return (
                            <div class="food-card flex-row bg-[#C0C0C0] cursor-pointer" onClick={() => handleNavigate(food.vendorId)}>
                                <img src={`https://delivery-point.onrender.com/images/${food.images[0]}`} className='rounded-xl w-full h-[150px] object-cover' />
                                <div className="flex justify-between items-end my-1">
                                    <p className=" text-[16px] font-bold text-[#222222]">{getFirstNWords(descriptionName, numofNameToShow)}...</p>
                                    <p className=" text-sm font-bold text-[#222222]">{food.foodType}</p>
                                </div>
                                <p className='text-sm'>
                                {getFirstNWords(descriptionText, numWordsToShow)}....
                                </p>
                                <div className=" flex justify-between items-end">
                                    <p className=" text-sm font-bold text-gray-900">₹{food.price}</p>
                                    <p className=" text-sm font-bold text-[#222222]">{food.category}</p>
                                </div>
                                <div class="go-corner">
                                    <div class="go-arrow">→</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    )
}