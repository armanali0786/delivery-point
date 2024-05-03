import React, { useState, useEffect, useRef } from 'react'
import '../assets/styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import * as Yup from 'yup';
export default function CheckoutLogin({ isOpen, toggleOffcanvas, setIsOpen }) {
    const [isLoginForm, setIsLoginForm] = useState(true); // State to track current form type (true = login, false = signup)

    const toggleFormType = () => {
        setIsLoginForm(!isLoginForm); // Toggle between login and signup form
    };

    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef(null);

    const navigate = useNavigate();

    const initialValues = {
        email: '',
        name: '',
        phoneNumber: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        name: Yup.string().when('isLoginForm', {
            is: false,
            then: Yup.string().required('Full Name is required')
        }),
        phoneNumber: Yup.string().when('isLoginForm', {
            is: false,
            then: Yup.string().required('Phone Number is required')
        })
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        console.log("submiited values", values);
        try {
            const url = isLoginForm ? 'http://localhost:8080/customer/login' : 'http://localhost:8080/customer/signup';
            const response = await axios.post(url, values);
            if (response.status === 200) {
                const token = response.data.signature;
                localStorage.setItem('token', token);
                toast.success(response.data.message);
                navigate('/');
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



    return (
        <>
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
                                        <Field className="input mt-1 block w-full  border-gray-30" type="name" name="name" />
                                        <ErrorMessage name="name" component="span" className="super text-red-700" />
                                        <span className="text-gray-700">Full Name</span>
                                    </label>

                                    <label className="block mb-2">
                                        <Field className="input mt-1 block w-full  border-gray-30" type="email" name="email" />
                                        <ErrorMessage name="email" component="span" className="super text-red-700" />
                                        <span className="text-gray-700">Email</span>
                                    </label>

                                    <label className="block mb-2">
                                        <Field className="input mt-1 block w-full  border-gray-30" type="text" name="phoneNumber" />
                                        <ErrorMessage name="phoneNumber" component="span" className="super text-red-700" />
                                        <span className="text-gray-700">Phone</span>
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
                            )}

                            <button className="bg-[#6366f1] text-white font-semibold px-4 py-2 hover:bg-[#34369b] transition duration-300" type="submit" disabled={isSubmitting}>
                                {isLoginForm ? 'Login' : 'Sign Up'}
                            </button>
                            <p className="text-gray-700 mt-4 text-center">By clicking on Login, I accept the  <Link to="/policy" className="text-[#6366f1] hover:text-[#34369b] hover:underline">Terms & Conditions & Privacy Policy</Link> </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
