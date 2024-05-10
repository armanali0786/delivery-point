import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { IoMdMenu } from "react-icons/io";
import { useMediaQuery } from '@react-hook/media-query';
export default function Profile() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const location = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isActiveLink = (pathname) => {
        return location.pathname === pathname;
    };
    const isMediumScreen = useMediaQuery('(max-width: 768px)');
    return (
        <>
            <div className="bg-slate-100 font-sans leading-normal tracking-normal">
                <div className="flex h-screen">

                    <div
                        className={`bg-[#35728a] text-white w-64 space-y-6 py-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
                    >
                        <div className="text-center">
                            <h1 className="text-lg font-medium">{decoded.fullName}</h1>
                            <p>{decoded.phone}</p>
                            <p>{decoded.email}</p>
                        </div>
                        <nav>
                            <Link to="/profile/orders" className={`block py-2.5 px-4 transition duration-200 ${isActiveLink('/profile/orders') ? 'text-black bg-slate-100' : 'text-white hover:text-black hover:text-black'}`}>
                                <i className="fas fa-box"></i> 📦 Orders
                            </Link>
                            <Link to="/profile/favourites" className={`block py-2.5 px-4 transition duration-200 ${isActiveLink('/profile/favourites') ? 'text-black bg-slate-100' : 'text-white hover:text-black hover:text-black'}`}>
                                <i className="fas fa-star"></i> ❤️ Favourites
                            </Link>
                            <Link to="/profile/payments" className={`block py-2.5 px-4 transition duration-200 ${isActiveLink('/profile/payments') ? 'text-black bg-slate-100' : 'text-white hover:text-black hover:text-black'}`}>
                                <i className="fas fa-wallet"></i> 💳 Payments
                            </Link>
                            <Link to="/profile/manage_addresses" className={`block py-2.5 px-4 transition duration-200 ${isActiveLink('/profile/manage_addresses') ? 'text-black bg-slate-100' : 'text-white hover:text-black hover:text-black'}`}>
                                <i className="fas fa-map-marker-alt"></i> 📍 Addresses
                            </Link>
                            <Link to="/profile/super" className={`block py-2.5 px-4 transition duration-200 ${isActiveLink('/profile/super') ? 'text-black bg-slate-100' : 'text-white hover:text-black hover:text-black'}`}>
                                <i className="fas fa-map-marker-alt"></i> 🍔 Delivery Ones
                            </Link>
                        </nav>
                    </div>


                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="flex justify-end items-center p-4 bg-[#35728a]">
                            {
                                isMediumScreen && (
                                    <button
                                        className="text-white absolute left-0"
                                        onClick={toggleSidebar}
                                    >
                                        <IoMdMenu />
                                    </button>
                                )
                            }
                            <button className="text-white border-2 border-white font-bold py-2 px-4 hover:text-black hover:bg-white">
                                Edit Profile
                            </button>
                        </header>

                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-200">
                            <div className="container mx-auto py-4">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
