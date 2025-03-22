/**
 * ToastController component for managing toast notifications
 */
import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../state/hooks/useAppContext";

export default function ToastController() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (state.ui.toast) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_TOAST" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.ui.toast, dispatch]);

  if (!state.ui.toast) return null;

  return (
    <div className={`toast show ${state.ui.toast.type}`}>
      {state.ui.toast.message}
    </div>
  );
}
