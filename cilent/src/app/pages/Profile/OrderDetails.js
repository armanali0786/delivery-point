import React, { useEffect } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { FaCheck } from "react-icons/fa6";


export default function OrderDetails() {
    const [orderDetails, setOrderDetails] = React.useState({});
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const { orderId } = useParams();
    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/order/${orderId}`, {
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

    return (
        <>
            <ToastContainer />
            <div className='bg-white py-5 font-sans rounded-lg'>
                <div className="max-w-4xl mx-auto p-6 ">
                    <h1 className="text-2xl font-bold mb-2">Your Order is Confirmed!</h1>
                    <p className="mb-4">Hi {decoded.fullName}!</p>
                    <p className='mb-4'>Your Order has been confirmed and will be shipping soon</p>

                    <div className='bg-gray-200 shadow-slate-300 rounded-lg px-2'>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 items-center text-sm py-3 px-2">
                            <div>
                                <h2 className="text-xl font-semibold">OrderId:  #{orderDetails.orderId}</h2>
                            </div>
                            <div>
                                <h3 className="font-semibold">Order Amount</h3>
                                <p className='text-zinc-600'>{orderDetails.totalAmount}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Order Date</h3>
                                <p className='text-zinc-600'>16 May</p>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <h3 className="font-semibold">Contact Help</h3>
                        <p className='text-zinc-600'>(+91)-731-9977-276<br />armanali.shaikh77@gmail.com</p>
                    </div> */}


                    <div className="mb-6 py-10">
                        <h3 className="font-semibold mb-2">Shipping Progress</h3>
                        <div className="w-full bg-zinc-200 rounded-full h-1.5 dark:bg-zinc-700 relative">
                            <div className='flex justify-between absolute top-[-10px] w-full'>
                                <div className='inline-block bg-[#60b246] text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                                <div className='inline-block bg-[#60b246] text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                                <div className='inline-block bg-[#60b246] text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                                <div className='inline-block bg-[#60b246] text-white rounded-full p-1'>
                                    <FaCheck />
                                </div>
                            </div>
                            <div className="bg-[#60b246] h-1.5 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-2 ">
                            <span>Order Placed</span>
                            <span>Shipped</span>
                            <span>Out of Delivery</span>
                            <span>Delivered</span>
                        </div>
                    </div>

                    <div className='py-5'>
                        <h3 className="font-semibold">Delivery Address</h3>
                        <p className='text-zinc-600'>{orderDetails.CustomerAddress}</p>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">Products</h3>
                            <h3 className="font-semibold text-lg">Order Essentials</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {orderDetails.items && orderDetails.items.map((item, index) => (
                                <div className='border-gray-300 border-2 pt-2 rounded-lg'>
                                    <div className="px-2 flex items-center mb-4">
                                        <img src={`http://localhost:8080/images/${item.food.images[0]}`} alt="product image" className="mr-4 h-16 w-16" />
                                        <div>
                                            <p>{item.food.name}</p>
                                            <p>₹{item.food.price}</p>
                                            <p>Quantity {item.unit}</p>
                                        </div>
                                    </div>
                                    <button className='w-full hover:bg-red-500 hover:text-white hover:rounded-b-lg bg-gray-300 pt-2 pb-2 border-black' >Cancel</button>
                                </div>
                            ))}
                            <div className='border-gray-300 border-2 py-2  rounded-lg'>
                                <div className="mb-2 px-2">
                                    <div className="flex justify-between mt-2">
                                        <span>Item Total</span>
                                        <span>---</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between mt-2">
                                        <span>Delivery Fee </span>
                                        <span>₹30</span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="font-bold">PAID</span>
                                        <span className="font-bold">₹{orderDetails.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <p className="mt-6 text-sm text-zinc-600">We'll send you shipping confirmation when your items are on the way! We appreciate
                        your business, and hope you enjoy your purchase. Thank you!</p>

                    <div className="text-center mt-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700">Contact our Customer Support</a>
                    </div>
                </div>
            </div>
        </>
    )
}
