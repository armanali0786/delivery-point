import React, { useEffect, useState } from 'react'
import { fetchOrderData } from '../../apis/ApiCall';

export default function Orders() {
    const [orderData, setOrderData] = useState([]);

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


    return (
        <>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
                {orderData.map((order) => (
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <div className="flex justify-end items-center mb-3">
                            {/* <h3 className="text-lg font-semibold">{order.items[0].food.name}</h3> */}
                            <span className="text-sm text-zinc-500">Delivered on Fri, Aug 18, 2023, 06:22 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <img src={`http://localhost:8080/images/${order.items[0].food.images[0]}`} alt="Dish Image" className="rounded-lg h-[150px]" />
                            <div className="flex-1 ml-4">
                                <p>{order.items[0].food.name}</p>
                                <p className="text-sm text-zinc-500">ORDER {order.orderId} | {formatDate(order.orderDate)}</p>
                                <button className="text-blue-500 underline mt-1">VIEW DETAILS</button>
                                <p className="mt-2">{order.items[0].food.name}  x {order.items[0].unit}</p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Total Paid: ₹{order.totalAmount}</p>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <button className="bg-orange-500 text-white rounded-md px-4 py-2 mr-2">REORDER</button>
                            <button className="bg-green-700 text-white rounded-md px-4 py-2">HELP</button>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}
