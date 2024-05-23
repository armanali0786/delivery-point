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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSignature = exports.GenerateSignature = exports.ValidatePassword = exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/** ---------------------  Generate Salt ----------------------------- **/
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt(10);
});
exports.GenerateSalt = GenerateSalt;
/** --------------------- Generate Salt (password)----------------------------- **/
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
/** --------------------- Validate (password)----------------------------- **/
const ValidatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.GeneratePassword)(enteredPassword, salt)) === savedPassword;
});
exports.ValidatePassword = ValidatePassword;
/** ---------------------Generate Signature (token)----------------------------- **/
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, { expiresIn: "1d" });
});
exports.GenerateSignature = GenerateSignature;
/** ---------------------Validate Signature (token)----------------------------- **/
const ValidateSignature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get('Authorization');
    if (signature) {
        const splitSignature = signature.split(' ')[1];
        if (splitSignature !== "null") {
            try {
                const payload = jsonwebtoken_1.default.verify(splitSignature, config_1.JWT_SECRET);
                req.user = payload;
                return true;
            }
            catch (error) {
                console.error("Error validating signature:", error);
                return false;
            }
        }
    }
    return false;
});
exports.ValidateSignature = ValidateSignature;
