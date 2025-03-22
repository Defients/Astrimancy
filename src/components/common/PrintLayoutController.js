/**
 * PrintLayoutController component for managing print layout display
 */
import React from "react";
import PrintLayout from "../../PrintLayout";
import { useAppContext } from "../../state/hooks/useAppContext";
import { useViews } from "../../state/hooks/useViews";

export default function PrintLayoutController() {
  const { state } = useAppContext();
  const { closePrintView } = useViews();

  if (!state.views.showPrintView) return null;

  return (
    <PrintLayout
      cards={state.views.printCards}
      onClose={closePrintView}
      showCardImages={state.ui.showCardImages}
    />
  );
}
