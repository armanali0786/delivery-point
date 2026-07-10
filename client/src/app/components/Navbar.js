
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiChevronDown, FiUser, FiMenu, FiX } from 'react-icons/fi';
import Dpointlogo from '../assets/logo/Dpointlogo1.png'
import '../assets/styles/navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../cart/cartSlice";
import OffensiveSidbar from './OffensiveSidbar';
import { useAuth } from '../context/authContext';

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const location = useLocation();
    const { cart, totalQuantity } = useSelector((state) => state.allCart);
    const [activeLink, setActiveLink] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate('');


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);



    useEffect(() => {
        const currentPath = location.pathname;
        setActiveLink(currentPath);
        setIsMenuOpen(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            const Logout = localStorage.clear('token');
        } catch (error) {
            console.error('An error occurred while logging out:', error);
        }
    };

    const toggleOffcanvas = () => {
        setIsMenuOpen(false);
        setIsOpen(!isOpen);
    };

    const handleNavigateSearch = () => {
        setIsMenuOpen(false);
        navigate('/search');
    }

    return (
        <section className="w-full border-b border-gray-100 bg-white px-4 sm:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
                <Link to="/" className="flex items-center font-medium text-gray-900" onClick={() => setIsMenuOpen(false)}>
                    <img src={Dpointlogo} alt="DeliveryPoint" className="h-10 w-auto" />
                </Link>

                <nav className="hidden items-center gap-1 text-base md:flex md:ml-8 md:border-l md:border-gray-200 md:pl-8">
                    <NavLink to="/" label="Home" activeLink={activeLink} setActiveLink={setActiveLink} />
                    <NavLink to="/menu" label="Menus" activeLink={activeLink} setActiveLink={setActiveLink} />

                    <button
                        type="button"
                        className="group ml-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        onClick={handleNavigateSearch}
                    >
                        <FiSearch className="h-4 w-4" />
                        <span>Search</span>
                    </button>
                </nav>

                <div className="flex items-center gap-1 md:ml-auto">
                    <Link to="/search" className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-primary-50 hover:text-primary-600 md:hidden">
                        <FiSearch className="h-5 w-5" />
                    </Link>
                    <Link to="/checkout" className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-primary-50 hover:text-primary-600">
                        <FiShoppingBag className="h-5 w-5" />
                        {totalQuantity > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                                {totalQuantity}
                            </span>
                        )}
                    </Link>

                    <div className="hidden md:block">
                        {!isLoggedIn ? (
                            <div className="ml-2 inline-flex items-center">
                                <OffensiveSidbar isOpen={isOpen} setIsOpen={setIsOpen} toggleOffcanvas={toggleOffcanvas} />
                                <button onClick={toggleOffcanvas} className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
                                    Sign in
                                </button>
                            </div>
                        ) : (
                            <div className="group relative ml-2 cursor-pointer">
                                <div className="flex items-center gap-1.5 rounded-full px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">
                                    <FiUser className="h-4 w-4" />
                                    <span className="text-sm">Account</span>
                                    <FiChevronDown className="h-4 w-4" />
                                </div>
                                <div className="invisible absolute right-0 z-50 mt-1 flex w-40 flex-col rounded-xl bg-white py-1 px-2 text-gray-900 shadow-xl ring-1 ring-gray-100 group-hover:visible">
                                    <Link to='/profile' className="block rounded-lg border-b border-gray-100 px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                        Profile
                                    </Link>
                                    <Link onClick={handleLogout} className="block rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 md:hidden"
                    >
                        {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-gray-100 pb-4 pt-2 md:hidden">
                    <nav className="flex flex-col gap-1">
                        <MobileNavLink to="/" label="Home" activeLink={activeLink} setActiveLink={setActiveLink} onNavigate={() => setIsMenuOpen(false)} />
                        <MobileNavLink to="/menu" label="Menus" activeLink={activeLink} setActiveLink={setActiveLink} onNavigate={() => setIsMenuOpen(false)} />
                    </nav>
                    <div className="mt-3 border-t border-gray-100 pt-3">
                        {!isLoggedIn ? (
                            <div className="flex items-center">
                                <OffensiveSidbar isOpen={isOpen} setIsOpen={setIsOpen} toggleOffcanvas={toggleOffcanvas} />
                                <button onClick={toggleOffcanvas} className="w-full rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
                                    Sign in
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <Link to='/profile' onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                    <FiUser className="h-4 w-4" /> Profile
                                </Link>
                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

// NavLink component to manage active state
function NavLink({ to, label, activeLink, setActiveLink }) {
    const isActive = (to === activeLink);

    return (
        <Link
            to={to}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveLink(to)}
        >
            {label}
        </Link>
    );
}

function MobileNavLink({ to, label, activeLink, setActiveLink, onNavigate }) {
    const isActive = (to === activeLink);

    return (
        <Link
            to={to}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
            onClick={() => { setActiveLink(to); onNavigate(); }}
        >
            {label}
        </Link>
    );
}

