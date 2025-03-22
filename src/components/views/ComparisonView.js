/**
 * ComparisonView component for comparing multiple cards
 */
import React, { useState, useEffect, useContext, useRef } from 'react';
import CardComparison from '../../CardComparison';
import { useAppContext } from "../../state/hooks/useAppContext";

export default function ComparisonView() {
  const { state, dispatch } = useAppContext();

  const handleCardClick = (card) => {
    dispatch({ type: "SET_SELECTED_CARD", payload: card });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "ADD_TO_HISTORY", payload: card });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: card });
  };

  const removeFromComparison = (index) => {
    dispatch({ type: "REMOVE_FROM_COMPARISON", payload: index });
  };

  return (
    <CardComparison
      cards={state.views.comparisonCards}
      onRemoveCard={removeFromComparison}
      onCardClick={handleCardClick}
      showCardImages={state.ui.showCardImages}
    />
  );
}
