/**
 * Custom hook for view-related functionality
 */
import { useCallback } from "react";
import { useAppContext } from "./useAppContext";
import { cardSpreadz } from "../../data/constants";

export function useViews() {
  const { state, dispatch } = useAppContext();

  // Change the current view (browse, favorites, spread, comparison)
  const setView = useCallback(
    (view) => {
      dispatch({ type: "SET_VIEW", payload: view });

      // Initialize spreads if needed
      if (view === "spread" && !state.views.currentSpread) {
        dispatch({ type: "SET_SPREAD_TYPE", payload: "threeCard" });
        dispatch({
          type: "SET_SPREAD_CARDS",
          payload: Array(cardSpreadz["threeCard"].positions.length).fill(null),
        });
      }

      // Close mobile menu when changing views
      if (state.ui.mobileMenuOpen) {
        dispatch({ type: "SET_MOBILE_MENU_OPEN", payload: false });
      }

      // Scroll to top for better UX
      window.scrollTo(0, 0);
    },
    [state.views.currentSpread, state.ui.mobileMenuOpen, dispatch]
  );

  // Set spread type
  const setSpreadType = useCallback(
    (spreadType) => {
      dispatch({ type: "SET_SPREAD_TYPE", payload: spreadType });

      // Initialize spread cards array
      if (cardSpreadz[spreadType]) {
        dispatch({
          type: "SET_SPREAD_CARDS",
          payload: Array(cardSpreadz[spreadType].positions.length).fill(null),
        });
      }
    },
    [dispatch]
  );

  // Add a card to spread at specific position
  const addCardToSpread = useCallback(
    (card, position) => {
      const newSpreadCards = [...state.views.spreadCards];
      newSpreadCards[position] = card;
      dispatch({ type: "SET_SPREAD_CARDS", payload: newSpreadCards });
    },
    [state.views.spreadCards, dispatch]
  );

  // Clear the current spread
  const clearSpread = useCallback(() => {
    dispatch({ type: "CLEAR_SPREAD" });
  }, [dispatch]);

  // Add a card to comparison
  const addToComparison = useCallback(
    (card) => {
      dispatch({ type: "ADD_TO_COMPARISON", payload: card });
    },
    [dispatch]
  );

  // Remove a card from comparison
  const removeFromComparison = useCallback(
    (index) => {
      dispatch({ type: "REMOVE_FROM_COMPARISON", payload: index });
    },
    [dispatch]
  );

  // Open print view
  const openPrintView = useCallback(
    (cards) => {
      dispatch({
        type: "SET_PRINT_VIEW",
        payload: {
          show: true,
          cards,
        },
      });
    },
    [dispatch]
  );

  // Close print view
  const closePrintView = useCallback(() => {
    dispatch({
      type: "SET_PRINT_VIEW",
      payload: {
        show: false,
        cards: [],
      },
    });
  }, [dispatch]);

  // Open share modal
  const openShareModal = useCallback(
    (card) => {
      dispatch({
        type: "SET_SHARE_MODAL",
        payload: {
          show: true,
          card,
        },
      });
    },
    [dispatch]
  );

  // Close share modal
  const closeShareModal = useCallback(() => {
    dispatch({
      type: "SET_SHARE_MODAL",
      payload: {
        show: false,
        card: null,
      },
    });
  }, [dispatch]);

  return {
    currentView: state.views.currentView,
    currentSpread: state.views.currentSpread,
    spreadCards: state.views.spreadCards,
    comparisonCards: state.views.comparisonCards,
    showPrintView: state.views.showPrintView,
    printCards: state.views.printCards,
    showShareModal: state.views.showShareModal,
    sharedCard: state.views.sharedCard,
    setView,
    setSpreadType,
    addCardToSpread,
    clearSpread,
    addToComparison,
    removeFromComparison,
    openPrintView,
    closePrintView,
    openShareModal,
    closeShareModal,
  };
}
