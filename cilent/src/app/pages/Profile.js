import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
export default function Profile() {

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    return (
        <>
            <div className="bg-zinc-100 font-sans leading-normal tracking-normal">
                <div className="flex h-screen">

                    <div className="bg-[#323948] text-white w-64 space-y-6 py-4 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                        <div className="text-center">
                            <h1 className="text-lg font-medium">{decoded.fullName}</h1>
                            <p>{decoded.phone}</p>
                            <p>{decoded.email}</p>
                        </div>
                        <nav>
                            <Link to="/profile/orders" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                                <i className="fas fa-box"></i> Orders
                            </Link>
                            <Link to="/profile/favourites" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                                <i className="fas fa-star"></i> Favourites
                            </Link>
                            <Link to="/profile/payments" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                                <i className="fas fa-wallet"></i> Payments
                            </Link>
                            <Link to="/profile/myaddress" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                                <i className="fas fa-map-marker-alt"></i> Addresses
                            </Link>
                        </nav>
                    </div>


                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="flex justify-end items-center p-6 bg-[#323948]">
                            <button className="text-white border-2 border-white font-bold py-2 px-4 hover:text-black hover:bg-white">
                                Edit Profile
                            </button>
                        </header>

                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-200">
                            <div className="container mx-auto py-8">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
