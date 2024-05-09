import { Request, Response, NextFunction } from 'express';
import { CreateOfferInputs, EditVendorInputs, VendorLoginInputs } from '../dto';
import { FindVendor } from './AdminController';
import { ValidatePassword, GenerateSignature } from '../utility';
import { CreateFoodInput } from '../dto/Food.dto';
import { Food } from '../models/Food';
import { Order } from '../models/Order';
import { Offer } from '../models';

/** --------------------- Vendor Login ------------------------------ **/

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInputs>req.body;
    const existingVendor = await FindVendor('', email);
    try {
        if (existingVendor !== null) {
            const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);
            if (validation) {
                const signature = await GenerateSignature({
                    _id: existingVendor.id,
                    email: existingVendor.email,
                    foodTypes: existingVendor.foodType,
                    name: existingVendor.name,
                });

                return res.status(200).json({
                    message: "Login successfully",
                    token: signature,
                });
            } else {
                return res.status(409).json({ message: 'Password is not valid' });
            }
        } else {
            res.status(401).json({
                message: 'Error to login Vendor'
            });
        }
    } catch (error) {

        console.error('Error during VendorLogin:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
}

/** --------------------- Vendor Profile ------------------------------ **/

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = await FindVendor(user._id);
            return res.status(200).json(existingVendor);
        }
    } catch (error) {
        return res.status(400).json({ message: 'Vendor not Found' });
    }

}

/** --------------------- Update Vendor Profile ------------------------------ **/

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { foodTypes, name, address, phone } = <EditVendorInputs>req.body
        const user = req.user;
        if (user) {
            const existingVendor = await FindVendor(user._id);

            if (existingVendor !== null) {
                existingVendor.foodType = foodTypes;
                existingVendor.name = name;
                existingVendor.address = address;
                existingVendor.phone = phone;
                const savedResult = await existingVendor.save();
                return res.status(200).json(savedResult);
            }

            return res.status(200).json(existingVendor);
        }
    } catch (error) {
        return res.status(400).json({ message: 'Vendor not Found' });
    }

}

/** --------------------- Update Vendor Cover Image ------------------------------ **/

export const UpdateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        if (user) {
            try {
                const vendor = await FindVendor(user._id);
                console.log(vendor);
                if (!vendor) {
                    return res.status(404).json({ message: 'Vendor not found' });
                }
                if (vendor !== null) {

                    const files = req.files as [Express.Multer.File];

                    const images = files.map((file: Express.Multer.File) => file.filename);

                    vendor.coverImages.push(...images);

                    const saveResult = await vendor.save();

                    return res.json(saveResult);
                }
            } catch (error) {
                console.error('Error updating vendor cover images:', error);
                return res.status(500).json({ message: 'Failed to update vendor profile' });
            }
        }
    } catch (error) {
        return res.json({ 'message': 'Unable to Update vendor profile ' })
    }

}

/** --------------------- Update Vendor Service ------------------------------ **/

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = await FindVendor(user._id);

            if (existingVendor !== null) {

                existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                const savedResult = await existingVendor.save();
                return res.status(200).json(savedResult);
            }

            return res.status(200).json(existingVendor);
        }
    } catch (error) {
        return res.status(400).json({ message: 'Vendor not Found' });
    }
}

/** --------------------- Add Food ------------------------------ **/

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const { name, description, category, foodType, readyTime, price, featured, brandName, favourite } = <CreateFoodInput>req.body;
            const Vendor = await FindVendor(user._id)
            if (Vendor != null) {

                const files = req.files as [Express.Multer.File];

                const images = files.map((file: Express.Multer.File) => file.filename);

                const createFood = await Food.create({
                    vendorId: Vendor._id,
                    name: name,
                    description: description,
                    category: category,
                    price: price,
                    rating: 0,
                    readyTime: readyTime,
                    foodType: foodType,
                    images: images,
                    featured: featured,
                    favourite: favourite,
                    brandName: brandName
                })
                Vendor.foods.push(createFood);
                const result = await Vendor.save();
                return res.status(200).json(result);
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong with add food' });
    }
}

/** ---------------------Get All Foods ------------------------------ **/

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const foods = await Food.find({
                VendorId: user._id
            })
            if (foods != null) {
                return res.status(200).json(foods);
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Food Info not Found' });
    }
}

export const GetCurrentOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const orders = await Order.find({ vendorId: user._id }).populate('items.food');
            if (orders != null) {
                return res.status(200).json(orders);
            }
        }
    } catch (error) {
        return res.json({ message: 'Orders Not found!' });
    }
}

export const GetOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        if (orderId) {
            const order = await Order.findById(orderId).populate('items.food');
            if (order != null) {
                return res.status(200).json(order);
            }
        }
    } catch (error) {
        return res.json({ message: 'Order Not found' });
    }
}

export const ProcessOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;

        const { status, remarks, time } = req.body;

        if (orderId) {

            const order = await Order.findById(orderId).populate('items.food');

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            order.orderStatus = status;
            order.remarks = remarks;
            if (time) {
                order.readyTime = time;
            }

            const orderResult = await order.save();

            if (orderResult != null) {
                return res.status(200).json(orderResult);
            }
        }
    } catch (error) {
        return res.json({ message: 'Unable to process order' });
    }
}

export const GetOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (user) {
            let currentOffer = Array();

            const offers = await Offer.find().populate('vendors');

            if (offers) {

                offers.map(item => {

                    if (item.vendors) {
                        item.vendors.map(vendor => {
                            if (vendor._id.toString() === user._id) {
                                currentOffer.push(item);
                            }
                        })
                    }

                    if (item.offerType === "GENERIC") {
                        currentOffer.push(item)
                    }

                })

            }
            return res.status(200).json(currentOffer);
        }
    } catch (error) {
        return res.json({ message: 'Offers Not available' });
    }

}

export const AddOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (user) {
            const { title, description, offerType, offerAmount, pincode,
                promocode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <CreateOfferInputs>req.body;

            const vendor = await FindVendor(user._id);

            if (vendor) {

                const offer = await Offer.create({
                    title,
                    description,
                    offerType,
                    offerAmount,
                    pincode,
                    promoType,
                    startValidity,
                    endValidity,
                    bank,
                    isActive,
                    promocode,
                    bins,
                    minValue,
                    vendors: [vendor]
                })

                console.log(offer);

                return res.status(200).json(offer);
            }
        }
    } catch (error) {
        return res.json({ message: 'Unable to add Offer!' });
    }

}

export const EditOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const offerId = req.params.id;

        if (user) {
            const { title, description, offerType, offerAmount, pincode,
                promocode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <CreateOfferInputs>req.body;

            const currentOffer = await Offer.findById(offerId);

            if (currentOffer) {

                const vendor = await FindVendor(user._id);

                if (vendor) {
                    currentOffer.title = title,
                        currentOffer.description = description,
                        currentOffer.offerType = offerType,
                        currentOffer.offerAmount = offerAmount,
                        currentOffer.pincode = pincode,
                        currentOffer.promoType = promoType,
                        currentOffer.startValidity = startValidity,
                        currentOffer.endValidity = endValidity,
                        currentOffer.bank = bank,
                        currentOffer.isActive = isActive,
                        currentOffer.minValue = minValue;
                        currentOffer.promocode = promocode;
                        currentOffer.bins = bins;
                        const result = await currentOffer.save();
                    return res.status(200).json(result);
                }
            }
        }
    } catch (error) {
        return res.json({ message: 'Unable to add Offer!' });
    }

}