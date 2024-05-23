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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes");
/** --------------------- App Server ------------------------------ **/
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
    app.use('/images', express_1.default.static('../images'));
    app.use((req, res, next) => { res.setHeader('Access-Control-Allow-Origin', '*'); next(); });
    app.use('/admin', routes_1.AdminRoute);
    app.use('/vendor', routes_1.VendorRoute);
    app.use('/customer', routes_1.CustomerRoute);
    app.use('/chats', routes_1.ChatRoute);
    app.use(routes_1.ShoppingRoute);
});
