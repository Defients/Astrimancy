/**
 * Utilities for local storage operations
 */
import { cardData } from "../data/cardData2";

// Load initial state from localStorage or set defaults
export function loadInitialState() {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedHistory = JSON.parse(localStorage.getItem("cardHistory")) || [];
    const savedViewCounts =
      JSON.parse(localStorage.getItem("cardViewCounts")) || {};
    const showReadingTips =
      JSON.parse(localStorage.getItem("showReadingTips")) !== false; // default true
    const showCardImages =
      JSON.parse(localStorage.getItem("showCardImages")) !== false; // default true
    const savedDailyCard =
      JSON.parse(localStorage.getItem("dailyCard")) || null;

    let dailyCard = null;
    if (savedDailyCard && savedDailyCard.date === new Date().toDateString()) {
      // If a saved daily card is from today, use it
      dailyCard = savedDailyCard.card;
    } else {
      // Otherwise generate a new daily card
      const randomIndex = Math.floor(Math.random() * cardData.length);
      dailyCard = cardData[randomIndex];
      localStorage.setItem(
        "dailyCard",
        JSON.stringify({
          card: dailyCard,
          date: new Date().toDateString(),
        })
      );
    }

    // Combine into single state object for reducer
    return {
      // UI State
      ui: {
        theme: localStorage.getItem("theme") || "dark",
        displayMode: localStorage.getItem("displayMode") || "grid",
        showCardImages,
        showReadingTips,
        isModalOpen: false,
        selectedCard: null,
        toast: null,
        showShortcuts: false,
        mobileMenuOpen: false,
        showTutorial: false,
        showPPFReadings:
          JSON.parse(localStorage.getItem("showPPFReadings")) || false,
      },

      // Card State
      cards: {
        searchTerm: "",
        filterStrand: "all",
        filterNumbers: [],
        filterChallenges: [],
        viewHistory: savedHistory,
        favorites: savedFavorites,
        dailyCard,
        cardViewCounts: savedViewCounts,
        dailyCardViewedToday:
          localStorage.getItem("dailyCardViewedToday") ===
          new Date().toDateString(),
      },

      // View State
      views: {
        currentView: "browse", // 'browse', 'spread', 'comparison', 'favorites'
        currentSpread: "threeCard", // Default to three card spread
        spreadCards: [],
        comparisonCards: [],
        showPrintView: false,
        printCards: [],
        showShareModal: false,
        sharedCard: null,
      },

      // Adding cardSpreads reference
      cardSpreads: {
        threeCard: {
          name: "Three Card Spread",
          positions: [
            { name: "Past", description: "Influences from your past" },
            { name: "Present", description: "Current situation" },
            { name: "Future", description: "Potential outcomes" },
          ],
        },
        crossSpread: {
          name: "Cross Spread",
          positions: [
            { name: "Self", description: "Your current state of mind" },
            { name: "Challenge", description: "Obstacle you're facing" },
            { name: "Advice", description: "Guidance to overcome challenges" },
            {
              name: "Outcome",
              description: "Possible result if advice is followed",
            },
            { name: "Hidden Influence", description: "Unseen forces at work" },
          ],
        },
        decisionSpread: {
          name: "Decision Spread",
          positions: [
            { name: "You", description: "Your current position" },
            { name: "Path A", description: "First option" },
            { name: "Path B", description: "Second option" },
            {
              name: "External Influence",
              description: "Outside factors affecting decision",
            },
          ],
        },
        challengesSpread: {
          name: "Challenges & Growth Spread",
          positions: [
            {
              name: "Current Challenge",
              description: "The main obstacle you face",
            },
            {
              name: "Root Cause",
              description: "What underlies this challenge",
            },
            {
              name: "Hidden Strength",
              description: "Resources you may not be aware of",
            },
            {
              name: "Growth Opportunity",
              description: "How this challenge can transform you",
            },
            {
              name: "Next Steps",
              description: "Practical action to move forward",
            },
          ],
        },
        selfDiscoverySpread: {
          name: "Self-Discovery Spread",
          positions: [
            { name: "Outer Self", description: "How you present to the world" },
            {
              name: "Inner Self",
              description: "Your private thoughts and feelings",
            },
            {
              name: "Blind Spot",
              description: "What you may not see about yourself",
            },
            { name: "Potential", description: "What you could become" },
          ],
        },
      },
    };
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    // Return minimal default state if localStorage fails
    return getDefaultState();
  }
}

// Default state for fallback
function getDefaultState() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  const defaultDailyCard = cardData[randomIndex];

  return {
    ui: {
      theme: "dark",
      displayMode: "grid",
      showCardImages: true,
      showReadingTips: true,
      isModalOpen: false,
      selectedCard: null,
      toast: null,
      showShortcuts: false,
      mobileMenuOpen: false,
      showTutorial: false,
      showPPFReadings: false,
    },
    cards: {
      searchTerm: "",
      filterStrand: "all",
      filterNumbers: [],
      filterChallenges: [],
      viewHistory: [],
      favorites: [],
      dailyCard: defaultDailyCard,
      cardViewCounts: {},
      dailyCardViewedToday: false,
    },
    views: {
      currentView: "browse",
      currentSpread: "threeCard",
      spreadCards: [],
      comparisonCards: [],
      showPrintView: false,
      printCards: [],
      showShareModal: false,
      sharedCard: null,
    },
    cardSpreads: {
      threeCard: {
        name: "Three Card Spread",
        positions: [
          { name: "Past", description: "Influences from your past" },
          { name: "Present", description: "Current situation" },
          { name: "Future", description: "Potential outcomes" },
        ],
      },
      crossSpread: {
        name: "Cross Spread",
        positions: [
          { name: "Self", description: "Your current state of mind" },
          { name: "Challenge", description: "Obstacle you're facing" },
          { name: "Advice", description: "Guidance to overcome challenges" },
          {
            name: "Outcome",
            description: "Possible result if advice is followed",
          },
          { name: "Hidden Influence", description: "Unseen forces at work" },
        ],
      },
      decisionSpread: {
        name: "Decision Spread",
        positions: [
          { name: "You", description: "Your current position" },
          { name: "Path A", description: "First option" },
          { name: "Path B", description: "Second option" },
          {
            name: "External Influence",
            description: "Outside factors affecting decision",
          },
        ],
      },
    },
  };
}
