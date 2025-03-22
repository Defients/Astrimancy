/**
 * FavoritesView component for displaying and managing favorite cards
 */
import React from "react";
import Card from "../../Card";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useCards } from "../../state/hooks/useCards";
// We assume strandColors and cardData are already available in global scope

export default function FavoritesView() {
  const { state, dispatch } = useAppContext();
  const { toggleFavorite } = useCards();

  // Get favorite cards
  const getFavoriteCards = () => {
    return state.cards.favorites
      .map((favoriteId) => {
        const [strand, number, ...titleParts] = favoriteId.split("-");
        const title = titleParts.join("-");
        return cardData.find(
          (c) => c.strand === strand && c.number === number && c.title === title
        );
      })
      .filter(Boolean);
  };

  const favoriteCards = getFavoriteCards();

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

  const openPrintView = (cards) => {
    dispatch({
      type: "SET_PRINT_VIEW",
      payload: {
        show: true,
        cards,
      },
    });
  };

  return (
    <div className="favorites-container">
      <h2 className="text-2xl font-cinzel font-bold mb-6 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 mr-2 text-yellow-400"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
        Your Favorite Cards
      </h2>
      {favoriteCards.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-lg">
          <p className="mb-4">You haven't saved any favorites yet</p>
          <p className="opacity-70">
            Click the star icon on any card to add it to your favorites
          </p>
        </div>
      ) : (
        <React.Fragment>
          <div className="card-grid">
            {favoriteCards.map((card, i) => (
              <div
                key={`fav-${i}`}
                className="card-container"
                style={{
                  animation: `fadeIn 0.5s ease backwards ${(i % 10) * 0.05}s`,
                }}
              >
                <Card
                  card={card}
                  onClick={() => handleCardClick(card)}
                  strandColor={strandColors[card.strand] || "#9370DB"}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(card)}
                  onAddToComparison={() => handleAddToComparison(card)}
                  isInComparison={isCardInComparison(card)}
                  showCardImages={state.ui.showCardImages}
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors shadow-md"
              onClick={() => openPrintView(favoriteCards)}
            >
              Print Favorites
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
