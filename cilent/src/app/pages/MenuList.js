import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import Filter from '../components/Filter';
import LocationList from '../components/LocationList';
import FilterIcon from '../assets/filter.svg';
import FoodSlider from '../components/FoodSlider';
import { fetchFoods } from '../apis/ApiCall';
import NoDataFound from '../components/NoDataFound';
export default function MenuList() {
  const [foods, setFoods] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [rating, setRating] = useState(4);

  useEffect(() => {
    fetchDataCategory(selectedCategories, ratingFilter ? rating : null);
  }, [selectedCategories, ratingFilter]);


  const fetchDataCategory = async (categories, rating) => {
    try {
      console.log(rating)
      let params = {
        foodType: categories.join(',')
      };

      if (rating) {
        params.rating = '4';
      }

      const response = await axios.get('http://localhost:8080/get-foods-bycategory', {
        params: params
      });
      if (response.status === 200) {
        setFilterData(response.data);
      }
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  }

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleRatingButtonClick = () => {
    setRatingFilter(!ratingFilter); // Toggle rating filter state
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="pb-5">
          <LocationList />
        </div>
        <FoodSlider slideToshow={5} />
        <div className="mt-20">
          <h1 className="text-xl text-[#222222] font-semibold pb-5 px-5">
            Restaurants with online food delivery in Rajkot
          </h1>
          <div className="flex flex-nowrap ">
            <Filter
              text={'Filters'}
              FilterType={'checkbox'}
              FilterIcon={FilterIcon}
              setFilterData={setFilterData}
              selectedCategories={selectedCategories}
              onChange={handleCategoryChange}
            />
            {/* <Filter text={'Sort By'} FilterType={'radio'} setFilterData={setFilterData} /> */}
            <button className="mx-2 border-2 w-20 rounded-3xl border-slate-500 hover:bg-[#5B63B7] hover:text-white hover:border-white">
              Offers
            </button>
            <button className="mx-2 border-2 w-36 rounded-3xl border-slate-500 hover:bg-[#5B63B7] hover:text-white hover:border-white">
              Fast Delivery
            </button>
            <button onClick={handleRatingButtonClick}
              className={`mx-2 border-2 w-36 rounded-3xl border-slate-500 ${ratingFilter ? 'bg-[#5B63B7] text-white hover:bg-[#5B63B7] hover:text-white' : ''
                }`}
            >
              Rating 4.0+
            </button>
            <button className="mx-2 border-2 w-48 rounded-3xl border-slate-500 hover:bg-[#5B63B7] hover:text-white hover:border-white">
              New on DeliveryPoint
            </button>
          </div>
        </div>

        {filterData.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            <MenuItem foods={filterData} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 w-full">
            <NoDataFound />
          </div>
        )}

      </div>
    </div>
  );
}
