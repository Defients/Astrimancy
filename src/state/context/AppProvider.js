// src/state/context/AppProvider.js
import React, { useReducer, useEffect } from "react";
import { AppContext } from "./AppContext";
import uiReducer from "../reducers/uiReducer";
import cardReducer from "../reducers/cardReducer";
import viewReducer from "../reducers/viewReducer";
import { combineReducers } from "../reducers/combineReducers";
import { loadInitialState } from "../../utils/storageUtils";

// Ensure cardData is imported properly
import { cardData } from "../../data/cardData2";

// Create the root reducer by combining individual reducers
const rootReducer = combineReducers({
  ui: uiReducer,
  cards: cardReducer,
  views: viewReducer,
});

export function AppProvider({ children }) {
  // Load initial state safely with error handling
  const loadState = () => {
    try {
      return loadInitialState();
    } catch (error) {
      console.error("Error loading initial state:", error);
      // Return a minimal default state
      return {
        ui: {
          theme: "dark",
          displayMode: "grid",
          showCardImages: true,
        },
        cards: {
          searchTerm: "",
          filterStrand: "all",
          viewHistory: [],
        },
        views: {
          currentView: "browse",
        },
      };
    }
  };

  // Initialize state from localStorage or use defaults
  const [state, dispatch] = useReducer(rootReducer, null, loadState);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if input or textarea is focused
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      // Safely access state properties
      if (!state || !state.ui) return;

      switch (e.key) {
        case "g":
          dispatch({ type: "SET_DISPLAY_MODE", payload: "grid" });
          break;
        case "v":
          dispatch({ type: "SET_DISPLAY_MODE", payload: "carousel" });
          break;
        case "?":
          dispatch({
            type: "SET_SHOW_SHORTCUTS",
            payload: !state.ui.showShortcuts,
          });
          break;
        case "/":
          {
            const searchBox = document.querySelector(".search-box");
            if (searchBox) {
              searchBox.focus();
            }
            e.preventDefault();
          }
          break;
        case "i":
          dispatch({ type: "TOGGLE_CARD_IMAGES" });
          break;
        case "p":
          dispatch({ type: "TOGGLE_PPF_READINGS" });
          break;
        default:
          break;
      }

      // Modal-specific keyboard shortcuts
      if (state.ui.isModalOpen && state.ui.selectedCard) {
        if (e.key === "Escape") {
          dispatch({ type: "SET_MODAL_OPEN", payload: false });
        } else if (e.key === "f") {
          // Toggle favorite logic is handled in CardModalController
        } else if (e.key === "c") {
          dispatch({
            type: "ADD_TO_COMPARISON",
            payload: state.ui.selectedCard,
          });
        } else if (e.key === "s") {
          dispatch({
            type: "SET_SHARE_MODAL",
            payload: {
              show: true,
              card: state.ui.selectedCard,
            },
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]);

  // Ensure daily card is set
  useEffect(() => {
    if (!state || !state.cards) return;

    try {
      const today = new Date().toDateString();
      const savedDailyCard = JSON.parse(localStorage.getItem("dailyCard"));

      if (!savedDailyCard || savedDailyCard.date !== today) {
        if (Array.isArray(cardData) && cardData.length > 0) {
          const randomIndex = Math.floor(Math.random() * cardData.length);
          const newDailyCard = cardData[randomIndex];

          dispatch({ type: "SET_DAILY_CARD", payload: newDailyCard });
          localStorage.setItem(
            "dailyCard",
            JSON.stringify({
              card: newDailyCard,
              date: today,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error setting daily card:", error);
    }
  }, [state?.cards]);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("ServiceWorker registration successful");
          })
          .catch((err) => {
            console.log("ServiceWorker registration failed: ", err);
          });
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
