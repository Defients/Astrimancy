/**
 * CardSpread component that displays a card spread layout and allows selecting positions
 */
import React from "react";
import { getCardImage } from "../utils/cardImageUtils";
import { getStrandClassName, formatCardNumber } from "../utils/utils";
import { strandImages } from "../data/constants";

const CardSpread = ({
  spread,
  cards,
  onSelectPosition,
  onCardClick,
  showCardImages = true,
  showReadingTips = true,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-cinzel font-bold mb-4 flex items-center">
        {spread.name}
        <span className="ml-4 px-3 py-1 bg-purple-700 bg-opacity-50 rounded-lg text-sm">
          {spread.positions.length} positions
        </span>
      </h2>
      <div
        className={`grid grid-cols-1 ${
          spread.positions.length <= 3
            ? "md:grid-cols-3"
            : spread.positions.length === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-3 lg:grid-cols-5"
        } gap-6`}
      >
        {spread.positions.map((position, index) => (
          <div key={index} className="spread-position-container">
            <div
              className={`spread-position ${cards[index] ? "filled" : ""}`}
              onClick={() => onSelectPosition(index)}
            >
              {cards[index] ? (
                <div
                  className="w-full h-full relative cursor-pointer card-shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(cards[index]);
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: cards[index].color }}
                  >
                    {/* Card image (if available) */}
                    {showCardImages && getCardImage(cards[index]) ? (
                      <div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          backgroundImage: `url(${getCardImage(cards[index])})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.9,
                        }}
                      />
                    ) : (
                      strandImages[cards[index].strand] && (
                        <div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            backgroundImage: `url(${
                              strandImages[cards[index].strand]
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            opacity: 0.3,
                          }}
                        />
                      )
                    )}
                  </div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    {/* Enhanced Strand and Chord display */}
                    <div className="text-center">
                      <div className="inline-block px-3 py-1 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-md">
                        <span
                          className={`strand-name strand-${getStrandClassName(
                            cards[index].strand
                          )}`}
                        >
                          {cards[index].strand}
                        </span>{" "}
                        <span className="chord-name">
                          {formatCardNumber(cards[index].number)}
                        </span>
                      </div>
                      <h3
                        className={`text-lg font-cinzel font-bold mt-2 title-${getStrandClassName(
                          cards[index].strand
                        )}`}
                      >
                        {cards[index].title}
                      </h3>
                    </div>
                    <div className="mt-auto">
                      <div className="text-sm opacity-90 line-clamp-3">
                        {cards[index].primary.replace(
                          /\(Major Arcana\)/g,
                          "(M.Arcana)"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-cinzel font-bold mb-2">{position.name}</p>
                  <p className="text-sm opacity-70">{position.description}</p>
                  <p className="mt-4 text-sm">Click to select a card</p>
                </div>
              )}
            </div>
            <p className="mt-2 text-center font-bold">{position.name}</p>
            {showReadingTips && (
              <p className="text-xs text-center mt-1 opacity-70">
                {position.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {showReadingTips && (
        <div className="reading-tip mt-6 flex items-start">
          <div className="mr-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </div>
          <div>
            For this {spread.name}, focus on how the cards interact with each
            other. Pay special attention to common themes or contrasting
            energies between the positions.
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSpread;
