import React from 'react'

export default function PaymentSections() {
  return (
    <>
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">Payment Options</h1>
                    <span className="text-sm text-zinc-500">1 item · Total: ₹249</span>
                </div>
        
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <span className="bg-blue-500 text-white p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.351 1.001 7.307 2.648m-14.614 0A9.973 9.973 0 0 1 12 3v0m0 0c-2.755 0-5.351 1.001-7.307 2.648m14.614 0A9.973 9.973 0 0 0 12 3v0m0 18c-2.755 0-5.351-1.001-7.307-2.648m14.614 0A9.973 9.973 0 0 0 12 21v0m0 0c2.755 0 5.351-1.001 7.307-2.648m-14.614 0A9.973 9.973 0 0 1 12 21v0m0-18v18m0-18C6.477 3 2 7.477 2 12.5S6.477 22 12 22m0-18c5.523 0 10 4.477 10 9.5S17.523 22 12 22m0-18H7m5 0h5"></path>
                            </svg>
                        </span>
                        <div>
                            <p className="font-semibold">Burger King</p>
                            <p className="text-xs text-zinc-500">Delivery in: 19 mins</p>
                        </div>
                    </div>
                    <div className="text-xs text-zinc-500">
                        Home | 12345, Rajkot, D-34, Subhdarshan Apartment, Nr Premnath Jain Derasar, Jodhpur Village, Ahmedabad, G...
                    </div>
                </div>
        
                <div className="mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mb-4">
                        <p className="text-sm text-green-800">Save upto ₹50 more with payment offers</p>
                    </div>
        
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Pay by any UPI App</h2>
                        <button className="flex items-center justify-between w-full bg-zinc-100 p-2 rounded-lg text-zinc-700">
                            <span>Add New UPI ID</span>
                            <span>+</span>
                        </button>
                        <p className="text-xs text-zinc-500 mt-1">You need to have a registered UPI ID</p>
                    </div>
        
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Credit & Debit Cards</h2>
                        <button className="flex items-center justify-between w-full bg-zinc-100 p-2 rounded-lg text-zinc-700">
                            <span>Add New Card</span>
                            <span>+</span>
                        </button>
                        <p className="text-xs text-zinc-500 mt-1">Save and Pay via Cards.</p>
                    </div>
        
                    <div>
                        <h2 className="text-lg font-semibold mb-2">More Payment Options</h2>
                        <div className="flex items-center justify-between bg-zinc-100 p-2 rounded-lg mb-2">
                            <span>Wallets</span>
                            <span>!!!</span>
                        </div>
                        <div className="flex items-center justify-between bg-zinc-100 p-2 rounded-lg">
                            <span>Pluxee</span>
                            <span>!!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
