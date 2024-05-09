import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CartItem, CreateCustomerInput, EditCustomerProfileInput, OrderInputs, Product, UserLoginInput } from '../dto/Customer.dto';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, onRequestOTP } from '../utility';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { Food, Offer, Transaction } from '../models';
import { STRIPE_SK } from "../config";

const stripe = require('stripe')(STRIPE_SK)

/** --------------------- Create Customer ------------------------------ **/

export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerInputs = plainToClass(CreateCustomerInput, req.body);

        const inputErrors = await validate(customerInputs, { validationError: { target: true } });

        if (inputErrors.length > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Getting Errors',
                errors: inputErrors
            })
        }

        const { fullName,
            // lastName, 
            address, email, phone, password } = customerInputs;

        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(password, salt);

        const { otp, expiry } = GenerateOtp();

        console.log(" OTP :", otp);

        const existCustomer = await Customer.findOne({ email: email })
        if (existCustomer) {
            return res.status(409).json({
                status: 409,
                message: 'Customer exist with the provided Email ID',
            })
        }

        const result = await Customer.create({
            fullName: fullName,
            // lastName: lastName,
            email: email,
            password: userPassword,
            salt: salt,
            otp: otp,
            otp_expiry: expiry,
            // address: address,
            phone: phone,
            verified: false,
            lat: 0,
            lng: 0,
            orders: []
        })
        if (result) {
            // send OTP to customer
            // await onRequestOTP(otp, phone);
            //Generate the Signature
            const signature = await GenerateSignature({
                _id: result._id,
                email: result.email,
                verified: result.verified,
                fullName: result.fullName,
                phone: result.phone,
            })
            // Send the result
            return res.status(200).json({
                message: "Customer Created successfully",
                signature, verified:
                    result.verified,
                email: result.email,
            })

        }
        return res.status(500).json({
            status: 500,
            message: 'Error with Signup Customer'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error with Signup Customer'
        })
    }

}

/** ---------------------  Customer Login ------------------------------ **/

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerInputs = plainToClass(UserLoginInput, req.body);

        const validationError = await validate(customerInputs, { validationError: { target: true } })

        if (validationError.length > 0) {
            return res.status(400).json(validationError);
        }

        const { email, password } = customerInputs;
        const customer = await Customer.findOne({ email: email });
        if (!customer) {
            return res.status(404).json({
                status: 404,
                message: 'Customer not found with the provided Email ID',
            })
        }
        if (customer) {
            const validation = await ValidatePassword(password, customer.password, customer.salt);
            if (validation) {
                try {
                    const signature = await GenerateSignature({
                        _id: customer._id,
                        email: customer.email,
                        verified: customer.verified,
                        fullName: customer.fullName,
                        phone: customer.phone,
                    });
                    return res.status(200).json({
                        message: "Customer Login successfully",
                        signature: signature,
                        email: customer.email,
                        verified: customer.verified
                    });
                } catch (error) {
                    console.error('Error generating signature:', error);
                    return res.status(500).json({ message: 'Error with generating signature' });
                }
            } else {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid Gmail or Password '
                })
            }
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error With Login ' });
    }
}

/** ---------------------  Customer Verfiy ------------------------------ **/

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp } = req.body;
        const customer = req.user;
        if (customer) {
            const profile = await Customer.findById(customer._id);
            if (profile) {
                if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                    profile.verified = true;
                    const updatedCustomerResponse = await profile.save();

                    const signature = await GenerateSignature({
                        _id: updatedCustomerResponse._id,
                        email: updatedCustomerResponse.email,
                        verified: updatedCustomerResponse.verified,
                        fullName: updatedCustomerResponse.fullName,
                        phone: updatedCustomerResponse.phone,
                    });

                    return res.status(200).json({
                        message: "Customer Verified successfully",
                        signature: signature,
                        verified: updatedCustomerResponse.verified,
                        email: updatedCustomerResponse.email
                    })
                }
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Error with OTP Validation'
        })
    }

}

/** --------------------- RequestOtp ------------------------------ **/

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {

            const profile = await Customer.findById(customer._id);

            if (profile) {
                const { otp, expiry } = GenerateOtp();
                profile.otp = otp;
                profile.otp_expiry = expiry;

                console.log(profile.otp);

                await profile.save();

                // const sendCode = await onRequestOTP(otp, profile.phone);

                // if (!sendCode) {
                //     return res.status(400).json({ message: 'Failed to verify your phone number' })
                // }

                return res.status(200).json({ message: 'OTP sent to your registered Mobile Number!' })

            }
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error with Requesting OTP'
        });
    }

}

/** --------------------- Customer Profile------------------------------ **/

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {
            const profile = await Customer.findById(customer._id);
            if (profile) {
                return res.status(200).json(profile);
            }
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error while Fetching Profile'
        });
    }

}

