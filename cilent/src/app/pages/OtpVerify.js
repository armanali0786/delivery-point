import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

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
            <div className='flex justify-center items-center bg-gray-50 py-10 px-4'>
                <Card hover={false} className="w-full max-w-[420px]">
                    <CardBody>
                        <p className="text-2xl font-bold text-gray-900 mb-1">Verify OTP</p>
                        <p className="text-sm text-gray-500 mb-5">Enter the 6-digit code we sent you.</p>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Field as={Input} type="text" name="otp" label="OTP" error={touched.otp && errors.otp} />
                                    <Button type='submit' pill fullWidth disabled={isSubmitting}>Submit</Button>
                                    <p className="text-gray-500 text-sm mt-4 text-center">Back To ? <Link to="/sign-up" className="text-primary-600 hover:text-primary-700 hover:underline">Sign-Up</Link> </p>
                                </Form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
