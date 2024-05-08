import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Favourites() {

  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlistItems = localStorage.getItem('wishlistItems');
    if (storedWishlistItems) {
      try {
        const parsedWishlistItems = JSON.parse(storedWishlistItems);
        setWishlistItems(parsedWishlistItems);
      } catch (error) {
        console.error('Error parsing wishlist items:', error);
      }
    } else {
      console.log('No wishlist items found in localStorage');
    }
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

  return (
    <div className="dark:bg-zinc-800">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Favorites</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">Find your saved items and get ready to order them.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems && wishlistItems.map((food, index) => {
            const numWordsToShow = food.description.split(' ').length > 2 ? 10 : 20;
            const descriptionText = removeHtmlTags(food.description);
            return (
              <div key={food._id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow">
                <img
                  src={`http://localhost:8080/images/${food.images}`} // Assuming images are stored locally in public folder
                  alt={food.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-semibold text-zinc-800 dark:text-white">{food.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
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
