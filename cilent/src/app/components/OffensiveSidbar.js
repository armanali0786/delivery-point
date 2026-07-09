import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik';
import { IoMdClose } from "react-icons/io";
import * as Yup from 'yup';
import Input from './ui/Input';
import PasswordField from './ui/PasswordField';
import Button from './ui/Button';


const OffcanvasSidebar = ({ isOpen, toggleOffcanvas, setIsOpen }) => {

    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleFormType = () => {
        setIsLoginForm(!isLoginForm); // Toggle between login and signup form
    };

    const containerRef = useRef(null);

    const initialValues = {
        email: '',
        fullName: '',
        phone: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        fullName: isLoginForm ? Yup.string() : Yup.string().required('Full Name is required'),
        phone: isLoginForm ? Yup.string() : Yup.string().required('Phone Number is required'),
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const url = isLoginForm ? 'https://delivery-point.onrender.com/customer/login' : 'https://delivery-point.onrender.com/customer/signup';
            const response = await axios.post(url, values);
            if (response.status === 200) {
                const token = response.data.signature;
                localStorage.setItem('token', token);
                toast.success(response.data.message);
                setIsOpen(false);
            } else {
                const validationErrors = response.data.validation;
                if (validationErrors) {
                    setErrors(validationErrors);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 404 || error.response.status === 409 || error.response.status === 401) {
                    const validationErrors = error.response.data.message;
                    toast.error(validationErrors);
                    setErrors(validationErrors);
                } else {
                    setErrors({ server: 'An unexpected error occurred' });
                    console.error('Unexpected error:', error.message);
                }
            } else {
                console.error('Error submitting form:', error.message);
                setErrors({ server: 'An unexpected error occurred' });
            }
        } finally {
            setSubmitting(false);
        }
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


    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
    }, [isOpen]);


    return (
        <div>
            <ToastContainer />
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
                    <div ref={containerRef} className="bg-white w-full max-w-[420px] h-full shadow-2xl overflow-y-auto">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <div>
                                <div className="text-xl font-bold text-gray-900">{isLoginForm ? 'Login' : 'Sign Up'}</div>
                                <div className="text-sm text-gray-500 cursor-pointer" onClick={toggleFormType}>
                                    {isLoginForm ? (
                                        <>or <span className="text-primary-600 font-medium">create an account</span></>
                                    ) : (
                                        <>or <span className="text-primary-600 font-medium">login</span></>
                                    )}
                                </div>
                            </div>
                            <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700" onClick={toggleOffcanvas}>
                                <IoMdClose className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-5">
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        {isLoginForm ? (
                                            <>
                                                <Field as={Input} type="email" name="email" label="Email" error={touched.email && errors.email} />
                                                <Field as={PasswordField} name="password" label="Password" error={touched.password && errors.password} />
                                            </>
                                        ) : (
                                            <>
                                                <Field as={Input} type="text" name="fullName" label="Full Name" error={touched.fullName && errors.fullName} />
                                                <Field as={Input} type="email" name="email" label="Email" error={touched.email && errors.email} />
                                                <Field as={Input} type="text" name="phone" label="Phone" error={touched.phone && errors.phone} />
                                                <Field as={PasswordField} name="password" label="Password" error={touched.password && errors.password} />
                                            </>
                                        )}

                                        <Button type="submit" pill fullWidth disabled={isSubmitting}>
                                            {isLoginForm ? 'Login' : 'Sign Up'}
                                        </Button>
                                        <p className="text-gray-500 text-xs mt-4 text-center">By clicking on Login, I accept the  <Link to="/policy" className="text-primary-600 hover:text-primary-700 hover:underline">Terms & Conditions & Privacy Policy</Link> </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OffcanvasSidebar;
