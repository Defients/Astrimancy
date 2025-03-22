/**
 * CardModal component that displays a card's details in a modal
 * Enhanced with streamlined visuals and improved interaction
 */
import React, { useRef, useState, useEffect } from "react";
import { getBrighterColor, getTextColor } from "../utils/utils";
import { getCardImage, getCardPPFReadings } from "../utils/cardImageUtils";
import {
  strandImages,
  strandDescriptions,
  strandColors,
} from "../data/constants";

const CardModal = function ({
  card,
  onClose,
  isOpen,
  strandColor,
  onPrevCard,
  onNextCard,
  isFavorite,
  onToggleFavorite,
  onAddToComparison,
  onShareCard,
  showCardImages = true,
  showPPFReadings = false,
}) {
  // Access hooks from the React global
  const { useRef, useState, useEffect } = React;

  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("details");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Helper function to convert strand to CSS class name
  const getStrandClassName = function (strand) {
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

  const formatCardNumber = function (number) {
    if (number === "Red Joker") return "RJ";
    if (number === "Black Joker") return "BJ";
    return number;
  };

  // Replace "(Major Arcana)" with "(M.Arcana)" in all card fields
  const formattedPrimary = card
    ? card.primary.replace(/\(Major Arcana\)/g, "(M.Arcana)")
    : "";
  const formattedDescription = card
    ? card.description.replace(/\(Major Arcana\)/g, "(M.Arcana)")
    : "";
  const formattedSecondary = card
    ? card.secondary.replace(/\(Major Arcana\)/g, "(M.Arcana)")
    : "";

  // Calculate a contrasting text color
  const cardTextColor = card ? getTextColor(card.color) : "#FFFFFF";
  const hasStrandImage = card && strandImages[card.strand] !== undefined;

  // Colors for each section
  const primaryColor = card ? getBrighterColor(card.color) : "#FFFFFF";
  const hiddenColor = "#6B46C1"; // Standardized purple for hidden
  const secondaryColor = "#3B82F6"; // Bright blue for secondary
  const challengeColor = "#F59E0B"; // Amber for challenge

  // Get strand-specific animation settings
  const getStrandAnimation = function (strand) {
    const animations = {
      lotŭr: "float-subtle 4s ease-in-out infinite alternate", // gentle floating for awareness
      Vitarîs: "pulse-vitaris 3s ease-in-out infinite", // pulsing for physical vitality
      丂anxxui: "glow-sanxxui 4s ease-in-out infinite alternate", // soft glow for emotional connection
      Askänu: "spin-slow 10s linear infinite", // slow spinning for intellectual pursuit
      Virtuō: "shimmer-virtuo 6s ease-in-out infinite", // shimmering for ethical principles
      Nectiv: "blink-nectiv 5s infinite", // trendy blinking effect
      memetic: "morph-memetic 8s ease-in-out infinite", // shape-shifting for memes
      OptiX: "glitch-optix 6s infinite", // glitchy for gaming/competition
      "Dræmin'": "float-dreamy 8s ease-in-out infinite", // dreamy floating
      ℛadí: "radiate-radi 5s ease-in-out infinite", // radiating for illumination
      Elly: "shake-subtle 10s ease-in-out infinite", // subtle vibration for elemental forces
      Cozmik: "rotate-stars 20s linear infinite", // slow rotation for cosmic energy
      VOIDROT: "decay-voidrot 7s ease-in-out infinite", // degrading effect
      Ðethapart: "fragment-dethapart 9s ease-in-out infinite", // breaking apart
      none: "float-subtle 5s ease-in-out infinite alternate", // default gentle float
    };
    return animations[strand] || animations.none;
  };

  // Get strand-specific filter effects
  const getStrandFilter = function (strand) {
    const filters = {
      lotŭr: "drop-shadow(0 0 8px rgba(178, 212, 241, 0.7))", // blue awareness glow
      Vitarîs: "drop-shadow(0 0 8px rgba(232, 142, 117, 0.7))", // warm vitality glow
      丂anxxui: "drop-shadow(0 0 8px rgba(163, 226, 205, 0.7))", // emotional green glow
      Askänu: "drop-shadow(0 0 8px rgba(245, 212, 111, 0.7))", // knowledge golden glow
      Virtuō: "drop-shadow(0 0 8px rgba(189, 183, 224, 0.7))", // ethical purple glow
      Nectiv: "drop-shadow(0 0 12px rgba(227, 129, 165, 0.8))", // trendy pink flash
      memetic: "drop-shadow(0 0 10px rgba(152, 245, 152, 0.7))", // viral green glow
      OptiX:
        "drop-shadow(0 0 5px rgba(123, 107, 211, 0.9)) drop-shadow(0 0 10px rgba(123, 107, 211, 0.5))", // gaming double glow
      "Dræmin'": "drop-shadow(0 0 15px rgba(82, 149, 172, 0.5))", // dreamy blue haze
      ℛadí: "drop-shadow(0 0 15px rgba(255, 190, 95, 0.6))", // radiant orange glow
      Elly: "drop-shadow(0 0 8px rgba(240, 128, 128, 0.7))", // elemental red energy
      Cozmik: "drop-shadow(0 0 15px rgba(123, 166, 243, 0.6))", // cosmic blue aura
      VOIDROT: "drop-shadow(0 0 10px rgba(84, 72, 62, 0.5)) contrast(1.2)", // void enhanced contrast
      Ðethapart: "drop-shadow(0 0 10px rgba(46, 46, 46, 0.7)) blur(0.3px)", // slight fragment blur
      none: "drop-shadow(0 0 8px rgba(147, 112, 219, 0.7))", // default purple glow
    };
    return filters[strand] || filters.none;
  };

  // Handle image loading state
  const handleImageLoad = function () {
    setImageLoaded(true);
  };

  // Add animation when changing cards
  useEffect(
    function () {
      if (card) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return function () {
          clearTimeout(timer);
        };
      }
    },
    [card]
  );

  useEffect(
    function () {
      const handleClickOutside = function (event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      const handleKeyDown = function (event) {
        if (isOpen) {
          if (event.key === "Escape") {
            onClose();
          } else if (event.key === "ArrowLeft") {
            onPrevCard();
          } else if (event.key === "ArrowRight") {
            onNextCard();
          } else if (event.key === "f") {
            onToggleFavorite(card);
          } else if (event.key === "c") {
            onAddToComparison(card);
          } else if (event.key === "s") {
            onShareCard(card);
          }
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
      }

      return function () {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
      };
    },
    [
      isOpen,
      onClose,
      onPrevCard,
      onNextCard,
      card,
      onToggleFavorite,
      onAddToComparison,
      onShareCard,
    ]
  );

  if (!card) return null;

  // Parse the challenge into title and description
  const challengeParts = card.challenge.split(": ");
  const challengeTitle = challengeParts[0];
  const challengeDescription = challengeParts[1] || "";

  // Get card image and PPF readings
  const cardImage = card && showCardImages ? getCardImage(card) : null;
  const cardReadings =
    card && showPPFReadings ? getCardPPFReadings(card) : null;

  // Get nav button colors based on strand
  const getNavButtonColors = function (strand) {
    const navColors = {
      lotŭr: { bg: "#B2D4F1", glow: "rgba(178, 212, 241, 0.7)" }, // blue
      Vitarîs: { bg: "#E88E75", glow: "rgba(232, 142, 117, 0.7)" }, // orange-red
      丂anxxui: { bg: "#A3E2CD", glow: "rgba(163, 226, 205, 0.7)" }, // teal
      Askänu: { bg: "#F5D46F", glow: "rgba(245, 212, 111, 0.7)" }, // yellow
      Virtuō: { bg: "#BDB7E0", glow: "rgba(189, 183, 224, 0.7)" }, // purple
      Nectiv: { bg: "#E381A5", glow: "rgba(227, 129, 165, 0.7)" }, // pink
      memetic: { bg: "#98F598", glow: "rgba(152, 245, 152, 0.7)" }, // green
      OptiX: { bg: "#7B6BD3", glow: "rgba(123, 107, 211, 0.7)" }, // indigo
      "Dræmin'": { bg: "#5295AC", glow: "rgba(82, 149, 172, 0.7)" }, // blue-green
      ℛadí: { bg: "#FFBE5F", glow: "rgba(255, 190, 95, 0.7)" }, // orange
      Elly: { bg: "#F08080", glow: "rgba(240, 128, 128, 0.7)" }, // red
      Cozmik: { bg: "#7BA6F3", glow: "rgba(123, 166, 243, 0.7)" }, // blue
      VOIDROT: { bg: "#54483E", glow: "rgba(84, 72, 62, 0.7)" }, // brown
      Ðethapart: { bg: "#2E2E2E", glow: "rgba(46, 46, 46, 0.7)" }, // grey
      none: { bg: "#9370DB", glow: "rgba(147, 112, 219, 0.7)" }, // purple
    };
    return navColors[strand] || navColors.none;
  };

  const navColors = getNavButtonColors(card.strand);

  const modalClassName =
    "card-detail-modal fixed inset-0 flex items-center justify-center z-40 " +
    (isOpen ? "opacity-100" : "modal-hidden");

  return (
    <div
      className={modalClassName}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-modal-title"
    >
      {/* Enhanced CSS with Roboto font family and strand-specific animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@400;700&family=Roboto+Mono&display=swap');
  
  .modal-overlay {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
  }
  
  .modal-card {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
    animation: cardAppear 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    transform: scale(0.95);
    opacity: 0;
    font-family: 'Roboto', sans-serif;
  }
  
  @keyframes cardAppear {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .section-header {
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    font-weight: bold;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: 'Roboto', sans-serif;
  }
  
  .section-header:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .section-icon {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .tab-btn {
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }
  
  .tab-btn:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  .tab-btn.active:after {
    width: 80%;
  }
  
  .tab-btn:hover:after {
    width: 60%;
  }
  
  .action-btn {
    transition: all 0.2s ease;
    position: relative;
  }
  
  .action-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.2);
  }
  
  .cosmic-btn {
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
  }
  
  .cosmic-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .challenge-font {
    font-family: 'Helvetica', sans-serif;
    letter-spacing: 0.02em;
    font-weight: 400;
  }
  
  .nav-buttons {
    z-index: 100;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
    margin-bottom: 15px;
  }
  
  /* Different fonts for section headers */
  .secondary-header {
    font-family: 'Roboto Condensed', sans-serif;
  }
  
  .tarot-header {
    font-family: 'Roboto', serif;
  }
  
  .hidden-header {
    font-family: 'Roboto Mono', monospace;
  }
  
  /* Navigation button hover effects */
  .nav-btn {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .nav-btn:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  
  /* Raw strand image display */
  .strand-image-container {
    position: relative;
    margin-right: 12px;
  }
  
  .strand-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  /* Strand-specific animations */
  @keyframes float-subtle {
    0% { transform: translateY(0) rotate(0); }
    100% { transform: translateY(-5px) rotate(2deg); }
  }
  
  @keyframes pulse-vitaris {
    0% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.05); filter: brightness(1.2); }
    100% { transform: scale(1); filter: brightness(1); }
  }
  
  @keyframes glow-sanxxui {
    0% { filter: brightness(1) saturate(1); }
    100% { filter: brightness(1.2) saturate(1.1); }
  }
  
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes shimmer-virtuo {
    0% { filter: brightness(1) contrast(1); }
    50% { filter: brightness(1.3) contrast(1.1); }
    100% { filter: brightness(1) contrast(1); }
  }
  
  @keyframes blink-nectiv {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes morph-memetic {
    0% { transform: scale(1) rotate(0); }
    33% { transform: scale(1.03) rotate(1deg); }
    66% { transform: scale(0.98) rotate(-1deg); }
    100% { transform: scale(1) rotate(0); }
  }
  
  @keyframes glitch-optix {
    0%, 100% { transform: translate(0) scale(1); }
    20% { transform: translate(-1px, 1px) scale(1.01); }
    40% { transform: translate(1px, -1px) scale(0.99); }
    60% { transform: translate(-1px, -1px) scale(1.01); }
    80% { transform: translate(1px, 1px) scale(0.99); }
  }
  
  @keyframes float-dreamy {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-3px) scale(1.02); }
    100% { transform: translateY(0) scale(1); }
  }
  
  @keyframes radiate-radi {
    0% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 190, 95, 0.3)); }
    50% { filter: brightness(1.2) drop-shadow(0 0 10px rgba(255, 190, 95, 0.7)); }
    100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 190, 95, 0.3)); }
  }
  
  @keyframes shake-subtle {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(0.5deg); }
    75% { transform: rotate(-0.5deg); }
  }
  
  @keyframes rotate-stars {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes decay-voidrot {
    0% { opacity: 1; filter: brightness(1) contrast(1); }
    50% { opacity: 0.9; filter: brightness(0.95) contrast(1.05); }
    100% { opacity: 1; filter: brightness(1) contrast(1); }
  }
  
  @keyframes fragment-dethapart {
    0% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
    25% { clip-path: polygon(1% 0%, 100% 0%, 100% 100%, 0% 100%); }
    50% { clip-path: polygon(0% 1%, 100% 0%, 100% 100%, 0% 100%); }
    75% { clip-path: polygon(0% 0%, 100% 1%, 100% 100%, 0% 100%); }
    100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  }
  
  .card-content {
    font-family: 'Roboto', sans-serif;
  }
  
  .card-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    line-height: 1.6;
  }

  /* Astrimancy Logo Styles - New Addition */
  @keyframes pulse-logo {
    0% {
      opacity: 0.8;
      transform: scale(0.98);
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.6));
    }
    50% {
      opacity: 1;
      transform: scale(1.03);
      filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) 
             drop-shadow(0 0 5px rgba(147, 112, 219, 0.7));
    }
    100% {
      opacity: 0.8;
      transform: scale(0.98);
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.6));
    }
  }

  .astrimancy-logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    z-index: 5;
  }

  .astrimancy-logo {
    max-width: 321px;
    height: auto;
    user-select: none;
  }
