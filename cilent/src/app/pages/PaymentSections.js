import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
    resetCart,
} from "../cart/cartSlice";
import axios from "axios";
import { CreateOrder } from "../apis/ApiCall";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function PaymentSections() {

    const { cart, totalQuantity, totalPrice } = useSelector(
        (state) => state.allCart
    );
    const [receivedOffersData, setReceivedOffersData] = useState([]);
    const [completeAddress, setCompleteAddress] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const deliveryAddress = localStorage.getItem('deliveryAddress');
        if (deliveryAddress) {
            try {
                const data = typeof deliveryAddress === 'string' ? JSON.parse(deliveryAddress) : deliveryAddress;
                const Custaddress = data.address;
                const flatNo = data.flatNo;
                // const addressType = data.addressType;
                setCompleteAddress(`${flatNo} , ${Custaddress}`);
            } catch (error) {
                console.error('Error parsing Address items:', error);
            }
        } else {
            console.log('No Address found in localStorage');
        }
    }, []);


    const dispatch = useDispatch();


    const offer = localStorage.getItem('offer');
    useEffect(() => {
        if (offer) {
            try {
                const offerData = JSON.parse(offer);
                setReceivedOffersData(offerData)
            } catch (error) {
                console.error("Error parsing:", error);
            }
        } else {
            console.log("No offer found in localStorage");
        }
    }, [offer]);


    // const handlePayment = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const payload = {
    //             totalPrice: totalPrice,
    //             paymentMode: "COD",
    //             offerId: receivedOffersData.offerId
    //         };
    //         if (cart.length > 0) {
    //             const headers = {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             };
    //             const response = await axios.post(`http://localhost:8080/customer/create-payment`,
    //                 payload, {
    //                 headers: headers,
    //             });
    //             if (response.status === 200) {
    //                 const transformedItems = cart.map(item => ({
    //                     _id: item._id,
    //                     unit: item.quantity
    //                 }));
    //                 const payloadData = {
    //                     items: transformedItems,
    //                     tnxId: response.data.transaction._id,
    //                     totalPrice: totalPrice,
    //                     CustomerAddress: completeAddress,
    //                 }
    //                 CreateOrder(payloadData)
    //                     .then(async (response) => {
    //                         toast.success(response.message);
    //                         await new Promise((resolve) => setTimeout(resolve, 3000));
    //                         dispatch(resetCart());
    //                         navigate('/profile/orders');
    //                     })
    //                     .catch(error => {
    //                         console.error("Error creating order:", error);
    //                     });
    //             }
    //         }else{
    //             toast.error("Please, Add item to cart");
    //         }
    //     } catch (error) {
    //         console.error('Error processing payment:', error.message);
    //     }
    // };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload = {
                totalPrice: totalPrice,
                paymentMode: "COD",
                offerId: receivedOffersData.offerId
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.post(`http://localhost:8080/customer/create-checkout-session`, payload,
            payload, {
                headers: headers,
                Authorization: `Bearer ${token}`,
            });
            if(response.status === 200) {
                const transformedItems = cart.map(item => ({
                    _id: item._id,
                    unit: item.quantity 
                }));
                const payloadData = {
                    items:  transformedItems,
                    tnxId: response.data.transaction._id,
                    totalPrice: totalPrice,
                    CustomerAddress:completeAddress,
                }
                CreateOrder(payloadData)
                .then(async (response) => { 
                    toast.success(response.message);
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    dispatch(resetCart());
                    navigate('/profile/orders');
                })
                .catch(error => {
                    console.error("Error creating order:", error);
                });

            }
        } catch (error) {
            console.error('Error processing payment:', error.message);
        }
    };


    return (
        <>
            <ToastContainer />
            <div className='bg-gray-200 min-h-screen'>
                <div className="max-w-2xl mx-auto p-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-semibold">Payment Options</h1>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div className='flex'>
                                <span className="bg-blue-500 text-white p-1 rounded-full mr-2 h-[35px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.351 1.001 7.307 2.648m-14.614 0A9.973 9.973 0 0 1 12 3v0m0 0c-2.755 0-5.351 1.001-7.307 2.648m14.614 0A9.973 9.973 0 0 0 12 3v0m0 18c-2.755 0-5.351-1.001-7.307-2.648m14.614 0A9.973 9.973 0 0 0 12 21v0m0 0c2.755 0 5.351-1.001 7.307-2.648m-14.614 0A9.973 9.973 0 0 1 12 21v0m0-18v18m0-18C6.477 3 2 7.477 2 12.5S6.477 22 12 22m0-18c5.523 0 10 4.477 10 9.5S17.523 22 12 22m0-18H7m5 0h5"></path>
                                    </svg>
                                </span>
                                <div>
                                    <p className="font-semibold">Burger King</p>
                                    <div>
                                        <p className="text-xs text-zinc-500">Delivery in: 19 mins</p>
                                        <p class="text-xs text-zinc-500">{completeAddress}</p>
                                    </div>
                                </div>
                            </div >
                            <div className='flex justify-between items-center mb-4'>
                                <p class="text-sm text-zinc-600">{totalQuantity} item - Total: ₹ {totalPrice} </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="bg-green-100 p-2 rounded-lg mb-4">
                                <p className="text-sm text-green-800">Save upto ₹ {receivedOffersData.offerAmount} more with payment offers</p>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Credit & Debit Cards</h2>
                                <button className="flex items-center justify-between w-full bg-zinc-100 p-2 rounded-lg text-zinc-700">
                                    <span>Add New Card</span>
                                    <span>+</span>
                                </button>
                                <p className="text-xs text-zinc-500 mt-1">Save and Pay via Cards.</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">More Payment Options</h2>
                                <div className="flex items-center justify-between bg-zinc-100 p-2 rounded-lg mb-2">
                                    <span>Wallets</span>
                                    <span>!!!</span>
                                </div>

                            </div>
                            <button className='mt-5 w-full py-3 bg-[#60b246] text-white hover:bg-[#4a9932]'
                                onClick={handlePayment}
                            >Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
