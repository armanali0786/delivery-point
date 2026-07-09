import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Input from '../components/ui/Input';
import PasswordField from '../components/ui/PasswordField';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

export default function SignUp() {

  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Firstname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://delivery-point.onrender.com/customer/signup', values);
      if (response.status === 200) {
        const token = response.data.signature;
        localStorage.setItem('token', token);
        navigate('/otp-verify');
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
            <p className="text-2xl font-bold text-gray-900 mb-1">Sign Up</p>
            <p className="text-sm text-gray-500 mb-5">Create an account to get started.</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Field as={Input} type="text" name="fullName" label="Full Name" error={touched.fullName && errors.fullName} />
                  <Field as={Input} type="email" name="email" label="Email" error={touched.email && errors.email} />
                  <Field as={Input} type="text" name="address" label="Address" />
                  <Field as={Input} type="text" name="phone" label="Phone" />
                  <Field as={PasswordField} name="password" label="Password" error={touched.password && errors.password} />
                  <Button type='submit' pill fullWidth disabled={isSubmitting}>Submit</Button>
                  <p className="text-gray-500 text-sm mt-4 text-center">Already have an account ? <Link to="/login" className="text-primary-600 hover:text-primary-700 hover:underline">Signin</Link> </p>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
