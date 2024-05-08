import React, { useState, useEffect, useRef } from 'react'
import '../assets/styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import * as Yup from 'yup';


const OffcanvasSidebar = ({ isOpen, toggleOffcanvas, setIsOpen }) => {

    const [isLoginForm, setIsLoginForm] = useState(true); // State to track current form type (true = login, false = signup)

    const toggleFormType = () => {
        setIsLoginForm(!isLoginForm); // Toggle between login and signup form
    };

    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef(null);

    const navigate = useNavigate();

    const initialValues = {
        email: '',
        fullName: '',
        phone: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        fullName: Yup.string().when('isLoginForm', {
            is: false,
            then: Yup.string().required('Full Name is required')
        }),
        phone: Yup.string().when('isLoginForm', {
            is: false,
            then: Yup.string().required('Phone Number is required')
        })
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const url = isLoginForm ? 'http://localhost:8080/customer/login' : 'http://localhost:8080/customer/signup';
            const response = await axios.post(url, values);
            if (response.status === 200) {
                const token = response.data.signature;
                localStorage.setItem('token', token);
                toast.success(response.data.message);
                // navigate('/otp-verify');
                setIsOpen(false);
            } else {
                const validationErrors = response.data.validation;
                if (validationErrors) {
                    setErrors(validationErrors);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const validationErrors = error.response.data.msg;
                    toast.error(validationErrors);
                    setErrors(validationErrors);
                } else {
                    // Handle other types of errors
                    setErrors({ server: 'An unexpected error occurred' });
                    console.error('Unexpected error:', error.message);
                }
            } else {
                // The request was made but no response was received
                console.error('Error submitting form:', error.message);
                setErrors({ server: 'An unexpected error occurred' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                toggleOffcanvas();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, toggleOffcanvas]);

    return (
        <div>
            {/* Offcanvas component */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div ref={containerRef} className="bg-white w-full max-w-[450px] h-full shadow-lg p-4 transform translate-x-full">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <button className="text-gray-500" onClick={toggleOffcanvas}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="h-64">
                            {/* Content goes here */}
                            <div className="flex justify-between items-center w-96">
                                <span className="icon-close-thin"></span>
                                <div className='flex flex-col'>
                                    <div className="text-xl font-bold">{isLoginForm ? 'Login' : 'Sign Up'}</div>
                                    {/* <div className="text-sm">or <a className="text-blue-500">create an account</a></div> */}
                                    <div className="text-sm cursor-pointer" onClick={toggleFormType}>
                                        {isLoginForm ? (
                                            <>
                                                or <a className="text-blue-500" >create an account</a>
                                            </>
                                        ) : (
                                            <>
                                                or <a className="text-blue-500">login</a>
                                            </>
                                        )}
                                    </div>

                                </div>

                                <img className="w-24 h-24 object-cover"
                                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                                    alt="img renderer" />
                            </div>
                            <div className='flex justify-center items-center'>
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form className="form w-full max-w-[350px]">
                                            {isLoginForm ? (
                                                <>
                                                    <label className="block mb-2">
                                                        <Field className="input mt-1 block w-full  border-gray-30" type="email" name="email" />
                                                        <ErrorMessage name="email" component="span" className="super text-red-700" />
                                                        <span className="text-gray-700">Email</span>
                                                    </label>
                                                    <label className="block mb-2">
                                                        <Field className="input mt-1 block w-full  border-gray-30"
                                                            type={
                                                                showPassword ? "text" : "password"
                                                            }
                                                            name="password" />
                                                        <ErrorMessage name="password" component="span" className="super text-red-700" />
                                                        <span className="text-gray-700">Password</span>
                                                        <i
                                                            className="text-black absolute top-6 right-3"
                                                            onClick={togglePasswordVisibility}
                                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                        >
                                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                        </i>
                                                    </label>
                                                </>
                                            ) : (
                                                <>

                                                    <label className="block mb-2">
                                                        <Field className="input mt-1 block w-full  border-gray-30" type="name" name="fullName" />
                                                        <ErrorMessage name="fullName" component="span" className="super text-red-700" />
                                                        <span className="text-gray-700">Full Name</span>
                                                    </label>

                                                    <label className="block mb-2">
                                                        <Field className="input mt-1 block w-full  border-gray-30" type="email" name="email" />
                                                        <ErrorMessage name="email" component="span" className="super text-red-700" />
                                                        <span className="text-gray-700">Email</span>
                                                    </label>

                                                    <label className="block mb-2">
                                                        <Field className="input mt-1 block w-full  border-gray-30" type="text" name="phone" />
                                                        <ErrorMessage name="phone" component="span" className="super text-red-700" />
                                                        <span className="text-gray-700">Phone</span>
                                                    </label>

                                                    <label className="block mb-2">
                                                        <Field className="input mt-1 block w-full  border-gray-30"
                                                            type={
                                                                showPassword ? "text" : "password"
                                                            }
                                                            name="password" />
                                                        <ErrorMessage name="password" component="span" className="super text-red-700" />
                                                        <span className="text-gray-700">Password</span>
                                                        <i
                                                            className="text-black absolute top-6 right-3"
                                                            onClick={togglePasswordVisibility}
                                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                        >
                                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                        </i>
                                                    </label>
                                                </>
                                            )}

                                            <button className="bg-[#6366f1] text-white font-semibold px-4 py-2 hover:bg-[#34369b] transition duration-300" type="submit" disabled={isSubmitting}>
                                                {isLoginForm ? 'Login' : 'Sign Up'}
                                            </button>
                                            <p className="text-gray-700 mt-4 text-center">By clicking on Login, I accept the  <Link to="/policy" className="text-[#6366f1] hover:text-[#34369b] hover:underline">Terms & Conditions & Privacy Policy</Link> </p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OffcanvasSidebar;
