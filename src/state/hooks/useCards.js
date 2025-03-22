/**
 * Custom hook for card-related functionality
 */
import { useCallback, useMemo } from "react";
import { useAppContext } from "./useAppContext";
import { cardData } from "../../data/cardData2"; // Updated import path

export function useCards() {
  const { state, dispatch } = useAppContext();

  // Filtered cards logic
  const filteredCards = useMemo(() => {
    // Default to empty array if state is undefined
    if (!state) return [];

    // Default to empty string if searchTerm is undefined
    const searchTerm = state.cards?.searchTerm || "";

    // Default to empty arrays if filterNumbers or filterChallenges are undefined
    const filterNumbers = state.cards?.filterNumbers || [];
    const filterChallenges = state.cards?.filterChallenges || [];

    // Filter logic moved from App.js
    const matchesSearch = (card, searchTerm) => {
      const s = searchTerm.toLowerCase();
      return (
        card.title.toLowerCase().includes(s) ||
        card.description.toLowerCase().includes(s) ||
        card.strand.toLowerCase().includes(s) ||
        card.number.toLowerCase().includes(s) ||
        card.challenge.toLowerCase().includes(s)
      );
    };

    return cardData.filter((card) => {
      const passSearch = !searchTerm || matchesSearch(card, searchTerm);
      const passStrand =
        !state.cards?.filterStrand ||
        state.cards.filterStrand === "all" ||
        card.strand === state.cards.filterStrand;
      const passNumbers =
        filterNumbers.length === 0 || filterNumbers.includes(card.number);
      const passChallenges =
        filterChallenges.length === 0 ||
        filterChallenges.some((ch) =>
          card.challenge.toLowerCase().startsWith(ch.toLowerCase())
        );
      return passSearch && passStrand && passNumbers && passChallenges;
    });
  }, [
    state?.cards?.searchTerm,
    state?.cards?.filterStrand,
    state?.cards?.filterNumbers,
    state?.cards?.filterChallenges,
  ]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    if (!state) return false;

    return (
      state.cards?.filterStrand !== "all" ||
      (state.cards?.filterNumbers?.length || 0) > 0 ||
      (state.cards?.filterChallenges?.length || 0) > 0 ||
      (state.cards?.searchTerm?.length || 0) > 0
    );
  }, [
    state?.cards?.filterStrand,
    state?.cards?.filterNumbers,
    state?.cards?.filterChallenges,
    state?.cards?.searchTerm,
  ]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    if (!dispatch) return;

    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    dispatch({ type: "SET_FILTER_STRAND", payload: "all" });
    dispatch({ type: "SET_FILTER_NUMBERS", payload: [] });
    dispatch({ type: "SET_FILTER_CHALLENGES", payload: [] });
    // Show toast notification
    dispatch({
      type: "SET_TOAST",
      payload: { message: "All filters cleared", type: "info" },
    });
  }, [dispatch]);

  // Get a random card
  const getRandomCard = useCallback(() => {
    if (!dispatch) return;

    const idx = Math.floor(Math.random() * cardData.length);
    const randomCard = cardData[idx];

    dispatch({ type: "SET_SELECTED_CARD", payload: randomCard });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "ADD_TO_HISTORY", payload: randomCard });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: randomCard });
  }, [dispatch]);

  // Check if a card is in favorites
  const isCardFavorite = useCallback(
    (card) => {
      if (!state || !state.cards?.favorites) return false;

      return state.cards.favorites.includes(
        `${card.strand}-${card.number}-${card.title}`
      );
    },
    [state?.cards?.favorites]
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (card) => {
      if (!dispatch) return;

      const cardId = `${card.strand}-${card.number}-${card.title}`;
      if (isCardFavorite(card)) {
        dispatch({ type: "REMOVE_FAVORITE", payload: cardId });
        dispatch({
          type: "SET_TOAST",
          payload: { message: "Removed from favorites", type: "info" },
        });
      } else {
        dispatch({ type: "ADD_FAVORITE", payload: cardId });
        dispatch({
          type: "SET_TOAST",
          payload: { message: "Added to favorites", type: "info" },
        });
      }
    },
    [dispatch, isCardFavorite]
  );

  return {
    filteredCards,
    hasActiveFilters,
    clearAllFilters,
    getRandomCard,
    isCardFavorite,
    toggleFavorite,
  };
}
