/**
 * Enhanced Tutorial component that provides an interactive walkthrough
 * for new users of the Astrimancy Cards Explorer
 *
 * Features:
 * - Smooth transitions and animations
 * - Interactive elements with card examples
 * - Improved accessibility
 * - Mobile-responsive design
 * - Progress tracking and navigation
 * - Skip/exit functionality
 */
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../state/hooks/useAppContext";

// Fix import path - make sure it matches your project structure
// The error suggests the utils path might be different in your project
import { getCardImage } from "../utils/cardImageUtils";

// We'll create our own utility functions instead of importing them
// since there seems to be a path issue
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

const Tutorial = ({ onClose, currentStep, setCurrentStep }) => {
  const { state, dispatch } = useAppContext();
  const [animationState, setAnimationState] = useState("entering");
  const [cardExample, setCardExample] = useState(null);
  const highlightRef = useRef(null);
  const contentRef = useRef(null);
  const prevHighlightPosition = useRef(null);

  // Tutorial content steps with enhanced descriptions and interactive elements
  const tutorials = [
    {
      title: "Welcome to Astrimancy Cards",
      content:
        "Discover the ancient wisdom of the cosmos through the Astrimancy deck. This interactive explorer helps you navigate the mystical strands and discover insights that transcend ordinary divination systems. Proceed through this tutorial to learn the basics.",
      targetElement: null, // Full screen overlay
      image: null,
      action: "Begin your journey with the cosmic deck",
    },
    {
      title: "Browsing Cards",
      content:
        "The card explorer shows all available cards organized by strand. Each strand represents a different cosmic energy or aspect of existence. You can view cards in grid or carousel mode, filter by strand using the controls at the top, and click any card to explore its deeper meaning.",
      targetElement: ".card-grid", // Highlight the card grid
      image: "grid-view",
      action: "Click on any card to view its details",
    },
    {
      title: "Card Details",
      content:
        "Each Astrimancy card contains rich information about its meaning and influence. The Primary Influence represents the card's main energy, while Hidden Nature reveals subtle undercurrents. Secondary Influence shows how the energy manifests, and Challenge describes the growth opportunity it presents.",
      targetElement: ".modal-card", // Highlight the card modal
      image: "card-detail",
      action: "Explore the different aspects of card meaning",
    },
    {
      title: "Saving Favorites",
      content:
        "When you find cards that resonate with your journey, save them to your favorites by clicking the star icon. Your favorites are stored locally and can be accessed anytime from the Favorites tab for easy reference. Build your personal collection of meaningful cards.",
      targetElement: ".favorite-button", // Highlight the favorite button
      image: "favorites",
      action: "Try adding a card to your favorites",
    },
    {
      title: "Card Spreads",
      content:
        "Spreads arrange multiple cards in specific positions to reveal insights about situations or questions. Choose from different spread layouts like Three Card, Cross Spread, or Decision Spread. Each position has a unique meaning that influences how the card is interpreted.",
      targetElement: ".spread-position", // Highlight spread positions
      image: "spreads",
      action: "Create meaningful layouts with different spreads",
    },
    {
      title: "Card Comparison",
      content:
        "Compare up to three cards side by side to discover relationships, patterns, and contrasts between their energies. This helps you understand how different cosmic forces interact and influence each other. Click the '+' icon on any card to add it to your comparison.",
      targetElement: ".comparison-container", // Highlight comparison container
      image: "comparison",
      action: "Compare cards to find hidden connections",
    },
    {
      title: "Daily Card",
      content:
        "Each day, the Astrimancy Explorer presents you with a daily card for inspiration and guidance. This card changes daily and provides insight specifically attuned to the cosmic energies of the present day. Find it at the top of the Browse section.",
      targetElement: ".daily-card-banner", // Highlight daily card
      image: "daily-card",
      action: "Use your daily card as a cosmic compass",
    },
    {
      title: "Strand Meanings",
      content:
        "The 14 strands of Astrimancy represent different aspects of cosmic energy. Each strand has its own color, symbol, and energy signature. Lotŭr represents awareness, Virtuō embodies ethics, and Cozmik connects to universal patterns. Explore each strand to understand its unique influence.",
      targetElement: ".strand-filter-container", // Highlight strand filters
      image: "strands",
      action: "Explore the different strands of cosmic energy",
    },
    {
      title: "Keyboard Shortcuts",
      content:
        "Navigate Astrimancy efficiently with keyboard shortcuts. Use arrow keys to move between cards, 'F' to favorite a card, 'C' to add to comparison, and 'Esc' to close dialogs. Press '?' anytime to see all available shortcuts and enhance your exploration experience.",
      targetElement: ".keyboard-shortcuts", // Highlight keyboard shortcuts
      image: "shortcuts",
      action: "Use keyboard shortcuts for efficient navigation",
    },
    {
      title: "Advanced Features",
      content:
        "Discover the deeper layers of Astrimancy with advanced filters, reading generators, and card interpretations. You can filter by number, challenge themes, or search for specific content. The Reading Generator creates insightful interpretations based on your card layouts.",
      targetElement: ".advanced-filters", // Highlight advanced filters
      image: "advanced",
      action: "Unlock the full potential of Astrimancy",
    },
    {
      title: "Your Cosmic Journey Begins",
      content:
        "You now understand the basics of the Astrimancy Cards Explorer. Remember that the cards are not just tools for divination, but gateways to cosmic wisdom and self-discovery. Each time you return, new insights await. Your unique journey through the cosmic web of meanings starts now.",
      targetElement: null, // Full screen overlay
      image: "complete",
      action: "Begin exploring the cosmic wisdom of Astrimancy",
    },
  ];

  // Get a random card for examples (different cards for different steps)
  useEffect(() => {
    // Using window.cardData if it's globally available
    if (window.cardData && window.cardData.length > 0) {
      // Use a deterministic "random" selection based on step for consistency
      const cardIndex = (currentStep * 13) % window.cardData.length;
      setCardExample(window.cardData[cardIndex]);
    }
  }, [currentStep]);

  // Handle highlight positioning with smooth animation
  useEffect(() => {
    const targetSelector = tutorials[currentStep]?.targetElement;

    if (!targetSelector) {
      // Reset highlight position for full screen steps
      setAnimationState("fullscreen");
      return;
    }

    setAnimationState("transitioning");

    // Use requestAnimationFrame for smooth animation
    const animationFrame = requestAnimationFrame(() => {
      const element = document.querySelector(targetSelector);

      if (element && highlightRef.current) {
        const rect = element.getBoundingClientRect();

        // Store position for animation
        prevHighlightPosition.current = {
          top: highlightRef.current.style.top,
          left: highlightRef.current.style.left,
          width: highlightRef.current.style.width,
          height: highlightRef.current.style.height,
        };

        // Adjust for scroll position
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        const newPosition = {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height,
        };

        // Apply new position with smooth transition
        highlightRef.current.style.top = `${newPosition.top}px`;
        highlightRef.current.style.left = `${newPosition.left}px`;
        highlightRef.current.style.width = `${newPosition.width}px`;
        highlightRef.current.style.height = `${newPosition.height}px`;

        // Scroll element into view if needed
        if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        // Update animation state after transition
        setTimeout(() => {
          setAnimationState("active");
        }, 500); // Match transition duration
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [currentStep, tutorials]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          if (currentStep < tutorials.length - 1) {
            setCurrentStep(currentStep + 1);
          }
          break;
        case "ArrowLeft":
        case "ArrowUp":
          if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
          }
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, setCurrentStep, onClose, tutorials.length]);

  // Handle accessibility focus management
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, [currentStep]);

  // Generate progress indicators
  const renderProgressIndicators = () => {
    return (
      <div className="tutorial-progress flex justify-center space-x-2 mt-4">
        {tutorials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              index === currentStep
                ? "bg-purple-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentStep(index)}
            aria-label={`Go to tutorial step ${index + 1}`}
            aria-current={index === currentStep ? "step" : null}
          />
        ))}
      </div>
    );
  };

  // Render the example card
  const renderExampleCard = () => {
    if (!cardExample) return null;

    const cardImage = state.ui.showCardImages
      ? getCardImage(cardExample)
      : null;

    return (
      <div className="tutorial-card-example mt-4 flex justify-center">
        <div
          className="card-visual w-32 h-48 rounded-lg overflow-hidden relative transform transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: cardExample.color }}
        >
          {cardImage && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${cardImage})`,
                opacity: 0.8,
              }}
            />
          )}
          <div className="absolute inset-0 flex flex-col text-center p-2">
            <div className="text-xs mt-1 mb-1 font-bold">
              <span
                className={`strand-name strand-${getStrandClassName(
                  cardExample.strand
                )}`}
              >
                {cardExample.strand}
              </span>{" "}
              <span className="chord-name">
                {formatCardNumber(cardExample.number)}
              </span>
            </div>
            <h4
              className={`text-sm font-cinzel font-bold title-${getStrandClassName(
                cardExample.strand
              )}`}
            >
              {cardExample.title}
            </h4>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="tutorial-overlay animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
    >
      {tutorials[currentStep].targetElement && (
        <div
          ref={highlightRef}
          className={`highlight-element absolute border-4 border-purple-500 rounded-lg pointer-events-none ${
            animationState === "active" ? "pulse-animation" : ""
          }`}
          style={{
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
            zIndex: 200,
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={`tutorial-content max-w-xl mx-auto ${
          tutorials[currentStep].targetElement
            ? "relative"
            : "fixed inset-0 flex items-center justify-center"
        }`}
        style={{ zIndex: 300 }}
        ref={contentRef}
        tabIndex="-1"
      >
        <div className="bg-gray-900 bg-opacity-95 rounded-lg p-8 backdrop-filter backdrop-blur-sm border border-purple-800 shadow-2xl">
          <h2
            id="tutorial-title"
            className="text-2xl font-cinzel font-bold mb-4 text-purple-300"
          >
            {tutorials[currentStep].title}
          </h2>

          <p className="mb-6 text-gray-200 leading-relaxed">
            {tutorials[currentStep].content}
          </p>

          {/* Example card display */}
          {renderExampleCard()}

          {/* Tutorial navigation */}
          <div className="tutorial-navigation flex flex-wrap items-center justify-between mt-6">
            <div className="flex space-x-3 mb-4 sm:mb-0">
              {currentStep > 0 && (
                <button
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  aria-label="Previous step"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous
                </button>
              )}

              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                onClick={onClose}
                aria-label="Skip tutorial"
              >
                Skip
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-70 hidden sm:inline">
                {currentStep + 1} of {tutorials.length}
              </span>

              {currentStep < tutorials.length - 1 ? (
                <button
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors flex items-center"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  aria-label="Next step"
                >
                  {tutorials[currentStep].action}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors flex items-center"
                  onClick={onClose}
                  aria-label="Finish tutorial"
                >
                  Begin Exploring
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Progress indicators */}
          {renderProgressIndicators()}
        </div>
      </div>

      {/* Decorative cosmic elements */}
      <div className="cosmic-decoration">
        {[...Array(20)].map((_, i) => {
          const size = 1 + Math.random() * 3;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const animationDuration = 2 + Math.random() * 5;

          return (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: 0.6,
                animation: `twinkle ${animationDuration}s infinite alternate`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tutorial;
