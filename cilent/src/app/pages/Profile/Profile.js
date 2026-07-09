import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { IoMdMenu } from "react-icons/io";
import { FiPackage, FiHeart, FiCreditCard, FiMapPin, FiTruck } from "react-icons/fi";
import { useMediaQuery } from '@react-hook/media-query';
import Button from '../../components/ui/Button';
import { cn } from '../../../utils/cn';

const NAV_ITEMS = [
    { to: '/profile/orders', label: 'Orders', icon: FiPackage },
    { to: '/profile/favourites', label: 'Favourites', icon: FiHeart },
    { to: '/profile/payments', label: 'Payments', icon: FiCreditCard },
    { to: '/profile/manage_addresses', label: 'Addresses', icon: FiMapPin },
    { to: '/profile/super', label: 'Delivery Ones', icon: FiTruck },
];

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
            <div className="font-sans leading-normal tracking-normal">
                <div className="flex h-screen">

                    <div
                        className={`bg-ink-900 text-white w-64 space-y-6 py-6 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
                    >
                        <div className="text-center px-4">
                            <h1 className="text-lg font-semibold">{decoded.fullName}</h1>
                            <p className="text-sm text-white/60">{decoded.phone}</p>
                            <p className="text-sm text-white/60">{decoded.email}</p>
                        </div>
                        <nav className="px-3 space-y-1">
                            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={cn(
                                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                                        isActiveLink(to) ? 'bg-white text-gray-900' : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    )}
                                >
                                    <Icon className="h-4 w-4" /> {label}
                                </Link>
                            ))}
                        </nav>
                    </div>


                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="relative flex justify-end items-center p-4 bg-ink-900 border-b border-white/10">
                            {
                                isMediumScreen && (
                                    <button
                                        className="text-white absolute left-4"
                                        onClick={toggleSidebar}
                                    >
                                        <IoMdMenu className="h-6 w-6" />
                                    </button>
                                )
                            }
                            <Button variant="outline" size="sm" pill className="!bg-transparent !text-white !border-white/40 hover:!bg-white hover:!text-gray-900">
                                Edit Profile
                            </Button>
                        </header>
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                            <div className="container mx-auto">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
