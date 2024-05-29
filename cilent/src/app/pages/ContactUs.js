import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function ContactUs() {

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        reason: '',
        message: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Contact Number is required'),
        reason: Yup.string().required('Reason is required'),
        message: Yup.string().required('Message is required'),
    });


    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {

            const params = {
                email: values.email,
                name: values.name,
                phone: values.phone,
                reason: values.reason,
                message: values.message,
            };

            const url = 'https://delivery-point.onrender.com/customer/contact-us';
            const response = await axios.post(url, params);
            if (response.status === 200) {
                const token = response.data.signature;
                localStorage.setItem('token', token);
                toast.success(response.data.message);
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



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen bg-[#1E2831] text-white p-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
                    <div className="md:w-2/3 p-4">
                        <div className="border-b  border-white mb-6">
                            <h2 className="text-sm uppercase text-zinc-400">Stay connected</h2>
                            <h1 className="text-4xl font-bold">Get in Touch</h1>
                        </div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <div>
                                        <label className="block text-white" htmlFor="name">Your Name *</label>
                                        <Field className="w-full  border border-zinc-700 p-2 mt-1" type="text" id="name"  name="name" placeholder="Type your Name" />
                                        <ErrorMessage name="name" component="span" className="super text-red-700" />
                                    </div>
                                    <div>
                                        <label className="block text-white" htmlFor="email">Your E-Mail *</label>
                                        <Field className="w-full  border border-zinc-700 p-2 mt-1" type="email" id="email"   name="email" placeholder="Type your Email Address" />
                                        <ErrorMessage name="email" component="span" className="super text-red-700" />
                                    </div>
                                    <div>
                                        <label className="block text-white" htmlFor="phone">Your Contact Number *</label>
                                        <Field className="w-full  border border-zinc-700 p-2 mt-1" type="text" id="phone"  name="phone" placeholder="Type your Contact Number" />
                                        <ErrorMessage name="phone" component="span" className="super text-red-700" />
                                    </div>
                                    <div>
                                        <label className="block text-white" htmlFor="reason">Reason For Contact *</label>
                                        <Field className="w-full text-black border border-white-700 p-2 mt-1" type="text" id="reason"  name="reason" placeholder="Reason For Contact" />
                                        <ErrorMessage name="reason" component="span" className="super text-red-700" />
                                    </div>
                                    <div>
                                        <label className="block text-white" htmlFor="message">What's up?</label>
                                        <Field as="textarea" className="w-full text-black  border border-zinc-700 p-2 mt-1" id="message" rows="4"  name="message" placeholder="Tell us about you and the world"/>
                                        <ErrorMessage name="message" component="span" className="super text-red-700" />
                                    </div>
                                    <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg" type='submit' disabled={isSubmitting}>SEND MESSAGE</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="md:w-1/3 p-4 mt-8 md:mt-0">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold">Contact Us</h2>
                                <p className="mt-2">We’d love to talk about how we can work together.</p>
                                <p className="mt-2">+91 7319977276</p>
                                <p className="mt-2">armanali.shaikh77@gmail.com</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Address</h2>
                                <p className="mt-2">Mig-46, Near R.M.C school no - 78, Gujarat Housing Board Q.T.R No - 861, Dudhsaga Road, Rajkot 360003.</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Follow Me</h2>
                                <ul className="mt-2 space-y-1">
                                    <Link className='hover:text-orange-500 hover:underline' to="https://www.facebook.com/profile.php?id=100031325293941&mibextid=ZbWKwL" target='_blank'>FACEBOOK</Link> <br/>
                                    <Link className='hover:text-orange-500 hover:underline' to="https://x.com/Arman_Ali_01" target='_blank'>TWITTER</Link><br/>
                                    <Link className='hover:text-orange-500 hover:underline' to="https://www.linkedin.com/in/arman-ali-8383081ab" target='_blank'>LINKEDIN</Link><br/>
                                    <Link className='hover:text-orange-500 hover:underline' to="https://www.instagram.com/itz_arman_official__/" target='_blank'>INSTAGRAM</Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
