import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import Filter from '../components/Filter';
import LocationList from '../components/LocationList';
import FilterIcon from '../assets/filter.svg';
import FoodSlider from '../components/FoodSlider';
import NoDataFound from '../components/NoDataFound';
import EmptyImage from '../assets/emptyfood.png';
import Loading from '../components/Loading';




// import clsx from "clsx";
// import useLazyLoad from '../context/useLazyLoad';
// import { LoadingCard, LoadingFoods } from '../components/LoadingFoods';


// const NUM_PER_PAGE = 3;
// const TOTAL_PAGES = 3;

export default function MenuList() {
  const [filterData, setFilterData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [rating, setRating] = useState(4);

  // const triggerRef = useRef(null);

  // const onGrabData = async (currentPage) => {
  //   const startIndex = (currentPage - 1) * NUM_PER_PAGE;
  //   const endIndex = startIndex + NUM_PER_PAGE;
  //   const data = filterData.slice(startIndex, endIndex);

  //   return data;
  // };

  // const { data, loading } = useLazyLoad({ triggerRef, onGrabData });


  useEffect(() => {
    fetchDataCategory(selectedCategories, ratingFilter ? rating : null);
  }, [selectedCategories, ratingFilter]);


  const fetchDataCategory = async (categories, rating) => {
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
    }
  }

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleRatingButtonClick = () => {
    setRatingFilter(!ratingFilter); // Toggle rating filter state
  };


  // const loadPages = [1, 2, 3, 4, 5, 6];


  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="pb-5">
          <LocationList />
        </div>
        <FoodSlider slideToshow={5} />

        <div className="mt-20">
          <h1 className="text-2xl text-[#222222] font-semibold pb-5 px-5">
            Restaurants with online food delivery
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
            {/* <button className="mx-2 border-2 w-20 rounded-3xl border-slate-500 hover:bg-[#5B63B7] hover:text-white hover:border-white">
              Offers
            </button>
            <button className="mx-2 border-2 w-36 rounded-3xl border-slate-500 hover:bg-[#5B63B7] hover:text-white hover:border-white">
              Fast Delivery
            </button> */}
            <button onClick={handleRatingButtonClick}
              className={`mx-2 border-2 w-36 rounded-3xl border-slate-500 ${ratingFilter ? 'bg-[#5B63B7] text-white  hover:text-white border-white border-2' : ''
                }`}
            >
              Rating 4.0+
            </button>
            {/* <button className="mx-2 border-2 w-48 rounded-3xl border-slate-500 hover:bg-[#5B63B7] hover:text-white hover:border-white">
              New on DeliveryPoint
            </button> */}
          </div>
        </div>

        {filterData.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 gap-x-4 gap-y-10 ">
            <MenuItem foods={filterData} />
            {/* {loadPages.map(num => {
              return (
                <>
                  <div key={num} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                    <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
                      <LoadingCard />
                    </div>
                  </div>
                </>
              )
            })} */}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 w-full">
            <p><Loading /></p>
            {/* <NoDataFound EmptyImage={EmptyImage} data={"No Food Found"} /> */}
          </div>
        )}

      </div>
    </div>
  );
}
