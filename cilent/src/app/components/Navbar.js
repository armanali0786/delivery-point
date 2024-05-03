
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dpointlogo from '../assets/logo/Dpointlogo1.png'
import '../assets/styles/navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../cart/cartSlice";
import OffensiveSidbar from './OffensiveSidbar';
import { useAuth } from '../context/authContext';
// import SearchText from './searchText';

export default function Navbar() {
    
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const location = useLocation();
    const { cart, totalQuantity } = useSelector((state) => state.allCart);
    const [activeLink, setActiveLink] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate('');


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);



    useEffect(() => {
        const currentPath = location.pathname;
        setActiveLink(currentPath);
    }, [location]);

    const handleLogout = async () => {
        // try {
        //   const token = localStorage.getItem('token');
        //   if (!token) {
        //     // Token doesn't exist, no need to log out
        //     return;
        //   }

        //   const response = await fetch(ServerName + '/web_logout', {
        //     method: 'GET',
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //       'Content-Type': 'application/json',
        //     },
        //   });

        //   if (response.status === 200 || response.status === 401) {
        //     // If the logout was successful on the server, proceed to log out on the client-side
        //     localStorage.removeItem('token');
        //     setIsLoggedIn(false);
        //     navigate('/');
        //   } else {
        //     console.log('Failed to log out on the server');
        //   }
        // } catch (error) {
        //   console.error('An error occurred while logging out:', error);
        // }
    };

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigateSearch = () => {
        navigate('/search');
    }

    return (
        <section className="w-full px-8 text-gray-700 bg-white">
            <div className="flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row">
                <div className="relative flex flex-col md:flex-row">
                    <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                        <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                            <img src={Dpointlogo} className='h-15 w-10' />
                        </span>
                    </Link>
                    <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                        <NavLink to="/" label="Home" activeLink={activeLink} setActiveLink={setActiveLink} />
                        <NavLink to="/menu" label="Menus" activeLink={activeLink} setActiveLink={setActiveLink} />
                        {/* <NavLink to="/check" label="Check" activeLink={activeLink} setActiveLink={setActiveLink} /> */}

                        {/* <SearchText searchText={searchText} setSearchText={setSearchText}/> */}
                        <button type="submit" class="flex p-1.5 ms-2 text-sm font-medium text-gray-900 hover:text-[#5B63B7]"
                            onClick={handleNavigateSearch} activeLink={activeLink} setActiveLink={setActiveLink}
                        >
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className='flex justify-center items-center mx-2 text-gray-900 font-medium '>Search</span>
                        </button>

                    </nav>
                </div>
                <div className='flex'>
                    <div className='relative'>
                        <Link to="/checkout">
                            <svg
                                className="w-10 h-10 text-orange-400 hover:text-orange-600 cursor-pointer hidden sm:block"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <span className='absolute top-0 left-8 text-orange-600'>
                                ({totalQuantity})
                            </span>
                        </Link>
                    </div>
                    {!isLoggedIn ? (
                        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                            <OffensiveSidbar isOpen={isOpen} setIsOpen={setIsOpen} toggleOffcanvas={toggleOffcanvas} />

                            <button onClick={toggleOffcanvas} label="Sign In" className="text-base font-medium leading-6 text-black whitespace-no-wrap transition duration-150 ease-in-out hover:text-[#5B63B7]">
                                Sign in
                            </button>
                        </div>

                    ) : (
                        <div className="flex">
                            <div className='relative'>
                                <div className="group cursor-pointer">
                                    <div className="mx-5 flex items-end gap-x-2 font-medium text-blue-gray">
                                        <svg
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                                                fill="#90A4AE"
                                            />
                                        </svg>
                                        {/* <a className="flex items-center text-indigo-700 group-hover:text-indigo-900">Account</a> */}

                                        <a class="menu-hover text-base font-medium text-black lg:mx-4" >
                                            Account
                                        </a>
                                        <div class="group relative cursor-pointer">
                                            <div class="flex items-center justify-between bg-white">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                        stroke="currentColor" class="h-6 w-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div
                                                class="invisible absolute left-[-100px] w-[145px] rounded-lg z-50 flex flex-col bg-gray-100 py-1 px-4 text-gray-900 shadow-xl group-hover:visible">
                                                <Link to='/profile' class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-900 hover:text-[#5B63B7] md:mx-2">
                                                    Profile
                                                </Link>
                                                <Link onClick={handleLogout} class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-900 hover:text-[#5B63B7] md:mx-2">
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="absolute hidden bg-slate-200 rounded shadow-md py-2 mt-1 w-40 right-0 top-full z-10">
                                    <Link to="/profile" className="dropdown-item block px-4 py-2 text-gray-800 hover:bg-indigo-300 cursor-pointer">Profile</Link>
                                    <a onClick={handleLogout} className="dropdown-item block px-4 py-2 text-gray-800 hover:bg-indigo-300 cursor-pointer" >Logout</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// NavLink component to manage active state
function NavLink({ to, label, activeLink, setActiveLink }) {
    const isActive = (to === activeLink);

    return (
        <Link
            to={to}
            className={`mr-5 font-medium leading-6 text-black hover:text-[#5B63B7] ${isActive ? 'underline text-[#5B63B7]' : ''}`}
            onClick={() => setActiveLink(to)}
        >
            {label}
        </Link>
    );
}

