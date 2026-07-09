import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { cn } from '../../../utils/cn';

export default function Modal({ open, onClose, title, children, className, panelClassName }) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('body-no-scroll');
    return () => document.body.classList.remove('body-no-scroll');
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4',
        className
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full max-w-lg rounded-2xl bg-white shadow-2xl',
          panelClassName
        )}
        onClick={e => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {onClose && (
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <IoMdClose className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
