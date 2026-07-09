// api.js

import axios from "axios";
const token = localStorage.getItem("token");

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes - this data isn't real-time, no need to refetch constantly
const cache = new Map();

const cached = async (key, fetcher) => {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.time < CACHE_TTL) {
        return entry.data;
    }
    const data = await fetcher();
    cache.set(key, { data, time: Date.now() });
    return data;
};

const fetchFoods = async () => {
    try {
        return await cached('fetchFoods', async () => {
            const response = await axios.get('https://delivery-point.onrender.com/get-all-foods', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};

const fetchTopFoods = async () => {
    try {
        return await cached('fetchTopFoods', async () => {
            const response = await axios.get('https://delivery-point.onrender.com/get-top-foods', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};



const fetchVendors = async (pincode) => {
    try {
        return await cached(`fetchVendors:${pincode}`, async () => {
            const response = await axios.get(`https://delivery-point.onrender.com/${pincode}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};

const fetchVendorsById = async (vendorId) => {
    try {
        return await cached(`fetchVendorsById:${vendorId}`, async () => {
            const response = await axios.get(`https://delivery-point.onrender.com/foods/${vendorId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};


const fetchRestaurants = async () => {
    try {
        return await cached('fetchRestaurants', async () => {
            const response = await axios.get(`https://delivery-point.onrender.com/all-restaurant`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};


const fetchFoodInMin = async () => {
    try {
        return await cached('fetchFoodInMin', async () => {
            const response = await axios.get(`https://delivery-point.onrender.com/foods-30-min`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        });
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
