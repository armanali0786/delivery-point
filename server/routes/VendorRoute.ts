import express from 'express';

import { VendorLogin,GetVendorProfile ,
    UpdateVendorProfile, UpdateVendorService,
    UpdateVendorCoverImage, AddFood , GetFoods,
    GetCurrentOrders,GetOrderDetails,ProcessOrder,
    GetOffers, AddOffer, EditOffer
} from '../controllers';

import { Authenticate } from '../middlewares';

import multer  from 'multer';

const imageStorage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const images = multer({storage: imageStorage}).array('images',10);



const router = express.Router();

/** --------------------- Login Vendor ------------------------------ **/

router.post('/login', VendorLogin);

/** --------------------- Authenticate Routes ------------------------------ **/

router.use(Authenticate);

/** --------------------- Vendor Profile ------------------------------ **/

router.get('/profile', GetVendorProfile);

/** --------------------- Update Vendor CoverImage ------------------------------ **/

router.patch('/coverimage',images, UpdateVendorCoverImage);

/** --------------------- Update Vendor Profile ------------------------------ **/

router.patch('/profile', UpdateVendorProfile);

/** --------------------- Update Vendor Service ------------------------------ **/

router.patch('/service', UpdateVendorService);

/** --------------------- Add Food ------------------------------ **/

router.post('/food',images, AddFood);

/** ---------------------All Food ------------------------------ **/

router.get('/foods', GetFoods);


/** ---------------------Orders------------------------------ **/

router.get('/orders',GetCurrentOrders);

router.put('/order/:id/process',ProcessOrder);

router.get('/order/:id',GetOrderDetails);



router.get('/offers',GetOffers);

router.post('/offer',AddOffer);

router.put('/offer/:id',EditOffer);

export {router as VendorRoute} ; 