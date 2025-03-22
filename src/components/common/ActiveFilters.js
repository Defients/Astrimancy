/**
 * ActiveFilters component for displaying and clearing active filters
 */
import React, { useState, useEffect } from "react";

export default function ActiveFilters({ filters, dispatch, onClearAll }) {
  // Handle removing a single filter
  const removeFilter = (type, value) => {
    switch (type) {
      case "strand":
        dispatch({ type: "SET_FILTER_STRAND", payload: "all" });
        break;
      case "search":
        dispatch({ type: "SET_SEARCH_TERM", payload: "" });
        break;
      case "numbers":
        dispatch({ type: "SET_FILTER_NUMBERS", payload: [] });
        break;
      case "challenges":
        dispatch({ type: "SET_FILTER_CHALLENGES", payload: [] });
        break;
      default:
        break;
    }
  };

  return (
    <div className="mb-4 p-3 bg-purple-900 bg-opacity-20 rounded-lg flex flex-wrap justify-between items-center">
      <div>
        <span className="mr-2">Active filters:</span>
        {filters.cards.filterStrand !== "all" && (
          <span className="filter-chip">
            Strand: {filters.cards.filterStrand}
            <span
              className="remove-icon"
              onClick={() => removeFilter("strand")}
            >
              ×
            </span>
          </span>
        )}
        {filters.cards.searchTerm && (
          <span className="filter-chip">
            Search: {filters.cards.searchTerm}
            <span
              className="remove-icon"
              onClick={() => removeFilter("search")}
            >
              ×
            </span>
          </span>
        )}
        {filters.cards.filterNumbers.length > 0 && (
          <span className="filter-chip">
            Numbers: {filters.cards.filterNumbers.length}
            <span
              className="remove-icon"
              onClick={() => removeFilter("numbers")}
            >
              ×
            </span>
          </span>
        )}
        {filters.cards.filterChallenges.length > 0 && (
          <span className="filter-chip">
            Challenges: {filters.cards.filterChallenges.length}
            <span
              className="remove-icon"
              onClick={() => removeFilter("challenges")}
            >
              ×
            </span>
          </span>
        )}
      </div>
      <button
        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
        onClick={onClearAll}
      >
        Clear All
      </button>
    </div>
  );
}
