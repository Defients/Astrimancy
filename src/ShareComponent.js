/**
 * ShareComponent for sharing cards via URL or social media
 */
import React, { useState, useEffect, useRef } from "react";
import { getCardImage } from "./utils/cardImageUtils";
import { getBrighterColor } from "./utils/utils";
import { strandImages } from "./data/constants";

const ShareComponent = ({ card, onClose, showCardImages = true }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [imageDataURL, setImageDataURL] = useState(null);
  const cardRef = useRef(null);

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

  // Get card image
  const cardImage = showCardImages ? getCardImage(card) : null;

  useEffect(() => {
    // Generate a shareable URL for this card
    const baseUrl = window.location.origin + window.location.pathname;
    const cardParams = `?strand=${encodeURIComponent(
      card.strand
    )}&number=${encodeURIComponent(card.number)}&title=${encodeURIComponent(
      card.title
    )}`;
    setShareUrl(baseUrl + cardParams);

    // Generate a card image for download
    setTimeout(() => {
      if (cardRef.current) {
        try {
          // For a production app, we would use html2canvas or a similar library
          // This is a placeholder that would actually be implemented with canvas drawing
          setImageDataURL("#"); // Placeholder
        } catch (error) {
          console.error("Error generating image:", error);
        }
      }
    }, 500);
  }, [card]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnSocialMedia = (platform) => {
    let shareLink = "";
    const text = `Check out this Astrimancy Card: ${
      card.strand
    } ${formatCardNumber(card.number)} - ${card.title}`;

    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(text)}`;
        break;
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(
          "Astrimancy Card Share"
        )}&body=${encodeURIComponent(text + "\n\n" + shareUrl)}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      ></div>
      <div className="relative z-10 bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Share this Card</h3>
          <button className="bg-gray-700 rounded-full p-2" onClick={onClose}>
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
        </div>

        {/* Card preview */}
        <div className="mb-6 flex justify-center">
          <div
            ref={cardRef}
            className="card-visual"
            style={{
              backgroundColor: card.color,
              width: "200px",
              height: "320px",
              position: "relative",
            }}
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
                  className="card-image-overlay"
                  style={{
                    backgroundImage: `url(${strandImages[card.strand]})`,
                    opacity: 0.3,
                  }}
                />
              )
            )}

            <div
              className="card-title-area"
              style={{ backgroundColor: getBrighterColor(card.color) }}
            >
              <div className="text-center">
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
              <h3
                className={`text-lg font-cinzel font-bold mt-1 mb-2 title-${getStrandClassName(
                  card.strand
                )}`}
              >
                {card.title}
              </h3>
              <div className="card-description text-sm opacity-90 mb-3">
                {card.description.substring(0, 100)}...
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2">Share this link to this specific card:</p>
          <div className="flex">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-grow bg-gray-700 rounded-l-lg px-4 py-2 text-sm"
            />
            <button
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg"
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => shareOnSocialMedia("twitter")}
          >
            <span>Twitter</span>
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => shareOnSocialMedia("facebook")}
          >
            <span>Facebook</span>
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => shareOnSocialMedia("email")}
          >
            <span>Email</span>
          </button>
        </div>

        {/* Download image option (would require html2canvas in production) */}
        <div className="text-center opacity-50">
          <p className="mb-2 text-sm">Card image download</p>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            disabled={!imageDataURL}
          >
            Download Card Image
          </button>
          <p className="text-xs mt-2">
            Image download not available in this demo version
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;
