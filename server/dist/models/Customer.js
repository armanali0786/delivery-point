"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CustomerSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    fullName: { type: String, required: true },
    // lastName: {type: String,required: true},
    address: { type: String },
    phone: { type: String, required: true },
    verified: { type: Boolean },
    otp: { type: Number },
    otp_expiry: { type: Date },
    lat: { type: Number },
    lng: { type: Number },
    cart: [
        {
            food: { type: mongoose_1.Schema.Types.ObjectId, ref: 'food', require: true },
            unit: { type: Number, require: true }
        }
    ],
    orders: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'order'
        }],
    favourite: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'food' }]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});
const Customer = mongoose_1.default.model('customer', CustomerSchema);
exports.Customer = Customer;
