/**
 * GridView component for displaying cards in a grid layout
 */
import React, { useState, useEffect } from "react";
import Card from "../../Card";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";
import { strandColours } from "../../data/constants";

export default function GridView({ cards }) {
  const { state, dispatch } = useAppContext();
  const { isCardFavorite, toggleFavorite } = useCards();

  const handleCardClick = (card) => {
    dispatch({ type: "SET_SELECTED_CARD", payload: card });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "ADD_TO_HISTORY", payload: card });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: card });
  };

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

  const isCardInComparison = (card) => {
    return state.views.comparisonCards.some(
      (c) =>
        c.strand === card.strand &&
        c.number === card.number &&
        c.title === card.title
    );
  };

  return (
    <div className="card-grid">
      {cards.map((card, i) => (
        <div
          key={`${card.strand}-${card.number}-${i}`}
          className="card-container"
          style={{
            animation: `fadeIn 0.5s ease backwards ${(i % 10) * 0.05}s`,
          }}
        >
          <Card
            card={card}
            onClick={() => handleCardClick(card)}
            strandColor={strandColours[card.strand] || "#9370DB"}
            isFavorite={isCardFavorite(card)}
            onToggleFavorite={() => toggleFavorite(card)}
            onAddToComparison={() => handleAddToComparison(card)}
            isInComparison={isCardInComparison(card)}
            showCardImages={state.ui.showCardImages}
          />
        </div>
      ))}
    </div>
  );
}
