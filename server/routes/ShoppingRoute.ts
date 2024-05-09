import express from 'express';

const router = express.Router();

import {
    GetAvailableOffers,
    GetFoodAvailability,
    GetFoodsIn30Min,
    GetTopRestaurants,
    RestaurantById,
    SearchFoods,
    getAllFood,
    GetAllRestaurants,
    GetFoodByVendorId,
    GetFoodsIn30Minutes,
    getTopFood,
    getFoodByCategory,
} from '../controllers';

/** --------------------- Food Available in 30 Minutes ------------------------------ **/
router.get('/foods-30-min', GetFoodsIn30Minutes);

/** --------------------- All Restaurants ------------------------------ **/
router.get('/all-restaurant', GetAllRestaurants);

/** --------------------- Food Availiablity ------------------------------ **/

router.get('/get-all-foods', getAllFood);

/** --------------------- Food By Category ------------------------------ **/

router.get('/get-foods-bycategory', getFoodByCategory);


router.get('/get-top-foods', getTopFood);


/** --------------------- Food Availiablity ------------------------------ **/
router.get('/:pincode', GetFoodAvailability);


/** --------------------- Food Availiablity by VendorId ------------------------------ **/
router.get('/foods/:vendorId', GetFoodByVendorId);


/** --------------------- Top Restaurants ------------------------------ **/
router.get('/top-restaurant/:pincode', GetTopRestaurants);


/** --------------------- Food Available in 30 Minutes ------------------------------ **/

router.get('/foods-in-30-min/:pincode', GetFoodsIn30Min);

/** ---------------------Search Foods  ------------------------------ **/
router.get('/search/:pincode', SearchFoods);

/* ------------------- Search Offers --------------------- */
router.get('/offers/:pincode', GetAvailableOffers);



/** ---------------------Find Restaurent By Id ------------------------------ **/
router.get('/restaurant/:id', RestaurantById);





export { router as ShoppingRoute }; 