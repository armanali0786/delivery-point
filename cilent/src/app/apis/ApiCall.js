// api.js

import axios from "axios";

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
        throw error; // Rethrow the error to handle it where fetchFoods is called
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
        throw error; // Rethrow the error to handle it where fetchFoods is called
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
        throw error; // Rethrow the error to handle it where fetchFoods is called
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
        throw error; // Rethrow the error to handle it where fetchFoods is called
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
        throw error; // Rethrow the error to handle it where fetchFoods is called
    }
};


export {
    fetchFoods,
    fetchVendors,
    fetchRestaurants,
    fetchVendorsById,
    fetchFoodInMin,
    fetchTopFoods
};