/** --------------------- Edit Customer------------------------------ **/

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const customer = req.user;

        const customerInputs = plainToClass(EditCustomerProfileInput, req.body);

        const validationError = await validate(customerInputs, { validationError: { target: true } })

        if (validationError.length > 0) {
            return res.status(400).json(validationError);
        }

        const { fullName,
            // lastName, 
            address } = customerInputs;

        if (customer) {
            const profile = await Customer.findById(customer._id);

            if (profile) {
                profile.fullName = fullName;
                // profile.lastName = lastName;
                profile.address = address;
                const result = await profile.save()

                return res.status(200).json(result);
            }

        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error while Updating Profile'
        });
    }
}

/** --------------------- Add To Cart ------------------------------ **/

export const AddToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {
            const profile = await Customer.findById(customer._id).populate('cart.food');
            let cartItems = Array();

            const { _id, unit } = <CartItem>req.body;

            const food = await Food.findById(_id);

            if (food) {

                if (profile != null) {
                    cartItems = profile.cart;

                    if (cartItems.length > 0) {
                        // check and update
                        let existFoodItems = cartItems.filter((item) => item.food._id.toString() === _id);
                        if (existFoodItems.length > 0) {

                            const index = cartItems.indexOf(existFoodItems[0]);

                            if (unit > 0) {
                                cartItems[index] = { food, unit };
                            } else {
                                cartItems.splice(index, 1);
                            }

                        } else {
                            cartItems.push({ food, unit })
                        }

                    } else {
                        // add new Item
                        cartItems.push({ food, unit });
                    }

                    if (cartItems) {
                        profile.cart = cartItems as any;
                        const cartResult = await profile.save();
                        return res.status(200).json({
                            message: "Item Added in Cart",
                            data: cartResult.cart
                        });
                    }

                }
            }

        }
    } catch (error) {
        return res.status(404).json({
            message: 'Unable to add to cart!'
        });
    }
}

/** ---------------------Get Cart Datas ------------------------------ **/

export const GetCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {
            const profile = await Customer.findById(customer._id).populate('cart.food');
            if (profile) {
                return res.status(200).json(profile.cart);
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Cart is Empty!' })
    }
}

/** ---------------------Delete Cart------------------------------ **/

export const DeleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {
            const profile = await Customer.findById(customer._id).populate('cart.food').exec();
            if (profile != null) {
                profile.cart = [] as any;
                const cartResult = await profile.save();
                return res.status(200).json(cartResult);
            }
        }
    } catch (error) {

        return res.status(400).json({ message: 'cart is Already Empty!' })
    }
}

/** ---------------------Verify Offer------------------------------ **/

export const VerifyOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const offerId = req.params.id;
        const customer = req.user;
        if (customer) {

            const appliedOffer = await Offer.findById(offerId);
            if (appliedOffer) {
                if (appliedOffer.isActive) {
                    const offer = {
                        offerId: appliedOffer._id,
                        title: appliedOffer.title,
                        description: appliedOffer.description,
                        promocode: appliedOffer.promocode,
                        isActive: appliedOffer.isActive,
                        offerAmount: appliedOffer.offerAmount
                    };
                    return res.status(200).json({ message: 'Offer Added', offer: offer });
                }
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Offer is Not Valid' });
    }

}

/** ---------------------Available Offers------------------------------ **/

export const AvailableOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {
            const offers = await Offer.find();
            if (offers && offers.length > 0) {
                const Offers = offers.map((offer) => ({
                    offerId: offer._id,
                    title: offer.title,
                    description: offer.description,
                    promocode: offer.promocode,
                    isActive: offer.isActive,
                    // Add other fields as needed
                }));
                return res.status(200).json({ Offers });
            } else {
                // Handle case where no offers are found
                return res.status(404).json({ message: 'No offers available' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.json({ message: 'Offers Not available' });
    }

}

/** ---------------------Create Payment ------------------------------ **/

export const CreatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;

        const { totalPrice, paymentMode, offerId } = req.body;
        let payableAmount = Number(totalPrice);

        if (offerId) {

            const appliedOffer = await Offer.findById(offerId);
            if (!appliedOffer) {
                return res.status(400).json({ message: 'Offer is Not Valid' });
            }
            if (appliedOffer.isActive) {
                payableAmount = (payableAmount - appliedOffer.offerAmount);
            }
        }
        // perform payment gateway charge api

        // create record on transaction
        const transaction = await Transaction.create({
            customer: customer?._id,
            vendorId: '',
            orderId: '',
            orderValue: payableAmount,
            offerUsed: offerId || 'NA',
            status: 'OPEN',
            paymentMode: paymentMode,
            paymentResponse: 'Payment is cash on Delivery'
        })
        return res.status(200).json({
            message: "Payment successfully Done",
            transaction
        });
    } catch (error) {
        //return transaction
        return res.status(200).json({
            message: 'Error while creating transaction'
        });
    }



}

/** ---------------------Create Stripe Payment ------------------------------ **/

