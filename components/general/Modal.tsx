"use client";
import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal content */
  children?: React.ReactNode;
  /** Modal title (optional) */
  title?: string;
  /** Whether clicking overlay closes modal (default: true) */
  closeOnOverlayClick?: boolean;
  /** Whether ESC key closes modal (default: true) */
  closeOnEscape?: boolean;
  /** Whether to show close button (default: true) */
  showCloseButton?: boolean;
  /** Custom modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Custom z-index (default: 50) */
  zIndex?: number;
  /** Custom overlay background */
  overlayClassName?: string;
  /** Custom modal container styling */
  containerClassName?: string;
  /** Custom close button styling */
  closeButtonClassName?: string;
  /** Disable body scroll when modal is open (default: true) */
  preventBodyScroll?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  size = 'md',
  zIndex = 100,
  overlayClassName = '',
  containerClassName = '',
  closeButtonClassName = '',
  preventBodyScroll = true
}) => {
  // Handle ESC key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && isOpen) {
      onClose();
    }
  }, [closeOnEscape, isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Body scroll management and ESC key listener
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = 'hidden';
      }
      
      // Add ESC key listener
      if (closeOnEscape) {
        document.addEventListener('keydown', handleEscapeKey);
      }
      
      // Focus trap - focus the modal container
      const modalElement = document.querySelector('[data-modal-container]') as HTMLElement;
      if (modalElement) {
        modalElement.focus();
      }
    }

    return () => {
      // Restore body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = 'unset';
      }
      
      // Remove ESC key listener
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };
  }, [isOpen, closeOnEscape, handleEscapeKey, preventBodyScroll]);

  // Size classes mapping
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 ${overlayClassName}`}
      style={{ zIndex, fontFamily: 'Lexend' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`
          bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} 
          transform transition-all duration-300 scale-100 opacity-100
          animate-in fade-in zoom-in-95 
          max-h-[90vh] overflow-hidden
          ${containerClassName}
        `}
        data-modal-container
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold text-[#252525]">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  p-2 hover:bg-gray-100 rounded-full transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${closeButtonClassName}
                `}
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto scroll-hidden max-h-[calc(90vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Hook for managing modal state
const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen
  };
};

export {
    Modal,
    useModal
}