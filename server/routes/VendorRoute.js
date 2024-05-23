"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const multer_1 = __importDefault(require("multer"));
/** --------------------- Multer ------------------------------ **/
const imageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
const router = express_1.default.Router();
exports.VendorRoute = router;
/** --------------------- Login Vendor ------------------------------ **/
router.post('/login', controllers_1.VendorLogin);
/** --------------------- Authenticate Routes ------------------------------ **/
router.use(middlewares_1.Authenticate);
/** --------------------- Vendor Profile ------------------------------ **/
router.get('/profile', controllers_1.GetVendorProfile);
/** --------------------- Update Vendor CoverImage ------------------------------ **/
router.patch('/coverimage', images, controllers_1.UpdateVendorCoverImage);
/** --------------------- Update Vendor Profile ------------------------------ **/
router.patch('/profile', controllers_1.UpdateVendorProfile);
/** --------------------- Update Vendor Service ------------------------------ **/
router.patch('/service', controllers_1.UpdateVendorService);
/** --------------------- Add Food ------------------------------ **/
router.post('/food', images, controllers_1.AddFood);
/** ---------------------All Food ------------------------------ **/
router.get('/foods', controllers_1.GetFoods);
/** ---------------------Orders------------------------------ **/
router.get('/orders', controllers_1.GetCurrentOrders);
/** ---------------------ProcessOrder------------------------------ **/
router.put('/order/:id/process', controllers_1.ProcessOrder);
/** ---------------------Order Details------------------------------ **/
router.get('/order/:id', controllers_1.GetOrderDetails);
/** ---------------------Get Offers ------------------------------ **/
router.get('/offers', controllers_1.GetOffers);
/** ---------------------Add Offers ------------------------------ **/
router.post('/offer', controllers_1.AddOffer);
/** ---------------------Edit Offers ------------------------------ **/
router.put('/offer/:id', controllers_1.EditOffer);
