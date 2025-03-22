/**
 * Comprehensive utilities for the Astrimancy Cards Explorer
 * Combines card-specific utilities and general utilities into a single file
 */

/**
 * Creates a specified number of stars for the background
 * @param {number} num - Number of stars to create
 * @returns {Array} - Array of star objects with properties
 */
export function createStars(num = 100) {
  const stars = [];
  for (let i = 0; i < num; i++) {
    const size = 0.5 + Math.random() * 2;
    stars.push({
      id: i,
      size,
      x: Math.random() * 100,
      y: Math.random() * 100,
      animationDuration: 1 + Math.random() * 5,
      animationDelay: Math.random() * 5,
    });
  }
  return stars;
}

/**
 * Get a brighter color for card headers
 * @param {string} hexColor - Hex color string
 * @returns {string} - Brightened hex color
 */
export function getBrighterColor(hexColor) {
  // Convert hex to RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Make brighter by 15%
  r = Math.min(255, Math.floor(r * 1.15));
  g = Math.min(255, Math.floor(g * 1.15));
  b = Math.min(255, Math.floor(b * 1.15));

  // Convert back to hex
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

/**
 * Calculate a contrasting text color based on background color
 * @param {string} hexColor - Hex color string
 * @returns {string} - Black or white color for contrast
 */
export function getTextColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white or black based on luminance
  return luminance > 0.6 ? "#000000" : "#FFFFFF";
}

/**
 * Convert strand to CSS class name
 * @param {string} strand - The strand name
 * @returns {string} - CSS class-friendly strand name
 */
export function getStrandClassName(strand) {
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
}

/**
 * Format card number for display
 * @param {string} number - The card number
 * @returns {string} - Formatted card number
 */
export function formatCardNumber(number) {
  if (number === "Red Joker") return "RJ";
  if (number === "Black Joker") return "BJ";
  return number;
}

/**
 * Format challenge text for display by separating title and description
 * @param {string} challenge - Raw challenge text
 * @returns {object} - Object with title and description
 */
export function parseChallenge(challenge) {
  const parts = challenge.split(": ");
  return {
    title: parts[0],
    description: parts[1] || "",
  };
}

/**
 * Format card field to replace "(Major Arcana)" with "(M.Arcana)"
 * @param {string} text - Original text
 * @returns {string} - Formatted text
 */
export function formatMajorArcana(text) {
  return text ? text.replace(/\(Major Arcana\)/g, "(M.Arcana)") : text;
}

/**
 * Get a random card from a set of cards
 * @param {Array} cards - Array of card objects
 * @returns {Object} - Random card object
 */
export function getRandomCard(cards) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

/**
 * Get the image URL for a specific card
 * @param {Object} card - The card object
 * @param {Object} imageTable - Table of images for all strands
 * @returns {string|null} - The image URL or null if not found
 */
export function getCardImage(card, imageTable) {
  if (!card) return null;

  // If imageTable is provided, use it
  if (imageTable) {
    // Find the strand in the imageTable
    const strandEntry = imageTable.find(
      (entry) => entry.strand === card.strand
    );
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

  // Simplified placeholder implementation if no imageTable provided
  return `https://via.placeholder.com/350x500?text=${encodeURIComponent(
    `${card.strand}-${card.number}`
  )}`;
}

/**
 * Get Past/Present/Future interpretations for a card
 * @param {Object} card - The card object
 * @param {Object} cardPPF - PPF readings data
 * @returns {Object|null} - Object containing past, present, future interpretations
 */
export function getCardPPFReadings(card, cardPPF) {
  if (!card) return null;

  // If cardPPF data is provided, use it
  if (cardPPF) {
    // Find the strand in the cardPPF
    const strandReadings = cardPPF.find(
      (entry) => entry.strand === card.strand
    );
    if (!strandReadings) return null;

    // Map the card number to the corresponding reading
    const cardReading = strandReadings.meanings.find(
      (meaning) =>
        meaning.rank.toLowerCase() === card.number.toLowerCase() ||
        (meaning.rank === "Joker" && card.number === "Joker")
    );

    return cardReading || null;
  }

  // Simplified placeholder implementation if no cardPPF data provided
  return {
    past: `In the past position, ${card.title} suggests ${card.description} This may have manifested as a formative experience that shaped your current perspective.`,
    present: `In the present position, ${card.title} indicates ${card.description} You may be experiencing this energy actively in your current circumstances.`,
    future: `In the future position, ${card.title} points to ${card.description} This suggests upcoming developments that may require your attention.`,
  };
}

/**
 * Utility to safely parse and stringify JSON with error handling
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 * @param {boolean} isLocalStorage - Whether to use localStorage or sessionStorage
 * @returns {boolean} - Success status
 */
export function safeStorage(key, value, isLocalStorage = true) {
  const storage = isLocalStorage ? localStorage : sessionStorage;

  // Store value
  try {
    if (value === undefined) {
      // Get value
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else if (value === null) {
      // Remove value
      storage.removeItem(key);
      return true;
    } else {
      // Set value
      storage.setItem(key, JSON.stringify(value));
      return true;
    }
  } catch (error) {
    console.error("Storage operation failed:", error);
    return false;
  }
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Deep clone an object to avoid reference issues
 * @param {any} obj - Object to clone
 * @returns {any} - Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Export as default object for backwards compatibility
export default {
  createStars,
  getBrighterColor,
  getTextColor,
  getStrandClassName,
  formatCardNumber,
  parseChallenge,
  formatMajorArcana,
  getRandomCard,
  getCardImage,
  getCardPPFReadings,
  safeStorage,
  debounce,
  deepClone,
};
