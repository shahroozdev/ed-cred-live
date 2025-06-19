// components/PortalModal.tsx
'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function PortalModal({ isOpen, onClose, children }: PortalModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden"
      onClick={onClose} // ✅ closes when clicking outside
    >
      <div
        className="relative bg-white rounded-xl shadow-lg !p-0 w-[90%] max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // ✅ prevents closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 z-50 bg-white/50 rounded-full w-6 h-6 cursor-pointer right-2 flex justify-center items-center text-black text-lg"
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
