import React from 'react'
import PaymentCancel from '../assets/payment-cancel.png';

export default function CancelPayment() {
  return (
    <div className="bg-gray-200 dark:bg-zinc-800">
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full  dark:bg-zinc-900 rounded-lg shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2">
                    <img src={PaymentCancel} alt="Payment Cancelled Illustration" className="w-full h-auto"/>
                </div>
                <div className="md:w-1/2 text-center md:text-left md:pl-10">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">PAYMENT CANCELLED</h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-300">Your payment process was interrupted and has not been completed.</p>
                    <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
