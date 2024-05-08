import React, { useState, useEffect } from 'react'

export default function Address() {
    const [address, setAddress] = useState({});
    useEffect(() => {
        const deliveryAddress = localStorage.getItem('deliveryAddress');
        if (deliveryAddress) {
            try {
                const parseAddress = JSON.parse(deliveryAddress);
                setAddress(parseAddress);
            } catch (error) {
                console.error('Error parsing Address items:', error);
            }
        } else {
            console.log('No Address found in localStorage');
        }
    }, []);
    return (
        <div className="min-h-screen flex flex-col md:flex-row lg:w-1/2 md:w-1/2">
            <div className="flex-1 p-5">
                <h1 className="text-xl font-bold mb-4">Manage Addresses</h1>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-4">
                        <span>🏠</span>
                        <h2 className="text-lg font-semibold">Home</h2>
                    </div>
                    <p className="mb-4">{address.address},{address.flatNo},{address.addressType}</p>
                    <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">EDIT</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">DELETE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
