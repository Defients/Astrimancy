/**
 * ShareController component for managing sharing functionality
 */
import React from "react";
import ShareComponent from "../../ShareComponent";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useViews } from "../../state/hooks/useViews";

export default function ShareController() {
  const { state } = useAppContext();
  const { closeShareModal } = useViews();

  if (!state.views.showShareModal || !state.views.sharedCard) return null;

  return (
    <ShareComponent
      card={state.views.sharedCard}
      onClose={closeShareModal}
      showCardImages={state.ui.showCardImages}
    />
  );
}
