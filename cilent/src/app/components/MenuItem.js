import React from 'react'
import Manchurain from '../assets/manchurian1.jpeg';
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import NoDataFound from './NoDataFound';

function MenuItem({ foods }) {

    const navigate = useNavigate();
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
            {foods && foods.map((food, index) => {
                const numWordsToShow = food.description.split(' ').length > 2 ? 10 : 20;
                const descriptionText = removeHtmlTags(food.description);
                return (
                    <div class="w-full max-w-sm bg-white hover:bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointerz" onClick={() => handleNavigate(food.vendorId)}>
                        <img class="p-2 rounded-t-lg w-full h-[230px]" src={`http://localhost:8080/images/${food.images[0]}`} alt="product image" />
                        <div class="px-5 pb-2">
                            <div class="flex items-center justify-between">
                                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.name}</h5>
                                <div className='flex items-center'>
                                    <div class="items-center rtl:space-x-reverse">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                                    </div>
                                    <span class=" text-green-500 text-md font-semibold px-2.5 py-0.5 rounded">{food.rating}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold text-gray-900 dark:text-white"> ₹{food.price}</span>
                                <a href="#" class="text-black font-medium text-sm px-1 py-2.5 text-cent">{food.readyTime} min</a>
                            </div>
                            <div class="flex items-center mb-2">
                                {/* <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                <MdLocationOn />
                            </div> */}
                                <p className="mt-2 text-sm text-[#222222]">{getFirstNWords(descriptionText, numWordsToShow)}....</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default MenuItem
