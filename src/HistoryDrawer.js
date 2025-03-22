/**
 * HistoryDrawer component for displaying recently viewed cards
 */
import React from "react";
import { useAppContext } from "./state/hooks/useAppContext";
import { getCardImage } from "./utils/cardImageUtils";
import { strandImages } from "./data/constants";

const HistoryDrawer = ({
  isOpen,
  cards,
  onCardClick,
  onToggle,
  showCardImages = true,
}) => {
  // Helper function to convert strand to CSS class name
  const getStrandClassName = (strand) => {
    const strandMap = {
      lotŭr: "lotur",
      Vitarîs: "vitaris",
      丂anxxui: "sanxxui",
      Askänu: "askanu",
      Virtuō: "virtuo",
      Nectiv: "nectiv",
      memetic: "memetic",
      OptiX: "optix",
      "Dræmin'": "dreamin",
      ℛadí: "radi",
      Elly: "elly",
      Cozmik: "cozmik",
      VOIDROT: "voidrot",
      Ðethapart: "dethapart",
      none: "none",
    };
    return strandMap[strand] || strand.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  const formatCardNumber = (number) => {
    if (number === "Red Joker") return "RJ";
    if (number === "Black Joker") return "BJ";
    return number;
  };

  return (
    <React.Fragment>
      <div className="history-toggle" onClick={onToggle}>
        {isOpen ? "Hide History" : "View History"}
      </div>
      <div className={`history-drawer ${isOpen ? "open" : ""}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recently Viewed Cards</h3>
          <button
            className="bg-gray-700 px-3 py-1 rounded-lg text-sm"
            onClick={onToggle}
          >
            Close
          </button>
        </div>

        {cards.length === 0 ? (
          <p className="text-center py-4">No recent cards</p>
        ) : (
          <div className="flex overflow-x-auto pb-4">
            {cards.map((card, index) => {
              const cardImage = showCardImages ? getCardImage(card) : null;

              // Replace "(Major Arcana)" with "(M.Arcana)" in primary
              const formattedPrimary = card.primary.replace(
                /\(Major Arcana\)/g,
                "(M.Arcana)"
              );

              return (
                <div
                  key={index}
                  className="card-mini flex-shrink-0 relative group"
                  style={{ backgroundColor: card.color }}
                  onClick={() => onCardClick(card)}
                >
                  {/* Card image if available */}
                  {cardImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${cardImage})`,
                        opacity: 0.7,
                      }}
                    />
                  )}
                  <div className="p-2 h-full flex flex-col justify-between relative z-10">
                    <div>
                      {/* Enhanced Strand and Chord display */}
                      <div className="text-center mb-1">
                        <div className="inline-block px-2 py-0.5 bg-black bg-opacity-40 rounded-sm text-xs">
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
                        className={`text-sm font-bold truncate title-${getStrandClassName(
                          card.strand
                        )}`}
                      >
                        {card.title}
                      </div>
                    </div>
                    <div className="text-xs mt-2 opacity-80 truncate">
                      {formattedPrimary}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default HistoryDrawer;
