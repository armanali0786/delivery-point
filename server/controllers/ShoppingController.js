"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopFood = exports.getFoodByCategory = exports.getAllFood = exports.GetAvailableOffers = exports.SearchFoods = exports.RestaurantById = exports.GetFoodsIn30Minutes = exports.GetFoodsIn30Min = exports.GetAllRestaurants = exports.GetTopRestaurants = exports.GetFoodByVendorId = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
// import { Offer } from '../models/Offer';
/** ---------------------  All Food Available  ------------------------------ **/
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res.status(404).json({ message: 'data Not found!' });
    }
});
exports.GetFoodAvailability = GetFoodAvailability;
/** ---------------------  All Food Available By VendorId ------------------------------ **/
const GetFoodByVendorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendorId = req.params.vendorId;
        const result = yield models_1.Vendor.find({ _id: vendorId, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res.status(404).json({ message: 'data Not found!' });
    }
});
exports.GetFoodByVendorId = GetFoodByVendorId;
/** --------------------- Top Restaurants  ------------------------------ **/
const GetTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).limit(10);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
});
exports.GetTopRestaurants = GetTopRestaurants;
/** --------------------- Get All Restaurants  ------------------------------ **/
const GetAllRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Vendor.find({});
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
});
exports.GetAllRestaurants = GetAllRestaurants;
/** --------------------- Food Available in 30 Minutes ------------------------------ **/
const GetFoodsIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods');
        if (result.length > 0) {
            let foodResult = [];
            result.map(vendor => {
                const foods = vendor.foods;
                foodResult.push(...foods.filter(food => food.readyTime <= 30));
            });
            return res.status(200).json(foodResult);
        }
    }
    catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
});
exports.GetFoodsIn30Min = GetFoodsIn30Min;
/** --------------------- Food Available in 30 Minutes ------------------------------ **/
const GetFoodsIn30Minutes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield models_2.Food.find({
            readyTime: { $lte: 30 } // Assuming `readyTime` is in minutes
        });
        if (foods.length === 0) {
            return res.status(404).json({ msg: 'No food items have a readyTime less than or equal to 30 minutes.' });
        }
        res.status(200).json(foods);
    }
    catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.GetFoodsIn30Minutes = GetFoodsIn30Minutes;
/** --------------------- Restaurant By Id ------------------------------ **/
const RestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield models_1.Vendor.findById(id).populate('foods');
        if (result) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
});
exports.RestaurantById = RestaurantById;
/** --------------------- Search Food ------------------------------ **/
const SearchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false })
            .populate('foods');
        if (result.length > 0) {
            let foodResult = [];
            result.map(item => foodResult.push(...item.foods));
            return res.status(200).json(foodResult);
        }
    }
    catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
});
exports.SearchFoods = SearchFoods;
/** --------------------- Available Offers ------------------------------ **/
const GetAvailableOffers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const offers = yield models_1.Offer.find({ pincode: pincode, isActive: true });
        if (offers) {
            return res.status(200).json(offers);
        }
    }
    catch (error) {
        return res.json({ message: 'Offers not Found!' });
    }
});
exports.GetAvailableOffers = GetAvailableOffers;
/** --------------------- Get AllFoods ------------------------------ **/
const getAllFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield models_2.Food.find({});
        // const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')
        if (foods) {
            return res.status(200).json(foods);
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'No food found'
            });
        }
    }
    catch (error) {
        console.error('Error fetching food data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllFood = getAllFood;
/** --------------------- Get Food By Category ------------------------------ **/
const getFoodByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodType, rating } = req.query;
        // Ensure foodType is treated as a string
        const foodTypeString = foodType;
        // Prepare query conditions based on request parameters
        const queryConditions = {};
        if (foodTypeString) {
            // Split comma-separated foodType string into an array of categories
            const selectedCategories = foodTypeString.split(',').map((category) => category.trim().toLowerCase());
            queryConditions.foodType = { $in: selectedCategories }; // Match any of the specified categories
        }
        if (rating) {
            // Validate and convert rating to a number
            const parsedRating = parseFloat(rating);
            if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
                return res.status(400).json({
                    status: 400,
                    message: 'Valid "rating" parameter is required as a number between 0 and 5'
                });
            }
            queryConditions.rating = { $gte: parsedRating }; // Filter by rating greater than or equal to specified value
        }
        // Query database with combined conditions
        const foods = yield models_2.Food.find(queryConditions);
        if (foods && foods.length > 0) {
            return res.status(200).json(foods);
        }
        else {
            // No food found for the specified criteria
            return res.status(200).json([]); // Return an empty array or object
        }
    }
    catch (error) {
        console.error('Error fetching food data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getFoodByCategory = getFoodByCategory;
/** --------------------- Get get Top Foods ------------------------------ **/
const getTopFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield models_2.Food.find({ featured: true });
        // const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')
        if (foods) {
            return res.status(200).json(foods);
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'No food found'
            });
        }
    }
    catch (error) {
        console.error('Error fetching food data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getTopFood = getTopFood;
