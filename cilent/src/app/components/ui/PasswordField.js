import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { cn } from '../../../utils/cn';

const PasswordField = React.forwardRef(function PasswordField({ label, error, className, ...props }, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block mb-4 text-left">
      {label && <span className="block mb-1 text-sm font-medium text-gray-700">{label}</span>}
      <span className="relative block">
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn(
            'block w-full rounded-xl border px-4 py-2.5 pr-11 text-sm text-gray-900 outline-none transition-colors',
            'border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </span>
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
});

export default PasswordField;
