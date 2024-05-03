import React, { useState } from 'react'
import '../assets/styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { isExpired, decodeToken } from "react-jwt";
import { FaEyeSlash, FaEye } from "react-icons/fa";


export default function SignUp() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:8080/customer/login', values);
      console.log(response.data.signature)
      if (response.status === 200) {
        const token = response.data.signature;
        const tokenData = localStorage.setItem('token', token);
        toast.success(response.data.message);
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

  /*********Password Hide and show*******************/
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex h-[450px] justify-center items-center bg-gray-100 py-5 '>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="forms w-[450px]">
              <p className="title text-indigo-500 text-2xl font-semibold mb-4">Sign In </p>
              <label className="block mb-2">
                <Field className="input mt-1 block w-full rounded border-gray-30" type="email" name="email" />
                <ErrorMessage name="email" component="span" className="super text-red-700" />
                <span className="text-gray-700">Email</span>
              </label>
              <label className="block mb-2 relative">
                <Field className="input mt-1 block w-full rounded border-gray-30"
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
                  {showPassword ? <FaEye /> : <FaEyeSlash /> }
                </i>
                <span className="text-gray-700">Password</span>
              </label>
              <button className="bg-[#6366f1] text-white font-semibold px-4 py-2 rounded hover:bg-[#34369b] transition duration-300" type='submit' disabled={isSubmitting}>Submit</button>
              <p className="text-gray-700 mt-4 text-center">Create an account ? <Link to="/sign-up" className="text-[#6366f1] hover:text-[#34369b] hover:underline">Signup</Link> </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
