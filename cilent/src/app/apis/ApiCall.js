// api.js

import axios from "axios";
const token = localStorage.getItem("token");

const fetchFoods = async () => {
    try {
        const response = await axios.get('http://localhost:8080/get-all-foods', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};

const fetchTopFoods = async () => {
    try {
        const response = await axios.get('http://localhost:8080/get-top-foods', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error; 
    }
};



const fetchVendors = async (pincode) => {
    try {
        const response = await axios.get(`http://localhost:8080/${pincode}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error; 
    }
};

const fetchVendorsById = async (vendorId) => {
    try {
        const response = await axios.get(`http://localhost:8080/foods/${vendorId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error; 
    }
};


const fetchRestaurants = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/all-restaurant`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error; 
    }
};


const fetchFoodInMin = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/foods-30-min`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error; 
    }
};


const fetchOffersData = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/customer/available-offers`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error; 
    }
};


export {
    fetchFoods,
    fetchVendors,
    fetchRestaurants,
    fetchVendorsById,
    fetchFoodInMin,
    fetchTopFoods,
    fetchOffersData
};
