import React, { useState, useEffect } from 'react'
import { fetchFoodInMin } from '../apis/ApiCall';
import { useNavigate } from 'react-router-dom';
import LoadingState from './ui/LoadingState';
import SectionHeader from './ui/SectionHeader';
import UiFoodCard from './ui/FoodCard';
import Badge from './ui/Badge';

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

    if (!Array.isArray(foodInMin) || foodInMin.length === 0) {
        return (
            <div className="container mx-auto py-10">
                <SectionHeader title="Foods in 30 Minutes" />
                <LoadingState count={8} className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto py-10">
                <SectionHeader title="Foods in 30 Minutes" />
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {foodInMin.map((food, index) => (
                        <UiFoodCard
                            key={index}
                            onClick={() => handleNavigate(food.vendorId)}
                            image={`https://delivery-point.onrender.com/images/${food.images[0]}`}
                            name={removeHtmlTags(food.name)}
                            description={removeHtmlTags(food.description)}
                            price={food.price}
                            rating={food.rating}
                            badge={food.category && <Badge tone="primary">{food.category}</Badge>}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}
