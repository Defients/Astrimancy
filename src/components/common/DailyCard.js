/**
 * DailyCard component for displaying the card of the day
 */
import React from "react";
import { useAppContext } from "../../state/hooks/useAppContext";
import { getStrandClassName, formatCardNumber } from "../../utils/utils";
import { getCardImage } from "../../utils/cardImageUtils";
import { strandImages } from "../../data/constants";

export default function DailyCard({ onClick }) {
  const { state } = useAppContext();
  const card = state.cards.dailyCard;

  if (!card) return null;

  const hasStrandImage = strandImages[card.strand] !== undefined;
  const cardImage = state.ui.showCardImages ? getCardImage(card) : null;

  // Parse the challenge to get just the title
  const challengeTitle = card.challenge.split(":")[0];

  // Replace "(Major Arcana)" with "(M.Arcana)" in all relevant fields
  const formattedPrimary = card.primary.replace(
    /\(Major Arcana\)/g,
    "(M.Arcana)"
  );

  return (
    <div className="daily-card-banner relative overflow-hidden">
      {/* Background image if available */}
      {cardImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cardImage})`,
            opacity: 0.15,
            filter: "blur(3px)",
          }}
        />
      )}

      <div className="flex items-center w-full relative z-10">
        {/* Larger strand icon or card image */}
        {cardImage ? (
          <div className="mr-6 w-20 h-32 rounded-lg overflow-hidden shadow-lg">
            <img
              src={cardImage}
              className="w-full h-full object-cover pulse-anim"
              alt={`${card.strand} ${card.number} - ${card.title}`}
            />
          </div>
        ) : (
          hasStrandImage && (
            <div className="mr-6">
              <img
                src={strandImages[card.strand]}
                className="w-20 h-20 object-contain pulse-anim" // Much larger icon with pulse animation
                alt={card.strand}
              />
            </div>
          )
        )}

        <div className="flex-grow">
          <h2 className="text-3xl font-cinzel font-bold mb-2">
            Your Card of the Day
          </h2>
          <p className="opacity-80 mb-4">Daily insight to guide your journey</p>
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* Enhanced Strand and Chord display */}
            <div className="inline-block px-3 py-1 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-md mr-3 mb-2 sm:mb-0">
              <span
                className={`strand-name strand-${getStrandClassName(
                  card.strand
                )}`}
              >
                {card.strand}
              </span>{" "}
              <span className="chord-name">
                {formatCardNumber(card.number)}
              </span>
            </div>
            <span
              className={`text-xl title-${getStrandClassName(card.strand)}`}
            >
              {card.title}
            </span>
          </div>
          <div className="mt-2 text-sm opacity-90">
            <span className="font-bold">Challenge: </span>
            {challengeTitle}
          </div>
          <div className="mt-2 text-sm opacity-80">
            <span className="font-bold">Primary: </span>
            {formattedPrimary}
          </div>
        </div>
        <button
          className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all rounded-lg ml-4"
          onClick={() => onClick(card)}
        >
          View Card
        </button>
      </div>
    </div>
  );
}
