/**
 * Card component that displays a card in the grid or carousel view
 */
import React from "react";
import {
  getTextColor,
  getBrighterColor,
  getStrandClassName,
  formatCardNumber,
} from "./utils/utils";
import { getCardImage } from "./utils/cardImageUtils";
import { strandImages } from "./data/constants";

const Card = ({
  card,
  onClick,
  strandColor,
  isFavorite,
  onToggleFavorite,
  onAddToComparison,
  isInComparison,
  showCardImages = true,
}) => {
  // Replace "(Major Arcana)" with "(M.Arcana)" in the primary field
  const formattedPrimary = card.primary
    ? card.primary.replace(/\(Major Arcana\)/g, "(M.Arcana)")
    : "";

  // Calculate a contrasting text color based on the background color
  const cardTextColor = getTextColor(card.color);
  const headerColor = getBrighterColor(card.color);
  const hasStrandImage = strandImages[card.strand] !== undefined;

  // Get card image if available
  const cardImage = showCardImages ? getCardImage(card) : null;

  const handleClick = () => {
    onClick(card);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(card);
  };

  const handleAddToComparison = (e) => {
    e.stopPropagation();
    onAddToComparison(card);
  };

  return (
    <div
      className="card rounded-xl overflow-hidden cursor-pointer transform transition-all relative card-shadow"
      onClick={handleClick}
    >
      <div
        className="card-visual"
        style={{ backgroundColor: card.color, position: "relative" }}
      >
        {/* Card Image (if available and enabled) */}
        {cardImage ? (
          <div
            className="card-image-overlay"
            style={{
              backgroundImage: `url(${cardImage})`,
              opacity: 0.9,
            }}
          />
        ) : (
          hasStrandImage && (
            <div
              className="card-image-overlay"
              style={{
                backgroundImage: `url(${strandImages[card.strand]})`,
                opacity: 0.3,
              }}
            />
          )
        )}

        {/* Favorite button in top-left with tooltip */}
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <div className="card-tooltip">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </div>
        </button>

        {/* Enhanced Strand and Chord display with new styling */}
        <div className="text-center px-2 py-1 mt-2 mx-auto max-w-max bg-black bg-opacity-40 rounded-md backdrop-filter backdrop-blur-sm">
          <span
            className={`strand-name strand-${getStrandClassName(card.strand)}`}
          >
            {card.strand}
          </span>{" "}
          <span className="chord-name">{formatCardNumber(card.number)}</span>
        </div>

        <div
          className="card-title-area"
          style={{ backgroundColor: headerColor }}
        >
          <h3
            className={`text-lg font-cinzel font-bold mt-1 mb-2 title-${getStrandClassName(
              card.strand
            )}`}
          >
            {card.title}
          </h3>
          <div
            className="card-description text-sm opacity-90 mb-3"
            style={{ color: cardTextColor }}
          >
            {card.description}
          </div>
        </div>
        <div className="card-footer-area mt-auto">
          <div className="flex justify-between items-center">
            {hasStrandImage ? (
              <img
                src={strandImages[card.strand]}
                className="w-8 h-8 object-contain"
                alt={card.strand}
                style={{ width: "34px", height: "34px" }}
              />
            ) : (
              <div
                className="hexagon"
                style={{
                  backgroundColor: strandColor,
                  width: "34px",
                  height: "34px",
                }}
              />
            )}
            <span className="text-xs" style={{ color: cardTextColor }}>
              {formattedPrimary}
            </span>
          </div>
        </div>

        {/* Add to comparison button in top-right with tooltip */}
        <button
          className="comparison-button"
          onClick={handleAddToComparison}
          title="Add to comparison"
          aria-label="Add to comparison"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <div className="card-tooltip">Add to comparison</div>
        </button>

        {/* Badge if card is in comparison */}
        {isInComparison && <div className="card-badge">✓</div>}
      </div>
    </div>
  );
};

export default Card;
