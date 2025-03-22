/**
 * Reducer for UI-related state
 */
export default function uiReducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      localStorage.setItem("theme", action.payload);
      return { ...state, theme: action.payload };

    case "SET_DISPLAY_MODE":
      localStorage.setItem("displayMode", action.payload);
      return { ...state, displayMode: action.payload };

    case "SET_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };

    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };

    case "TOGGLE_CARD_IMAGES": {
      const newShowCardImages = !state.showCardImages;
      localStorage.setItem("showCardImages", JSON.stringify(newShowCardImages));
      return { ...state, showCardImages: newShowCardImages };
    }

    case "SET_MOBILE_MENU_OPEN":
      return { ...state, mobileMenuOpen: action.payload };

    case "SET_SHOW_TUTORIAL":
      return { ...state, showTutorial: action.payload };

    case "SET_TOAST":
      return { ...state, toast: action.payload };

    case "CLEAR_TOAST":
      return { ...state, toast: null };

    case "SET_SHOW_SHORTCUTS":
      return { ...state, showShortcuts: action.payload };

    case "SET_SHOW_READING_TIPS":
      localStorage.setItem("showReadingTips", JSON.stringify(action.payload));
      return { ...state, showReadingTips: action.payload };

    default:
      return state;
  }
}
