/**
 * KeyboardShortcuts component that displays available keyboard shortcuts
 */
import React from "react";

const KeyboardShortcuts = ({ isVisible }) => {
  return (
    <div className={`keyboard-shortcuts ${isVisible ? "visible" : ""}`}>
      <h4 className="font-bold mb-2">Keyboard Shortcuts</h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <div className="keyboard-group">
          <h5 className="text-purple-300 text-xs uppercase font-bold mt-2 mb-1">
            Navigation
          </h5>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">←/→</kbd>
            <span>Navigate cards</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">Esc</kbd>
            <span>Close dialog</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">/</kbd>
            <span>Focus search</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">?</kbd>
            <span>Toggle help</span>
          </div>
        </div>
        <div className="keyboard-group">
          <h5 className="text-purple-300 text-xs uppercase font-bold mt-2 mb-1">
            Card Actions
          </h5>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">F</kbd>
            <span>Toggle favorite</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">C</kbd>
            <span>Add to comparison</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">S</kbd>
            <span>Share card</span>
          </div>
        </div>
        <div className="keyboard-group">
          <h5 className="text-purple-300 text-xs uppercase font-bold mt-2 mb-1">
            View Options
          </h5>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">G</kbd>
            <span>Grid view</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">V</kbd>
            <span>Carousel view</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">I</kbd>
            <span>Toggle card images</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">P</kbd>
            <span>Toggle PPF readings</span>
          </div>
        </div>
        <div className="keyboard-group">
          <h5 className="text-purple-300 text-xs uppercase font-bold mt-2 mb-1">
            Application
          </h5>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">T</kbd>
            <span>Toggle theme</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">R</kbd>
            <span>Random card</span>
          </div>
          <div className="flex justify-between">
            <kbd className="bg-gray-700 px-2 py-0.5 rounded">H</kbd>
            <span>Toggle history</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Press <kbd className="bg-gray-700 px-1 rounded">?</kbd> again to hide
        this panel
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
