/**
 * PrintLayout component for printing cards
 */
import React from "react";
import { getCardImage } from "./utils/cardImageUtils"; // Correct import path
import { strandImages } from "./data/constants";

const PrintLayout = ({ cards, onClose, showCardImages = true }) => {
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-8">
      <div className="bg-white text-black rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-4 right-4 bg-gray-200 rounded-full p-2"
          onClick={onClose}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-cinzel font-bold mb-6 text-center">
          Astrimancy Cards Print View
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print-layout">
          {cards.map((card, index) => {
            const cardImage = showCardImages ? getCardImage(card) : null;

            // Replace "(Major Arcana)" with "(M.Arcana)" in relevant fields
            const formattedPrimary = card.primary.replace(
              /\(Major Arcana\)/g,
              "(M.Arcana)"
            );
            const formattedDescription = card.description.replace(
              /\(Major Arcana\)/g,
              "(M.Arcana)"
            );
            const formattedSecondary = card.secondary.replace(
              /\(Major Arcana\)/g,
              "(M.Arcana)"
            );

            return (
              <div
                key={index}
                className="print-card border border-gray-300 rounded-lg p-4 relative"
              >
                {/* Card image if available */}
                {cardImage && (
                  <div
                    className="absolute inset-0 rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${cardImage})`,
                      opacity: 0.1,
                    }}
                  />
                )}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    {/* Enhanced Strand and Chord display */}
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-md text-gray-800">
                      <span className="font-bold">{card.strand}</span>{" "}
                      <span className="italic">
                        {formatCardNumber(card.number)}
                      </span>
                    </div>
                    {cardImage && (
                      <div className="w-16 h-24 bg-cover bg-center border border-gray-300 rounded-md overflow-hidden">
                        <img
                          src={cardImage}
                          alt={`${card.strand} ${card.number}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <h3
                    className="text-xl font-cinzel font-bold mb-2"
                    style={{ color: "#505050" }}
                  >
                    {card.title}
                  </h3>
                  <p className="mb-4">{formattedDescription}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-100 p-2 rounded">
                      <strong>Primary:</strong> {formattedPrimary}
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <strong>Hidden:</strong> {card.hidden}
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <strong>Secondary:</strong> {formattedSecondary}
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <strong>Challenge:</strong> {card.challenge.split(":")[0]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center no-print">
          <button
            className="px-6 py-3 bg-purple-700 text-white rounded-lg"
            onClick={() => window.print()}
          >
            Print Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintLayout;
