import React, { useState } from 'react'
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { cn } from '../../utils/cn';

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
        <Modal open={isAddressOpen} onClose={toggleAddressModal} title="Save delivery address">
            <div className="p-4">
                <form className="space-y-1" onSubmit={handleSubmitAddress}>
                    <Input
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nanavati Chawk, Rajkot, Gujarat"
                    />
                    <Input
                        label="Flat/Door"
                        value={flatNo}
                        onChange={(e) => setFlatNo(e.target.value)}
                        placeholder="123AB"
                    />
                    <div className="mt-2 mb-4 flex gap-2">
                        {['Home', 'Work', 'Other'].map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => handleAddressTypeChange(type)}
                                className={cn(
                                    'flex-1 rounded-xl border py-2.5 text-sm font-medium transition-colors',
                                    addressType === type ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-primary-400'
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <Button type="submit" pill fullWidth>
                        SAVE ADDRESS & PROCEED
                    </Button>
                </form>
            </div>
        </Modal>
    )
}
