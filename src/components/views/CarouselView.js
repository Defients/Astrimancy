/**
 * CarouselView component for displaying cards in strand-based carousels
 */
import React, { useState, useEffect, useRef } from "react";
import Card from "../../Card";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";
import {
  strandOrder,
  strandColours,
  strandImages,
  strandDescriptions,
} from "../../data/constants";

export default function CarouselView({ cards }) {
  const { state, dispatch } = useAppContext();
  const { isCardFavorite, toggleFavorite } = useCards();
  const [expandedStrand, setExpandedStrand] = useState(null);
  const carouselRefs = useRef({});

  // Get all strands data from the constants file
  const allStrands = [...new Set(cards.map((c) => c.strand))];
  const strands = strandOrder
    ? strandOrder.filter((s) => allStrands.includes(s))
    : allStrands || [];

  // Group cards by strand
  const cardsByStrand = strands.reduce((acc, strand) => {
    const strandCards = cards.filter((c) => c.strand === strand);
    if (strandCards.length > 0) acc[strand] = strandCards;
    return acc;
  }, {});

  const handleCardClick = (card) => {
    dispatch({ type: "SET_SELECTED_CARD", payload: card });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "ADD_TO_HISTORY", payload: card });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: card });
  };

  const handleAddToComparison = (card) => {
    dispatch({ type: "ADD_TO_COMPARISON", payload: card });
    dispatch({
      type: "SET_TOAST",
      payload: {
        message: "Added to comparison",
        type: "info",
      },
    });
  };

  const isCardInComparison = (card) => {
    return state.views.comparisonCards.some(
      (c) =>
        c.strand === card.strand &&
        c.number === card.number &&
        c.title === card.title
    );
  };

  // Toggle expanded strand
  const toggleExpandedStrand = (strand) => {
    setExpandedStrand(expandedStrand === strand ? null : strand);
  };

  // Enhanced carousel scrolling with smoother animation
  const scrollCarousel = (strand, direction) => {
    const carousel = carouselRefs.current[strand];
    if (carousel) {
      const scrollAmount = direction === "left" ? -320 : 320;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Add keyboard navigation for carousels
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      // Handle arrow keys for active carousels
      if (expandedStrand && carouselRefs.current[expandedStrand]) {
        if (e.key === "ArrowLeft") {
          scrollCarousel(expandedStrand, "left");
        } else if (e.key === "ArrowRight") {
          scrollCarousel(expandedStrand, "right");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedStrand]);

  return (
    <div className="space-y-12">
      {Object.entries(cardsByStrand).map(([strand, cards]) => (
        <div key={strand} className="strand-section" id={`strand-${strand}`}>
          <div
            className="strand-title cursor-pointer"
            onClick={() => toggleExpandedStrand(strand)}
          >
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-2xl font-cinzel font-bold text-white flex items-center">
                {strandImages[strand] ? (
                  <img
                    src={strandImages[strand]}
                    className="strand-icon"
                    alt={strand}
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  <span
                    className="inline-block w-8 h-8 rounded-full mr-3"
                    style={{
                      backgroundColor: strandColours[strand] || "#9370DB",
                    }}
                  />
                )}
                <span className="strand-name">{strand}</span>
                <span className="card-count-badge">{cards.length}</span>
              </h2>
              <div className="flex space-x-2">
                <button
                  className="nav-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollCarousel(strand, "left");
                  }}
                  aria-label="Scroll left"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="nav-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollCarousel(strand, "right");
                  }}
                  aria-label="Scroll right"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="strand-description mt-2 text-sm">
              {expandedStrand === strand
                ? strandDescriptions[strand]
                : `${strandDescriptions[strand].substring(0, 100)}... `}
              <span className="text-purple-300 hover:underline">
                {expandedStrand === strand ? "(show less)" : "(show more)"}
              </span>
            </div>
          </div>
          <div
            className="carousel-container flex space-x-4 py-4 swipeable-container"
            ref={(el) => (carouselRefs.current[strand] = el)}
          >
            {cards.map((card, i) => (
              <div
                key={`${card.strand}-${card.number}-${i}`}
                className="flex-shrink-0 carousel-card-container"
                style={{ width: "260px" }}
              >
                <Card
                  card={card}
                  onClick={() => handleCardClick(card)}
                  strandColor={strandColours[card.strand] || "#9370DB"}
                  isFavorite={isCardFavorite(card)}
                  onToggleFavorite={() => toggleFavorite(card)}
                  onAddToComparison={() => handleAddToComparison(card)}
                  isInComparison={isCardInComparison(card)}
                  showCardImages={state.ui.showCardImages}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
