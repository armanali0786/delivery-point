import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import Filter from '../components/Filter';
import LocationList from '../components/LocationList';
import FilterIcon from '../assets/filter.svg';
import FoodSlider from '../components/FoodSlider';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';

export default function MenuList() {
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [rating, setRating] = useState(4);

  useEffect(() => {
    fetchDataCategory(selectedCategories, ratingFilter ? rating : null);
  }, [selectedCategories, ratingFilter]);


  const fetchDataCategory = async (categories, rating) => {
    setLoading(true);
    try {
      let params = {
        foodType: categories.join(',')
      };

      if (rating) {
        params.rating = '4';
      }

      const response = await axios.get('https://delivery-point.onrender.com/get-foods-bycategory', {
        params: params
      });
      if (response.status === 200) {
        setFilterData(response.data);
      }
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleRatingButtonClick = () => {
    setRatingFilter(!ratingFilter); // Toggle rating filter state
  };


  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="pb-5">
          <LocationList />
        </div>
        <FoodSlider slideToshow={5} />

        <div className="mt-16">
          <h1 className="text-2xl text-gray-900 font-bold pb-5 px-5">
            Restaurants with online food delivery
          </h1>
          <div className="flex flex-nowrap items-center gap-3 px-5">
            <Filter
              text={'Filters'}
              FilterType={'checkbox'}
              FilterIcon={FilterIcon}
              setFilterData={setFilterData}
              selectedCategories={selectedCategories}
              onChange={handleCategoryChange}
            />
            <button onClick={handleRatingButtonClick}
              className={`border-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${ratingFilter ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-700 hover:border-primary-500'
                }`}
            >
              Rating 4.0+
            </button>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <LoadingState count={6} className="sm:grid-cols-2 lg:grid-cols-3" />
          ) : filterData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 gap-x-4 gap-y-6">
              <MenuItem foods={filterData} />
            </div>
          ) : (
            <EmptyState title="No restaurants found" subtitle="Try adjusting your filters to see more results." />
          )}
        </div>

      </div>
    </div>
  );
}
