import React from 'react';
import { cn } from '../../../utils/cn';

const VARIANT_CLASSES = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-200',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800 focus:ring-gray-300',
  outline: 'bg-white text-gray-700 border border-gray-300 hover:border-primary-600 hover:text-primary-600 focus:ring-primary-100',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-200',
};

const SIZE_CLASSES = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2',
};

const Button = React.forwardRef(function Button(
  { variant = 'primary', size = 'md', pill = false, fullWidth = false, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed',
        pill ? 'rounded-full' : 'rounded-xl',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
