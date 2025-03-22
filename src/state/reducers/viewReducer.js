/**
 * Reducer for view-related state
 */
export default function viewReducer(state, action) {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, currentView: action.payload };

    case "SET_SPREAD_TYPE":
      return { ...state, currentSpread: action.payload };

    case "SET_SPREAD_CARDS":
      return { ...state, spreadCards: action.payload };

    case "CLEAR_SPREAD":
      return { ...state, spreadCards: [] };

    case "SET_COMPARISON_CARDS":
      return { ...state, comparisonCards: action.payload };

    case "ADD_TO_COMPARISON": {
      // Only add if not already in comparison and limit to 3 cards
      if (state.comparisonCards.length < 3) {
        const cardId = `${action.payload.strand}-${action.payload.number}-${action.payload.title}`;
        const isAlreadyInComparison = state.comparisonCards.some(
          (card) => `${card.strand}-${card.number}-${card.title}` === cardId
        );

        if (!isAlreadyInComparison) {
          return {
            ...state,
            comparisonCards: [...state.comparisonCards, action.payload],
          };
        }
      }
      return state;
    }

    case "REMOVE_FROM_COMPARISON": {
      const updatedCards = [...state.comparisonCards];
      updatedCards.splice(action.payload, 1);
      return { ...state, comparisonCards: updatedCards };
    }

    case "SET_PRINT_VIEW":
      return {
        ...state,
        showPrintView: action.payload.show,
        printCards: action.payload.cards || [],
      };

    case "SET_SHARE_MODAL":
      return {
        ...state,
        showShareModal: action.payload.show,
        sharedCard: action.payload.card,
      };

    default:
      return state;
  }
}
