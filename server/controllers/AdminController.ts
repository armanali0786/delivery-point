import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';
import { Transaction, Vendor } from '../models';
import { GenerateSalt, GeneratePassword } from '../utility';


/** --------------------- Find Vendor  ------------------------------ **/

export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email: email });
    } else {
        return await Vendor.findById(id);
    }
}

/** --------------------- Create Vendor  ------------------------------ **/

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, ownerName, address, pincode, foodType, email, password, phone } = <CreateVendorInput>req.body;
        const existingVendor = await FindVendor('', email);
        if (existingVendor) {
            return res.status(409).json({
                message: "Vendor already exists"
            })
        }
        // generate a salt 
        const salt = await GenerateSalt()
        const userPassword = await GeneratePassword(password, salt)

        const CreateVendor = await Vendor.create({
            name: name,
            ownerName: ownerName,
            foodType: foodType,
            pincode: pincode,
            address: address,
            phone: phone,
            email: email,
            salt: salt,
            password: userPassword,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            foods: []
        })
        return res.status(200).json(CreateVendor)
    } catch (error) {
        return res.status(500).json({
            message: "Error creating vendor"
        })
    }

}

/** ---------------------  All Vendors  ------------------------------ **/

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Vendors = await Vendor.find();
        if (Vendors != null) {
            return res.status(200).json(Vendors);
        }
        return res.status(404).json({
            message: "Vendor Data not Available"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error getting vendor"
        })
    }
}

/** ---------------------  Vendor by Id   ------------------------------ **/

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const VendorId = req.params.id;
        const Vendor = await FindVendor(VendorId);
        if (Vendor != null) {
            return res.status(200).json(Vendor);
        }
        return res.status(404).json({
            message: "Vendor Data not Available"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error getting vendor by Id"
        })
    }
}

/** ---------------------  GetTransactions ----------------------------- **/

export const GetTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactions = await Transaction.find();
        if (transactions) {
            return res.status(200).json(transactions)
        }
        return res.json({ "message": "Transactions data not available" })
    } catch (error) {
        return res.status(500).json({
            message: "Error getting to Transactions"
        })
    }

}

/** ---------------------  GetTransactions  by Id   ----------------------------- **/

export const GetTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const transaction = await Transaction.findById(id);
        if (transaction) {
            return res.status(200).json(transaction)
        }
        return res.json({ "message": "Transaction data not available" })
    } catch (error) {
        return res.status(500).json({
            message: "Error getting to Transaction by Id"
        })
    }
}