/**
 * SearchBar component for filtering cards
 */
import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../state/hooks/useAppContext";

export default function SearchBar() {
  const { state, dispatch } = useAppContext();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (state.cards.searchTerm) {
        dispatch({ type: "SET_SEARCH_TERM", payload: "" });
      } else {
        e.target.blur();
      }
    }
  };

  return (
    <div className="search-box-container relative">
      <span className="search-icon">
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
      </span>
      <input
        type="text"
        className="search-box w-full"
        placeholder="Search cards..."
        value={state.cards.searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {state.cards.searchTerm && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          onClick={() => dispatch({ type: "SET_SEARCH_TERM", payload: "" })}
          aria-label="Clear search"
        >
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
        </button>
      )}
      {isFocused && (
        <div className="absolute right-3 bottom-0 transform translate-y-full text-xs text-gray-400 bg-gray-800 bg-opacity-90 px-2 py-1 rounded">
          Press ESC to clear
        </div>
      )}
    </div>
  );
}
