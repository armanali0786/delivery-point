import React from 'react'
import Appstore from '../../assets/appstore.avif';
import Playstore from '../../assets/playstore.png';
import FoodImage from '../../assets/foodImage.avif';
export default function DeliveryOne() {
    
    return (
        <body className="bg-slate-200 font-sans leading-normal tracking-normal">
            <div className="flex">
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">DeliveryPoint One</h1>
                    <p className="mb-4">Get free delivery and extra discounts all across Swiggy.</p>
                    <p className="mb-4">Your Swiggy One benefits can be availed only on the Swiggy App.</p>
                    <div className="flex space-x-4">
                        <div className='flex'>
                            <a href="#" className="block">
                                <img src={Appstore} alt="Download on the App Store" className="rounded-lg" />
                            </a>
                            <a href="#" className="block ml-5">
                                <img src={Playstore} alt="Get it on Google Play" className="rounded-lg" />
                            </a>
                        </div>
                        <div className='flex justify-center'>
                            <img src={FoodImage} alt="Delivery Promotional Graphics" className="rounded-full w-1/2 " />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
