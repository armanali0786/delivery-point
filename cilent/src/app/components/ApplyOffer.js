import React, { useState, useEffect } from 'react'
import { fetchOffersData } from '../apis/ApiCall';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './ui/Modal';
import Button from './ui/Button';

export default function ApplyOffer({ isOfferModelOpen, toggleOfferModal,handleApplyData }) {

  const [offerAmount, setOfferAmount] = useState('');
  const [offersData, setOffersData] = useState([]);

  const handleApplyOffer = async (offerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://delivery-point.onrender.com/customer/offer/verify/${offerId}`,
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
        toggleOfferModal();
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
      <Modal open={isOfferModelOpen} onClose={toggleOfferModal} title="OFFERS" panelClassName="max-w-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <input type="text" placeholder="Enter coupon code" className="rounded-xl border border-gray-300 p-2.5 flex-1 mr-2 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-100 outline-none" />
            <Button size="sm" pill>APPLY</Button>
          </div>
          <div className="text-sm font-semibold mb-2 text-gray-800">AVAILABLE COUPONS</div>
          <div className="overflow-auto max-h-72 space-y-3">
            {offersData.map((offer, index) => (
              <div key={index} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
                <div className="flex items-center mb-1">
                  <span className="text-primary-600 mr-2">🔔</span>
                  <span className="font-bold text-gray-900">{offer.promocode}</span>
                </div>
                <div className="text-sm mb-1 text-gray-700">Flat Rs.125 off</div>
                <div className="text-xs mb-2 text-gray-500">{offer.description}</div>
                <button className="text-primary-600 text-xs underline">+ MORE</button>
                <div className="mt-2">
                  <Button size="sm" pill fullWidth onClick={() => handleApplyOffer(offer.offerId)}>APPLY COUPON</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
