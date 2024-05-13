import React, { useState } from 'react'

export default function AddressPopup({ isAddressOpen, toggleAddressModal }) {

    const [address, setAddress] = useState('');
    const [flatNo, setFlatNo] = useState('');
    const [addressType, setAddressType] = useState('');
    const [error, setError] = useState('');

    const handleSubmitAddress = (e) => {
        e.preventDefault();
        if (!address.trim() || !flatNo.trim() || !addressType) {
            setError('Please fill out all fields');
            return;
        }
        // Save to localStorage
        const addressData = {
            address: address.trim(),
            flatNo: flatNo.trim(),
            addressType: addressType, 
        };
        localStorage.setItem('deliveryAddress', JSON.stringify(addressData));
        setAddress(addressData);
        toggleAddressModal();
    };

    const handleAddressTypeChange = (type) => {
        setAddressType(type);
    };


    return (
        <>
            {isAddressOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                        {/* Modal content */}
                        <div className="p-4">
                            {/* Modal header */}
                            <div className="flex items-center justify-between border-b">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    Save delivery address
                                </h3>
                                <button
                                    onClick={toggleAddressModal}
                                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="mt-4">
                                <form className="space-y-4" onSubmit={handleSubmitAddress}>
                                    <div>
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                                            placeholder="Nanavati Chawk, Rajkot, Gujarat"
                                        />
                                    </div>
                                    {/* Password input */}
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                            Flat/Door
                                        </label>
                                        <input
                                            type="text"
                                            id="flatNo"
                                            value={flatNo}
                                            onChange={(e) => setFlatNo(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                                            placeholder="123AB"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            className={`flex-1 text-center py-4 px-4 border ${addressType === 'Home' ? 'bg-[#60b246] !text-white ' : 'bg-white hover:bg-black hover:text-white'
                                                } border-zinc-300 shadow-sm text-sm font-medium text-zinc-700 mr-2  `}
                                            onClick={() => handleAddressTypeChange('Home')}
                                            type="button"
                                        >
                                            Home
                                        </button>
                                        <button
                                            className={`flex-1 text-center py-4 px-4 border ${addressType === 'Work' ? 'bg-[#60b246] !text-white ' : 'bg-white hover:bg-black hover:text-white'
                                                } border-zinc-300 shadow-sm text-sm font-medium text-zinc-700 mx-2  `}
                                            onClick={() => handleAddressTypeChange('Work')}
                                            type="button"
                                        >
                                            Work
                                        </button>
                                        <button
                                            className={`flex-1 text-center py-4 px-4 border ${addressType === 'Other' ? 'bg-[#60b246] !text-white ' : 'bg-white hover:bg-black hover:text-white'
                                                } border-zinc-300 shadow-sm text-sm font-medium text-zinc-700 ml-2  `}
                                            onClick={() => handleAddressTypeChange('Other')}
                                            type="button"
                                        >
                                            Other
                                        </button>
                                    </div>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium  text-sm px-5 py-4"
                                    >
                                        SAVE ADDRESS & PROCEED
                                    </button>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>


            )}
        </>
    )
}
