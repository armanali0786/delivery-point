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
    CustomerLogout
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


/** ---------------------Offer------------------------------ **/
router.get('/offer/verify/:id',VerifyOffer); 

router.get('/available-offers',AvailableOffers)

/** ---------------------Payment------------------------------ **/
router.post('/create-payment',CreatePayment);


/** ---------------------Create Order ------------------------------ **/
router.post('/create-order', CreateOrder)

/** ---------------------Get All Orders ------------------------------ **/
router.get('/orders', GetOrders)

/** ---------------------View Order By Id ------------------------------ **/
router.get('/order/:id', GetOrderById)





export {router as CustomerRoute} ; 