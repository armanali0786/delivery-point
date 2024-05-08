import React from "react";

const BottomLead = ({ actionText, description, mainActionText, extraActionText }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-action lg:bg-cover lg:bg-action">
            <p className="p-5 text-4xl font-bold leading-normal text-center text-white lg:text-5xl lg:pt-10">{actionText}</p>
            <p className="px-6 py-4 text-lg leading-7 text-center text-gray-300 lg:text-gray-200 lg:font-medium">{description}</p>
            <div className="flex flex-col lg:flex-row gap-5 mt-6 lg:mt-8">
                <button
                    className="px-6 py-3 text-xl font-semibold text-center text-white bg-orange-600 rounded-xl shadow-md hover:bg-orange-700 focus:outline-none ring-2 ring-orange-600 focus:ring-orange-500"
                >
                    {mainActionText}
                </button>
                <button
                    className="px-6 py-3 mt-4 lg:mt-0 text-xl font-semibold text-center text-white bg-gray-800 rounded-xl shadow-md hover:text-orange-500 hover:bg-gray-700 focus:outline-none ring-2 ring-gray-300 focus:ring-gray-500"
                >
                    {extraActionText}
                </button>
            </div>
        </div>
    );
};

export default BottomLead;
