import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ element }) => {
    // const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // console.log("Is LoggedIn",isLoggedIn);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
          setIsLoggedIn(true);
        }
      }, [token]);

    const navigate = useNavigate();


    // console.log("token inside protected route",token);

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                // console.log("token inside try catch",token);
                if (!token) {
                    // No token found, redirect to login
                    // console.log("No token found")
                    navigate('/login');
                    setIsLoggedIn(false);
                } else {
                    const isValid = true; // You can replace this with actual token verification
                    if (!isValid) {
                        // Invalid token, redirect to login
                        // console.log("not valid token found")
                        navigate('/login');
                        setIsLoggedIn(false);
                    }else{
                        // console.log("valid token found")
                        return isLoggedIn ? element : null;
                    }
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                navigate('/login');
                setIsLoggedIn(false);
            }
        };

        checkTokenValidity();
    }, [token, navigate, setIsLoggedIn]);

    // Render the element only if the user is logged in
    return isLoggedIn ? element : null;
};

export default ProtectedRoute;
