import React, { useState } from 'react'
import '../assets/styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { isExpired, decodeToken } from "react-jwt";

export default function OtpVerify() {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const initialValues = {
        otp: '',
       
    };

    const validationSchema = Yup.object().shape({
        otp: Yup.string().min(6, 'Otp must be at least 6 digit').required('Otp is required'),
    });
    const onSubmit = async (values, { setSubmitting, setErrors  }) => {
            try {
              const response = await axios.patch('https://delivery-point.onrender.com/customer/verify', values,{
                headers: {
                  'Content-Type': 'application/json',
                   Authorization: `Bearer ${token}`
                },
              });
              if (response.status === 200) {
                navigate('/');
              } else {
                const validationErrors = response.data.validation;
                if (validationErrors) {
                  setErrors(validationErrors);
                }
              }
            } catch (error) {
              if (error.response) {
                if (error.response.status === 400) {
                  const validationErrors = error.response.data.message;
                  console.log(validationErrors)
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

    return (
        <>
            <ToastContainer />
            <div className='flex justify-center items-center bg-gray-100 py-5 '>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="forms w-[450px]">
                            <label className="block mb-2">
                                <Field className="input mt-1 block w-full rounded border-gray-30" type="text" name="otp" />
                                <ErrorMessage name="text" component="span" className="super text-red-700" />
                                <span className="text-gray-700">OTP</span>
                            </label>
                            <button className="bg-[#6366f1] text-white font-semibold px-4 py-2 rounded hover:bg-[#34369b] transition duration-300" type='submit' disabled={isSubmitting}>Submit</button>
                            <p className="text-gray-700 mt-4 text-center">Back To ? <Link to="/sign-up" className="text-[#6366f1] hover:text-[#34369b] hover:underline">Sign-Up</Link> </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
