import React from 'react'
import { useNavigate } from 'react-router-dom';
import UiFoodCard from './ui/FoodCard';

function MenuItem({ foods }) {
    const navigate = useNavigate();
    const handleNavigate = (vendorId) => {
        navigate(`/food-details/${vendorId}`);
    }

    const removeHtmlTags = (html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <>
            {foods && foods.map((food, index) => (
                <UiFoodCard
                    key={index}
                    onClick={() => handleNavigate(food.vendorId)}
                    image={`https://delivery-point.onrender.com/images/${food.images[0]}`}
                    name={food.name}
                    description={removeHtmlTags(food.description)}
                    price={food.price}
                    rating={food.rating}
                    readyTime={food.readyTime}
                />
            ))}
        </>
    )
}

export default MenuItem
