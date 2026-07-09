import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/authContext';
import Input from '../components/ui/Input';
import PasswordField from '../components/ui/PasswordField';
import Button from '../components/ui/Button';

export default function CheckoutLogin({ showLoginForm, showSignUpForm }) {

    const { setIsLoggedIn } = useAuth();

    const initialValues = {
        email: '',
        fullName: '',
        phone: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        fullName: showLoginForm ? Yup.string() : Yup.string().required('Full Name is required'),
        phone: showLoginForm ? Yup.string() : Yup.string().required('Phone Number is required'),
    });

    const onSubmit = async (values, { setSubmitting, setErrors, resetForm}) => {
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

            const url = showLoginForm ? 'https://delivery-point.onrender.com/customer/login' : 'https://delivery-point.onrender.com/customer/signup';
            const response = await axios.post(url, params);
            if (response.status === 200) {
                const token = response.data.signature;
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
                toast.success(response.data.message);
                resetForm();
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

    return (
        <>
        <ToastContainer />
            <div className='flex justify-center items-center'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting, errors, touched }) =>
                    (
                        <Form className="w-full max-w-[350px]">
                            {showLoginForm ? (
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
                                {showLoginForm ? 'Login' : 'Sign Up'}
                            </Button>
                            <p className="text-gray-500 text-xs text-center mt-3">By clicking on Login, I accept the  <Link to="/policy" className="text-primary-600 hover:text-primary-700 hover:underline">Terms & Conditions & Privacy Policy</Link> </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
