import React from 'react';
import { cn } from '../../../utils/cn';

const Input = React.forwardRef(function Input({ label, error, className, ...props }, ref) {
  return (
    <label className="block mb-4 text-left">
      {label && <span className="block mb-1 text-sm font-medium text-gray-700">{label}</span>}
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors',
          'border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
});

export default Input;
