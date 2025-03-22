/**
 * Custom hook for UI-related functionality
 */
import { useCallback } from "react";
import { useAppContext } from "./useAppContext";

export function useUI() {
  const { state, dispatch } = useAppContext();

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = state.ui.theme === "dark" ? "light" : "dark";
    dispatch({ type: "SET_THEME", payload: newTheme });
  }, [state.ui.theme, dispatch]);

  // Toggle card images display
  const toggleCardImages = useCallback(() => {
    dispatch({ type: "TOGGLE_CARD_IMAGES" });
  }, [dispatch]);

  // Set display mode (grid or carousel)
  const setDisplayMode = useCallback(
    (mode) => {
      dispatch({ type: "SET_DISPLAY_MODE", payload: mode });
    },
    [dispatch]
  );

  // Show a toast notification
  const showToast = useCallback(
    (message, type = "info") => {
      dispatch({
        type: "SET_TOAST",
        payload: { message, type },
      });

      // Auto-clear toast after 3 seconds
      setTimeout(() => {
        dispatch({ type: "CLEAR_TOAST" });
      }, 3000);
    },
    [dispatch]
  );

  // Toggle keyboard shortcuts display
  const toggleShortcuts = useCallback(() => {
    dispatch({
      type: "SET_SHOW_SHORTCUTS",
      payload: !state.ui.showShortcuts,
    });
  }, [state.ui.showShortcuts, dispatch]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    dispatch({
      type: "SET_MOBILE_MENU_OPEN",
      payload: !state.ui.mobileMenuOpen,
    });
  }, [state.ui.mobileMenuOpen, dispatch]);

  // Show tutorial
  const showTutorial = useCallback(() => {
    dispatch({ type: "SET_SHOW_TUTORIAL", payload: true });
  }, [dispatch]);

  // Hide tutorial
  const hideTutorial = useCallback(() => {
    dispatch({ type: "SET_SHOW_TUTORIAL", payload: false });
  }, [dispatch]);

  // Toggle reading tips
  const toggleReadingTips = useCallback(() => {
    dispatch({
      type: "SET_SHOW_READING_TIPS",
      payload: !state.ui.showReadingTips,
    });
  }, [state.ui.showReadingTips, dispatch]);

  return {
    theme: state.ui.theme,
    displayMode: state.ui.displayMode,
    showCardImages: state.ui.showCardImages,
    showReadingTips: state.ui.showReadingTips,
    toast: state.ui.toast,
    showShortcuts: state.ui.showShortcuts,
    mobileMenuOpen: state.ui.mobileMenuOpen,
    isModalOpen: state.ui.isModalOpen,
    selectedCard: state.ui.selectedCard,
    toggleTheme,
    toggleCardImages,
    setDisplayMode,
    showToast,
    toggleShortcuts,
    toggleMobileMenu,
    showTutorial,
    hideTutorial,
    toggleReadingTips,
    setSelectedCard: (card) =>
      dispatch({ type: "SET_SELECTED_CARD", payload: card }),
    setModalOpen: (isOpen) =>
      dispatch({ type: "SET_MODAL_OPEN", payload: isOpen }),
  };
}
