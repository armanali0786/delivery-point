import React from 'react';

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
      <div className="h-[180px] w-full animate-pulse rounded-xl bg-gray-200" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function LoadingState({ count = 6, className = '' }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
