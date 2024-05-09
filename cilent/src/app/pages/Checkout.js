import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import EmptyImage from '../assets/emptycart.png';
import { FaPlus, FaMinus } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/stripe-js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { STRIPE_PK } from "../../config";
import {
    getCartTotal,
    removeItem,
    decreaseItemQuantity,
    increaseItemQuantity,
} from "../cart/cartSlice";

import { useAuth } from "../context/authContext";
import CheckoutLogin from "./CheckoutLogin";
import { Link, json, useNavigate } from "react-router-dom";
import AddressPopup from "../components/AddressPopup";
import ApplyOfferModel from "../components/ApplyOffer";
import { CreateOrder } from "../apis/ApiCall";

export default function Checkout() {

    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [buttonShow, setButtonShow] = useState(true);
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [isOfferModelOpen, setIsOfferModelOpen] = useState(false);
    const [address, setAddress] = useState({});
    const [receivedOffersData, setReceivedOffersData] = useState([]);
    const [offerId, setOfferId] = useState('');



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const toggleAddressModal = () => {
        setIsAddressOpen(!isAddressOpen);
    };

    const toggleOfferModal = () => {
        setIsOfferModelOpen(!isOfferModelOpen);
    };


    useEffect(() => {
        const deliveryAddress = localStorage.getItem('deliveryAddress');
        if (deliveryAddress) {
            try {
                const parseAddress = JSON.parse(deliveryAddress);
                setAddress(parseAddress);
            } catch (error) {
                console.error('Error parsing Address items:', error);
            }
        } else {
            console.log('No Address found in localStorage');
        }
    }, []);

    const handleLoginClick = () => {
        setShowLoginForm(true);
        setShowSignUpForm(false);
        setButtonShow(false);
    };

    const toggleFormType = (formType) => {
        if (formType === 'login') {
            setShowLoginForm(true);
            setShowSignUpForm(false);
            setButtonShow(false);
        } else if (formType === 'signup') {
            setShowSignUpForm(true);
            setShowLoginForm(false);
            setButtonShow(false);
        }
    };

    const handleSignUpClick = () => {
        setShowSignUpForm(true);
        setShowLoginForm(false); // Hide login form
        setButtonShow(false);
    };


    const { cart, totalQuantity, totalPrice } = useSelector(
        (state) => state.allCart
    );

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);

    const vendorDetails = cart.map(item => {
        const vendor = item.vendorInfo;
        return {
            vendorName: vendor.vendorName,
            vendorAddress: vendor.vendorName,
            vendorRestroImage: vendor.vendorCoverImages[0],
            vendorId: vendor.vendorId
        }
    })

    const handleNavigate = (vendorId) => {
        navigate(`/food-details/${vendorId}`);
    }

    const isEmpty = cart.length === 0;

    const handleApplyData = (offers) => {
        const offer = localStorage.setItem('offer', JSON.stringify(offers));
    };

    const offer = localStorage.getItem('offer');
    useEffect(() => {
        if (offer) {
            try {
                const offerData = JSON.parse(offer);
                setReceivedOffersData(offerData)
            } catch (error) {
                console.error("Error parsing:", error);
            }
        } else {
            console.log("No offer found in localStorage");
        }
    }, [offer]);

    const handlePayment = async () => {
        try {
            const stripe = await loadStripe(STRIPE_PK);
    
            const body = {
                products: cart
            };
    
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const response = await fetch(`http://localhost:8080/customer/create-checkout-session`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`Failed to create checkout session`);
            }
            const session = await response.json();
    
            if (!session || !session.sessionId) {
                throw new Error("Invalid session data received");
            }
            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId, 
            });

            if(result) {
                const payloadData = {
                    items: cart,
                    tnxId: session.sessionId,
                    totalPrice: totalPrice,
                    CustomerAddress: address,
                }
                CreateOrder(payloadData)
            }
    
            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error processing payment:', error.message);
        }
    };
    

    return (
        <>
            <ToastContainer />
            {isEmpty ? (
                <div className="min-h-screen flex justify-center bg-slate-100">
                    <div className="text-center">
                        <div className="ml-10 mb-2">
                            <img src={EmptyImage} alt="Empty Cart" />
                        </div>
                        <div>
                            <p className="text-green-700 text-center text-2xl font-bold">Your cart is empty</p>
                            <p className="text-[#7e808c]  text-center text-sm font-bold mb-5">You can go to home page to view more restaurants</p>
                        </div>
                        <Link to='/menu'> <button className="text-white bg-orange-500 mb-5 w-28 h-14">Go to Menu</button></Link>
                    </div>
                </div>
            ) : (
                <div className="bg-zinc-100 font-sans leading-normal tracking-normal">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap py-6">

                            <div className="w-full md:w-3/5 px-2">
                                {!isLoggedIn ? (
                                    <div className="bg-white p-6 max-w-4xl mx-auto rounded-lg shadow-md mb-4">
                                        <h2 className="text-xl font-bold mb-2">Account</h2>
                                        <p className="mb-2 text-gray-600">To place your order now, log in to your existing account or sign up.</p>
                                        <div className="flex flex-col lg:flex-row lg:justify-start items-center">
                                            {/* Log In Section */}
                                            {buttonShow && (
                                                <>
                                                    <div className="mb-4 lg:mb-0">
                                                        <h3 className="font-medium mb-1">Have an account?</h3>
                                                        <button className="bg-zinc-200 text-black py-2 px-4  hover:bg-zinc-300 w-full lg:w-auto" onClick={handleLoginClick}>LOG IN</button>
                                                    </div>
                                                    <div className="px-5">
                                                        <h3 className="font-medium mb-1">New to Swiggy?</h3>
                                                        <button className="bg-[#60b246] text-white py-2 px-4  hover:bg-[#4a9932] w-full lg:w-auto" onClick={handleSignUpClick}>SIGN UP</button>
                                                    </div>
                                                </>
                                            )}
                                            {showLoginForm && (
                                                <>
                                                    <div>
                                                        <p className="py-3 text-gray-500" > Enter login details or <a className="underline cursor-pointer text-orange-500 hover:text-orange-600 " onClick={() => toggleFormType('signup')}>create an account</a></p>
                                                        <CheckoutLogin showLoginForm={showLoginForm} />
                                                    </div>
                                                </>
                                            )}
                                            {showSignUpForm && (
                                                <>
                                                    <div>
                                                        <p className="py-3 text-gray-500" > Sign up or <a className="underline cursor-pointer  text-orange-500 hover:text-orange-600" onClick={() => toggleFormType('login')}>log in to your account</a></p>
                                                        <CheckoutLogin showSignUpForm={showSignUpForm} />
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <div className="p-4 bg-white rounded-lg shadow-md">
                                            <p className="text-green-500">Logged in ✅</p>
                                            <p>ArmanAli | 7319977276</p>
                                        </div>
                                    </div>

                                )}
                                <div className="mb-4">
                                    <div className="p-4 bg-white rounded-lg shadow-md">
                                        <h2 className="font-bold text-lg mb-3 ">Select delivery address</h2>
                                        <p className="text-gray-500">You have a saved address in this location</p>
                                        {isLoggedIn && (
                                            <div className="flex flex-wrap -mx-2 mt-4">
                                                <div className="w-full sm:w-1/2 p-2">
                                                    <div className="p-4 bg-green-100 rounded-lg border border-green-200">
                                                        <h3 className="text-gray-900 font-bold">Friends And Family</h3>
                                                        <p className="text-sm text-gray-500">08, Dudhsagar Road, Near Lalpari Lake, Shakti Industrial Zone, Rajkot, Gujarat,
                                                            India</p>
                                                        <p className="text-xs text-black">40 MINS</p>
                                                        <button
                                                            className="mt-3 bg-[#60b246] hover:bg-[#4a9932] text-white font-medium py-2 px-4 rounded">DELIVER
                                                            HERE</button>
                                                    </div>
                                                </div>
                                                <div className="w-full sm:w-1/2 p-2">
                                                    <div className="p-4 bg-white rounded-lg border border-zinc-200">
                                                        <h3 className="text-gray-900 font-bold">Add New Address</h3>
                                                        <p className="text-sm text-gray-500">{address.address},{address.flatNo},{address.addressType}</p>
                                                        <button onClick={toggleAddressModal} className="mt-3 border-2 border-[#4a9932] !text-[#4a9932] text-white font-medium py-2 px-4 rounded" >
                                                            ADD NEW</button>
                                                    </div>
                                                    <AddressPopup isAddressOpen={isAddressOpen} toggleAddressModal={toggleAddressModal} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="p-4 bg-white rounded-lg shadow-md">
                                        <p className="text-black font-bold text-xl">Payment ✅</p>
                                        {isLoggedIn && address && (
                                            <button className='mt-5 w-full py-3 bg-[#60b246] text-white hover:bg-[#4a9932]' onClick={handlePayment}>Procced to Payment</button>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="w-full md:w-2/5 px-2">
                                <div className="mb-4">
                                    <div className="p-4 bg-white rounded-lg shadow-md">
                                        <div className="flex cursor-pointer" onClick={() => handleNavigate(vendorDetails[0]?.vendorId)}>
                                            <div className="mr-5">
                                                <img src={`http://localhost:8080/images/${vendorDetails[0]?.vendorRestroImage}`} alt="Restro Image" className="w-16 h-16" />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-lg">{vendorDetails[0]?.vendorName}</h2>
                                                <p className="text-sm">{vendorDetails[0]?.vendorAddress}</p>
                                            </div>
                                        </div>
                                        {cart.map((item) => (
                                            <>
                                                <div className="mt-4">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-medium">{item.name}</h3>
                                                        <div className="flex items-center  py-1 px-1">
                                                            <div className="flex items-center  py-1 px-1 border-2">
                                                                <button className="text-zinc-500 focus:outline-none focus:text-zinc-600" onClick={() => dispatch(decreaseItemQuantity(item._id))}>
                                                                    <i className="fas fa-minus"><FaMinus /></i>
                                                                </button>
                                                                <span className="text-zinc-700 mx-2">{item.quantity}</span>
                                                                <button className="text-zinc-500 focus:outline-none focus:text-zinc-600" onClick={() => dispatch(increaseItemQuantity(item._id))} >
                                                                    <i className="fas fa-plus"><FaPlus /></i>
                                                                </button>
                                                            </div>
                                                            <div className="ps-2">
                                                                <p>{item.price}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                        
                                        <div className="mt-4">
                                            <button className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={toggleOfferModal}>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-9 5h9"></path></svg>
                                                <span  >Apply Coupon</span>
                                            </button>
                                            <ApplyOfferModel
                                                isOfferModelOpen={isOfferModelOpen}
                                                toggleOfferModal={toggleOfferModal}
                                                handleApplyData={handleApplyData}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-lg font-bold">Bill Details</h3>
                                            <div className="flex justify-between mt-2">
                                                <span>Item Total</span>
                                                <span>₹{totalPrice}</span>
                                            </div>
                                            <hr />
                                            <div className="flex justify-between mt-2">
                                                <span>Delivery Fee </span>
                                                <span>₹30</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span>Discount Coupoun Code</span>
                                                <span>₹{receivedOffersData.offerAmount}</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span className="font-bold">TO PAY</span>
                                                <span className="font-bold">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}
