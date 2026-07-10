import React from 'react'
import Appstore from '../../assets/appstore.avif';
import Playstore from '../../assets/playstore.png';
import FoodImage from '../../assets/foodImage.avif';
export default function DeliveryOne() {

    return (
        <div className="bg-gray-50 font-sans leading-normal tracking-normal">
            <div className="flex">
                <div className="flex-1 p-4 sm:p-8">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">DeliveryPoint One</h1>
                    <p className="mb-4 text-gray-600">Get free delivery and extra discounts all across Swiggy.</p>
                    <p className="mb-4 text-gray-600">Your Swiggy One benefits can be availed only on the Swiggy App.</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className='flex gap-3 sm:gap-5'>
                            <a href="#" className="block">
                                <img src={Appstore} alt="Download on the App Store" className="rounded-lg w-28 sm:w-32 h-auto" />
                            </a>
                            <a href="#" className="block">
                                <img src={Playstore} alt="Get it on Google Play" className="rounded-lg w-28 sm:w-32 h-auto" />
                            </a>
                        </div>
                        <div className='flex justify-center'>
                            <img src={FoodImage} alt="Delivery Promotional Graphics" className="rounded-full w-32 sm:w-40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
