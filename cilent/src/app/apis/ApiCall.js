// api.js

import axios from "axios";
const token = localStorage.getItem("token");

const fetchFoods = async () => {
    try {
        const response = await axios.get('https://delivery-point.onrender.com/get-all-foods', {
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
        const response = await axios.get('https://delivery-point.onrender.com/get-top-foods', {
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
        const response = await axios.get(`https://delivery-point.onrender.com/${pincode}`, {
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
        const response = await axios.get(`https://delivery-point.onrender.com/foods/${vendorId}`, {
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
        const response = await axios.get(`https://delivery-point.onrender.com/all-restaurant`, {
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
        const response = await axios.get(`https://delivery-point.onrender.com/foods-30-min`, {
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
        const response = await axios.get(`https://delivery-point.onrender.com/customer/available-offers`, {
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


const fetchOrderData = async () => {
    try {
        const response = await axios.get(`https://delivery-point.onrender.com/customer/orders`, {
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


const CreateOrder = async (payloadData) => {
    try {
        const response = await axios.post(`https://delivery-point.onrender.com/customer/create-order`,
            payloadData, {
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


const getFavouriteFoods = async () => {
    try {
        const response = await axios.get(`https://delivery-point.onrender.com/customer/get-favourites`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        return response;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};


const fetchTransaction = async () => {
    try {
        const response = await axios.get(`https://delivery-point.onrender.com/customer/get-transactions`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        return response;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
}



export {
    fetchFoods,
    fetchVendors,
    fetchRestaurants,
    fetchVendorsById,
    fetchFoodInMin,
    fetchTopFoods,
    fetchOffersData,
    fetchOrderData,
    CreateOrder,
    getFavouriteFoods,
    fetchTransaction
};
