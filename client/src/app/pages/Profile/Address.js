import React, { useState, useEffect } from 'react'
import { FiHome } from 'react-icons/fi';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

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
                <h1 className="text-xl font-bold mb-4 text-gray-900">Manage Addresses</h1>
                <Card hover={false}>
                    <CardBody>
                        <div className="flex items-center gap-2 mb-4">
                            <FiHome className="text-primary-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Home</h2>
                        </div>
                        <p className="mb-4 text-gray-600">{address.address},{address.flatNo},{address.addressType}</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" pill>EDIT</Button>
                            <Button size="sm" variant="danger" pill>DELETE</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
