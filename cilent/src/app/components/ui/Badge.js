import React from 'react';
import { cn } from '../../../utils/cn';

const TONE_CLASSES = {
  success: 'bg-green-50 text-green-700',
  danger: 'bg-red-50 text-red-600',
  primary: 'bg-primary-50 text-primary-700',
  neutral: 'bg-gray-100 text-gray-700',
};

export default function Badge({ tone = 'neutral', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        TONE_CLASSES[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
