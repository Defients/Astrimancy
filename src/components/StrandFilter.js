/**
 * StrandFilter component for filtering cards by strand
 */
import React from "react";

const StrandFilter = ({
  filterStrand,
  setFilterStrand,
  strands,
  strandImages,
  strandColors,
}) => {
  // Group strands according to requirements
  const jokers = strands.filter((strand) => strand === "none");
  const firstSet = strands.filter((strand) => strand !== "none").slice(0, 7);
  const secondSet = strands.filter((strand) => strand !== "none").slice(7, 14);

  const renderStrandTag = (strand) => (
    <div
      key={strand}
      className={`strand-tag ${filterStrand === strand ? "active" : ""}`}
      onClick={() => setFilterStrand(strand)}
    >
      {strandImages[strand] ? (
        <img
          src={strandImages[strand]}
          alt={strand}
          className="w-8 h-8 mr-2" // Larger icons
        />
      ) : (
        <div
          className="strand-tag-indicator"
          style={{
            backgroundColor: strandColors[strand] || "#9370DB",
            width: "16px", // Larger indicator
            height: "16px",
          }}
        ></div>
      )}
      {strand === "none" ? "Jokers" : strand}
    </div>
  );

  return (
    <div className="mb-8">
      {/* All Strands button - larger and more prominent */}
      <div className="flex justify-center mb-4">
        <div
          className={`strand-tag text-lg py-3 px-6 ${
            filterStrand === "all" ? "active" : ""
          }`}
          onClick={() => setFilterStrand("all")}
        >
          All Strands
        </div>
      </div>

      {/* First set of strands */}
      <div className="flex flex-wrap justify-center mb-4">
        {firstSet.map(renderStrandTag)}
      </div>

      {/* Second set of strands */}
      <div className="flex flex-wrap justify-center mb-4">
        {secondSet.map(renderStrandTag)}
      </div>

      {/* Jokers - if there are any */}
      {jokers.length > 0 && (
        <div className="flex flex-wrap justify-center">
          {jokers.map(renderStrandTag)}
        </div>
      )}
    </div>
  );
};

export default StrandFilter;
