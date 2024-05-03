import { Request, Response , NextFunction } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { ValidateSignature } from "../utility";

declare global{
    namespace Express {
         interface Request {
            user?: AuthPayload;
        }
    }
}

/** --------------------- Authenticate Signature (token) ----------------------------- **/

export const Authenticate = async (req: Request, res: Response, next:NextFunction) => {
    const validate = await ValidateSignature(req);
    if(validate){
        next();
    }else{
        return res.status(401).json({message:"Invalid signature"});
    }
}