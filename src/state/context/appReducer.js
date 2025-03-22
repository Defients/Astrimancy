/**
 * Reducer function for the Astrimancy Cards Explorer application
 * @param {Object} state - Current state
 * @param {Object} action - Action to perform
 * @returns {Object} - New state
 */
function appReducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      return Object.assign({}, state, { theme: action.payload });

    case "SET_SEARCH_TERM":
      return Object.assign({}, state, { searchTerm: action.payload });

    case "SET_DISPLAY_MODE":
      return Object.assign({}, state, { displayMode: action.payload });

    case "SET_FILTER_STRAND":
      return Object.assign({}, state, { filterStrand: action.payload });

    case "SET_FILTER_NUMBERS":
      return Object.assign({}, state, { filterNumbers: action.payload });

    case "SET_ADVANCED_FILTERS_OPEN":
      return Object.assign({}, state, { advancedFiltersOpen: action.payload });

    case "SET_HISTORY_OPEN":
      return Object.assign({}, state, { historyOpen: action.payload });

    case "ADD_TO_HISTORY": {
      const cardId =
        action.payload.strand +
        "-" +
        action.payload.number +
        "-" +
        action.payload.title;
      const filteredHistory = state.viewHistory
        .filter(function (card) {
          return card.strand + "-" + card.number + "-" + card.title !== cardId;
        })
        .slice(0, 19);

      const updatedHistory = [action.payload].concat(filteredHistory);
      localStorage.setItem("cardHistory", JSON.stringify(updatedHistory));
      return Object.assign({}, state, { viewHistory: updatedHistory });
    }

    case "SET_FAVORITES":
      localStorage.setItem("favorites", JSON.stringify(action.payload));
      return Object.assign({}, state, { favorites: action.payload });

    case "ADD_FAVORITE": {
      const newFavorites = state.favorites.concat([action.payload]);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return Object.assign({}, state, { favorites: newFavorites });
    }

    case "REMOVE_FAVORITE": {
      const filteredFavorites = state.favorites.filter(function (id) {
        return id !== action.payload;
      });
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      return Object.assign({}, state, { favorites: filteredFavorites });
    }

    case "SET_SPREAD_TYPE":
      return Object.assign({}, state, { currentSpread: action.payload });

    case "SET_SPREAD_CARDS":
      return Object.assign({}, state, { spreadCards: action.payload });

    case "CLEAR_SPREAD":
      return Object.assign({}, state, { spreadCards: [] });

    case "SET_COMPARISON_CARDS":
      return Object.assign({}, state, { comparisonCards: action.payload });

    case "ADD_TO_COMPARISON": {
      // Only add if not already in comparison and limit to 3 cards
      if (state.comparisonCards.length < 3) {
        const cardId =
          action.payload.strand +
          "-" +
          action.payload.number +
          "-" +
          action.payload.title;
        const isAlreadyInComparison = state.comparisonCards.some(function (
          card
        ) {
          return card.strand + "-" + card.number + "-" + card.title === cardId;
        });

        if (!isAlreadyInComparison) {
          return Object.assign({}, state, {
            comparisonCards: state.comparisonCards.concat([action.payload]),
          });
        }
      }
      return state;
    }

    case "SET_DAILY_CARD":
      localStorage.setItem(
        "dailyCard",
        JSON.stringify({
          card: action.payload,
          date: new Date().toDateString(),
        })
      );
      return Object.assign({}, state, { dailyCard: action.payload });

    case "SET_VIEW":
      return Object.assign({}, state, { currentView: action.payload });

    case "SET_FILTER_CHALLENGES":
      return Object.assign({}, state, { filterChallenges: action.payload });

    case "INCREMENT_CARD_VIEW": {
      // Track card view counts for analytics
      const viewCounts = Object.assign({}, state.cardViewCounts);
      const cardId =
        action.payload.strand +
        "-" +
        action.payload.number +
        "-" +
        action.payload.title;
      viewCounts[cardId] = (viewCounts[cardId] || 0) + 1;
      localStorage.setItem("cardViewCounts", JSON.stringify(viewCounts));
      return Object.assign({}, state, { cardViewCounts: viewCounts });
    }

    case "SET_TOAST":
      return Object.assign({}, state, { toast: action.payload });

    case "CLEAR_TOAST":
      return Object.assign({}, state, { toast: null });

    case "SHUFFLE_DECK": {
      // Create a shuffled copy of the cards for readings
      const shuffled = cardData.slice().sort(function () {
        return Math.random() - 0.5;
      });
      return Object.assign({}, state, { shuffledDeck: shuffled });
    }

    case "SET_SHOW_READING_TIPS":
      localStorage.setItem("showReadingTips", JSON.stringify(action.payload));
      return Object.assign({}, state, { showReadingTips: action.payload });

    // New cases for card images and PPF readings
    case "TOGGLE_CARD_IMAGES": {
      const newShowCardImages = !state.showCardImages;
      localStorage.setItem("showCardImages", JSON.stringify(newShowCardImages));
      return Object.assign({}, state, { showCardImages: newShowCardImages });
    }

    case "TOGGLE_PPF_READINGS": {
      const newShowPPFReadings = !state.showPPFReadings;
      localStorage.setItem(
        "showPPFReadings",
        JSON.stringify(newShowPPFReadings)
      );
      return Object.assign({}, state, { showPPFReadings: newShowPPFReadings });
    }

    default:
      return state;
  }
}
