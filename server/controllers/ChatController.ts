import { Request, Response, NextFunction } from 'express';

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const sessionId = uuid.v4();

/** --------------------- Create ChatMessageService  ------------------------------ **/

export const ChatMessageService = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    const { message } = req.body;
    if (customer) {
        runSample(message)
            .then((data) => {
                res.status(200).json(data);
            }).catch((error) => {
                console.log(error);
            })
    }
}




async function runSample(message: string, projectId = 'deliverypoint-bot-k9dr') {

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "/home/backend/All-React-Projects/FoodOrderApp/server/deliverypoint-bot-k9dr-673b608529a3.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

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
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        if (result.intent) {
            return result.fulfillmentText;
        } else {
            console.log('  No intent matched.');
        }
    } catch (error) {
        console.error('ERROR:', error);
    }
}

