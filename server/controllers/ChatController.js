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
exports.ChatMessageService = void 0;
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const sessionId = uuid.v4();
/** --------------------- Create ChatMessageService  ------------------------------ **/
const ChatMessageService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const { message } = req.body;
    if (customer) {
        runSample(message)
            .then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            console.log(error);
        });
    }
});
exports.ChatMessageService = ChatMessageService;
function runSample(message_1) {
    return __awaiter(this, arguments, void 0, function* (message, projectId = 'deliverypoint-bot-k9dr') {
        const sessionClient = new dialogflow.SessionsClient({
            keyFilename: "/home/backend/All-React-Projects/FoodOrderApp/server/deliverypoint-bot-k9dr-673b608529a3.json"
        });
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en-US',
                },
            },
        };
        try {
            const responses = yield sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            if (result.intent) {
                return result.fulfillmentText;
            }
            else {
                console.log('  No intent matched.');
            }
        }
        catch (error) {
            console.error('ERROR:', error);
        }
    });
}
