import React, { useState, useEffect } from 'react'
import { fetchOffersData } from '../apis/ApiCall';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ApplyOffer({ isOfferModelOpen, toggleOfferModal,handleApplyData }) {


  const [offerAmount, setOfferAmount] = useState('');
  const [offersData, setOffersData] = useState([]);



  const handleApplyOffer = async (offerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8080/customer/offer/verify/${offerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOfferAmount(response.data.offer);
        handleApplyData(response.data.offer);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
    toggleOfferModal();
  };

  useEffect(() => {
    const fetchOffers = async () => {
      if (isOfferModelOpen) {
        try {
          const response = await fetchOffersData();
          setOffersData(response.Offers);
        } catch (error) {
          console.error('Error fetching offers:', error);
        }
      }
    };

    fetchOffers();
  }, [isOfferModelOpen]);

  return (
    <>
    <ToastContainer/>
      {isOfferModelOpen && (
        <div className="fixed top-12 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            {/* Modal content */}
            <div className="p-4">
              {/* Modal header */}
              <div className="flex items-center justify-between border-b">
                <h3 className="text-2xl font-semibold text-gray-900">
                  OFFERS
                </h3>
                <button
                  onClick={toggleOfferModal}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <input type="text" placeholder="Enter coupon code" className="border border-zinc-300 p-2  flex-1 mr-2" />
                  <button className="bg-orange-500 text-white px-4 py-2 ">APPLY</button>
                </div>
                <div className="text-sm font-semibold mb-2 text-gray-800">AVAILABLE COUPONS</div>
                <div className="overflow-auto max-h-72 space-y-4 ">
                  {offersData.map((offer, index) => (
                    <div className="border-t pt-4 border-2 border-black px-5 py-5">
                      <div className="flex items-center mb-1">
                        <span className="text-orange-500 mr-2">🔔</span>
                        <span className="font-bold">{offer.promocode}</span>
                      </div>
                      <div className="text-sm mb-1">Flat Rs.125 off</div>
                      <div className="text-xs mb-2">{offer.description}</div>
                      <button className="text-orange-500 text-xs underline">+ MORE</button>
                      <div className="mt-2">
                        <button className="bg-orange-500 text-white text-sm font-semibold px-4 py-2  w-full" onClick={() => handleApplyOffer(offer.offerId)}>APPLY COUPON</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
