/**
 * BrowseView component for exploring cards
 */
import React, { useState, useEffect } from "react";
import StrandFilter from "../StrandFilter";
import ActiveFilters from "../common/ActiveFilters";
import GridView from "./GridView";
import CarouselView from "./CarouselView";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";
import { strands, strandImages, strandColours } from "../../data/constants";

export default function BrowseView() {
  const { state, dispatch } = useAppContext();
  const { filteredCards, hasActiveFilters, clearAllFilters } = useCards();

  // Scroll to top when view is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="browse-view-container">
      {/* Display strand filter */}
      <StrandFilter
        filterStrand={state.cards.filterStrand}
        setFilterStrand={(strand) =>
          dispatch({ type: "SET_FILTER_STRAND", payload: strand })
        }
        strands={strands}
        strandImages={strandImages}
        strandColors={strandColours}
      />

      {/* Display filters info */}
      {hasActiveFilters && (
        <ActiveFilters
          filters={state}
          dispatch={dispatch}
          onClearAll={clearAllFilters}
        />
      )}

      {/* Display filtered cards count */}
      <div className="mb-4">
        <h2 className="text-xl font-cinzel font-bold">
          {filteredCards.length} {filteredCards.length === 1 ? "Card" : "Cards"}{" "}
          Found
        </h2>
      </div>

      {/* Display cards based on view mode */}
      {state.ui.displayMode === "grid" ? (
        <GridView cards={filteredCards} />
      ) : (
        <CarouselView cards={filteredCards} />
      )}
    </div>
  );
}
