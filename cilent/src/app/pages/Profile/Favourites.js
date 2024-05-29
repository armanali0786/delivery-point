import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getFavouriteFoods } from '../../apis/ApiCall';
import Loading from '../../components/Loading';

export default function Favourites() {

  const navigate = useNavigate();
  const [favoriteFoods, setFavoriteFoods] = useState([]);
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
      }

    }
    fetchFavourites();
  }, []);

  const removeHtmlTags = (html) => {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  const getFirstNWords = (text, n) => {
    const words = text.split(" ");
    return words.slice(0, n).join(" ");
  };

  const NavigateFoodDetails = (vendorId) => {
    navigate(`/food-details/${vendorId}`);
  }

  if (!Array.isArray(favoriteFoods) || favoriteFoods.length === 0) {
    return <p className='flex justify-center mt-20'><Loading/></p>;
  }

  return (
    <div className="dark:bg-zinc-800 py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Favorites</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">Find your saved items and get ready to order them.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteFoods && favoriteFoods.map((food, index) => {
            const numWordsToShow = food.description.split(' ').length > 2 ? 10 : 20;
            const descriptionText = removeHtmlTags(food.description);
            return (
              <div key={food._id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow cursor-pointer" onClick={() => NavigateFoodDetails(food.vendorId)}>
                <img
                  src={`https://delivery-point.onrender.com/images/${food.images}`} // Assuming images are stored locally in public folder
                  alt={food.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-semibold text-zinc-800 dark:text-white">{food.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-zinc-800 dark:text-white font-bold">₹{food.price}</span>
                  <button className="bg-red-500 text-white px-3 py-2 rounded-lg">
                    <span><FaHeart /></span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
