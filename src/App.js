import React, { useState, useEffect, lazy, Suspense } from "react";
import { AppProvider } from "./state/context/AppProvider";
import Header from "./components/layout/Header";
import BrowseView from "./components/views/BrowseView";
import SpreadView from "./components/views/SpreadsView";
import ComparisonView from "./components/views/ComparisonView";
import FavoritesView from "./components/views/FavoritesView";
import DailyCard from "./components/common/DailyCard";
import ToastNotification from "./ToastNotification";
import CardModalController from "./components/common/CardModalController";
import PrintLayoutController from "./components/common/PrintLayoutController";
import ShareController from "./components/common/ShareController";
import LoadingScreen from "./components/common/LoadingScreen";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import ScrollToTop from "./components/common/ScrollToTop";
import StarryBackground from "./components/StarryBackground";
import MobileMenu from "./components/layout/MobileMenu";
import HistoryDrawer from "./HistoryDrawer";
import Tutorial from "./components/Tutorial";
import { useAppContext } from "./state/hooks/useAppContext";
import "./App.css";

/**
 * Main App component for Astrimancy Cards Explorer
 * Enhanced with error boundary, analytics, and performance optimizations
 */
function App() {
  // State for handling app loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [error, setError] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Feature flags for progressive enhancement
  const [features, setFeatures] = useState({
    enableAnimations: true,
    enableAdvancedFilters: true,
    enablePPFReadings: false,
  });

  // Track initial app launch
  useEffect(() => {
    // Initialize app and remove loading state after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Check if this is the first visit to show tutorial
      const hasVisitedBefore = localStorage.getItem("astrimancy_hasVisited");
      if (!hasVisitedBefore) {
        // First time visitor - show tutorial
        setTutorialStep(0);
        localStorage.setItem("astrimancy_hasVisited", "true");
      }

      // Load feature flags from localStorage if available
      try {
        const savedFeatures = localStorage.getItem("astrimancy_features");
        if (savedFeatures) {
          setFeatures(JSON.parse(savedFeatures));
        }
      } catch (err) {
        console.warn("Could not load feature settings:", err);
      }
    }, 1500);

    // Analytics tracking for app initialization
    if (window.AstrimancyApp) {
      window.AstrimancyApp.utils.storage.set(
        "app_launch_count",
        (window.AstrimancyApp.utils.storage.get("app_launch_count") || 0) + 1
      );
    }

    return () => clearTimeout(timer);
  }, []);

  // Setup error boundary
  useEffect(() => {
    // Global error handler
    const handleGlobalError = (event) => {
      console.error("Captured error:", event.error);
      setError({
        message: "An unexpected error occurred",
        details: event.error ? event.error.toString() : "Unknown error",
      });
      return false; // Let the default handler run as well
    };

    window.addEventListener("error", handleGlobalError);

    return () => {
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);

  // Handle error scenario
  if (error) {
    return (
      <div className="error-screen min-h-screen flex flex-col items-center justify-center p-4 bg-dark">
        <div className="bg-gray-800 rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-3xl font-cinzel font-bold text-red-400 mb-4">
            Cosmic Disruption
          </h1>
          <p className="mb-4">
            Something went wrong with the Astrimancy Explorer. The cards have
            scattered across the cosmos...
          </p>
          <p className="text-gray-400 mb-6">{error.message}</p>
          <button
            className="px-5 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Realign the Cosmic Forces (Reload)
          </button>
        </div>
      </div>
    );
  }

  // Show loading screen while initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppProvider>
      <AppContent
        historyOpen={historyOpen}
        setHistoryOpen={setHistoryOpen}
        features={features}
        tutorialStep={tutorialStep}
        setTutorialStep={setTutorialStep}
      />
    </AppProvider>
  );
}

/**
 * AppContent component that contains the actual application UI
 * Separating from App allows for proper hook usage with context
 */
