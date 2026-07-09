import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiTag } from "react-icons/fi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    getCartTotal,
    removeItem,
    decreaseItemQuantity,
    increaseItemQuantity,
} from "../cart/cartSlice";

import { useAuth } from "../context/authContext";
import CheckoutLogin from "./CheckoutLogin";
import { Link, useNavigate} from "react-router-dom";
import AddressPopup from "../components/AddressPopup";
import ApplyOfferModel from "../components/ApplyOffer";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

export default function Checkout() {

    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [buttonShow, setButtonShow] = useState(true);
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [isOfferModelOpen, setIsOfferModelOpen] = useState(false);

    const [address, setAddress] = useState({});

    const NaviagatePayment = () =>{
        navigate('/payment');
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleAddressModal = () => {
        setIsAddressOpen(!isAddressOpen);
    };

    const toggleOfferModal = () => {
        setIsOfferModelOpen(!isOfferModelOpen);
    };


    const deliveryAddress = localStorage.getItem('deliveryAddress');
    useEffect(() => {
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


    const handleApplyData = (offers) => {
        const offer = localStorage.setItem('offer', JSON.stringify(offers));
    };

    useEffect(() => {
        if (isOfferModelOpen || isAddressOpen ) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
    }, [isOfferModelOpen, isAddressOpen]);

    const isEmpty = cart.length === 0;



    return (
        <>
            <ToastContainer />
            {isEmpty ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <EmptyState
                        title="Your cart is empty"
                        subtitle="You can go to the menu page to view more restaurants."
                        action={<Link to='/menu'><Button pill>Go to Menu</Button></Link>}
                    />
                </div>
            ) : (
                <div className="bg-gray-50 font-sans leading-normal tracking-normal">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap py-6">

                            <div className="w-full md:w-3/5 px-2">
                                {!isLoggedIn ? (
                                    <Card hover={false} className="max-w-4xl mx-auto mb-4">
                                        <CardBody>
                                        <h2 className="text-xl font-bold mb-2 text-gray-900">Account</h2>
                                        <p className="mb-2 text-gray-600">To place your order now, log in to your existing account or sign up.</p>
                                        <div className="flex flex-col lg:flex-row lg:justify-start items-center gap-3">
                                            {/* Log In Section */}
                                            {buttonShow && (
                                                <>
                                                    <Button variant="outline" pill onClick={handleLoginClick}>Log in</Button>
                                                    <Button pill onClick={handleSignUpClick}>Sign up</Button>
                                                </>
                                            )}
                                            {showLoginForm && (
                                                <>
                                                    <div>
                                                        <p className="py-3 text-gray-500" > Enter login details or <a className="underline cursor-pointer text-primary-600 hover:text-primary-700 " onClick={() => toggleFormType('signup')}>create an account</a></p>
                                                        <CheckoutLogin showLoginForm={showLoginForm} />
                                                    </div>
                                                </>
                                            )}
                                            {showSignUpForm && (
                                                <>
                                                    <div>
                                                        <p className="py-3 text-gray-500" > Sign up or <a className="underline cursor-pointer  text-primary-600 hover:text-primary-700" onClick={() => toggleFormType('login')}>log in to your account</a></p>
                                                        <CheckoutLogin showSignUpForm={showSignUpForm} />
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                        </CardBody>
                                    </Card>
                                ) : (
                                    <Card hover={false} className="mb-4">
                                        <CardBody>
                                            <p className="text-green-600 font-semibold">Logged in ✅</p>
                                            <p className="text-gray-700">ArmanAli | 7319977276</p>
                                        </CardBody>
                                    </Card>

                                )}
                                <Card hover={false} className="mb-4">
                                    <CardBody>
                                        <h2 className="font-bold text-lg mb-3 text-gray-900">Select delivery address</h2>
                                        <p className="text-gray-500">You have a saved address in this location</p>
                                        {isLoggedIn && (
                                            <div className="flex flex-wrap -mx-2 mt-4">
                                                <div className="w-full sm:w-1/2 p-2">
                                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                                        <h3 className="text-gray-900 font-bold">Friends And Family</h3>
                                                        <p className="text-sm text-gray-500">08, Dudhsagar Road, Near Lalpari Lake, Shakti Industrial Zone, Rajkot, Gujarat,
                                                            India</p>
                                                        <p className="text-xs text-gray-500 mt-1">40 MINS</p>
                                                        <Button size="sm" pill className="mt-3">DELIVER HERE</Button>
                                                    </div>
                                                </div>
                                                <div className="w-full sm:w-1/2 p-2">
                                                    <div className="p-4 bg-white rounded-xl border border-gray-200 h-full">
                                                        <h3 className="text-gray-900 font-bold">Add New Address</h3>
                                                        <p className="text-sm text-gray-500">{address.address},{address.flatNo},{address.addressType}</p>
                                                        <Button size="sm" variant="outline" pill className="mt-3" onClick={toggleAddressModal}>ADD NEW</Button>
                                                    </div>
                                                    <AddressPopup isAddressOpen={isAddressOpen} toggleAddressModal={toggleAddressModal} />
                                                </div>
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>

                                <Card hover={false} className="mb-4">
                                    <CardBody>
                                        <p className="text-gray-900 font-bold text-xl">Payment ✅</p>
                                        {isLoggedIn && deliveryAddress && (
                                            <Button fullWidth pill className="mt-4" onClick={NaviagatePayment}>Proceed to Payment</Button>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>


                            <div className="w-full md:w-2/5 px-2">
                                <Card hover={false} className="mb-4">
                                    <CardBody>
                                        <div className="flex cursor-pointer" onClick={() => handleNavigate(vendorDetails[0]?.vendorId)}>
                                            <div className="mr-5">
                                                <img src={`https://delivery-point.onrender.com/images/${vendorDetails[0]?.vendorRestroImage}`} alt="Restro Image" className="w-16 h-16 rounded-lg object-cover" />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-lg text-gray-900">{vendorDetails[0]?.vendorName}</h2>
                                                <p className="text-sm text-gray-500">{vendorDetails[0]?.vendorAddress}</p>
                                            </div>
                                        </div>
                                        {cart.map((item) => (
                                            <div className="mt-4" key={item._id}>
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                                                            <button className="text-gray-500 hover:text-primary-600" onClick={() => dispatch(decreaseItemQuantity(item._id))}>
                                                                <FaMinus className="h-3 w-3" />
                                                            </button>
                                                            <span className="text-gray-700">{item.quantity}</span>
                                                            <button className="text-gray-500 hover:text-primary-600" onClick={() => dispatch(increaseItemQuantity(item._id))} >
                                                                <FaPlus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                        <p className="text-gray-900 font-medium">₹{item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="mt-4">
                                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center gap-2" onClick={toggleOfferModal}>
                                                <FiTag className="h-4 w-4" />
                                                <span>Apply Coupon</span>
                                            </button>
                                            <ApplyOfferModel
                                                isOfferModelOpen={isOfferModelOpen}
                                                toggleOfferModal={toggleOfferModal}
                                                handleApplyData={handleApplyData}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-lg font-bold text-gray-900">Bill Details</h3>
                                            <div className="flex justify-between mt-2 text-gray-700">
                                                <span>Item Total</span>
                                                <span>₹{totalPrice}</span>
                                            </div>
                                            <hr className="border-gray-100" />
                                            <div className="flex justify-between mt-2 text-gray-700">
                                                <span>Delivery Fee </span>
                                                <span>₹30</span>
                                            </div>
                                            <div className="flex justify-between mt-2 text-gray-900">
                                                <span className="font-bold">TO PAY</span>
                                                <span className="font-bold">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}