`,
        }}
      />

      <div
        className="modal-overlay absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className={
          "modal-card relative z-10 max-w-2xl w-full mx-4 md:mx-auto max-h-[90vh] overflow-hidden rounded-lg " +
          (isAnimating ? "animate-pulse-once" : "")
        }
        style={{
          boxShadow:
            "0 0 40px rgba(" +
            parseInt(card.color.substr(1, 2), 16) +
            ", " +
            parseInt(card.color.substr(3, 2), 16) +
            ", " +
            parseInt(card.color.substr(5, 2), 16) +
            ", 0.4)",
        }}
      >
        <div
          className="rounded-lg"
          style={{
            backgroundColor: card.color,
            position: "relative",
            boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Card image background */}
          {cardImage ? (
            <React.Fragment>
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                  backgroundImage: "url(" + cardImage + ")",
                  zIndex: 0,
                  opacity: imageLoaded ? 0.25 : 0,
                  filter: "blur(2px)",
                  transform: "scale(1.05)",
                  transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
                }}
                aria-hidden="true"
              />
              <img
                src={cardImage}
                alt=""
                className="hidden"
                onLoad={handleImageLoad}
              />
            </React.Fragment>
          ) : (
            hasStrandImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(" + strandImages[card.strand] + ")",
                  zIndex: 0,
                  opacity: 0.15,
                  filter: "blur(2px)",
                  transform: "scale(1.05)",
                }}
                aria-hidden="true"
              />
            )
          )}

          {/* Content with improved scrolling and padding */}
          <div className="p-6 relative z-10 overflow-y-auto max-h-[80vh] card-content">
            {/* Header with strand and title */}
            <div className="flex justify-between items-start mb-5">
              <div>
                {/* Strand and number */}
                <div className="inline-block py-1.5 px-3 rounded-md bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm mb-2 text-center shadow-md">
                  <span
                    className={
                      "strand-name strand-" + getStrandClassName(card.strand)
                    }
                    style={{
                      fontSize: "1.1rem",
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {card.strand}
                  </span>{" "}
                  <span className="chord-name" style={{ opacity: 0.9 }}>
                    {formatCardNumber(card.number)}
                  </span>
                </div>
                <h2
                  id="card-modal-title"
                  className={
                    "text-2xl font-cinzel font-bold title-" +
                    getStrandClassName(card.strand)
                  }
                  style={{
                    textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {card.title}
                </h2>
              </div>
              <div className="flex">
                {/* Action buttons */}
                <button
                  className="action-btn share-button mr-3 shadow-md rounded-lg px-3 py-1.5"
                  onClick={() => onShareCard(card)}
                  title="Share this card"
                  aria-label="Share this card"
                  style={{
                    background: "rgba(59, 130, 246, 0.8)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block mr-1"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>

                {/* Favorite button */}
                <button
                  className={
                    "action-btn mr-3 rounded-full p-2 " +
                    (isFavorite
                      ? "active bg-yellow-500"
                      : "bg-gray-700 bg-opacity-50")
                  }
                  onClick={() => onToggleFavorite(card)}
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  aria-pressed={isFavorite}
                  style={{
                    boxShadow: isFavorite
                      ? "0 0 10px rgba(252, 211, 77, 0.7)"
                      : "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>

                {/* Close button */}
                <button
                  className="action-btn bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-colors"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: cardTextColor }}
                    aria-hidden="true"
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
            </div>

            {/* Tab navigation */}
            {showPPFReadings && cardReadings && (
              <div
                className="flex mb-5 border-b border-white border-opacity-20"
                role="tablist"
              >
                <button
                  className={
                    "tab-btn px-4 py-2 mr-3 rounded-t-lg " +
                    (activeTab === "details"
                      ? "active bg-purple-700 bg-opacity-50 font-bold"
                      : "opacity-80 hover:bg-purple-700 hover:bg-opacity-30")
                  }
                  onClick={() => setActiveTab("details")}
                  style={{ color: cardTextColor }}
                  role="tab"
                  aria-selected={activeTab === "details"}
                  aria-controls="panel-details"
                  id="tab-details"
                >
                  Card Details
                </button>
                <button
                  className={
                    "tab-btn px-4 py-2 rounded-t-lg " +
                    (activeTab === "readings"
                      ? "active bg-purple-700 bg-opacity-50 font-bold"
                      : "opacity-80 hover:bg-purple-700 hover:bg-opacity-30")
                  }
                  onClick={() => setActiveTab("readings")}
                  style={{ color: cardTextColor }}
                  role="tab"
                  aria-selected={activeTab === "readings"}
                  aria-controls="panel-readings"
                  id="tab-readings"
                >
                  Readings
                </button>
              </div>
            )}

            {/* Card details tab */}
            {(!showPPFReadings || !cardReadings || activeTab === "details") && (
              <div
                id="panel-details"
                role="tabpanel"
                aria-labelledby="tab-details"
                className="card-content-section"
              >
                {/* Card description */}
                <div
                  className="mb-6"
                  style={{
                    color: cardTextColor,
                    background: "rgba(0, 0, 0, 0.15)",
                    borderRadius: "0.8rem",
                    padding: "1.25rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    className="text-base card-description"
                    style={{
                      lineHeight: "1.6",
                      letterSpacing: "0.01em",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {formattedDescription}
                  </p>

                  {/* Strand info box with raw image display */}
                  {hasStrandImage && (
                    <div
                      className="flex items-center mt-5 p-3 rounded-lg"
                      style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <div className="strand-image-container w-16 h-16 flex-shrink-0">
                        <img
                          src={strandImages[card.strand]}
                          className="strand-image w-full h-full object-contain rounded-full"
                          alt={card.strand + " strand symbol"}
                          style={{
                            animation: getStrandAnimation(card.strand),
                            filter: getStrandFilter(card.strand),
                            boxShadow: "0 0 15px " + navColors.glow,
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <span
                          className={
                            "text-sm font-medium strand-" +
                            getStrandClassName(card.strand)
                          }
                          style={{
                            textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                          }}
                        >
                          {card.strand} Strand
                        </span>
                        <p
                          className="text-xs opacity-90 mt-1"
                          style={{
                            lineHeight: "1.4",
                            maxHeight: "4.2em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {strandDescriptions[card.strand]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation buttons moved inside modal, above Secondary Influence */}
                <div className="nav-buttons flex justify-between items-center mb-4">
                  <button
                    className="nav-btn px-3 py-1.5 rounded-lg flex items-center justify-center"
                    onClick={onPrevCard}
                    aria-label="Previous card"
                    style={{
                      background: `linear-gradient(135deg, ${navColors.bg}80, rgba(0, 0, 0, 0.4))`,
                      backdropFilter: "blur(2px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: `0 0 8px ${navColors.glow}`,
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    <span
                      style={{
                        textShadow: "0 0 3px rgba(0, 0, 0, 0.8)",
                        fontFamily: "'Cinzel Decorative', serif",
                      }}
                    >
                      ❮
                    </span>
                    <span className="ml-1 text-sm">Prev</span>
                  </button>

                  {/* Astrimancy Logo - Added Here */}
                  <div className="astrimancy-logo-container">
                    <img
                      src="../assets/images/astrimancy-name.svg"
                      alt="Astrimancy"
                      className="astrimancy-logo"
                      style={{
                        height: "42px",
                        filter:
                          "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))",
                        animation: "pulse-logo 3s infinite ease-in-out",
                      }}
                    />
                  </div>

                  <button
                    className="nav-btn px-3 py-1.5 rounded-lg flex items-center justify-center"
                    onClick={onNextCard}
                    aria-label="Next card"
                    style={{
                      background: `linear-gradient(135deg, ${navColors.bg}80, rgba(0, 0, 0, 0.4))`,
                      backdropFilter: "blur(2px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: `0 0 8px ${navColors.glow}`,
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    <span className="mr-1 text-sm">Next</span>
                    <span
                      style={{
                        textShadow: "0 0 3px rgba(0, 0, 0, 0.8)",
                        fontFamily: "'Cinzel Decorative', serif",
                      }}
                    >
                      ❯
                    </span>
                  </button>
                </div>
                {/* Secondary Influence Section - Moved up */}
                <div
                  className="card-content-section bg-black bg-opacity-20 rounded-lg overflow-hidden shadow-md mb-4"
                  style={{
                    borderLeft: "4px solid " + secondaryColor,
                  }}
                >
                  <h3
                    className="section-header secondary-header"
                    style={{
                      background:
                        "linear-gradient(90deg, " +
                        secondaryColor +
                        "50, transparent)",
                      color: cardTextColor,
                    }}
                  >
                    <svg
                      className="section-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Secondary Influence
                  </h3>
                  <div className="px-4 py-3" style={{ color: cardTextColor }}>
                    <p style={{ lineHeight: "1.5" }}>{formattedSecondary}</p>
                  </div>
                </div>

                {/* Tarot and Hidden Nature in two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Tarot Influence Section */}
                  <div
                    className="card-content-section bg-black bg-opacity-20 rounded-lg overflow-hidden shadow-md"
                    style={{
                      borderLeft: "4px solid " + primaryColor,
                    }}
                  >
                    <h3
                      className="section-header tarot-header"
                      style={{
                        background:
                          "linear-gradient(90deg, " +
                          primaryColor +
                          "50, transparent)",
                        color: cardTextColor,
                      }}
                    >
                      <svg
                        className="section-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Tarot Influence
                    </h3>
                    <div className="px-4 py-3" style={{ color: cardTextColor }}>
                      <p style={{ lineHeight: "1.5" }}>{formattedPrimary}</p>
                    </div>
                  </div>

                  {/* Hidden Nature Section */}
                  <div
                    className="card-content-section bg-black bg-opacity-20 rounded-lg overflow-hidden shadow-md"
                    style={{
                      borderLeft: "4px solid " + hiddenColor,
                    }}
                  >
                    <h3
                      className="section-header hidden-header"
                      style={{
                        background:
                          "linear-gradient(90deg, " +
                          hiddenColor +
                          "50, transparent)",
                        color: cardTextColor,
                      }}
                    >
                      <svg
                        className="section-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 12C21 12 16.9706 17 12 17C7.02944 17 3 12 3 12C3 12 7.02944 7 12 7C16.9706 7 21 12 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 4L20 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Hidden Nature
                    </h3>
                    <div className="px-4 py-3" style={{ color: cardTextColor }}>
                      <p style={{ lineHeight: "1.5" }}>{card.hidden}</p>
                    </div>
                  </div>
                </div>

                {/* Challenge Section with updated styling */}
                <div
                  className="card-content-section bg-black bg-opacity-20 rounded-lg overflow-hidden shadow-md"
                  style={{
                    borderLeft: "4px solid " + challengeColor,
                  }}
                >
                  <h3
                    className="section-header"
                    style={{
                      background:
                        "linear-gradient(90deg, " +
                        challengeColor +
                        "50, transparent)",
                      color: cardTextColor,
                    }}
                  >
                    <svg
                      className="section-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.2426 11.7574L11.7574 20.2426C11.3639 20.636 10.8976 20.9466 10.3862 21.1556C9.87467 21.3647 9.33007 21.4673 8.78036 21.4567C7.6798 21.4349 6.62522 21.0289 5.79454 20.3100C5.3376 19.9022 4.96648 19.4125 4.70025 18.8687C4.43401 18.3248 4.27854 17.7388 4.24431 17.1406C4.21007 16.5424 4.29777 15.9441 4.5016 15.3795C4.70543 14.8148 5.02092 14.2953 5.43137 13.8532L13.8787 5.40581C14.1926 5.09187 14.604 4.91652 15.0355 4.91652C15.4669 4.91652 15.8784 5.09187 16.1923 5.40581C16.5063 5.71975 16.6816 6.13114 16.6816 6.5626C16.6816 6.99405 16.5063 7.40544 16.1923 7.71938L7.91421 15.9975C7.75748 16.1542 7.65845 16.3593 7.65845 16.5748C7.65845 16.7902 7.75748 16.9953 7.91421 17.1521C8.07095 17.3088 8.27609 17.4078 8.49153 17.4078C8.70697 17.4078 8.91211 17.3088 9.06885 17.1521L16.1923 10.0287C16.5063 9.71475 16.9176 9.53941 17.3491 9.53941C17.7805 9.53941 18.192 9.71475 18.5059 10.0287C18.8199 10.3426 18.9952 10.754 18.9952 11.1855C18.9952 11.6169 18.8199 12.0283 18.5059 12.3422L11.14 19.7081"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        background: "linear-gradient(90deg, #FB923C, #FCD34D)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        textShadow: "none",
                        fontWeight: "bold",
                        marginRight: "0.5rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      CHALLENGE:
                    </span>
                    <span className="font-mono">{challengeTitle}</span>
                  </h3>
                  <div className="px-4 py-3" style={{ color: cardTextColor }}>
                    <p className="challenge-font" style={{ lineHeight: "1.5" }}>
                      {challengeDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PPF Readings tab */}
            {showPPFReadings && cardReadings && activeTab === "readings" && (
              <div
                id="panel-readings"
                role="tabpanel"
                aria-labelledby="tab-readings"
                className="card-content-section space-y-4"
              >
                {/* Past reading */}
                <div
                  className="bg-black bg-opacity-20 rounded-lg p-4 shadow-md transform transition hover:translate-y-[-2px]"
                  style={{
                    borderLeft: "4px solid #9F7AEA",
                  }}
                >
                  <h3
                    className="text-base font-bold mb-2 flex items-center"
                    style={{
                      color: cardTextColor,
                      background: "linear-gradient(90deg, #9F7AEA, #9F7AEA44)",
                      padding: "0.35rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Past
                  </h3>
                  <p
                    style={{
                      color: cardTextColor,
                      lineHeight: "1.6",
                      fontSize: "0.95rem",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {cardReadings.past.replace(
                      /\(Major Arcana\)/g,
                      "(M.Arcana)"
                    )}
                  </p>
                </div>

                {/* Present reading */}
                <div
                  className="bg-black bg-opacity-20 rounded-lg p-4 shadow-md transform transition hover:translate-y-[-2px]"
                  style={{
                    borderLeft: "4px solid #F59E0B",
                  }}
                >
                  <h3
                    className="text-base font-bold mb-2 flex items-center"
                    style={{
                      color: cardTextColor,
                      background: "linear-gradient(90deg, #F59E0B, #F59E0B44)",
                      padding: "0.35rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    Present
                  </h3>
                  <p
                    style={{
                      color: cardTextColor,
                      lineHeight: "1.6",
                      fontSize: "0.95rem",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {cardReadings.present.replace(
                      /\(Major Arcana\)/g,
                      "(M.Arcana)"
                    )}
                  </p>
                </div>

                {/* Future reading */}
                <div
                  className="bg-black bg-opacity-20 rounded-lg p-4 shadow-md transform transition hover:translate-y-[-2px]"
                  style={{
                    borderLeft: "4px solid #3B82F6",
                  }}
                >
                  <h3
                    className="text-base font-bold mb-2 flex items-center"
                    style={{
                      color: cardTextColor,
                      background: "linear-gradient(90deg, #3B82F6, #3B82F644)",
                      padding: "0.35rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    Future
                  </h3>
                  <p
                    style={{
                      color: cardTextColor,
                      lineHeight: "1.6",
                      fontSize: "0.95rem",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {cardReadings.future.replace(
                      /\(Major Arcana\)/g,
                      "(M.Arcana)"
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Add to comparison button */}
            <div className="flex justify-center mt-6">
              <button
                className="cosmic-btn px-5 py-2 bg-blue-600 rounded-lg text-white flex items-center shadow-md"
                onClick={() => onAddToComparison(card)}
                aria-label="Add to comparison"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Add to Comparison
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
