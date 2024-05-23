"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.ChatRoute = router;
const middlewares_1 = require("../middlewares");
router.use(middlewares_1.Authenticate);
/** --------------------- Create Vendor ------------------------------ **/
router.post('/sent-messages', controllers_1.ChatMessageService);
