import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { FaCheck } from "react-icons/fa6";
import Chatbot from '../Chatbot';


export default function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState({});
    const [isChatModelOpen, setIsChatModelOpen] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const { orderId } = useParams();
    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`https://delivery-point.onrender.com/customer/order/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                setOrderDetails(response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401) {
                    const validationErrors = error.response.data.message;
                    toast.error(validationErrors);
                    // setErrors(validationErrors);
                } else {
                    // setErrors({ server: 'An unexpected error occurred' });
                    console.error('Unexpected error:', error.message);
                }
            }
        }
    }

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const toggleChatModel = () => {
        setIsChatModelOpen(!isChatModelOpen);
    };

    return (
        <>
            <ToastContainer />
            <div className='bg-white py-5 font-sans rounded-2xl'>
                <div className="max-w-4xl mx-auto p-6 ">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900">Your Order is Confirmed!</h1>
                    <p className="mb-4 text-gray-700">Hi {decoded.fullName}!</p>
                    <p className='mb-4 text-gray-600'>Your Order has been confirmed and will be shipping soon</p>

                    <div className='bg-gray-50 rounded-xl px-2'>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 items-center text-sm py-3 px-2">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">OrderId:  #{orderDetails.orderId}</h2>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Order Amount</h3>
                                <p className='text-gray-500'>{orderDetails.totalAmount}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Order Date</h3>
                                <p className='text-gray-500'>16 May</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 py-10">
                        <h3 className="font-semibold mb-2 text-gray-900">Shipping Progress</h3>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 relative">
                            <div className='flex justify-between absolute top-[-10px] w-full'>
                                <div className='inline-block bg-primary-600 text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                                <div className='inline-block bg-primary-600 text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                                <div className='inline-block bg-primary-600 text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                                <div className='inline-block bg-primary-600 text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                            </div>
                            <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-gray-500">
                            <span>Order Placed</span>
                            <span>Shipped</span>
                            <span>Out of Delivery</span>
                            <span>Delivered</span>
                        </div>
                    </div>

                    <div className='py-5'>
                        <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                        <p className='text-gray-500'>{orderDetails.CustomerAddress}</p>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">Products</h3>
                            <h3 className="font-semibold text-lg text-gray-900">Order Essentials</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {orderDetails.items && orderDetails.items.map((item, index) => (
                                <div key={index} className='border-gray-200 border pt-2 rounded-xl overflow-hidden'>
                                    <div className="px-2 flex items-center mb-4">
                                        <img src={`https://delivery-point.onrender.com/images/${item.food.images[0]}`} alt="product image" className="mr-4 h-16 w-16 rounded-lg object-cover" />
                                        <div>
                                            <p className="text-gray-900">{item.food.name}</p>
                                            <p className="text-gray-700">₹{item.food.price}</p>
                                            <p className="text-gray-500 text-sm">Quantity {item.unit}</p>
                                        </div>
                                    </div>
                                    <button className='w-full hover:bg-red-500 hover:text-white bg-gray-100 pt-2 pb-2 text-gray-700' >Cancel</button>
                                </div>
                            ))}
                            <div className='border-gray-200 border py-2 rounded-xl'>
                                <div className="mb-2 px-2 text-gray-700">
                                    <div className="flex justify-between mt-2">
                                        <span>Item Total</span>
                                        <span>---</span>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div className="flex justify-between mt-2">
                                        <span>Delivery Fee </span>
                                        <span>₹30</span>
                                    </div>
                                    <div className="flex justify-between mt-2 text-gray-900">
                                        <span className="font-bold">PAID</span>
                                        <span className="font-bold">₹{orderDetails.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <p className="mt-6 text-sm text-gray-500">We'll send you shipping confirmation when your items are on the way! We appreciate
                        your business, and hope you enjoy your purchase. Thank you!</p>

                    <div className="text-center mt-4">
                        <a href="#" className="text-primary-600 hover:text-primary-700" onClick={toggleChatModel}>Contact our Customer Support</a>
                        <Chatbot  isChatModelOpen ={isChatModelOpen} toggleChatModel={toggleChatModel}  />

                    </div>
                </div>
            </div>
        </>
    )
}
