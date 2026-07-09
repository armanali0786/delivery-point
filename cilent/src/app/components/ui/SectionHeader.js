import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function SectionHeader({ title, onPrev, onNext, action }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="flex items-center gap-2">
        {action}
        {(onPrev || onNext) && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <FaArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <FaArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
