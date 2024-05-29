import React, { useEffect, useState } from 'react'
import { fetchOrderData } from '../../apis/ApiCall';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../Chatbot';
import Loading from '../../components/Loading';

export default function Orders() {
    const [orderData, setOrderData] = useState([]);
    const [isChatModelOpen, setIsChatModelOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetchOrderData();
                setOrderData(response)
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        }
        fetchOrders();
    }, []);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
        const hours = date.getHours();
        const minutes = padZero(date.getMinutes());
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

        return `${formattedDate}, ${formattedTime}`;
    };

    const padZero = (value) => {
        return String(value).padStart(2, '0');
    };


    const NavigateOrderDetails = (orderId) => {
        navigate(`/profile/order-details/${orderId}`);
    }

    const NavigateReOrder = (vendorId) => {
        navigate(`/food-details/${vendorId}`);
    }

    const toggleChatModel = () => {
        setIsChatModelOpen(!isChatModelOpen);
    };

    return (
        <>
            <div className="max-w-2xl mx-auto py-4">
                <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
                {/* {orderData.map((order) => ( */}
                {orderData.length > 0 ? (
                    orderData.map((order) => (
                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="flex justify-end items-center mb-3">
                                {/* <h3 className="text-lg font-semibold">{order.items[0].food.name}</h3> */}
                                <span className="text-sm text-zinc-500">Delivered on Fri, Aug 18, 2023, 06:22 PM</span>
                            </div>
                            <div className="flex justify-between">
                                {order.items.length > 0 && order.items[0].food ? (
                                    <>
                                        <img src={`https://delivery-point.onrender.com/images/${order.items[0].food.images[0]}`} alt="Dish Image" className="rounded-lg w-1/3 h-[150px]" />
                                        <div className="flex-1 ml-4">
                                            <p className='text-lg'>{order.items[0].food.name}</p>
                                            <p className="text-sm text-zinc-500">ORDER {order.orderId} | {formatDate(order.orderDate)}</p>
                                            <button className="text-blue-500 hover:text-blue-700 underline mt-1" onClick={() => NavigateOrderDetails(order._id)}>VIEW DETAILS</button>
                                            <p className="mt-2 text-zinc-500">{order.items[0].food.name}  x {order.items[0].unit}</p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-red-500">Food not available</p>
                                )}
                                <div>
                                    <p className="text-sm text-zinc-500 font-bold">Total Paid: ₹{order.totalAmount}</p>
                                </div>
                            </div>
                            <div className="flex mt-3">
                                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 mr-2 cursor-pointer" onClick={() => NavigateReOrder(order.vendorId)} >REORDER</button>
                                <button className="bg-[#60b246] hover:bg-[#4e9638] text-white rounded-md px-4 py-2" onClick={toggleChatModel} >HELP</button>
                                <Chatbot isChatModelOpen={isChatModelOpen} toggleChatModel={toggleChatModel} />
                            </div>
                        </div>
                // ))}
                    ))
                ) : (
                    <p className='flex justify-center mt-10'><Loading /></p>
                )}

            </div>
        </>
    )
}
