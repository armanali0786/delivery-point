import React, { useEffect } from 'react'
import PaymentCancel from '../assets/payment-cancel.png';
import  { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
export default function CancelPayment() {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/checkout')
        },[3000])
    })
  return (
    <div className="bg-gray-50">
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl border border-gray-100 shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2">
                    <img src={PaymentCancel} alt="Payment Cancelled Illustration" className="w-full h-auto"/>
                </div>
                <div className="md:w-1/2 text-center md:text-left md:pl-10">
                    <h1 className="text-3xl font-bold text-gray-900">PAYMENT CANCELLED</h1>
                    <p className="mt-2 text-gray-500">Your payment process was interrupted and has not been completed.</p>
                    <div className="mt-4"><Loading/></div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
