/**
 * Card image utilities
 */

/**
 * Get the image URL for a specific card
 * @param {Object} card - The card object
 * @returns {string|null} - The image URL or null if not found
 */
export function getCardImage(card) {
  if (!card) return null;

  // This is a simplified placeholder implementation
  // In a real app, you'd have a more sophisticated way to get images
  return `https://via.placeholder.com/350x500?text=${encodeURIComponent(
    `${card.strand}-${card.number}`
  )}`;
}

/**
 * Get Past/Present/Future interpretations for a card
 * @param {Object} card - The card object
 * @returns {Object|null} - Object containing past, present, future interpretations
 */
export function getCardPPFReadings(card) {
  if (!card) return null;

  // Simplified sample readings
  return {
    past: `In the past position, ${card.title} suggests ${card.description} This may have manifested as a formative experience that shaped your current perspective.`,
    present: `In the present position, ${card.title} indicates ${card.description} You may be experiencing this energy actively in your current circumstances.`,
    future: `In the future position, ${card.title} points to ${card.description} This suggests upcoming developments that may require your attention.`,
  };
}
