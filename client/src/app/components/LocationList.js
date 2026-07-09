import React from 'react';
import { FiMapPin, FiNavigation, FiAlertCircle } from 'react-icons/fi';
import { useLocationContext } from '../context/locationContext';
import Button from './ui/Button';

export default function LocationList() {
  const { location, status, requestLocation } = useLocationContext() || {};

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 px-5">Popular localities in and around You</h1>
      <div className="mt-5 px-5">
        {location ? (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <FiMapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-gray-900">{location.locality || location.city || 'Your current location'}</p>
                <p className="text-sm text-gray-500">{location.fullAddress || location.city}</p>
              </div>
            </div>
            <button onClick={requestLocation} className="text-sm font-semibold text-primary-600 hover:text-primary-700 shrink-0">
              Change
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
            {status === 'denied' || status === 'error' ? (
              <FiAlertCircle className="h-8 w-8 text-primary-500" />
            ) : (
              <FiNavigation className="h-8 w-8 text-primary-500" />
            )}
            <p className="font-semibold text-gray-900">
              {status === 'denied'
                ? 'Location access denied'
                : status === 'error'
                  ? "Couldn't detect your location"
                  : 'See restaurants near you'}
            </p>
            <p className="max-w-sm text-sm text-gray-500">
              {status === 'denied'
                ? 'Enable location access in your browser settings to see popular localities near you.'
                : 'Share your location to discover popular localities and restaurants around you.'}
            </p>
            <Button pill size="sm" onClick={requestLocation} disabled={status === 'requesting'}>
              {status === 'requesting' ? 'Detecting…' : 'Use my current location'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
