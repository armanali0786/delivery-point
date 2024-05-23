import React, { useEffect, useState } from 'react';
import { fetchTransaction } from '../../apis/ApiCall';

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
            <div className='py-4'>
                <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold">Payment History</h1>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Download All
                        </button>
                    </div>
                    <p className="text-zinc-600 mb-4">See history of your payment plan invoice</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                                        Payment Invoice
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                            <p className="text-zinc-900 whitespace-no-wrap">Invoice#{transaction.orderId} - {new Date(transaction.createdAt).toLocaleDateString('default', { month: 'short', year: 'numeric' })}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                            <p className="text-zinc-900 whitespace-no-wrap">${transaction.orderValue}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                            <p className="text-zinc-900 whitespace-no-wrap">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                            <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${transaction.status === 'CONFIRMED' ? 'text-green-900' : 'text-red-900'}`}>
                                                <span aria-hidden="true" className={`absolute inset-0 ${transaction.status === 'CONFIRMED' ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                                                <span className="relative">{transaction.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                            <button className="text-blue-500 hover:text-blue-800">Download</button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
