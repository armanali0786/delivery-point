import React from 'react';
import { cn } from '../../../utils/cn';
import RatingBadge from './RatingBadge';

function getFirstNWords(text, n) {
  if (!text) return '';
  return text.split(' ').slice(0, n).join(' ');
}

export default function FoodCard({
  image,
  name,
  price,
  rating,
  readyTime,
  description,
  badge,
  action,
  cornerAction,
  onImageClick,
  onClick,
  variant = 'grid',
  className,
}) {
  const isList = variant === 'list';

  return (
    <div
      onClick={onClick}
      className={cn(
        'group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200',
        onClick && 'cursor-pointer',
        isList ? 'flex gap-4 p-3' : 'flex flex-col overflow-hidden',
        className
      )}
    >
      <div
        onClick={onImageClick ? (e) => { e.stopPropagation(); onImageClick(); } : undefined}
        className={cn('relative shrink-0 overflow-hidden bg-gray-100', isList ? 'h-28 w-28 rounded-xl' : 'h-[170px] w-full')}
      >
        {image && (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {badge && <div className="absolute left-2 top-2">{badge}</div>}
        {cornerAction && <div className="absolute right-2 top-2">{cornerAction}</div>}
        {!isList && action && (
          <div className="absolute -bottom-3 right-3">{action}</div>
        )}
      </div>

      <div className={cn('flex flex-col', isList ? 'flex-1 justify-between' : 'p-3 pt-4')}>
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-base font-semibold text-gray-900">{name}</h3>
            {typeof rating !== 'undefined' && <RatingBadge rating={rating} />}
          </div>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {getFirstNWords(description, 16)}
              {description.split(' ').length > 16 ? '…' : ''}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {typeof price !== 'undefined' && <span className="font-bold text-gray-900">₹{price}</span>}
            {readyTime && <span className="text-xs font-medium text-gray-400">{readyTime} min</span>}
          </div>
          {isList && action}
        </div>
      </div>
    </div>
  );
}
