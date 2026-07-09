import React from 'react';
import { FaStar } from 'react-icons/fa';
import { cn } from '../../../utils/cn';

export default function RatingBadge({ rating, className, size = 'sm' }) {
  const value = Number(rating) || 0;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-green-600 text-white font-semibold',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1',
        className
      )}
    >
      <FaStar className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {value.toFixed(1)}
    </span>
  );
}
