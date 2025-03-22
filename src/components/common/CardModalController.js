/**
 * CardModalController component for managing card modal display
 */
import React from "react";
import CardModal from "../CardModal";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";
import { strandColours } from "../../data/constants";
import { getCardImage } from "../../utils/cardImageUtils";

export default function CardModalController() {
  const { state, dispatch } = useAppContext();
  const { isCardFavorite, toggleFavorite, filteredCards } = useCards();

  const closeModal = () => dispatch({ type: "SET_MODAL_OPEN", payload: false });

  const handleAddToComparison = (card) => {
    dispatch({ type: "ADD_TO_COMPARISON", payload: card });
    dispatch({
      type: "SET_TOAST",
      payload: {
        message: "Added to comparison",
        type: "info",
      },
    });
  };

  const handleShareCard = (card) => {
    dispatch({
      type: "SET_SHARE_MODAL",
      payload: {
        show: true,
        card,
      },
    });
  };

  // Navigation for modals
  const findCardIndex = (card) => {
    return filteredCards.findIndex(
      (c) =>
        c.strand === card.strand &&
        c.number === card.number &&
        c.title === card.title
    );
  };

  const navigateToNextCard = () => {
    if (!state.ui.selectedCard) return;
    const currentIndex = findCardIndex(state.ui.selectedCard);
    if (currentIndex >= 0 && currentIndex < filteredCards.length - 1) {
      const nextCard = filteredCards[currentIndex + 1];
      dispatch({ type: "SET_SELECTED_CARD", payload: nextCard });
      dispatch({ type: "ADD_TO_HISTORY", payload: nextCard });
      dispatch({ type: "INCREMENT_CARD_VIEW", payload: nextCard });
    }
  };

  const navigateToPrevCard = () => {
    if (!state.ui.selectedCard) return;
    const currentIndex = findCardIndex(state.ui.selectedCard);
    if (currentIndex > 0) {
      const prevCard = filteredCards[currentIndex - 1];
      dispatch({ type: "SET_SELECTED_CARD", payload: prevCard });
      dispatch({ type: "ADD_TO_HISTORY", payload: prevCard });
      dispatch({ type: "INCREMENT_CARD_VIEW", payload: prevCard });
    }
  };

  // Add keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!state.ui.isModalOpen || !state.ui.selectedCard) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          navigateToPrevCard();
          break;
        case "ArrowRight":
          navigateToNextCard();
          break;
        case "f":
          toggleFavorite(state.ui.selectedCard);
          break;
        case "c":
          handleAddToComparison(state.ui.selectedCard);
          break;
        case "s":
          handleShareCard(state.ui.selectedCard);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.ui.isModalOpen, state.ui.selectedCard]);

  if (!state.ui.isModalOpen || !state.ui.selectedCard) return null;

  return (
    <CardModal
      card={state.ui.selectedCard}
      onClose={closeModal}
      isOpen={state.ui.isModalOpen}
      strandColor={strandColours[state.ui.selectedCard.strand] || "#9370DB"}
      onPrevCard={navigateToPrevCard}
      onNextCard={navigateToNextCard}
      isFavorite={isCardFavorite(state.ui.selectedCard)}
      onToggleFavorite={() => toggleFavorite(state.ui.selectedCard)}
      onAddToComparison={() => handleAddToComparison(state.ui.selectedCard)}
      onShareCard={() => handleShareCard(state.ui.selectedCard)}
      showCardImages={state.ui.showCardImages}
      showPPFReadings={state.ui.showPPFReadings}
    />
  );
}
