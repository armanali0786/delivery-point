"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.CustomerRoute = router;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
/** --------------------- Sign up / Create Customer ------------------------------ **/
router.post('/signup', controllers_1.CustomerSignUp);
/** --------------------- Login Customer ------------------------------ **/
router.post('/login', controllers_1.CustomerLogin);
/** ---------------------Customer Logout ------------------------------ **/
router.post('/customer_logout', controllers_1.CustomerLogout);
//Authentication
router.use(middlewares_1.Authenticate);
/** --------------------- verify Customer Account ------------------------------ **/
router.patch('/verify', controllers_1.CustomerVerify);
/** --------------------- OTP / Requesting OTP ------------------------------ **/
router.get('/otp', controllers_1.RequestOtp);
/** --------------------- Profile ------------------------------ **/
router.get('/profile', controllers_1.GetCustomerProfile);
/** --------------------- Edit Profile ------------------------------ **/
router.patch('/profile', controllers_1.EditCustomerProfile);
/** ---------------------Add Cart ------------------------------ **/
router.post('/cart', controllers_1.AddToCart);
/** ---------------------Get Cart Data------------------------------ **/
router.get('/cart', controllers_1.GetCart);
/** ---------------------Delete Cart------------------------------ **/
router.delete('/cart', controllers_1.DeleteCart);
/** ---------------------Verify Offer------------------------------ **/
router.get('/offer/verify/:id', controllers_1.VerifyOffer);
/** ---------------------Available Offers------------------------------ **/
router.get('/available-offers', controllers_1.AvailableOffers);
/** ---------------------Create Payment------------------------------ **/
router.post('/create-checkout-session', controllers_1.CreateStripePayment);
router.post('/create-payment', controllers_1.CreatePayment);
/** ---------------------Create Order ------------------------------ **/
router.post('/create-order', controllers_1.CreateOrder);
/** ---------------------Get All Orders ------------------------------ **/
router.get('/orders', controllers_1.GetOrders);
/** ---------------------View Order By Id ------------------------------ **/
router.get('/order/:id', controllers_1.GetOrderById);
/** --------------------- Get Favourite Foods------------------------------- **/
router.get('/get-favourites', controllers_1.getFavouriteFoods);
/** --------------------- Add Favourite------------------------------- **/
router.post('/add-favourite', controllers_1.addFavouriteFood);
/** --------------------- Remove Favourite------------------------------ **/
router.post('/remove-favourite', controllers_1.removeFavouriteFood);
/** --------------------- Get  transaction by Customer------------------------------ **/
router.get('/get-transactions', controllers_1.GetTransactionsByCustomer);
