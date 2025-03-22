/**
 * Card image utilities for the Astrimancy Cards Explorer
 */

/**
 * Get the image URL for a specific card
 * @param {Object} card - The card object
 * @returns {string|null} - The image URL or null if not found
 */
function getCardImage(card) {
  if (!card) return null;

  // Find the strand in the imageTable
  const strandEntry = imageTable.find((entry) => entry.strand === card.strand);
  if (!strandEntry) return null;

  // Map card numbers to indices
  const numberMap = {
    Ace: 0,
    ace: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    Ten: 9,
    ten: 9,
    "n∂va": 10,
    nova: 10,
    "p⟔ism": 11,
    prism: 11,
    eꜾlipse: 12,
    eClipse: 12,
    "Black Joker": 13,
    "Red Joker": 14,
    Joker: 0, // For the standalone Jokers, we'll use the first image
  };

  // Get the index based on the card number
  let index = numberMap[card.number];

  // For Jokers (no strand), use a different approach
  if (card.strand === "none") {
    // Determine which Joker it is based on the title
    if (card.title === "The Tryxster") index = 0;
    else if (card.title === "The DefIent") index = 1;
    else if (card.title === "The Paradox Glitch") index = 2;
    else index = 0; // Default to first image
  }

  // If we couldn't map the number or the index is out of bounds, return null
  if (index === undefined || index >= strandEntry.images.length) {
    return null;
  }

  return strandEntry.images[index];
}

/**
 * Get Past/Present/Future interpretations for a card
 * @param {Object} card - The card object
 * @returns {Object|null} - Object containing past, present, future interpretations
 */
function getCardPPFReadings(card) {
  if (!card) return null;

  // Find the strand in the cardPPF
  const strandReadings = cardPPF.find((entry) => entry.strand === card.strand);
  if (!strandReadings) return null;

  // Map the card number to the corresponding reading
  const cardReading = strandReadings.meanings.find(
    (meaning) =>
      meaning.rank.toLowerCase() === card.number.toLowerCase() ||
      (meaning.rank === "Joker" && card.number === "Joker")
  );

  return cardReading || null;
}
