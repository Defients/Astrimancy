/**
 * Advanced Toast Notification System for Astrimancy Cards Explorer
 * Supports multiple toasts with a stacking system
 */
import React, { useState, useEffect } from "react";
import { useAppContext } from "./state/hooks/useAppContext";

// Individual Toast component
const Toast = ({
  id,
  message,
  type,
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  // Auto-close timer effect
  useEffect(() => {
    let timer;
    if (autoClose) {
      timer = setTimeout(() => {
        onClose(id);
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [id, onClose, autoClose, duration]);

  // Get the appropriate icon based on toast type
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`toast ${type} show`} role="alert" aria-live="polite">
      <div className="flex items-center">
        <div className="toast-icon">{getIcon()}</div>
        <div className="flex-grow">{message}</div>
        <button
          className="toast-close"
          onClick={() => onClose(id)}
          aria-label="Close notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {autoClose && <div className="toast-progress"></div>}
    </div>
  );
};

// Toast Container Component
const ToastContainer = () => {
  const { state, dispatch } = useAppContext();
  const [toasts, setToasts] = useState([]);

  // Watch for new toast messages in the state
  useEffect(() => {
    if (state.ui?.toast) {
      // Add new toast with unique ID
      const newToast = {
        id: Date.now(),
        message: state.ui.toast.message,
        type: state.ui.toast.type || "info",
        autoClose: state.ui.toast.autoClose !== false,
        duration: state.ui.toast.duration || 3000,
      };

      setToasts((prev) => [...prev, newToast]);

      // Clear the global toast state
      dispatch({ type: "CLEAR_TOAST" });
    }
  }, [state.ui?.toast, dispatch]);

  // Handle toast removal
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container fixed bottom-5 right-5 z-50 flex flex-col space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
          autoClose={toast.autoClose}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
