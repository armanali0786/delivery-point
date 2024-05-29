import React, { useEffect } from 'react'
import TechnologyImage from '../assets/aboutpage/tech.png';
import KitchenImage from '../assets/aboutpage/kicthen.png';
import CustomerImage from '../assets/aboutpage/customer.png';
import CorporateImage from '../assets/aboutpage/corporate_support.png';
import CampusImage from '../assets/aboutpage/campus.png';
import BusinessImage from '../assets/aboutpage/business.png';


export default function WhoWeAre() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <div className='bg-gray-100'>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        We build innovative products & solutions that deliver unparalleled convenience to urban consumers.
                        The best part? Every bit of your work at DeliveryPoint will help elevate the lives of our users across India.
                    </p>
                    <h2 className="mt-8 text-3xl font-extrabold text-zinc-900 dark:text-white">
                        Where Do You <span className="text-orange-500">Belong?</span>
                    </h2>
                </div>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="text-center">
                        <img src={TechnologyImage} alt="Technology" className="mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">TECHNOLOGY</h3>
                            <button className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">
                                Explore
                            </button>
                    </div>
                    <div className="text-center">
                        <img src={BusinessImage} alt="Business" className="mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">BUSINESS</h3>
                            <button className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">
                                Explore
                            </button>
                    </div>
                    <div className="text-center">
                        <img src={KitchenImage} alt="Cloud Kitchen" className="mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">CLOUD KITCHEN</h3>
                            <button className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">
                                Explore
                            </button>
                    </div>
                    <div className="text-center">
                        <img src={CustomerImage} alt="Customer Care" className="mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">CUSTOMER CARE</h3>
                            <button className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">
                                Explore
                            </button>
                    </div>
                    <div className="text-center">
                        <img src={CampusImage} alt="Campus" className="mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">CAMPUS</h3>
                            <button className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">
                                Explore
                            </button>
                    </div>
                    <div className="text-center">
                        <img src={CorporateImage} alt="Corporate Support" className="mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">CORPORATE SUPPORT</h3>
                            <button className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">
                                Explore
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
