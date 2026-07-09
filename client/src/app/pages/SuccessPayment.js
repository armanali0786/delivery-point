import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function SuccessPayment() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-xl p-8 text-center">
        <FiCheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful</h1>
        <p className="mt-2 text-gray-500">Your order has been placed and is on its way.</p>
        <Link to="/profile/orders">
          <Button pill fullWidth className="mt-6">View Orders</Button>
        </Link>
      </div>
    </div>
  )
}
