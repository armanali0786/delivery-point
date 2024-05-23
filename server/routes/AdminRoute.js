"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.AdminRoute = router;
/** --------------------- Create Vendor ------------------------------ **/
router.post('/Vendor', controllers_1.CreateVendor);
/** --------------------- All Vendors ------------------------------ **/
router.get('/Vendors', controllers_1.GetVendors);
/** --------------------- All Vendor By Id ------------------------------ **/
router.get('/Vendor/:id', controllers_1.GetVendorById);
/** --------------------- Get Transactions------------------------------ **/
router.get('/transactions', controllers_1.GetTransactions);
/** --------------------- All Transaction By Id ------------------------------ **/
router.get('/transaction/:id', controllers_1.GetTransactionById);
