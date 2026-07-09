import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

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
        window.scrollTo(0, 0);
    }, [])


    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen bg-ink-900 text-white p-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
                    <div className="md:w-2/3 p-4">
                        <div className="border-b border-white/10 mb-6 pb-4">
                            <h2 className="text-sm uppercase text-white/50 tracking-wide">Stay connected</h2>
                            <h1 className="text-4xl font-extrabold">Get in Touch</h1>
                        </div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="space-y-1 [&_label]:!text-white [&_input]:!bg-white/5 [&_input]:!border-white/20 [&_input]:!text-white [&_textarea]:!bg-white/5 [&_textarea]:!border-white/20 [&_textarea]:!text-white">
                                    <Field as={Input} type="text" name="name" label="Your Name *" placeholder="Type your Name" error={touched.name && errors.name} />
                                    <Field as={Input} type="email" name="email" label="Your E-Mail *" placeholder="Type your Email Address" error={touched.email && errors.email} />
                                    <Field as={Input} type="text" name="phone" label="Your Contact Number *" placeholder="Type your Contact Number" error={touched.phone && errors.phone} />
                                    <Field as={Input} type="text" name="reason" label="Reason For Contact *" placeholder="Reason For Contact" error={touched.reason && errors.reason} />
                                    <label className="block mb-4 text-left">
                                        <span className="block mb-1 text-sm font-medium text-white">What's up?</span>
                                        <Field as="textarea" className="block w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500" rows="4" name="message" placeholder="Tell us about you and the world" />
                                    </label>
                                    <Button type='submit' pill disabled={isSubmitting}>SEND MESSAGE</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="md:w-1/3 p-4 mt-8 md:mt-0">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold">Contact Us</h2>
                                <p className="mt-2 text-white/70">We’d love to talk about how we can work together.</p>
                                <p className="mt-2 text-white/70">+91 7319977276</p>
                                <p className="mt-2 text-white/70">armanali.shaikh77@gmail.com</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Address</h2>
                                <p className="mt-2 text-white/70">Mig-46, Near R.M.C school no - 78, Gujarat Housing Board Q.T.R No - 861, Dudhsaga Road, Rajkot 360003.</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Follow Me</h2>
                                <ul className="mt-2 space-y-1">
                                    <Link className='text-white/70 hover:text-primary-400 hover:underline' to="https://www.facebook.com/profile.php?id=100031325293941&mibextid=ZbWKwL" target='_blank'>FACEBOOK</Link> <br/>
                                    <Link className='text-white/70 hover:text-primary-400 hover:underline' to="https://x.com/Arman_Ali_01" target='_blank'>TWITTER</Link><br/>
                                    <Link className='text-white/70 hover:text-primary-400 hover:underline' to="https://www.linkedin.com/in/arman-ali-8383081ab" target='_blank'>LINKEDIN</Link><br/>
                                    <Link className='text-white/70 hover:text-primary-400 hover:underline' to="https://www.instagram.com/itz_arman_official__/" target='_blank'>INSTAGRAM</Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
