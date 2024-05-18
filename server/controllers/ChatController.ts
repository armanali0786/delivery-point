
import { Request, Response, NextFunction } from 'express';

/** --------------------- Create ChatMessageService  ------------------------------ **/

export const ChatMessageService = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    const { message} = req.body;
    if(customer){
        const botResponse = generateBotResponse(message);
        res.json({ message: botResponse });
    }
}

function generateBotResponse(message:any) {
    return `Received: ${message}`;
}


