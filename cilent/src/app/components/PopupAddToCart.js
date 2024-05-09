import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PopupAddToCart() {
    const navigate = useNavigate();
    const handleNavigateCart = () => {
        navigate('/checkout')
    };
    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 bg-[#60b246] container mx-auto flex justify-between p-3 w-full max-w-[745px]'>
                <div className='flex items-center text-white text-sm font-bold '>
                   1 Item Added
                </div>
                <div className=' flex items-center text-sm font-bold text-white cursor-pointer' onClick={handleNavigateCart}>
                    VIEW CART
                </div>
            </div>
        </>
    )
}
