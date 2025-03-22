/**
 * CardComparison component for comparing multiple cards
 */
import React from "react";
import { getCardImage } from "./utils/cardImageUtils";
import {
  getBrighterColor,
  getStrandClassName,
  formatCardNumber,
} from "./utils/utils";
import { strandImages, strandColours } from "./data/constants";

const CardComparison = ({
  cards,
  onRemoveCard,
  onCardClick,
  showCardImages = true,
}) => {
  // Calculate common themes and contrasts
  let commonThemes = [];
  let contrasts = [];
  let interpretation = "";

  if (cards.length >= 2) {
    // Check for same strand
    if (cards[0].strand === cards[1].strand) {
      commonThemes.push(`Both cards belong to the ${cards[0].strand} strand`);
    } else {
      contrasts.push(
        `Different strands: ${cards[0].strand} vs ${cards[1].strand}`
      );
    }

    // Check for challenge similarities
    const challenge1 = cards[0].challenge.split(":")[0];
    const challenge2 = cards[1].challenge.split(":")[0];

    if (challenge1.includes(challenge2) || challenge2.includes(challenge1)) {
      commonThemes.push(
        `Similar challenge themes: ${challenge1} and ${challenge2}`
      );
    } else {
      contrasts.push(`Contrasting challenges: ${challenge1} vs ${challenge2}`);
    }

    // Check for primary influence similarities
    if (cards[0].primary === cards[1].primary) {
      // Replace "(Major Arcana)" with "(M.Arcana)"
      const formattedPrimary = cards[0].primary.replace(
        /\(Major Arcana\)/g,
        "(M.Arcana)"
      );
      commonThemes.push(`Same primary influence: ${formattedPrimary}`);
    }

    // Generate an interpretation based on the cards
    if (cards.length === 2) {
      interpretation = `The ${cards[0].strand} ${cards[0].number} (${cards[0].title}) combined with the ${cards[1].strand} ${cards[1].number} (${cards[1].title}) suggests a journey through ${challenge1} and ${challenge2}. This combination illuminates how these energies interact in your situation.`;
    } else if (cards.length === 3) {
      const challenge3 = cards[2].challenge.split(":")[0];
      interpretation = `This three-card combination reveals a progression from ${challenge1} through ${challenge2} to ${challenge3}, suggesting a transformative path. Pay special attention to how the ${cards[1].strand} energy in the middle bridges the other influences.`;
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-cinzel font-bold mb-4">Card Comparison</h2>
      {cards.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-lg">
          <p className="mb-4">Select cards to compare (up to 3)</p>
          <p className="opacity-70">
            Click the "+" button on any card to add it to comparison, or view
            cards and click "Add to Comparison"
          </p>
        </div>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {cards.map((card, index) => {
              const cardImage = showCardImages ? getCardImage(card) : null;
              // Replace "(Major Arcana)" with "(M.Arcana)" in primary
              const formattedPrimary = card.primary.replace(
                /\(Major Arcana\)/g,
                "(M.Arcana)"
              );

              return (
                <div key={index} className="relative">
                  <div
                    className="card-visual cursor-pointer card-shadow"
                    style={{ backgroundColor: card.color }}
                    onClick={() => onCardClick(card)}
                  >
                    {/* Card image if available */}
                    {cardImage ? (
                      <div
                        className="card-image-overlay"
                        style={{
                          backgroundImage: `url(${cardImage})`,
                          opacity: 0.9,
                        }}
                      />
                    ) : (
                      strandImages[card.strand] && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${
                              strandImages[card.strand]
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            opacity: 0.3,
                            zIndex: 0,
                          }}
                        />
                      )
                    )}

                    {/* Enhanced Strand and Chord display */}
                    <div className="absolute top-2 left-0 right-0 text-center z-10">
                      <div className="mx-auto inline-block px-3 py-1 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-md">
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
                    </div>

                    <div
                      className="card-title-area"
                      style={{
                        backgroundColor: getBrighterColor(card.color),
                      }}
                    >
                      <h3
                        className={`text-lg font-cinzel font-bold mt-6 mb-2 title-${getStrandClassName(
                          card.strand
                        )}`}
                      >
                        {card.title}
                      </h3>
                      <div className="card-description text-sm opacity-90 mb-3">
                        {card.description.replace(
                          /\(Major Arcana\)/g,
                          "(M.Arcana)"
                        )}
                      </div>
                    </div>
                    <div className="card-footer-area">
                      <div className="flex justify-between items-center">
                        {strandImages[card.strand] ? (
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
                              backgroundColor:
                                strandColours[card.strand] || "#9370DB",
                              width: "34px",
                              height: "34px",
                            }}
                          />
                        )}
                        <span className="text-xs">{formattedPrimary}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
                    onClick={() => onRemoveCard(index)}
                    aria-label="Remove card from comparison"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}

            {/* Empty slots */}
            {[...Array(3 - cards.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="card-visual border-2 border-dashed border-gray-500 flex items-center justify-center"
              >
                <div className="text-center text-gray-400 p-4">
                  <p className="mb-2">Select a card to compare</p>
                  <p className="text-sm opacity-60">
                    Click the "+" button on any card or use "Add to Comparison"
                    in card details
                  </p>
                </div>
              </div>
            ))}
          </div>

          {cards.length >= 2 && (
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-cinzel font-bold mb-4">
                Card Analysis
              </h3>

              {commonThemes.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Common Themes:</h4>
                  <ul className="list-disc ml-6">
                    {commonThemes.map((theme, i) => (
                      <li key={i}>{theme}</li>
                    ))}
                  </ul>
                </div>
              )}

              {contrasts.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Contrasts:</h4>
                  <ul className="list-disc ml-6">
                    {contrasts.map((contrast, i) => (
                      <li key={i}>{contrast}</li>
                    ))}
                  </ul>
                </div>
              )}

              <h4 className="font-bold mb-2">Combined Interpretation:</h4>
              <p>{interpretation}</p>

              <div className="mt-6 flex justify-center">
                <button
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-white"
                  onClick={() => {
                    // Would trigger a reading generation based on these cards
                    // Not fully implemented in this demo
                    alert(
                      "This would generate a detailed reading for these cards"
                    );
                  }}
                >
                  Generate Full Reading
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default CardComparison;
