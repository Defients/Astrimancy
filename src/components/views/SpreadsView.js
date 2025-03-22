/**
 * SpreadsView component for card spreads and readings
 */
// At the top of src/components/views/SpreadsView.js, add or update these imports:
import React, { useState, useEffect, useContext, useRef } from "react";
import CardSpread from "../CardSpread";
import SpreadReadingGenerator from "../SpreadReadingGenerator";
import { useAppContext } from "../../state/hooks/useAppContext";
import { getTextColor } from "../../utils/utils";
import { getCardImage } from "../../utils/cardImageUtils";
import { cardData } from "../../data/cardData2";
import {
  cardSpreads,
  strands,
  strandColors,
  strandImages,
} from "../../data/constants";

export default function SpreadsView() {
  const { state, dispatch } = useAppContext();
  const [isCardPickerOpen, setIsCardPickerOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStrand, setFilterStrand] = useState("all");

  // Initialize spread cards array if not already set
  useEffect(() => {
    if (!state.views.currentSpread) {
      dispatch({ type: "SET_SPREAD_TYPE", payload: "threeCard" });
    }

    if (!state.views.spreadCards || state.views.spreadCards.length === 0) {
      if (state.views.currentSpread && cardSpreads[state.views.currentSpread]) {
        dispatch({
          type: "SET_SPREAD_CARDS",
          payload: Array(
            cardSpreads[state.views.currentSpread].positions.length
          ).fill(null),
        });
      }
    }

    // Scroll to top when view loads
    window.scrollTo(0, 0);
  }, [state.views.currentSpread, state.views.spreadCards, dispatch]);

  const selectSpreadPosition = (position) => {
    setCurrentPosition(position);
    setIsCardPickerOpen(true);
    setSearchTerm("");
    setFilterStrand("all");
  };

  const assignCardToPosition = (card) => {
    const newSpreadCards = [...state.views.spreadCards];
    newSpreadCards[currentPosition] = card;
    dispatch({ type: "SET_SPREAD_CARDS", payload: newSpreadCards });
    setIsCardPickerOpen(false);
  };

  const closeCardPicker = () => setIsCardPickerOpen(false);

  const handleCardClick = (card) => {
    dispatch({ type: "SET_SELECTED_CARD", payload: card });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "ADD_TO_HISTORY", payload: card });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: card });
  };

  const openPrintView = (cards) => {
    dispatch({
      type: "SET_PRINT_VIEW",
      payload: {
        show: true,
        cards,
      },
    });
  };

  // Filter cards in the picker
  const getFilteredCards = () => {
    return cardData.filter((card) => {
      // Filter by strand
      if (filterStrand !== "all" && card.strand !== filterStrand) {
        return false;
      }

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          card.title.toLowerCase().includes(term) ||
          card.strand.toLowerCase().includes(term) ||
          card.number.toLowerCase().includes(term) ||
          card.description.toLowerCase().includes(term)
        );
      }

      return true;
    });
  };

  const filteredCards = getFilteredCards();

  return (
    <div className="spreads-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(cardSpreads).map(([key, spread]) => (
          <div
            key={key}
            className={`p-4 rounded-lg cursor-pointer transition-all hover:transform hover:scale-105 ${
              state.views.currentSpread === key
                ? "bg-purple-700 bg-opacity-50 border-2 border-purple-500 shadow-lg"
                : "bg-gray-800 bg-opacity-50 hover:bg-gray-700"
            }`}
            onClick={() => {
              dispatch({ type: "SET_SPREAD_TYPE", payload: key });
              dispatch({
                type: "SET_SPREAD_CARDS",
                payload: Array(cardSpreads[key].positions.length).fill(null),
              });
            }}
          >
            <h3 className="text-xl font-cinzel font-bold mb-2">
              {spread.name}
            </h3>
            <p className="opacity-80">{spread.positions.length} positions</p>
            <div className="mt-4 text-sm opacity-60">
              {spread.positions.map((pos) => pos.name).join(" • ")}
            </div>
          </div>
        ))}
      </div>

      {state.views.currentSpread && (
        <div>
          <CardSpread
            spread={cardSpreads[state.views.currentSpread]}
            cards={state.views.spreadCards}
            onSelectPosition={selectSpreadPosition}
            onCardClick={handleCardClick}
            showCardImages={state.ui.showCardImages}
          />

          {/* Card picker modal for spreads */}
          {isCardPickerOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black bg-opacity-75"
                onClick={closeCardPicker}
              ></div>
              <div className="relative bg-gray-800 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto z-10">
                <h3 className="text-xl font-bold mb-4">
                  Select a Card for{" "}
                  {
                    cardSpreads[state.views.currentSpread].positions[
                      currentPosition
                    ].name
                  }
                </h3>
                <p className="mb-4 text-gray-300">
                  {
                    cardSpreads[state.views.currentSpread].positions[
                      currentPosition
                    ].description
                  }
                </p>

                {/* Search and filter controls */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <input
                      type="text"
                      placeholder="Search cards..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                    value={filterStrand}
                    onChange={(e) => setFilterStrand(e.target.value)}
                  >
                    <option value="all">All Strands</option>
                    {strands.map((strand) => (
                      <option key={strand} value={strand}>
                        {strand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick filter by strand */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {strands.map((strand) => (
                    <button
                      key={strand}
                      className="px-3 py-1 rounded-lg text-sm"
                      style={{
                        backgroundColor: strandColors[strand] || "#9370DB",
                        color: getTextColor(strandColors[strand] || "#9370DB"),
                      }}
                      onClick={() => {
                        const strandCards = cardData.filter(
                          (c) => c.strand === strand
                        );
                        if (strandCards.length > 0) {
                          assignCardToPosition(
                            strandCards[
                              Math.floor(Math.random() * strandCards.length)
                            ]
                          );
                        }
                      }}
                    >
                      {strand}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 rounded-lg text-sm bg-purple-600"
                    onClick={() => {
                      assignCardToPosition(
                        cardData[Math.floor(Math.random() * cardData.length)]
                      );
                    }}
                  >
                    Random Card
                  </button>
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredCards.map((card, i) => (
                    <div
                      key={i}
                      className="card-mini cursor-pointer transform transition-all hover:-translate-y-1"
                      onClick={() => assignCardToPosition(card)}
                    >
                      <div
                        className="aspect-ratio-3/5 rounded-lg overflow-hidden relative"
                        style={{ backgroundColor: card.color }}
                      >
                        {state.ui.showCardImages && getCardImage(card) && (
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${getCardImage(card)})`,
                              opacity: 0.8,
                            }}
                          />
                        )}
                        <div className="absolute inset-0 flex flex-col p-2">
                          <div className="text-center text-xs font-bold mb-1">
                            {card.strand} {card.number}
                          </div>
                          <div className="text-sm font-bold text-center">
                            {card.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCards.length === 0 && (
                  <div className="text-center p-8 bg-gray-700 bg-opacity-30 rounded-lg mt-4">
                    <p>No cards match your search criteria</p>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-700 rounded-lg"
                    onClick={closeCardPicker}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <SpreadReadingGenerator
            spreadCards={state.views.spreadCards}
            cardSpreads={cardSpreads}
            currentSpread={state.views.currentSpread}
            showPPFReadings={state.ui.showPPFReadings}
          />

          <div className="flex flex-wrap justify-between mt-8 gap-4">
            <button
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              onClick={() => dispatch({ type: "CLEAR_SPREAD" })}
            >
              Clear Spread
            </button>
            <button
              className={`px-4 py-2 bg-purple-700 rounded-lg transition-colors ${
                !state.views.spreadCards.some(Boolean)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-600"
              }`}
              onClick={() =>
                openPrintView(state.views.spreadCards.filter(Boolean))
              }
              disabled={!state.views.spreadCards.some(Boolean)}
            >
              Print Spread
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
