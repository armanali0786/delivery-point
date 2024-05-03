import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { VendorPayload } from "../dto/Vendor.dto";
import { JWT_SECRET } from "../config";
import { AuthPayload } from "../dto/Auth.dto";
import { Request, Response } from 'express';

/** ---------------------  Generate Salt ----------------------------- **/

export const GenerateSalt = async () => {
    return await bcrypt.genSalt(10);
}

/** --------------------- Generate Salt (password)----------------------------- **/

export const GeneratePassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);
}

/** --------------------- Validate (password)----------------------------- **/

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

/** ---------------------Generate Signature (token)----------------------------- **/

export const GenerateSignature = async (payload: AuthPayload) => {

    return Jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })

}

/** ---------------------Validate Signature (token)----------------------------- **/

export const ValidateSignature = async (req: Request) => {
    const signature = req.get('Authorization');
    if (signature) {
        const splitSignature = signature.split(' ')[1];
        if (splitSignature !== "null") {
            try {
                const payload = Jwt.verify(splitSignature, JWT_SECRET) as AuthPayload;
                req.user = payload;
                return true;
            } catch (error) {
                console.error("Error validating signature:", error);
                return false;
            }
        } 
    }
    return false;
}


