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
exports.CustomerLogout = exports.GetTransactionsByCustomer = exports.removeFavouriteFood = exports.addFavouriteFood = exports.getFavouriteFoods = exports.GetOrderById = exports.GetOrders = exports.CreateOrder = exports.CreateStripePayment = exports.CreatePayment = exports.AvailableOffers = exports.VerifyOffer = exports.DeleteCart = exports.GetCart = exports.AddToCart = exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Customer_dto_1 = require("../dto/Customer.dto");
const utility_1 = require("../utility");
const Customer_1 = require("../models/Customer");
const Order_1 = require("../models/Order");
const models_1 = require("../models");
const config_1 = require("../config");
const stripe = require('stripe')(config_1.STRIPE_SK);
/** --------------------- Create Customer ------------------------------ **/
const CustomerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.CreateCustomerInput, req.body);
        const inputErrors = yield (0, class_validator_1.validate)(customerInputs, { validationError: { target: true } });
        if (inputErrors.length > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Getting Errors',
                errors: inputErrors
            });
        }
        const { fullName, 
        // lastName, 
        address, email, phone, password } = customerInputs;
        const salt = yield (0, utility_1.GenerateSalt)();
        const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
        const existCustomer = yield Customer_1.Customer.findOne({ email: email });
        if (existCustomer) {
            return res.status(409).json({
                status: 409,
                message: 'Customer exist with the provided Email ID',
            });
        }
        const { otp, expiry } = (0, utility_1.GenerateOtp)();
        console.log(" OTP :", otp);
        const result = yield Customer_1.Customer.create({
            fullName: fullName,
            // lastName: lastName,
            email: email,
            password: userPassword,
            salt: salt,
            otp: otp,
            otp_expiry: expiry,
            address: address,
            phone: phone,
            verified: false,
            lat: 0,
            lng: 0,
            orders: []
        });
        if (result) {
            // send OTP to customer
            // await onRequestOTP(otp, phone);
            //Generate the Signature
            const signature = yield (0, utility_1.GenerateSignature)({
                _id: result._id,
                email: result.email,
                verified: result.verified,
                fullName: result.fullName,
                phone: result.phone,
            });
            // Send the result
            return res.status(200).json({
                message: "Customer Created successfully",
                signature, verified: result.verified,
                email: result.email,
            });
        }
        return res.status(500).json({
            status: 500,
            message: 'Error with Signup Customer'
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error with Signup Customer'
        });
    }
});
exports.CustomerSignUp = CustomerSignUp;
/** ---------------------  Customer Login ------------------------------ **/
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.UserLoginInput, req.body);
        const validationError = yield (0, class_validator_1.validate)(customerInputs, { validationError: { target: true } });
        if (validationError.length > 0) {
            return res.status(400).json(validationError);
        }
        const { email, password } = customerInputs;
        const customer = yield Customer_1.Customer.findOne({ email: email });
        if (!customer) {
            return res.status(404).json({
                status: 404,
                message: 'Customer not found with the provided Email ID',
            });
        }
        if (customer) {
            const validation = yield (0, utility_1.ValidatePassword)(password, customer.password, customer.salt);
            if (validation) {
                try {
                    const signature = yield (0, utility_1.GenerateSignature)({
                        _id: customer._id,
                        email: customer.email,
                        verified: customer.verified,
                        fullName: customer.fullName,
                        phone: customer.phone,
                    });
                    return res.status(200).json({
                        message: "Customer Login successfully",
                        signature: signature,
                        email: customer.email,
                        verified: customer.verified
                    });
                }
                catch (error) {
                    console.error('Error generating signature:', error);
                    return res.status(500).json({ message: 'Error with generating signature' });
                }
            }
            else {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid Gmail or Password '
                });
            }
        }
    }
    catch (error) {
        return res.status(404).json({ message: 'Error With Login ' });
    }
});
exports.CustomerLogin = CustomerLogin;
/** ---------------------  Customer Verfiy ------------------------------ **/
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                    profile.verified = true;
                    const updatedCustomerResponse = yield profile.save();
                    const signature = yield (0, utility_1.GenerateSignature)({
                        _id: updatedCustomerResponse._id,
                        email: updatedCustomerResponse.email,
                        verified: updatedCustomerResponse.verified,
                        fullName: updatedCustomerResponse.fullName,
                        phone: updatedCustomerResponse.phone,
                    });
                    return res.status(200).json({
                        message: "Customer Verified successfully",
                        signature: signature,
                        verified: updatedCustomerResponse.verified,
                        email: updatedCustomerResponse.email
                    });
                }
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Error with OTP Validation'
        });
    }
});
exports.CustomerVerify = CustomerVerify;
/** --------------------- RequestOtp ------------------------------ **/
const RequestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                const { otp, expiry } = (0, utility_1.GenerateOtp)();
                profile.otp = otp;
                profile.otp_expiry = expiry;
                console.log(profile.otp);
                yield profile.save();
                // const sendCode = await onRequestOTP(otp, profile.phone);
                // if (!sendCode) {
                //     return res.status(400).json({ message: 'Failed to verify your phone number' })
                // }
                return res.status(200).json({ message: 'OTP sent to your registered Mobile Number!' });
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: 'Error with Requesting OTP'
        });
    }
});
exports.RequestOtp = RequestOtp;
/** --------------------- Customer Profile------------------------------ **/
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                return res.status(200).json(profile);
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: 'Error while Fetching Profile'
        });
    }
});
exports.GetCustomerProfile = GetCustomerProfile;
/** --------------------- Edit Customer------------------------------ **/
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.EditCustomerProfileInput, req.body);
        const validationError = yield (0, class_validator_1.validate)(customerInputs, { validationError: { target: true } });
        if (validationError.length > 0) {
            return res.status(400).json(validationError);
        }
        const { fullName, 
        // lastName, 
        address } = customerInputs;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                profile.fullName = fullName;
                // profile.lastName = lastName;
                profile.address = address;
                const result = yield profile.save();
                return res.status(200).json(result);
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: 'Error while Updating Profile'
        });
    }
});
exports.EditCustomerProfile = EditCustomerProfile;
/** --------------------- Add To Cart ------------------------------ **/
const AddToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id).populate('cart.food');
            let cartItems = Array();
            const { _id, unit } = req.body;
            const food = yield models_1.Food.findById(_id);
            if (food) {
                if (profile != null) {
                    cartItems = profile.cart;
                    if (cartItems.length > 0) {
                        // check and update
                        let existFoodItems = cartItems.filter((item) => item.food._id.toString() === _id);
                        if (existFoodItems.length > 0) {
                            const index = cartItems.indexOf(existFoodItems[0]);
                            if (unit > 0) {
                                cartItems[index] = { food, unit };
                            }
                            else {
                                cartItems.splice(index, 1);
                            }
                        }
                        else {
                            cartItems.push({ food, unit });
                        }
                    }
                    else {
                        // add new Item
                        cartItems.push({ food, unit });
                    }
                    if (cartItems) {
                        profile.cart = cartItems;
                        const cartResult = yield profile.save();
                        return res.status(200).json({
                            message: "Item Added in Cart",
                            data: cartResult.cart
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        return res.status(404).json({
            message: 'Unable to add to cart!'
        });
    }
});
exports.AddToCart = AddToCart;
/** ---------------------Get Cart Datas ------------------------------ **/
const GetCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id).populate('cart.food');
            if (profile) {
                return res.status(200).json(profile.cart);
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Cart is Empty!' });
    }
});
exports.GetCart = GetCart;
/** ---------------------Delete Cart------------------------------ **/
const DeleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id).populate('cart.food').exec();
            if (profile != null) {
                profile.cart = [];
                const cartResult = yield profile.save();
                return res.status(200).json(cartResult);
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'cart is Already Empty!' });
    }
});
exports.DeleteCart = DeleteCart;
/** ---------------------Verify Offer------------------------------ **/
const VerifyOffer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offerId = req.params.id;
        const customer = req.user;
        if (customer) {
            const appliedOffer = yield models_1.Offer.findById(offerId);
            if (appliedOffer) {
                if (appliedOffer.isActive) {
                    const offer = {
                        offerId: appliedOffer._id,
                        title: appliedOffer.title,
                        description: appliedOffer.description,
                        promocode: appliedOffer.promocode,
                        isActive: appliedOffer.isActive,
                        offerAmount: appliedOffer.offerAmount
                    };
                    return res.status(200).json({ message: 'Offer Added', offer: offer });
                }
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Offer is Not Valid' });
    }
});
exports.VerifyOffer = VerifyOffer;
/** ---------------------Available Offers------------------------------ **/
const AvailableOffers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const offers = yield models_1.Offer.find();
            if (offers && offers.length > 0) {
                const Offers = offers.map((offer) => ({
                    offerId: offer._id,
                    title: offer.title,
                    description: offer.description,
                    promocode: offer.promocode,
                    isActive: offer.isActive,
                    // Add other fields as needed
                }));
                return res.status(200).json({ Offers });
            }
            else {
                // Handle case where no offers are found
                return res.status(404).json({ message: 'No offers available' });
            }
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (error) {
        return res.json({ message: 'Offers Not available' });
    }
});
exports.AvailableOffers = AvailableOffers;
/** ---------------------Create Payment ------------------------------ **/
const CreatePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        const { totalPrice, paymentMode, offerId } = req.body;
        let payableAmount = Number(totalPrice);
        if (offerId) {
            const appliedOffer = yield models_1.Offer.findById(offerId);
            if (!appliedOffer) {
                return res.status(400).json({ message: 'Offer is Not Valid' });
            }
            if (appliedOffer.isActive) {
                payableAmount = (payableAmount - appliedOffer.offerAmount);
            }
        }
        // perform payment gateway charge api
        // create record on transaction
        const transaction = yield models_1.Transaction.create({
            customer: customer === null || customer === void 0 ? void 0 : customer._id,
            vendorId: '',
            orderId: '',
            orderValue: payableAmount,
            offerUsed: offerId || 'NA',
            status: 'OPEN',
            paymentMode: paymentMode,
            paymentResponse: 'Payment is cash on Delivery'
        });
        return res.status(200).json({
            message: "Payment successfully Done",
            transaction
        });
    }
    catch (error) {
        //return transaction
        return res.status(200).json({
            message: 'Error while creating transaction'
        });
    }
});
exports.CreatePayment = CreatePayment;
/** ---------------------Create Stripe Payment ------------------------------ **/
const CreateStripePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        const { products } = req.body;
        if (customer && products && Array.isArray(products)) {
            const lineItems = products.map((product) => {
                const productData = {
                    name: product.name,
                    images: [product.images],
                };
                return {
                    price_data: {
                        currency: "inr",
                        product_data: productData,
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: product.quantity
                };
            });
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems,
                success_url: "https://delivery-point.netlify.app/profile/orders",
                cancel_url: "https://delivery-point.netlify.app/payment-cancel"
            });
            res.json({ sessionId: session.id });
        }
        else {
            throw new Error("Invalid request data");
        }
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: 'Error while creating transaction' });
    }
});
exports.CreateStripePayment = CreateStripePayment;
/** ---------------------validate Transaction ------------------------------ **/
const validateTransaction = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTransaction = yield models_1.Transaction.findById(tnxId);
    if (currentTransaction) {
        if (currentTransaction.status.toLowerCase() !== "failed") {
            return { status: true, currentTransaction };
        }
    }
    return { status: false, currentTransaction };
});
/** ---------------------Create Order ------------------------------ **/
const CreateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        const { tnxId, amount, items, CustomerAddress } = req.body;
        if (customer) {
            const { status, currentTransaction } = yield validateTransaction(tnxId);
            if (!status || !currentTransaction) {
                return res.status(400).json({ message: 'Transaction not valid or not found' });
            }
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (!profile) {
                // Handle the case where the customer profile is not found
                return res.status(404).json({ message: 'Customer not found' });
            }
            const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
            const cart = req.body;
            let cartItems = Array();
            let netAmount = 0.0;
            let vendorId;
            const foods = yield models_1.Food.find().where('_id').in(items.map(item => item._id)).exec();
            foods.map(food => {
                items.map(({ _id, unit }) => {
                    if (food._id == _id) {
                        vendorId = food.vendorId;
                        netAmount += (food.price * unit);
                        cartItems.push({
                            food,
                            unit
                        });
                    }
                });
            });
            if (cartItems) {
                const currentOrder = yield Order_1.Order.create({
                    orderId: orderId,
                    vendorId: vendorId,
                    items: cartItems,
                    totalAmount: netAmount,
                    paidAmount: amount,
                    orderDate: new Date(),
                    orderStatus: 'Waiting',
                    remarks: "",
                    deliveryId: "",
                    readyTime: 30,
                    CustomerAddress: CustomerAddress
                });
                profile.cart = [];
                profile.orders.push(currentOrder);
                // currentTransaction.vendorId = vendorId;
                currentTransaction.orderId = orderId;
                currentTransaction.status = 'CONFIRMED';
                yield currentTransaction.save();
                // await assignOrderForDelivery(currentOrder._id, vendorId);
                try {
                    const profileSaveResponse = yield profile.save();
                    return res.status(200).json({
                        message: "Order Created successfully",
                        profileSaveResponse
                    });
                }
                catch (error) {
                    console.error('Error saving profile:', error);
                    return res.status(500).json({ message: 'Failed to save profile' });
                }
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Error while Creating Order' });
    }
});
exports.CreateOrder = CreateOrder;
/** ---------------------Get Orders Datas ------------------------------ **/
const GetOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            // const profile = await Customer.findById(customer._id).populate("orders");
            const profile = yield Customer_1.Customer.findById(customer._id).populate({
                path: 'orders',
                populate: {
                    path: 'items.food',
                }
            });
            if (profile) {
                return res.status(200).json(profile.orders);
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Orders not found' });
    }
});
exports.GetOrders = GetOrders;
/** ---------------------Get Orders By Id ------------------------------ **/
const GetOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        if (orderId) {
            const order = yield Order_1.Order.findById(orderId).populate("items.food");
            if (order) {
                return res.status(200).json(order);
            }
            else {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Order not found' });
    }
});
exports.GetOrderById = GetOrderById;
/** ---------------------Get Favourite Foods ------------------------------ **/
const getFavouriteFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    try {
        if (!customer) {
            return res.status(404).json({
                status: 404,
                message: 'Customer not found'
            });
        }
        const customerWithFavourites = yield Customer_1.Customer.findById(customer._id).populate('favourite.food');
        if (!customerWithFavourites) {
            return res.status(404).json({
                status: 404,
                message: 'Customer not found'
            });
        }
        const favouriteFoodIds = customerWithFavourites.favourite.map(fav => fav.toString());
        const favouriteFoods = yield models_1.Food.find({ _id: { $in: favouriteFoodIds } });
        return res.status(200).json({
            favouriteFoods
        });
    }
    catch (error) {
        console.error('Error fetching favourite foods:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getFavouriteFoods = getFavouriteFoods;
/** ---------------------Add Favourite Food ------------------------------ **/
const addFavouriteFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { foodId } = req.body;
    try {
        // Check if customer ID is valid
        if (!customerId) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }
        // Find the customer by ID
        const customer = yield Customer_1.Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        // Find the food item by ID
        const food = yield models_1.Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        // Add food to customer's favorites
        if (!customer.favourite.includes(foodId)) {
            customer.favourite.push(foodId);
            yield customer.save();
        }
        else {
            return res.status(400).json({ message: 'Food already in favorites' });
        }
        // Return success response
        return res.status(200).json({
            message: 'Food added to favorites successfully',
            favourite: customer.favourite
        });
    }
    catch (error) {
        console.error('Error adding food to favorites:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.addFavouriteFood = addFavouriteFood;
/** ---------------------Remove Favourite Food ------------------------------ **/
const removeFavouriteFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const customerId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id; // Assuming user object contains customer ID
    const { foodId } = req.body; // Extract foodId from request body
    try {
        // Check if customer ID is valid
        if (!customerId) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }
        // Find the customer by ID
        const customer = yield Customer_1.Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        // Check if foodId exists in customer's favourites
        const index = customer.favourite.indexOf(foodId);
        if (index === -1) {
            return res.status(400).json({ message: 'Food item not found in favourites' });
        }
        // Remove foodId from customer's favourites array
        customer.favourite.splice(index, 1);
        yield customer.save();
        // Return success response
        return res.status(200).json({
            message: 'Food removed from favourites successfully',
            favourite: customer.favourite
        });
    }
    catch (error) {
        console.error('Error removing food from favourites:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.removeFavouriteFood = removeFavouriteFood;
const GetTransactionsByCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const customer = req.user;
        const customerId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        if (customer) {
            const transaction = yield models_1.Transaction.findOne({ customer: customerId });
            if (transaction) {
                return res.status(200).json({ transaction: transaction });
            }
            else {
                return res.status(404).json({
                    message: "Transaction not found",
                });
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Transaction not found' });
    }
});
exports.GetTransactionsByCustomer = GetTransactionsByCustomer;
/** --------------------- Customer Logout------------------------------ **/
const CustomerLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.CustomerLogout = CustomerLogout;
