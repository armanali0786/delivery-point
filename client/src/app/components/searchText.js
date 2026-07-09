import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchText({ searchText, setSearchText }) {
    const navigate  = useNavigate();
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/menu?query=${encodeURIComponent(searchText)}`);
        }
    };
    const handleSearchButton = (e) => {
        e.preventDefault();
        navigate(`/menu?query=${encodeURIComponent(searchText)}`);

    };

    return (
        <>
            <form class="flex items-center max-w-sm mx-auto" onSubmit={handleSearchButton} >
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-1.5  dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for restaurants & foods ..."
                        value={searchText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                 />
                </div>
                <button type="submit" class="p-1.5 ms-2 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </form>
        </>
    )
}
