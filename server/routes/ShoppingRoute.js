"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.ShoppingRoute = router;
const controllers_1 = require("../controllers");
/** --------------------- Food Available in 30 Minutes ------------------------------ **/
router.get('/foods-30-min', controllers_1.GetFoodsIn30Minutes);
/** --------------------- All Restaurants ------------------------------ **/
router.get('/all-restaurant', controllers_1.GetAllRestaurants);
/** --------------------- Food Availiablity ------------------------------ **/
router.get('/get-all-foods', controllers_1.getAllFood);
/** --------------------- Food By Category ------------------------------ **/
router.get('/get-foods-bycategory', controllers_1.getFoodByCategory);
router.get('/get-top-foods', controllers_1.getTopFood);
/** --------------------- Food Availiablity ------------------------------ **/
router.get('/:pincode', controllers_1.GetFoodAvailability);
/** --------------------- Food Availiablity by VendorId ------------------------------ **/
router.get('/foods/:vendorId', controllers_1.GetFoodByVendorId);
/** --------------------- Top Restaurants ------------------------------ **/
router.get('/top-restaurant/:pincode', controllers_1.GetTopRestaurants);
/** --------------------- Food Available in 30 Minutes ------------------------------ **/
router.get('/foods-in-30-min/:pincode', controllers_1.GetFoodsIn30Min);
/** ---------------------Search Foods  ------------------------------ **/
router.get('/search/:pincode', controllers_1.SearchFoods);
/* ------------------- Search Offers --------------------- */
router.get('/offers/:pincode', controllers_1.GetAvailableOffers);
/** ---------------------Find Restaurent By Id ------------------------------ **/
router.get('/restaurant/:id', controllers_1.RestaurantById);
