import React, { useState, useEffect, useRef } from 'react'
import '../assets/styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import * as Yup from 'yup';
import { useAuth } from '../context/authContext';

export default function CheckoutLogin({ showLoginForm, showSignUpForm }) {

    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const [isLoginForm, setIsLoginForm] = useState(true); // State to track current form type (true = login, false = signup)


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
        let params = {};
        try {
            if (showLoginForm) {
                params = {
                    email: values.email,
                    password: values.password
                };
            } else {
                params = {
                    email: values.email,
                    fullName: values.fullName,
                    phone: values.phone,
                    password: values.password
                };
            }
    
            const url = showLoginForm ? 'http://localhost:8080/customer/login' : 'http://localhost:8080/customer/signup';
            const response = await axios.post(url, params);
            if (response.status === 200) {
                const token = response.data.signature;
                localStorage.setItem('token', token);
                toast.success(response.data.message);
                setIsLoggedIn(true);
            } else {
                const validationErrors = response.data.validation;
                if (validationErrors) {
                    setErrors(validationErrors);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401) {
                    const validationErrors = error.response.data.message;
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

    return (
        <>
        <ToastContainer />
            <div className='flex justify-center items-center'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="form w-full max-w-[350px]">
                            {showLoginForm ? (
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
                                        <i
                                            className="text-black absolute top-6 right-3"
                                            onClick={togglePasswordVisibility}
                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </i>
                                        <span className="text-gray-700">Password</span>
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

                            <button className="bg-[#60b246] text-white font-semibold px-4 py-2 hover:bg-[#4a9932] transition duration-300" type="submit" disabled={isSubmitting}>
                                {showLoginForm ? 'Login' : 'Sign Up'}
                            </button>
                            <p className="text-gray-700 text-sm text-center">By clicking on Login, I accept the  <Link to="/policy" className="text-[#6366f1] hover:text-[#34369b] hover:underline">Terms & Conditions & Privacy Policy</Link> </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
