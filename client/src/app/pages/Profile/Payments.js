import React, { useEffect, useState } from 'react';
import { fetchTransaction } from '../../apis/ApiCall';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function Payments() {

    const [transaction, setTransaction] = useState([]);

    const FetchTransaction = async () => {
        try {
            const response = await fetchTransaction();
            setTransaction(response.data.transaction);
        } catch (error) {
            console.error('Error fetching Transaction items:', error);
        }
    }

    useEffect(() => {
        FetchTransaction();
    }, []);

    return (
        <>
            <div className='py-4 px-4'>
                <Card hover={false} className="max-w-4xl mx-auto">
                    <CardBody>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold text-gray-900">Payment History</h1>
                        <Button size="sm" pill>Download All</Button>
                    </div>
                    <p className="text-gray-500 mb-4">See history of your payment plan invoice</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Payment Invoice
                                    </th>
                                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-100 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Invoice#{transaction.orderId} - {new Date(transaction.createdAt).toLocaleDateString('default', { month: 'short', year: 'numeric' })}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-100 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">${transaction.orderValue}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-100 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-100 bg-white text-sm">
                                            <Badge tone={transaction.status === 'CONFIRMED' ? 'success' : 'danger'}>{transaction.status}</Badge>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-100 bg-white text-sm">
                                            <button className="text-primary-600 hover:text-primary-700 font-medium">Download</button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
