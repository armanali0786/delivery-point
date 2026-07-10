import React, { useEffect, useState } from 'react'
import { fetchOrderData } from '../../apis/ApiCall';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../Chatbot';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingState from '../../components/ui/LoadingState';
import EmptyState from '../../components/ui/EmptyState';

export default function Orders() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isChatModelOpen, setIsChatModelOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetchOrderData();
                setOrderData(response)
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
                setLoading(false);
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
            <div className="max-w-2xl mx-auto py-4 px-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Past Orders</h2>
                {loading ? (
                    <LoadingState count={2} className="sm:grid-cols-1" />
                ) : orderData.length > 0 ? (
                    orderData.map((order) => (
                        <Card hover={false} key={order._id} className="mb-4">
                            <CardBody>
                            <div className="flex justify-end items-center mb-3">
                                <span className="text-sm text-gray-500">Delivered on Fri, Aug 18, 2023, 06:22 PM</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                                {order.items.length > 0 && order.items[0].food ? (
                                    <div className="flex gap-3 sm:gap-4">
                                        <img src={`https://delivery-point.onrender.com/images/${order.items[0].food.images[0]}`} alt="Dish Image" className="rounded-xl w-24 sm:w-1/3 h-24 sm:h-[150px] object-cover shrink-0" />
                                        <div className="flex-1">
                                            <p className='text-lg text-gray-900 font-medium'>{order.items[0].food.name}</p>
                                            <p className="text-sm text-gray-500">ORDER {order.orderId} | {formatDate(order.orderDate)}</p>
                                            <button className="text-primary-600 hover:text-primary-700 underline mt-1 text-sm font-medium" onClick={() => NavigateOrderDetails(order._id)}>VIEW DETAILS</button>
                                            <p className="mt-2 text-gray-500 text-sm">{order.items[0].food.name}  x {order.items[0].unit}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-red-500">Food not available</p>
                                )}
                                <div className="sm:text-right">
                                    <p className="text-sm text-gray-500 font-bold">Total Paid: ₹{order.totalAmount}</p>
                                </div>
                            </div>
                            <div className="flex mt-3 gap-2">
                                <Button size="sm" pill onClick={() => NavigateReOrder(order.vendorId)}>REORDER</Button>
                                <Button size="sm" pill variant="outline" onClick={toggleChatModel}>HELP</Button>
                                <Chatbot isChatModelOpen={isChatModelOpen} toggleChatModel={toggleChatModel} />
                            </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <EmptyState title="No orders yet" subtitle="Your past orders will show up here." />
                )}
            </div>
        </>
    )
}
