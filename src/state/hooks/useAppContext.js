/**
 * Custom hook to access the AppContext
 */
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
