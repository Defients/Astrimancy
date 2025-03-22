/**
 * AdvancedFilters component for filtering cards by number and challenge
 * Enhanced with beautiful Card Numbers filter and optimized design
 */
const AdvancedFilters = ({
  filterNumbers,
  setFilterNumbers,
  filterChallenges,
  setFilterChallenges,
  allNumbers,
  allChallenges,
}) => {
  // Define special card number groups for visual organization
  const specialNumbers = [
    "ace",
    "Ace",
    "nova",
    "n∂va",
    "prism",
    "p⟔ism",
    "eClipse",
    "eꜾlipse",
    "Black Joker",
    "Red Joker",
  ];
  const regularNumbers = allNumbers.filter(
    (num) => !specialNumbers.includes(num) && num !== "Joker"
  );

  // Define color map for different card number types
  const numberColorMap = {
    ace: "#9F7AEA", // Purple for Aces
    Ace: "#9F7AEA",
    nova: "#F6AD55", // Orange for Novas
    "n∂va": "#F6AD55",
    prism: "#4FD1C5", // Teal for Prisms
    "p⟔ism": "#4FD1C5",
    eClipse: "#667EEA", // Indigo for Eclipses
    eꜾlipse: "#667EEA",
    "Black Joker": "#FC8181", // Red for Jokers
    "Red Joker": "#FC8181",
    Joker: "#FC8181",
    // Dynamic gradient for numbered cards
    regular: (num) => {
      // Convert the number to an index (safeguard for non-numeric values)
      const numVal = parseInt(num) || 1;
      const hue = 220 + ((numVal * 15) % 180); // Create varying blue/purple hues
      return `hsl(${hue}, 70%, 60%)`;
    },
  };

  // Get appropriate color for a card number
  const getNumberColor = (number) => {
    if (numberColorMap[number]) {
      return numberColorMap[number];
    }
    return numberColorMap.regular(number);
  };

  // Handle clicking on a number filter
  const toggleNumberFilter = (number) => {
    if (filterNumbers.includes(number)) {
      setFilterNumbers(filterNumbers.filter((n) => n !== number));
    } else {
      setFilterNumbers([...filterNumbers, number]);
    }
  };

  // Handle clicking on a challenge filter
  const toggleChallengeFilter = (challenge) => {
    if (filterChallenges.includes(challenge)) {
      setFilterChallenges(filterChallenges.filter((c) => c !== challenge));
    } else {
      setFilterChallenges([...filterChallenges, challenge]);
    }
  };

  // Group challenges by first letter for organization
  const challengeGroups = {};
  allChallenges.forEach((challenge) => {
    const firstLetter = challenge.charAt(0).toUpperCase();
    if (!challengeGroups[firstLetter]) {
      challengeGroups[firstLetter] = [];
    }
    challengeGroups[firstLetter].push(challenge);
  });

  // Sort groups alphabetically
  const sortedGroupKeys = Object.keys(challengeGroups).sort();

  return (
    <div className="advanced-filters">
      <h3 className="text-xl font-cinzel font-bold mb-6">Advanced Filters</h3>

      {/* Enhanced Card Numbers Section */}
      <div className="mb-8">
        <h4 className="font-bold text-lg mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
              clipRule="evenodd"
            />
          </svg>
          Card Numbers
        </h4>

        {/* Special Cards (Ace, Nova, Prism, Eclipse, Jokers) */}
        <div className="mb-4">
          <h5 className="text-sm font-medium text-purple-300 mb-2">
            Special Cards
          </h5>
          <div className="flex flex-wrap gap-2">
            {specialNumbers.map((number) => (
              <button
                key={number}
                className={`number-filter-button relative overflow-hidden transition-all duration-300 ${
                  filterNumbers.includes(number)
                    ? "shadow-lg transform -translate-y-1"
                    : "opacity-80 hover:opacity-100"
                }`}
                style={{
                  background: filterNumbers.includes(number)
                    ? `linear-gradient(135deg, ${getNumberColor(
                        number
                      )}, rgba(0,0,0,0.4))`
                    : `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.4))`,
                  borderColor: getNumberColor(number),
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderRadius: "0.75rem",
                  padding: "0.5rem 1rem",
                  minWidth: "5rem",
                  textAlign: "center",
                }}
                onClick={() => toggleNumberFilter(number)}
              >
                {filterNumbers.includes(number) && (
                  <span className="absolute top-1 right-1 bg-white bg-opacity-90 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    ✓
                  </span>
                )}
                <span className="relative z-10 font-cinzel font-bold">
                  {number}
                </span>
                {filterNumbers.includes(number) && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-white opacity-20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Regular Numbered Cards */}
        <div>
          <h5 className="text-sm font-medium text-blue-300 mb-2">
            Numbered Cards
          </h5>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {regularNumbers.map((number) => (
              <button
                key={number}
                className={`number-filter-button transition-all duration-300 ${
                  filterNumbers.includes(number)
                    ? "shadow-lg transform scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
                style={{
                  background: filterNumbers.includes(number)
                    ? `linear-gradient(135deg, ${getNumberColor(
                        number
                      )}, rgba(0,0,0,0.4))`
                    : `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.4))`,
                  borderColor: getNumberColor(number),
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderRadius: "0.75rem",
                  padding: "0.5rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => toggleNumberFilter(number)}
              >
                {filterNumbers.includes(number) && (
                  <span className="absolute top-1 right-1 bg-white bg-opacity-90 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    ✓
                  </span>
                )}
                <span className="text-2xl font-cinzel font-bold block">
                  {number}
                </span>
                {filterNumbers.includes(number) && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-white opacity-20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Numbers Count */}
        {filterNumbers.length > 0 && (
          <div className="mt-4 bg-purple-900 bg-opacity-30 rounded-lg p-2 text-center">
            <span className="text-sm">
              {filterNumbers.length} number
              {filterNumbers.length !== 1 ? "s" : ""} selected
            </span>
            <button
              className="ml-4 text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full transition-colors"
              onClick={() => setFilterNumbers([])}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Challenges Section */}
      <div>
        <h4 className="font-bold text-lg mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          Challenge Themes
        </h4>

        {sortedGroupKeys.map((group) => (
          <div key={group} className="mb-4">
            <h5 className="font-medium text-sm mb-2 text-yellow-300">
              {group}
            </h5>
            <div className="flex flex-wrap gap-2">
              {challengeGroups[group].map((challenge) => (
                <div
                  key={challenge}
                  className={`challenge-filter transition-all duration-300 cursor-pointer ${
                    filterChallenges.includes(challenge)
                      ? "bg-gradient-to-r from-yellow-800 to-orange-900 shadow-md transform -translate-y-0.5"
                      : "bg-gray-800 bg-opacity-50 hover:bg-opacity-70"
                  }`}
                  style={{
                    borderRadius: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    borderLeft: filterChallenges.includes(challenge)
                      ? "3px solid #F6AD55"
                      : "3px solid rgba(246, 173, 85, 0.3)",
                  }}
                  onClick={() => toggleChallengeFilter(challenge)}
                >
                  <div className="flex items-center">
                    {filterChallenges.includes(challenge) && (
                      <span className="mr-1 text-yellow-400">✓</span>
                    )}
                    <span className="text-sm">{challenge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Selected Challenges Count */}
        {filterChallenges.length > 0 && (
          <div className="mt-4 bg-yellow-900 bg-opacity-30 rounded-lg p-2 text-center">
            <span className="text-sm">
              {filterChallenges.length} challenge
              {filterChallenges.length !== 1 ? "s" : ""} selected
            </span>
            <button
              className="ml-4 text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full transition-colors"
              onClick={() => setFilterChallenges([])}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
