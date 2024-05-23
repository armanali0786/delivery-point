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
exports.EditOffer = exports.AddOffer = exports.GetOffers = exports.ProcessOrder = exports.GetOrderDetails = exports.GetCurrentOrders = exports.GetFoods = exports.AddFood = exports.UpdateVendorService = exports.UpdateVendorCoverImage = exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VendorLogin = void 0;
const AdminController_1 = require("./AdminController");
const utility_1 = require("../utility");
const Food_1 = require("../models/Food");
const Order_1 = require("../models/Order");
const models_1 = require("../models");
/** --------------------- Vendor Login ------------------------------ **/
const VendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingVendor = yield (0, AdminController_1.FindVendor)('', email);
    try {
        if (existingVendor !== null) {
            const validation = yield (0, utility_1.ValidatePassword)(password, existingVendor.password, existingVendor.salt);
            if (validation) {
                const signature = yield (0, utility_1.GenerateSignature)({
                    _id: existingVendor.id,
                    email: existingVendor.email,
                    foodTypes: existingVendor.foodType,
                    name: existingVendor.name,
                });
                return res.status(200).json({
                    message: "Login successfully",
                    token: signature,
                });
            }
            else {
                return res.status(409).json({ message: 'Password is not valid' });
            }
        }
        else {
            res.status(401).json({
                message: 'Error to login Vendor'
            });
        }
    }
    catch (error) {
        console.error('Error during VendorLogin:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});
exports.VendorLogin = VendorLogin;
/** --------------------- Vendor Profile ------------------------------ **/
const GetVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = yield (0, AdminController_1.FindVendor)(user._id);
            return res.status(200).json(existingVendor);
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Vendor not Found' });
    }
});
exports.GetVendorProfile = GetVendorProfile;
/** --------------------- Update Vendor Profile ------------------------------ **/
const UpdateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodTypes, name, address, phone } = req.body;
        const user = req.user;
        if (user) {
            const existingVendor = yield (0, AdminController_1.FindVendor)(user._id);
            if (existingVendor !== null) {
                existingVendor.foodType = foodTypes;
                existingVendor.name = name;
                existingVendor.address = address;
                existingVendor.phone = phone;
                const savedResult = yield existingVendor.save();
                return res.status(200).json(savedResult);
            }
            return res.status(200).json(existingVendor);
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Vendor not Found' });
    }
});
exports.UpdateVendorProfile = UpdateVendorProfile;
/** --------------------- Update Vendor Cover Image ------------------------------ **/
const UpdateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        if (user) {
            try {
                const vendor = yield (0, AdminController_1.FindVendor)(user._id);
                console.log(vendor);
                if (!vendor) {
                    return res.status(404).json({ message: 'Vendor not found' });
                }
                if (vendor !== null) {
                    const files = req.files;
                    const images = files.map((file) => file.filename);
                    vendor.coverImages.push(...images);
                    const saveResult = yield vendor.save();
                    return res.json(saveResult);
                }
            }
            catch (error) {
                console.error('Error updating vendor cover images:', error);
                return res.status(500).json({ message: 'Failed to update vendor profile' });
            }
        }
    }
    catch (error) {
        return res.json({ 'message': 'Unable to Update vendor profile ' });
    }
});
exports.UpdateVendorCoverImage = UpdateVendorCoverImage;
/** --------------------- Update Vendor Service ------------------------------ **/
const UpdateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = yield (0, AdminController_1.FindVendor)(user._id);
            if (existingVendor !== null) {
                existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                const savedResult = yield existingVendor.save();
                return res.status(200).json(savedResult);
            }
            return res.status(200).json(existingVendor);
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Vendor not Found' });
    }
});
exports.UpdateVendorService = UpdateVendorService;
/** --------------------- Add Food ------------------------------ **/
const AddFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const { name, description, category, foodType, readyTime, price, featured, brandName, favourite } = req.body;
            const Vendor = yield (0, AdminController_1.FindVendor)(user._id);
            if (Vendor != null) {
                const files = req.files;
                const images = files.map((file) => file.filename);
                const createFood = yield Food_1.Food.create({
                    vendorId: Vendor._id,
                    name: name,
                    description: description,
                    category: category,
                    price: price,
                    rating: 0,
                    readyTime: readyTime,
                    foodType: foodType,
                    images: images,
                    featured: featured,
                    favourite: favourite,
                    brandName: brandName
                });
                Vendor.foods.push(createFood);
                const result = yield Vendor.save();
                return res.status(200).json(result);
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Something went wrong with add food' });
    }
});
exports.AddFood = AddFood;
/** ---------------------Get All Foods ------------------------------ **/
const GetFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const foods = yield Food_1.Food.find({
                VendorId: user._id
            });
            if (foods != null) {
                return res.status(200).json(foods);
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Food Info not Found' });
    }
});
exports.GetFoods = GetFoods;
/** ---------------------Get Current Orders ------------------------------ **/
const GetCurrentOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const orders = yield Order_1.Order.find({ vendorId: user._id }).populate('items.food');
            if (orders != null) {
                return res.status(200).json(orders);
            }
        }
    }
    catch (error) {
        return res.json({ message: 'Orders Not found!' });
    }
});
exports.GetCurrentOrders = GetCurrentOrders;
/** ---------------------Get Order Details ------------------------------ **/
const GetOrderDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        if (orderId) {
            const order = yield Order_1.Order.findById(orderId).populate('items.food');
            if (order != null) {
                return res.status(200).json(order);
            }
        }
    }
    catch (error) {
        return res.json({ message: 'Order Not found' });
    }
});
exports.GetOrderDetails = GetOrderDetails;
/** -------------------- Process Order ------------------------------ **/
const ProcessOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const { status, remarks, time } = req.body;
        if (orderId) {
            const order = yield Order_1.Order.findById(orderId).populate('items.food');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            order.orderStatus = status;
            order.remarks = remarks;
            if (time) {
                order.readyTime = time;
            }
            const orderResult = yield order.save();
            if (orderResult != null) {
                return res.status(200).json(orderResult);
            }
        }
    }
    catch (error) {
        return res.json({ message: 'Unable to process order' });
    }
});
exports.ProcessOrder = ProcessOrder;
/** -------------------- Get Offers ------------------------------ **/
const GetOffers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            let currentOffer = Array();
            const offers = yield models_1.Offer.find().populate('vendors');
            if (offers) {
                offers.map(item => {
                    if (item.vendors) {
                        item.vendors.map(vendor => {
                            if (vendor._id.toString() === user._id) {
                                currentOffer.push(item);
                            }
                        });
                    }
                    if (item.offerType === "GENERIC") {
                        currentOffer.push(item);
                    }
                });
            }
            return res.status(200).json(currentOffer);
        }
    }
    catch (error) {
        return res.json({ message: 'Offers Not available' });
    }
});
exports.GetOffers = GetOffers;
/** -------------------- Add Offer ------------------------------ **/
const AddOffer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const { title, description, offerType, offerAmount, pincode, promocode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = req.body;
            const vendor = yield (0, AdminController_1.FindVendor)(user._id);
            if (vendor) {
                const offer = yield models_1.Offer.create({
                    title,
                    description,
                    offerType,
                    offerAmount,
                    pincode,
                    promoType,
                    startValidity,
                    endValidity,
                    bank,
                    isActive,
                    promocode,
                    bins,
                    minValue,
                    vendors: [vendor]
                });
                console.log(offer);
                return res.status(200).json(offer);
            }
        }
    }
    catch (error) {
        return res.json({ message: 'Unable to add Offer!' });
    }
});
exports.AddOffer = AddOffer;
/** -------------------- Edit Offer ------------------------------ **/
const EditOffer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const offerId = req.params.id;
        if (user) {
            const { title, description, offerType, offerAmount, pincode, promocode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = req.body;
            const currentOffer = yield models_1.Offer.findById(offerId);
            if (currentOffer) {
                const vendor = yield (0, AdminController_1.FindVendor)(user._id);
                if (vendor) {
                    currentOffer.title = title,
                        currentOffer.description = description,
                        currentOffer.offerType = offerType,
                        currentOffer.offerAmount = offerAmount,
                        currentOffer.pincode = pincode,
                        currentOffer.promoType = promoType,
                        currentOffer.startValidity = startValidity,
                        currentOffer.endValidity = endValidity,
                        currentOffer.bank = bank,
                        currentOffer.isActive = isActive,
                        currentOffer.minValue = minValue;
                    currentOffer.promocode = promocode;
                    currentOffer.bins = bins;
                    const result = yield currentOffer.save();
                    return res.status(200).json(result);
                }
            }
        }
    }
    catch (error) {
        return res.json({ message: 'Unable to add Offer!' });
    }
});
exports.EditOffer = EditOffer;
