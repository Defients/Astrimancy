/**
 * WelcomeIntro component shown to first-time visitors
 */
const WelcomeIntro = ({ onGetStarted, onWatchTutorial }) => {
  return (
    <div className="fixed inset-0 z-100 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full mx-4 relative overflow-hidden">
        {/* Background stars effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(50)].map((_, i) => {
            const size = 1 + Math.random() * 3;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const animationDuration = 2 + Math.random() * 3;

            return (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animation: `twinkle ${animationDuration}s infinite alternate`,
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-cinzel font-bold text-center mb-6 text-purple-300">
            Welcome to Astrimancy
          </h2>

          <p className="text-lg mb-6 text-center">
            Explore the cosmic deck of Astrimancy Cards and discover insights
            into your journey.
          </p>

          <div className="flex flex-col items-center mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {["lotŭr", "Virtuō", "Cozmik"].map((strand) => (
                <div
                  key={strand}
                  className="card-visual"
                  style={{
                    backgroundColor:
                      strand === "lotŭr"
                        ? "#B2D4F1"
                        : strand === "Virtuō"
                        ? "#BDB7E0"
                        : "#7BA6F3",
                    height: "180px",
                    width: "112px",
                  }}
                >
                  {strandImages[strand] && (
                    <div
                      className="card-image-overlay"
                      style={{
                        backgroundImage: `url(${strandImages[strand]})`,
                        opacity: 0.3,
                      }}
                    />
                  )}
                  <div
                    className="card-title-area"
                    style={{
                      backgroundColor:
                        strand === "lotŭr"
                          ? "#C4DDEE"
                          : strand === "Virtuō"
                          ? "#C9C3E3"
                          : "#8DB5F5",
                    }}
                  >
                    <span className="text-xs font-medium opacity-80">
                      {strand}
                    </span>
                    <h3 className="text-sm font-cinzel font-bold mt-1 mb-1">
                      {strand === "lotŭr"
                        ? "Awareness"
                        : strand === "Virtuō"
                        ? "Ethics"
                        : "Cosmos"}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={onGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-500 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Begin Exploring
            </button>

            <button
              onClick={onWatchTutorial}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Watch Tutorial
            </button>
          </div>

          <p className="text-xs text-center mt-8 opacity-70">
            Explore the cosmic web of meanings. Draw cards, create spreads, and
            find hidden wisdom.
          </p>
        </div>
      </div>
    </div>
  );
};
