/**
 * Application context for state management
 */
import React, { createContext } from "react";

// Create context with default empty values
export const AppContext = createContext({
  state: {},
  dispatch: () => {},
});