function AppContent({
  historyOpen,
  setHistoryOpen,
  features,
  tutorialStep,
  setTutorialStep,
}) {
  const { state, dispatch } = useAppContext();
  const [showWelcomeIntro, setShowWelcomeIntro] = useState(false);

  // Handle clicking a card in history
  const handleHistoryCardClick = (card) => {
    dispatch({ type: "SET_SELECTED_CARD", payload: card });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "ADD_TO_HISTORY", payload: card });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: card });
  };

  // Toggle history drawer
  const toggleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  // Handle daily card click
  const handleDailyCardClick = (card) => {
    dispatch({ type: "SET_SELECTED_CARD", payload: card });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
    dispatch({ type: "INCREMENT_CARD_VIEW", payload: card });
  };

  // Close tutorial
  const handleCloseTutorial = () => {
    setTutorialStep(-1);
    localStorage.setItem("astrimancy_tutorial_completed", "true");
  };

  // Handle welcome intro actions
  const handleGetStarted = () => {
    setShowWelcomeIntro(false);
  };

  const handleWatchTutorial = () => {
    setShowWelcomeIntro(false);
    setTutorialStep(0);
  };

  // Listen for keyboard events for history drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "h" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
          toggleHistory();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyOpen]);

  // Track app version for updates
  useEffect(() => {
    const currentVersion = "1.0.0";
    const storedVersion = localStorage.getItem("astrimancy_version");

    if (storedVersion !== currentVersion) {
      // Version changed - could show "What's New" or update notification
      localStorage.setItem("astrimancy_version", currentVersion);
    }
  }, []);

  // Set up theme based on system preference if not already set
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      dispatch({ type: "SET_THEME", payload: prefersDark ? "dark" : "light" });
    }
  }, []);

  // Determine CSS classes based on state
  const appClasses = `app ${state.ui.theme === "light" ? "light-theme" : ""} ${
    state.ui.showCardImages ? "images-enabled" : ""
  }`;

  // Dynamic class for active content area
  const contentClasses = `container mx-auto px-4 pt-4 pb-16 ${
    state.ui.showCardImages ? "content-with-images" : ""
  }`;

  return (
    <div className={appClasses}>
      <StarryBackground />
      <Header />
      <main className={contentClasses}>
        {/* Welcome Intro for first-time visitors */}
        {showWelcomeIntro && (
          <div className="welcome-intro-container">
            <div
              onGetStarted={handleGetStarted}
              onWatchTutorial={handleWatchTutorial}
            />
          </div>
        )}

        {/* Daily Card Banner */}
        {state.cards.dailyCard && state.views.currentView === "browse" && (
          <DailyCard
            card={state.cards.dailyCard}
            onClick={handleDailyCardClick}
            showCardImages={state.ui.showCardImages}
          />
        )}

        {/* Main Content Area - View Switching */}
        {state.views.currentView === "browse" && <BrowseView />}
        {state.views.currentView === "spread" && (
          <SpreadView showPPFReadings={features.enablePPFReadings} />
        )}
        {state.views.currentView === "comparison" && <ComparisonView />}
        {state.views.currentView === "favorites" && <FavoritesView />}
      </main>

      {/* Fixed Modals and Overlays */}
      <CardModalController />
      <PrintLayoutController />
      <ShareController />
      <MobileMenu />
      <ScrollToTop />
      <KeyboardShortcuts isVisible={state.ui.showShortcuts} />

      {/* Toast Notification System */}
      <ToastNotification />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        cards={state.cards.viewHistory}
        onCardClick={handleHistoryCardClick}
        onToggle={toggleHistory}
        showCardImages={state.ui.showCardImages}
      />

      {/* Tutorial - only shown when tutorial step is 0 or greater */}
      {tutorialStep >= 0 && (
        <Tutorial
          onClose={handleCloseTutorial}
          currentStep={tutorialStep}
          setCurrentStep={setTutorialStep}
        />
      )}
    </div>
  );
}

export default App;
