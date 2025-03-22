/**
 * Reducer for card-related state
 */
export default function cardReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER_STRAND":
      return { ...state, filterStrand: action.payload };

    case "SET_FILTER_NUMBERS":
      return { ...state, filterNumbers: action.payload };

    case "SET_FILTER_CHALLENGES":
      return { ...state, filterChallenges: action.payload };

    case "ADD_TO_HISTORY": {
      const cardId = `${action.payload.strand}-${action.payload.number}-${action.payload.title}`;
      const filteredHistory = state.viewHistory
        .filter(
          (card) => `${card.strand}-${card.number}-${card.title}` !== cardId
        )
        .slice(0, 19);

      const updatedHistory = [action.payload, ...filteredHistory];
      localStorage.setItem("cardHistory", JSON.stringify(updatedHistory));
      return { ...state, viewHistory: updatedHistory };
    }

    case "SET_FAVORITES":
      localStorage.setItem("favorites", JSON.stringify(action.payload));
      return { ...state, favorites: action.payload };

    case "ADD_FAVORITE": {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    }

    case "REMOVE_FAVORITE": {
      const filteredFavorites = state.favorites.filter(
        (id) => id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    }

    // Additional card-related cases

    default:
      return state;
  }
}
