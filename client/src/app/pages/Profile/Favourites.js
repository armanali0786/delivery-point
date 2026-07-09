import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getFavouriteFoods } from '../../apis/ApiCall';
import UiFoodCard from '../../components/ui/FoodCard';
import LoadingState from '../../components/ui/LoadingState';
import EmptyState from '../../components/ui/EmptyState';

export default function Favourites() {

  const navigate = useNavigate();
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await getFavouriteFoods();
        setFavoriteFoods(response.data.favouriteFoods);
      } catch (error) {
        if (error.response) {
          setError(`Request failed with status ${error.response.status}`);
        } else if (error.request) {
          setError('Request was made but no response received');
        } else {
          setError('Error during request setup');
        }
      } finally {
        setLoading(false);
      }

    }
    fetchFavourites();
  }, []);

  const removeHtmlTags = (html) => {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const NavigateFoodDetails = (vendorId) => {
    navigate(`/food-details/${vendorId}`);
  }

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        <p className="text-sm text-gray-500 mb-5">Find your saved items and get ready to order them.</p>
        {loading ? (
          <LoadingState count={3} />
        ) : !Array.isArray(favoriteFoods) || favoriteFoods.length === 0 ? (
          <EmptyState title="No favourites yet" subtitle="Foods you favourite will show up here." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteFoods.map((food) => (
              <UiFoodCard
                key={food._id}
                onClick={() => NavigateFoodDetails(food.vendorId)}
                image={`https://delivery-point.onrender.com/images/${food.images}`}
                name={food.name}
                description={removeHtmlTags(food.description)}
                price={food.price}
                cornerAction={
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow">
                    <FaHeart />
                  </button>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
