import express from 'express';

const router = express.Router();
import { 
    CustomerSignUp,
    CustomerLogin,
    CustomerVerify,
    RequestOtp,
    GetCustomerProfile,
    EditCustomerProfile,
    CreateOrder,
    GetOrders,
    GetOrderById,
    AddToCart,
    GetCart,
    DeleteCart,
    VerifyOffer,
    CreatePayment,
    AvailableOffers,
    CustomerLogout,
    CreateStripePayment,
    getFavouriteFoods,
    addFavouriteFood,
    removeFavouriteFood,
    GetTransactionsByCustomer
    } from '../controllers';
    
import { Authenticate } from '../middlewares';


/** --------------------- Sign up / Create Customer ------------------------------ **/
router.post('/signup', CustomerSignUp)

/** --------------------- Login Customer ------------------------------ **/
router.post('/login', CustomerLogin)

/** ---------------------Customer Logout ------------------------------ **/
router.post('/customer_logout', CustomerLogout)

//Authentication
router.use(Authenticate);

/** --------------------- verify Customer Account ------------------------------ **/
router.patch('/verify',CustomerVerify )

/** --------------------- OTP / Requesting OTP ------------------------------ **/
router.get('/otp', RequestOtp)

/** --------------------- Profile ------------------------------ **/
router.get('/profile', GetCustomerProfile)

/** --------------------- Edit Profile ------------------------------ **/
router.patch('/profile', EditCustomerProfile)

/** ---------------------Add Cart ------------------------------ **/
router.post('/cart',AddToCart);

/** ---------------------Get Cart Data------------------------------ **/
router.get('/cart',GetCart);

/** ---------------------Delete Cart------------------------------ **/
router.delete('/cart',DeleteCart);

/** ---------------------Verify Offer------------------------------ **/
router.get('/offer/verify/:id',VerifyOffer); 

/** ---------------------Available Offers------------------------------ **/

router.get('/available-offers',AvailableOffers)

/** ---------------------Create Payment------------------------------ **/
router.post('/create-checkout-session',CreateStripePayment);

router.post('/create-payment',CreatePayment);


/** ---------------------Create Order ------------------------------ **/
router.post('/create-order', CreateOrder)

/** ---------------------Get All Orders ------------------------------ **/
router.get('/orders', GetOrders)

/** ---------------------View Order By Id ------------------------------ **/
router.get('/order/:id', GetOrderById)

/** --------------------- Get Favourite Foods------------------------------- **/
router.get('/get-favourites', getFavouriteFoods);

/** --------------------- Add Favourite------------------------------- **/

router.post('/add-favourite', addFavouriteFood);

/** --------------------- Remove Favourite------------------------------ **/

router.post('/remove-favourite', removeFavouriteFood);

/** --------------------- Get  transaction by Customer------------------------------ **/

router.get('/get-transactions', GetTransactionsByCustomer);

export {router as CustomerRoute} ; 