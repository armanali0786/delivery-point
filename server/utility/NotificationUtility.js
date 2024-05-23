"use strict";
/* ------------------- Email --------------------- */
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
exports.onRequestOTP = exports.GenerateOtp = void 0;
/* ------------------- Notification --------------------- */
/* ------------------- OTP --------------------- */
const GenerateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountSid = "Your Account SID from TWILIO DASHBOARD";
        const authToken = "YOUR AUTH TOKEN AS I SAID ON VIDEO";
        const client = require('twilio')(accountSid, authToken);
        const response = yield client.messages.create({
            body: `Your OTP is ${otp}`,
            from: 'Your TWILIO PHONE NUMBER YOU CAN GET IT FROM YOUR DASHBOARD',
            to: `+91${toPhoneNumber}` // recipient phone number // Add country before the number
        });
        return response;
    }
    catch (error) {
        return false;
    }
});
exports.onRequestOTP = onRequestOTP;
/* ------------------- Payment --------------------- */ 
