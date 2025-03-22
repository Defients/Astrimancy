/**
 * Mobile menu component for smaller screens
 */
import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";

export default function MobileMenu() {
  const { state, dispatch } = useAppContext();
  const { getRandomCard } = useCards();

  const setView = (view) => {
    dispatch({ type: "SET_VIEW", payload: view });
    closeMobileMenu();
    window.scrollTo(0, 0);
  };

  const closeMobileMenu = () => {
    dispatch({ type: "SET_MOBILE_MENU_OPEN", payload: false });
  };

  const toggleTheme = () => {
    const newTheme = state.ui.theme === "dark" ? "light" : "dark";
    dispatch({ type: "SET_THEME", payload: newTheme });
  };

  const toggleCardImages = () => {
    dispatch({ type: "TOGGLE_CARD_IMAGES" });
  };

  const handleRandomCard = () => {
    getRandomCard();
    closeMobileMenu();
  };

  return (
    <div className={`mobile-menu ${state.ui.mobileMenuOpen ? "open" : ""}`}>
      <button className="mobile-menu-close" onClick={closeMobileMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Mobile navigation items */}
      <div className="mobile-nav-items flex-1">
        <div className="mobile-nav-item" onClick={() => setView("browse")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
            />
          </svg>
          Browse Cards
        </div>
        <div className="mobile-nav-item" onClick={() => setView("favorites")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Favorites
        </div>
        <div className="mobile-nav-item" onClick={() => setView("spread")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Card Spreads
        </div>
        <div className="mobile-nav-item" onClick={() => setView("comparison")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Compare Cards
          {state.views.comparisonCards.length > 0 && (
            <span className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {state.views.comparisonCards.length}
            </span>
          )}
        </div>
        <div className="mobile-nav-item" onClick={handleRandomCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          Random Card
        </div>
        <div className="mobile-nav-item">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                />
              </svg>
              <span className="ml-3">Card Images</span>
            </div>
            <div
              className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
                state.ui.showCardImages
                  ? "bg-purple-700 justify-end"
                  : "bg-gray-700 justify-start"
              }`}
              onClick={toggleCardImages}
            >
              <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
            </div>
          </div>
        </div>
        <div className="mobile-nav-item">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {state.ui.theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
              <span className="ml-3">
                {state.ui.theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </div>
            <div
              className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
                state.ui.theme === "light"
                  ? "bg-yellow-500 justify-end"
                  : "bg-gray-700 justify-start"
              }`}
              onClick={toggleTheme}
            >
              <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
