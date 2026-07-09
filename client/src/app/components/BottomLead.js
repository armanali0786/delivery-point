import React from "react";
import Button from "./ui/Button";

const BottomLead = ({ actionText, description, mainActionText, extraActionText }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-action lg:bg-cover sm:bg-cover lg:bg-action">
            <p className="p-5 text-4xl font-bold leading-normal text-center text-white lg:text-5xl lg:pt-10">{actionText}</p>
            <p className="px-6 py-4 text-lg leading-7 text-center text-gray-300 lg:text-gray-200 lg:font-medium">{description}</p>
            <div className="flex flex-col lg:flex-row gap-5 mt-6 mb-10 lg:mt-8">
                <Button variant="primary" size="lg" pill>{mainActionText}</Button>
                <Button variant="secondary" size="lg" pill>{extraActionText}</Button>
            </div>
        </div>
    );
};

export default BottomLead;
