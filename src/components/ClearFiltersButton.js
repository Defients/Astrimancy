/**
 * ClearFiltersButton component with confirmation dialog
 */
const ClearFiltersButton = ({
  filterStrand,
  filterNumbers,
  filterChallenges,
  searchTerm,
  onClearFilters,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Count active filters
  const activeFilterCount =
    (filterStrand !== "all" ? 1 : 0) +
    filterNumbers.length +
    filterChallenges.length +
    (searchTerm ? 1 : 0);

  const handleClick = () => {
    if (activeFilterCount > 1) {
      setShowConfirmation(true);
    } else {
      onClearFilters();
    }
  };

  const handleConfirm = () => {
    onClearFilters();
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button
        className={`px-3 py-1 rounded-lg ${
          activeFilterCount > 0
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-600 cursor-not-allowed opacity-50"
        }`}
        onClick={handleClick}
        disabled={activeFilterCount === 0}
      >
        Clear Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCancel}
          ></div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg z-10 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Clear All Filters?</h3>
            <p className="mb-6">
              You are about to clear {activeFilterCount} active filters. This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-600 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                onClick={handleConfirm}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
