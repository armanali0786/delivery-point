import React from 'react';
import { cn } from '../../../utils/cn';

export function Card({ className, hover = true, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm',
        hover && 'transition-shadow duration-200 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('px-5 py-4 border-b border-gray-100 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
