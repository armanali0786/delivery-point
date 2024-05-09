import express, { Request, Response, NextFunction } from 'express';
import { FoodDoc, Offer, Vendor } from '../models';
import { Food } from '../models';
// import { Offer } from '../models/Offer';


/** ---------------------  All Food Available  ------------------------------ **/

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pincode = req.params.pincode;
        const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(404).json({ message: 'data Not found!' });
    }
}

/** ---------------------  All Food Available By VendorId ------------------------------ **/

export const GetFoodByVendorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorId = req.params.vendorId;
        const result = await Vendor.find({ _id: vendorId, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(404).json({ message: 'data Not found!' });
    }
}

/** --------------------- Top Restaurants  ------------------------------ **/

export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pincode = req.params.pincode;
        const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).limit(10)
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
}


/** --------------------- Get All Restaurants  ------------------------------ **/

export const GetAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Vendor.find({})
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
}


/** --------------------- Food Available in 30 Minutes ------------------------------ **/

export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pincode = req.params.pincode;
        const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods');
        if (result.length > 0) {
            let foodResult: any = [];
            result.map(vendor => {
                const foods = vendor.foods as [FoodDoc];
                foodResult.push(...foods.filter(food => food.readyTime <= 30));
            })
            return res.status(200).json(foodResult);
        }
    } catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
}

/** --------------------- Food Available in 30 Minutes ------------------------------ **/

export const GetFoodsIn30Minutes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foods = await Food.find({
            readyTime: { $lte: 30 } // Assuming `readyTime` is in minutes
        });

        if (foods.length === 0) {
            return res.status(404).json({ msg: 'No food items have a readyTime less than or equal to 30 minutes.' });
        }

        res.status(200).json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}


/** --------------------- Restaurant By Id ------------------------------ **/

export const RestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await Vendor.findById(id).populate('foods')
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
}

/** --------------------- Search Food ------------------------------ **/

export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pincode = req.params.pincode;
        const result = await Vendor.find({ pincode: pincode, serviceAvailable: false })
            .populate('foods');
        if (result.length > 0) {
            let foodResult: any = [];
            result.map(item => foodResult.push(...item.foods));
            return res.status(200).json(foodResult);
        }
    } catch (error) {
        return res.status(404).json({ msg: 'data Not found!' });
    }
}

/** --------------------- Available Offers ------------------------------ **/

export const GetAvailableOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pincode = req.params.pincode;
        const offers = await Offer.find({ pincode: pincode, isActive: true });
        if (offers) {
            return res.status(200).json(offers);
        }
    } catch (error) {
        return res.json({ message: 'Offers not Found!' });
    }
}

/** --------------------- Get AllFoods ------------------------------ **/

export const getAllFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foods = await Food.find({});
        // const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')
        if (foods) {
            return res.status(200).json(foods);
        } else {
            return res.status(400).json({
                status: 400,
                message: 'No food found'
            })
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

/** --------------------- Get Food By Category ------------------------------ **/

export const getFoodByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { foodType, rating } = req.query;

        // Ensure foodType is treated as a string
        const foodTypeString = foodType as string;

        // Prepare query conditions based on request parameters
        const queryConditions: any = {};

        if (foodTypeString) {
            // Split comma-separated foodType string into an array of categories
            const selectedCategories = foodTypeString.split(',').map((category: string) => category.trim().toLowerCase());
            queryConditions.foodType = { $in: selectedCategories }; // Match any of the specified categories
        }

        if (rating) {
            // Validate and convert rating to a number
            const parsedRating = parseFloat(rating as string);
            if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
                return res.status(400).json({
                    status: 400,
                    message: 'Valid "rating" parameter is required as a number between 0 and 5'
                });
            }

            queryConditions.rating = { $gte: parsedRating }; // Filter by rating greater than or equal to specified value
        }

        // Query database with combined conditions
        const foods = await Food.find(queryConditions);

        if (foods && foods.length > 0) {
            return res.status(200).json(foods);
        } else {
            // No food found for the specified criteria
            return res.status(200).json([]); // Return an empty array or object
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

/** --------------------- Get get Top Foods ------------------------------ **/

export const getTopFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foods = await Food.find({ featured: true });
        // const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')
        if (foods) {
            return res.status(200).json(foods);
        } else {
            return res.status(400).json({
                status: 400,
                message: 'No food found'
            })
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
