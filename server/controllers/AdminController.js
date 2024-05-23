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
exports.GetTransactionById = exports.GetTransactions = exports.GetVendorById = exports.GetVendors = exports.CreateVendor = exports.FindVendor = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
/** --------------------- Find Vendor  ------------------------------ **/
const FindVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield models_1.Vendor.findOne({ email: email });
    }
    else {
        return yield models_1.Vendor.findById(id);
    }
});
exports.FindVendor = FindVendor;
/** --------------------- Create Vendor  ------------------------------ **/
const CreateVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ownerName, address, pincode, foodType, email, password, phone } = req.body;
        const existingVendor = yield (0, exports.FindVendor)('', email);
        if (existingVendor) {
            return res.status(409).json({
                message: "Vendor already exists"
            });
        }
        // generate a salt 
        const salt = yield (0, utility_1.GenerateSalt)();
        const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
        const CreateVendor = yield models_1.Vendor.create({
            name: name,
            ownerName: ownerName,
            foodType: foodType,
            pincode: pincode,
            address: address,
            phone: phone,
            email: email,
            salt: salt,
            password: userPassword,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            foods: []
        });
        return res.status(200).json(CreateVendor);
    }
    catch (error) {
        return res.status(500).json({
            message: "Error creating vendor"
        });
    }
});
exports.CreateVendor = CreateVendor;
/** ---------------------  All Vendors  ------------------------------ **/
const GetVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Vendors = yield models_1.Vendor.find();
        if (Vendors != null) {
            return res.status(200).json(Vendors);
        }
        return res.status(404).json({
            message: "Vendor Data not Available"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error getting vendor"
        });
    }
});
exports.GetVendors = GetVendors;
/** ---------------------  Vendor by Id   ------------------------------ **/
const GetVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const VendorId = req.params.id;
        const Vendor = yield (0, exports.FindVendor)(VendorId);
        if (Vendor != null) {
            return res.status(200).json(Vendor);
        }
        return res.status(404).json({
            message: "Vendor Data not Available"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error getting vendor by Id"
        });
    }
});
exports.GetVendorById = GetVendorById;
/** ---------------------  GetTransactions ----------------------------- **/
const GetTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield models_1.Transaction.find();
        if (transactions) {
            return res.status(200).json(transactions);
        }
        return res.json({ "message": "Transactions data not available" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error getting to Transactions"
        });
    }
});
exports.GetTransactions = GetTransactions;
/** ---------------------  GetTransactions  by Id   ----------------------------- **/
const GetTransactionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const transaction = yield models_1.Transaction.findById(id);
        if (transaction) {
            return res.status(200).json(transaction);
        }
        return res.json({ "message": "Transaction data not available" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error getting to Transaction by Id"
        });
    }
});
exports.GetTransactionById = GetTransactionById;
