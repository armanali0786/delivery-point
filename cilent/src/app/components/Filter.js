import React, { useState, useRef, useEffect } from 'react'
export default function Filter({
    text, FilterType,
    FilterIcon,
    onChange,
    selectedCategories,
    onCheckedFiltersCount
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedFiltersCount, setCheckedFiltersCount] = useState(0);

    const handleCheckboxChange = (e) => {
        const category = e.target.id;
        const updatedCategories = [...selectedCategories];
        const isSelected = updatedCategories.includes(category);

        if (e.target.checked && !isSelected) {
            updatedCategories.push(category);
        } else if (!e.target.checked && isSelected) {
            const index = updatedCategories.indexOf(category);
            updatedCategories.splice(index, 1);
        }

        onChange(updatedCategories);
        setCheckedFiltersCount(updatedCategories.length);
    };

    const applyFilters = () => {
        onChange(selectedCategories);
        toggleDropdown();
    };

    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    id="dropdownDefault"
                    onClick={toggleDropdown}
                    className="border-2 border-solid border-gray-300 hover:border-primary-500 text-gray-700 font-medium rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center gap-1.5 transition-colors"
                    type="button"
                >
                    {text}
                    {FilterIcon && <img src={FilterIcon} className="h-4 w-4" alt="Filter icon" />}
                    {checkedFiltersCount > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-600 text-white text-[11px] font-bold">
                            {checkedFiltersCount}
                        </span>
                    )}
                    <svg
                        className={`w-4 h-4 ${isOpen ? 'transform rotate-180' : ''}`}
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute top-full left-0 z-10 w-56 mt-2 p-3 bg-white rounded-xl shadow-lg ring-1 ring-gray-100 dark:bg-gray-700">
                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Filter (Foods)</h6>
                        {/* <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <input
                                    id=""
                                    type={FilterType}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4"
                                    checked={selectedCategories.includes('')}
                                />
                                <label className="ml-2">Relevance (Default)</label>
                            </li>
                        </ul> */}
                        <ul className="space-y-2 text-sm ">
                            <li className="flex items-center">
                                <input
                                    id="veg"
                                    type={FilterType}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4  cursor-pointer"
                                    checked={selectedCategories.includes("veg")}
                                />
                                <label className="ml-2">Veg</label>
                            </li>
                        </ul>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex items-center">
                                <input
                                    id="nonveg"
                                    type={FilterType}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4  cursor-pointer"
                                    checked={selectedCategories.includes("nonveg")}
                                />
                                <label className="ml-2">Non-veg</label>
                            </li>
                        </ul>
                        {/* <button
                            onClick={applyFilters}
                            className="mt-4 px-4 py-2 bg-primary-700 hover:bg-primary-800 text-[#222222] border-2 border-slate-500 rounded-lg text-sm hover:bg-[#5B63B7] hover:text-white hover:border-white ">
                            Apply
                        </button> */}
                    </div>
                )}
            </div>
        </>
    )
}