export const CreateStripePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        const { products } = req.body;
        if (customer && products && Array.isArray(products)) {
            const lineItems = products.map((product) => {
                const productData = {
                    name: product.name,
                    images: [product.images],
                };
                return {
                    price_data: {
                        currency: "inr",
                        product_data: productData,
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: product.quantity
                };
            });
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems,
                success_url: "http://localhost:3000/profile/orders",
                cancel_url: "http://localhost:3000/payment/cancel"
            });
            res.json({ sessionId: session.id });
        } else {
            throw new Error("Invalid request data");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: 'Error while creating transaction' });
    }
};

/** ---------------------validate Transaction ------------------------------ **/

const validateTransaction = async (tnxId: string) => {
    const currentTransaction = await Transaction.findById(tnxId);
    if (currentTransaction) {
        if (currentTransaction.status.toLowerCase() !== "failed") {
            return { status: true, currentTransaction }
        }
    }
    return { status: false, currentTransaction }
}

/** ---------------------Create Order ------------------------------ **/

export const CreateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const customer = req.user;
        const { txnId, amount, items, CustomerAddress } = <OrderInputs>req.body;

        if (customer) {

            const { status, currentTransaction } = await validateTransaction(txnId);


            if (!status || !currentTransaction) {
                return res.status(400).json({ message: 'Transaction not valid or not found' });
            }

            const profile = await Customer.findById(customer._id);


            if (!profile) {
                // Handle the case where the customer profile is not found
                return res.status(404).json({ message: 'Customer not found' });
            }

            const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;

            const cart = <[CartItem]>req.body;

            let cartItems = Array();

            let netAmount = 0.0;

            let vendorId;

            const foods = await Food.find().where('_id').in(items.map(item => item._id)).exec();
            foods.map(food => {
                items.map(({ _id, unit }) => {
                    if (food._id == _id) {
                        vendorId = food.vendorId;
                        netAmount += (food.price * unit);
                        cartItems.push({
                            food,
                            unit
                        })
                    }
                })
            })

            if (cartItems) {
                const currentOrder = await Order.create({
                    orderId: orderId,
                    vendorId: vendorId,
                    items: cartItems,
                    totalAmount: netAmount,
                    paidAmount: amount,
                    orderDate: new Date(),
                    orderStatus: 'Waiting',
                    remarks: "",
                    deliveryId: "",
                    readyTime: 30,
                    CustomerAddress: CustomerAddress
                })
                profile.cart = [] as any;
                profile.orders.push(currentOrder);
                // currentTransaction.vendorId = vendorId;
                currentTransaction.orderId = orderId;
                currentTransaction.status = 'CONFIRMED'

                await currentTransaction.save();
                // await assignOrderForDelivery(currentOrder._id, vendorId);
                try {
                    const profileSaveResponse = await profile.save();
                    return res.status(200).json({
                        message: "Order Created successfully",
                        profileSaveResponse
                    });
                } catch (error) {
                    console.error('Error saving profile:', error);
                    return res.status(500).json({ message: 'Failed to save profile' });
                }
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while Creating Order' });
    }

}

/** ---------------------Get Orders Datas ------------------------------ **/

export const GetOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if (customer) {
            // const profile = await Customer.findById(customer._id).populate("orders");
            const profile = await Customer.findById(customer._id).populate({
                path: 'orders',
                populate: {
                    path: 'items.food', 
                }
            });
            if (profile) {
                return res.status(200).json(profile.orders);
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Orders not found' });
    }
}

/** ---------------------Get Orders By Id ------------------------------ **/

export const GetOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        if (orderId) {

            const order = await Order.findById(orderId).populate("items.food");

            if (order) {
                return res.status(200).json(order);
            }
        }
    } catch (error) {
        return res.status(400).json({ message: 'Order not found' });
    }

}

/** ---------------------Get Favourite Foods ------------------------------ **/

export const getFavouriteFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foods = await Food.find({ favourite: true });
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

/** ---------------------Add Favourite Food ------------------------------ **/

export const addFavouriteFood =  async (req: Request, res: Response, next: NextFunction) => {
    const { foodId } = req.body;
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({
                status: 404,
                message: 'Food not found'
            });
        }
        food.favourite = true;
        await food.save();
        return res.status(200).json({
            message:"Food Added to Favorite",
            food
        });
    } catch (error) {
        console.error('Error adding food to favorites:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

/** ---------------------Remove Favourite Food ------------------------------ **/

export const removeFavouriteFood = async (req: Request, res: Response, next: NextFunction) => {
    const { foodId } = req.body;
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({
                status: 404,
                message: 'Food not found'
            });
        }

        food.favourite = false;
        await food.save();
        return res.status(200).json({
            message:"Food remove from Favorite",
            food
        });
    } catch (error) {
        console.error('Error removing food from favorites:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

/** --------------------- Customer Logout------------------------------ **/

export const CustomerLogout = async (req: Request, res: Response, next: NextFunction) => {
}


