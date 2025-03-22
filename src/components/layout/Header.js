/**
 * Header component with search and navigation
 */
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ThemeToggle from "../common/ThemeToggle";
import Navigation from "./Navigation";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";

export default function Header() {
  const { state, dispatch } = useAppContext();
  const { getRandomCard } = useCards();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCardImages = () => dispatch({ type: "TOGGLE_CARD_IMAGES" });

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if focused on input or textarea
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      if (e.key === "i") {
        // Toggle images
        toggleCardImages();
      } else if (e.key === "/") {
        // Focus search
        const searchInput = document.querySelector(".search-box");
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="app-header sticky top-0 z-30 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="main-header flex items-center justify-between py-3">
          {/* Mobile menu toggle button */}
          <button
            className="mobile-menu-toggle md:hidden flex items-center justify-center bg-transparent"
            onClick={() =>
              dispatch({ type: "SET_MOBILE_MENU_OPEN", payload: true })
            }
            aria-label="Open menu"
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* App title */}
          <h1 className="text-2xl md:text-3xl font-cinzel font-bold">
            ASTRIMANCY
          </h1>

          {/* Search box */}
          <div className="search-box-container hidden md:block mx-4">
            <SearchBar />
          </div>

          {/* Feature controls and right area (desktop) */}
          <div className="hidden md:flex items-center">
            {/* Random card button */}
            <button
              className="px-3 py-1.5 rounded-full bg-purple-700 hover:bg-purple-600 text-white flex items-center gap-1 mr-4 transition-all transform hover:scale-105"
              onClick={getRandomCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              Random
            </button>

            {/* Feature toggles */}
            <div className="feature-toggles flex items-center">
              <button
                className={`feature-button ${
                  state.ui.showCardImages ? "active" : ""
                }`}
                onClick={toggleCardImages}
                title="Toggle card images"
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
                  Images
                </span>
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Search toggle for mobile */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Mobile search bar */}
        {showMobileFilters && (
          <div className="md:hidden px-2 pb-3 pt-1 animate-fadeIn">
            <SearchBar />
          </div>
        )}

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
}
