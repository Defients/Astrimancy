/**
 * SpreadReadingGenerator - Generates readings for card spreads
 */
import React, { useState, useEffect } from "react";
import { useAppContext } from "../state/hooks/useAppContext";
import { getCardPPFReadings } from "../utils/cardImageUtils";

const SpreadReadingGenerator = ({
  spreadCards,
  currentSpread,
  showPPFReadings,
}) => {
  // State management
  const [isGenerating, setIsGenerating] = useState(false);
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(null);
  const [readingType, setReadingType] = useState("standard");
  const [readingCopied, setReadingCopied] = useState(false);

  // Get context values
  const { state, dispatch } = useAppContext();

  // Format text helper
  const formatMajorArcana = (text) => {
    return text ? text.replace(/\(Major Arcana\)/g, "(M.Arcana)") : text;
  };

  // Generate standard reading
  const generateReading = () => {
    if (
      !currentSpread ||
      !spreadCards ||
      spreadCards.filter(Boolean).length === 0
    ) {
      setError(
        "Please select a spread and place cards before generating a reading"
      );
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Prepare cards data
    const cardsData = [];
    for (let i = 0; i < spreadCards.length; i++) {
      const card = spreadCards[i];
      if (card) {
        const position = state.cardSpreads[currentSpread].positions[i];
        cardsData.push({
          position: position.name,
          meaning: position.description,
          card: {
            strand: card.strand,
            number: card.number,
            title: card.title,
            description: formatMajorArcana(card.description),
            primary: formatMajorArcana(card.primary),
            hidden: card.hidden,
            secondary: formatMajorArcana(card.secondary),
            challenge: card.challenge,
          },
        });
      }
    }

    // Use setTimeout to simulate API call
    setTimeout(() => {
      const simulatedResponse = {
        reading: formatMajorArcana(
          generateSimulatedReading(cardsData, currentSpread, state.cardSpreads)
        ),
      };

      setReading(simulatedResponse.reading);
      setIsGenerating(false);
      setReadingType("standard");
    }, 2000);
  };

  // Generate temporal reading
  const generatePPFReading = () => {
    if (
      !showPPFReadings ||
      !currentSpread ||
      !spreadCards ||
      spreadCards.filter(Boolean).length === 0
    ) {
      setError(
        "Please select a spread and place cards before generating a reading"
      );
      return;
    }

    setIsGenerating(true);
    setError(null);

    setTimeout(() => {
      const cards = [];
      const positions = [];

      // Collect cards and positions
      for (let i = 0; i < spreadCards.length; i++) {
        if (spreadCards[i]) {
          cards.push(spreadCards[i]);
          positions.push(state.cardSpreads[currentSpread].positions[i].name);
        }
      }

      let readingContent = [
        "# " +
          state.cardSpreads[currentSpread].name +
          " Past/Present/Future Reading",
        "",
        "## Temporal Analysis",
        "",
        "In this reading, we examine how the energies of these cards influence your journey through time - past experiences, present circumstances, and future possibilities.",
        "",
      ].join("\n");

      // Add sections for each card
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardReading = getCardPPFReadings(card);

        if (cardReading) {
          readingContent += [
            "### " +
              positions[i] +
              ": " +
              card.strand +
              " " +
              card.number +
              " - " +
              card.title,
            "",
            "**Past:** " + formatMajorArcana(cardReading.past),
            "",
            "**Present:** " + formatMajorArcana(cardReading.present),
            "",
            "**Future:** " + formatMajorArcana(cardReading.future),
            "",
            "This card in the " +
              positions[i] +
              " position suggests that " +
              formatMajorArcana(card.description) +
              " As you navigate this energy, consider how it has influenced your past, shaped your present, and may guide your future.",
            "",
          ].join("\n");
        }
      }

      // Add integration section
      readingContent += [
        "## Temporal Integration",
        "",
        "When we view these cards as a unified tapestry of time, a coherent narrative emerges:",
        "",
        "Your past experiences with " +
          (cards.length > 0 ? cards[0].title : "these energies") +
          " have laid the foundation for your current situation. In the present, you are navigating the energies of " +
          (cards.length > 1 ? cards[1].title : "your circumstances") +
          ", which are directly influenced by these past experiences. The future holds the possibility of " +
          (cards.length > 2 ? cards[2].title : "transformation and growth") +
          " if you consciously work with these energies.",
        "",
        "Remember that the future is not fixed but shaped by how you choose to respond to the present moment, informed by wisdom gained from the past.",
      ].join("\n");

      setReading(readingContent);
      setIsGenerating(false);
      setReadingType("ppf");
    }, 2000);
  };

  // Toggle reading tips
  const toggleReadingTips = () => {
    dispatch({
      type: "SET_SHOW_READING_TIPS",
      payload: !state.ui.showReadingTips,
    });
  };

  // Copy reading to clipboard
  const copyReadingToClipboard = () => {
    if (!reading) return;

    const plainTextReading = reading
      .replace(/# (.*)/g, "$1\n")
      .replace(/## (.*)/g, "\n$1\n")
      .replace(/### (.*)/g, "\n$1\n")
      .replace(/\*\*(.*)\*\*/g, "$1");

    navigator.clipboard.writeText(plainTextReading).then(() => {
      setReadingCopied(true);
      setTimeout(() => setReadingCopied(false), 2000);
    });
  };

  // Reset reading
  const resetReading = () => {
    setReading(null);
  };

  // Generate a simulated reading
  const generateSimulatedReading = (cardsData, spreadType, cardSpreads) => {
    // Extract challenge themes for each card
    const challenges = cardsData.map(function (data) {
      return data.card.challenge.split(":")[0];
    });

    let readingText = [
      "# " + cardSpreads[spreadType].name + " Reading",
      "",
      "## The Cosmic Alignment",
      "",
      "The cards have revealed a powerful narrative through this " +
        cardSpreads[spreadType].name +
        ". The energies are aligned in a way that suggests a period of significant transformation in your journey.",
      "",
    ].join("\n");

    // Add section for each card
    cardsData.forEach(function (data) {
      readingText += [
        "### " +
          data.position +
          ": " +
          data.card.strand +
          " " +
          data.card.number +
          " - " +
          data.card.title,
        "",
        "In the position of " +
          data.position +
          ", we find the " +
          data.card.title +
          " from the " +
          data.card.strand +
          " strand. This suggests " +
          data.card.description +
          " The primary influence of " +
          data.card.primary +
          " is particularly significant here, revealing that " +
          data.card.secondary,
        "",
        "Hidden within this card is the energy of " +
          data.card.hidden +
          ", suggesting that beneath the surface, there are deeper currents at work.",
        "",
      ].join("\n");
    });

    // Add interpretation section
    readingText += [
      "## The Interconnected Energies",
      "",
      "Looking at how these cards influence each other, there's a clear progression from " +
        (cardsData.length > 0 && cardsData[0].position
          ? cardsData[0].position
          : "the beginning") +
        " to " +
        (cardsData.length > 0 && cardsData[cardsData.length - 1].position
          ? cardsData[cardsData.length - 1].position
          : "the outcome") +
        '. The challenge of "' +
        (cardsData.length > 0
          ? cardsData[0].card.challenge.split(":")[0]
          : "beginning") +
        '" flows into "' +
        (cardsData.length > 0
          ? cardsData[cardsData.length - 1].card.challenge.split(":")[0]
          : "conclusion") +
        '" creating a narrative of growth and transformation.',
      "",
      "## Guidance",
      "",
      "This spread suggests that you should embrace the energy of " +
        (cardsData.length > 0 ? cardsData[0].card.title : "the present") +
        " while being mindful of the hidden influence of " +
        (cardsData.length > 0 ? cardsData[0].card.hidden : "unseen forces") +
        ". As you navigate toward " +
        (cardsData.length > 0 && cardsData[cardsData.length - 1].position
          ? cardsData[cardsData.length - 1].position
          : "your destiny") +
        ", remember that the challenge of " +
        (cardsData.length > 0 &&
        Math.floor(cardsData.length / 2) < cardsData.length
          ? cardsData[Math.floor(cardsData.length / 2)].card.challenge.split(
              ":"
            )[0]
          : "your path") +
        " requires both awareness and action.",
      "",
      "Trust the wisdom of these cards as you move forward on your journey. The cosmos has aligned to offer you this glimpse into the patterns shaping your experience.",
    ].join("\n");

    return readingText;
  };

  // Render reading content
  const renderReadingContent = () => {
    if (!reading) return null;

    const lines = reading.split("\n");
    const elements = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith("# ")) {
        elements.push(
          <h1 key={`line-${i}`} className="text-3xl font-cinzel mt-4 mb-6">
            {line.trim().substring(2)}
          </h1>
        );
      } else if (line.trim().startsWith("## ")) {
        elements.push(
          <h2 key={`line-${i}`} className="text-2xl font-cinzel mt-6 mb-3">
            {line.trim().substring(3)}
          </h2>
        );
      } else if (line.trim().startsWith("### ")) {
        elements.push(
          <h3 key={`line-${i}`} className="text-xl font-cinzel mt-4 mb-2">
            {line.trim().substring(4)}
          </h3>
        );
      } else if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
        const parts = line.trim().split("**");
        elements.push(
          <p key={`line-${i}`} className="font-bold mb-1">
            {parts[1]}
          </p>
        );
      } else if (line.trim() === "") {
        elements.push(<br key={`line-${i}`} />);
      } else if (line.trim() !== "") {
        // Simple line rendering without complex regex replacements
        elements.push(
          <p key={`line-${i}`} className="mb-3">
            {line.trim()}
          </p>
        );
      }
    }

    return elements;
  };

  // If reading exists, show content
  if (reading) {
    return (
      <div className="bg-gray-800 bg-opacity-70 rounded-lg p-6 my-8 shadow-lg">
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <h3 className="text-2xl font-cinzel font-bold">
            Your Astrimancy Reading
          </h3>
          <div className="flex flex-wrap mt-2 sm:mt-0 gap-2">
            {showPPFReadings && (
              <>
                <button
                  className={
                    "px-3 py-1 rounded-lg " +
                    (readingType === "standard"
                      ? "bg-purple-700"
                      : "bg-gray-600")
                  }
                  onClick={generateReading}
                >
                  Standard Reading
                </button>
                <button
                  className={
                    "px-3 py-1 rounded-lg " +
                    (readingType === "ppf" ? "bg-purple-700" : "bg-gray-600")
                  }
                  onClick={generatePPFReading}
                >
                  Temporal Reading
                </button>
              </>
            )}
            <button
              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={copyReadingToClipboard}
            >
              {readingCopied ? "Copied!" : "Copy Reading"}
            </button>
            <button
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={resetReading}
            >
              Generate New Reading
            </button>
          </div>
        </div>
        <div className="prose prose-invert max-w-none reading-content">
          {renderReadingContent()}
        </div>
      </div>
    );
  }

  // If no reading, show generator controls
  return (
    <div className="flex flex-col items-center my-8">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className={
            "reading-generator-btn " +
            (isGenerating ? "opacity-75 cursor-not-allowed" : "")
          }
          onClick={generateReading}
          disabled={
            isGenerating ||
            !currentSpread ||
            spreadCards.filter(Boolean).length === 0
          }
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-3"></div>
              Generating Reading...
            </div>
          ) : (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate Standard Reading
            </div>
          )}
        </button>

        {showPPFReadings && (
          <button
            className={
              "reading-generator-btn bg-blue-700 hover:bg-blue-600 " +
              (isGenerating ? "opacity-75 cursor-not-allowed" : "")
            }
            onClick={generatePPFReading}
            disabled={
              isGenerating ||
              !currentSpread ||
              spreadCards.filter(Boolean).length === 0
            }
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-3"></div>
                Generating Reading...
              </div>
            ) : (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Generate Temporal Reading
              </div>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 text-red-500 bg-red-900 bg-opacity-30 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center bg-gray-800 bg-opacity-50 p-4 rounded-lg">
        <input
          type="checkbox"
          id="show-reading-tips"
          checked={state.ui.showReadingTips}
          onChange={toggleReadingTips}
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="show-reading-tips" className="text-sm md:text-base">
          Show interpretation tips for card positions
        </label>
      </div>

      <div className="mt-6 bg-gray-800 bg-opacity-30 p-4 rounded-lg w-full max-w-xl">
        <h4 className="text-center font-semibold mb-2">
          Current Spread Status
        </h4>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {currentSpread &&
            state.cardSpreads[currentSpread] &&
            state.cardSpreads[currentSpread].positions.map((pos, index) => {
              const hasCard = index < spreadCards.length && spreadCards[index];
              return (
                <div
                  key={`pos-${index}`}
                  className={
                    "px-3 py-1 rounded-full text-sm " +
                    (hasCard ? "bg-green-700" : "bg-gray-700")
                  }
                >
                  {pos.name} {hasCard ? "✓" : "○"}
                </div>
              );
            })}
        </div>
        <p className="text-center text-sm mt-3 opacity-70">
          {spreadCards.filter(Boolean).length} of{" "}
          {state.cardSpreads[currentSpread]
            ? state.cardSpreads[currentSpread].positions.length
            : 0}{" "}
          positions filled
        </p>
      </div>
    </div>
  );
};

export default SpreadReadingGenerator;
