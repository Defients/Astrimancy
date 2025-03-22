// src/data/cardData.js

// Import constants
import { strandColors } from "./constants";

// Sample card data structure
export const cardData = [
  {
    strand: "lotŭr",
    number: "Ace",
    title: "The Observer",
    description:
      "Awareness beginning to emerge through conscious observation of self and world.",
    primary: "Self-awareness (Major Arcana)",
    hidden: "The unexamined parts of self",
    secondary: "A catalyst for change through new awareness",
    challenge: "Awakening: Becoming conscious of unconscious patterns",
    color: strandColors.lotŭr || "#B2D4F1",
  },
  {
    strand: "Virtuō",
    number: "Ace",
    title: "The Ethicist",
    description: "The beginning of ethical understanding and moral clarity.",
    primary: "Ethical awakening (Major Arcana)",
    hidden: "Moral ambiguity",
    secondary: "Foundation for principled action",
    challenge: "Integrity: Aligning actions with values",
    color: strandColors.Virtuō || "#BDB7E0",
  },
  {
    strand: "Cozmik",
    number: "Ace",
    title: "The Cosmic Connection",
    description:
      "The first spark of connection to the universal patterns and cosmic order.",
    primary: "Universal initiation (Major Arcana)",
    hidden: "The vastness beyond comprehension",
    secondary: "Alignment with higher purpose",
    challenge: "Perspective: Seeing beyond the immediate",
    color: strandColors.Cozmik || "#7BA6F3",
  },
  // Add more sample cards with appropriate strand colors
];

export default cardData;
