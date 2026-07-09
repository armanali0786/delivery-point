import React from 'react';
import { FaUtensils } from 'react-icons/fa';

export default function EmptyState({ title = 'Nothing here yet', subtitle, action, className = '' }) {
  return (
    <div className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white py-16 text-center ${className}`}>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-500">
        <FaUtensils className="h-7 w-7" />
      </span>
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      {subtitle && <p className="max-w-xs text-sm text-gray-500">{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
