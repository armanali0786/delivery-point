import React, { useEffect } from 'react'
import TechnologyImage from '../assets/aboutpage/tech.png';
import KitchenImage from '../assets/aboutpage/kicthen.png';
import CustomerImage from '../assets/aboutpage/customer.png';
import CorporateImage from '../assets/aboutpage/corporate_support.png';
import CampusImage from '../assets/aboutpage/campus.png';
import BusinessImage from '../assets/aboutpage/business.png';
import Button from '../components/ui/Button';

const DEPARTMENTS = [
    { image: TechnologyImage, alt: 'Technology', label: 'TECHNOLOGY' },
    { image: BusinessImage, alt: 'Business', label: 'BUSINESS' },
    { image: KitchenImage, alt: 'Cloud Kitchen', label: 'CLOUD KITCHEN' },
    { image: CustomerImage, alt: 'Customer Care', label: 'CUSTOMER CARE' },
    { image: CampusImage, alt: 'Campus', label: 'CAMPUS' },
    { image: CorporateImage, alt: 'Corporate Support', label: 'CORPORATE SUPPORT' },
];

export default function WhoWeAre() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <p className="text-lg text-gray-600">
                        We build innovative products & solutions that deliver unparalleled convenience to urban consumers.
                        The best part? Every bit of your work at DeliveryPoint will help elevate the lives of our users across India.
                    </p>
                    <h2 className="mt-8 text-3xl font-extrabold text-gray-900">
                        Where Do You <span className="text-primary-600">Belong?</span>
                    </h2>
                </div>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {DEPARTMENTS.map((dept) => (
                        <div key={dept.label} className="text-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <img src={dept.image} alt={dept.alt} className="mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900">{dept.label}</h3>
                            <Button variant="outline" size="sm" pill className="mt-4">Explore</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
