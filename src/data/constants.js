// src/data/constants.js

// Define the strand order
export const strandOrder = [
  "lotŭr",
  "Vitarîs",
  "丂anxxui",
  "Askänu",
  "Virtuō",
  "Nectiv",
  "memetic",
  "OptiX",
  "Dræmin'",
  "ℛadí",
  "Elly",
  "Cozmik",
  "VOIDROT",
  "Ðethapart",
  "none",
];

export const strands = strandOrder;

// Strand images mapping
export const strandImages = {
  lotŭr:
    "https://static.wixstatic.com/media/2ef790_9b611b304b38430bad5f9247338c0ad1~mv2.png",
  Vitarîs:
    "https://static.wixstatic.com/media/2ef790_3a545de557854b1e873c27601e0de0aa~mv2.png",
  丂anxxui:
    "https://static.wixstatic.com/media/2ef790_61be0d2210404d5e9459eb85442c5c32~mv2.png",
  Askänu:
    "https://static.wixstatic.com/media/2ef790_cad19c529360421c8fdd5cd132e9aeff~mv2.png",
  Virtuō:
    "https://static.wixstatic.com/media/2ef790_63f0ffe7fec345c5bee78427e8e54f6c~mv2.png",
  Nectiv:
    "https://static.wixstatic.com/media/2ef790_8ea2553d2847496b882aec6901cf7890~mv2.png",
  memetic:
    "https://static.wixstatic.com/media/2ef790_adde632fd6464a47b5fbb3ba663ea6be~mv2.png",
  OptiX:
    "https://static.wixstatic.com/media/2ef790_31f9fcb5b2f84cfeab10b25378e28ac7~mv2.png",
  "Dræmin'":
    "https://static.wixstatic.com/media/2ef790_554a720a6fc746fb8f606f12f50573f7~mv2.png",
  ℛadí: "https://static.wixstatic.com/media/2ef790_b6ae1db6d4df481c804ce9dcb1bd1ce7~mv2.png",
  Elly: "https://static.wixstatic.com/media/2ef790_7671107e820c4c4db7241aa54328f131~mv2.png",
  Cozmik:
    "https://static.wixstatic.com/media/2ef790_7d10ac8953b240169571885f205dff32~mv2.png",
  VOIDROT:
    "https://static.wixstatic.com/media/2ef790_e3e36485f7be4e7dbd1f3e66f4a95af5~mv2.png",
  Ðethapart:
    "https://static.wixstatic.com/media/2ef790_a0e7be6099a04d0983f54044fc3bdf19~mv2.png",
};

// Colors for each strand
export const strandColors = {
  lotŭr: "#B2D4F1",
  Vitarîs: "#E88E75",
  丂anxxui: "#A3E2CD",
  Askänu: "#F5D46F",
  Virtuō: "#BDB7E0",
  ℛadí: "#FFBE5F",
  "Dræmin'": "#5295AC",
  Nectiv: "#E381A5",
  OptiX: "#7B6BD3",
  memetic: "#98F598",
  Elly: "#F08080",
  Cozmik: "#7BA6F3",
  VOIDROT: "#54483E",
  Ðethapart: "#2E2E2E",
  none: "#9370DB",
};

// Alternative spelling for compatibility with some components
export const strandColours = strandColors;

// Strand descriptions for improved understanding
export const strandDescriptions = {
  lotŭr:
    "The Lotur strand represents awareness, mindfulness, and being fully present. Cards from this strand focus on self-awareness, reflection, and consciousness.",
  Vitarîs:
    "The Vitaris strand embodies physical health, vitality, and bodily energy. These cards relate to strength, physical well-being, and vitality in all its forms.",
  丂anxxui:
    "The Sanxxui strand represents emotional connection, relationships, and the heart. These cards reflect the depths of feeling and interpersonal bonds.",
  Askänu:
    "The Askanu strand embodies intellectual pursuits, knowledge, and curiosity. These cards relate to learning, wisdom, and the quest for understanding.",
  Virtuō:
    "The Virtuo strand represents ethical principles, moral values, and integrity. These cards reflect virtue, justice, and the higher callings of character.",
  Nectiv:
    "The Nectiv strand embodies contemporary culture, trends, and social dynamics. These cards relate to social status, influence, and the zeitgeist.",
  memetic:
    "The Memetic strand represents ideas that spread and evolve. These cards relate to viral concepts, shared understanding, and cultural propagation.",
  OptiX:
    "The OptiX strand embodies gaming, competition, and strategic thinking. These cards relate to achievement, mastery, and the play mindset.",
  "Dræmin'":
    "The Dreamin' strand represents the subconscious mind, dreams, and the imagination. These cards reflect inner visions, intuition, and the surreal.",
  ℛadí: "The Radi strand embodies illumination, insight, and revelation. These cards relate to moments of clarity, enlightenment, and seeing beyond the veil.",
  Elly: "The Elly strand represents elemental forces and natural energies. These cards reflect primal power, transformation, and the raw forces of nature.",
  Cozmik:
    "The Cozmik strand embodies celestial connections, universal patterns, and cosmic order. These cards relate to the stars, fate, and our place in the universe.",
  VOIDROT:
    "The Voidrot strand represents decay, entropy, and dissolution. These cards reflect endings, loss, and the inevitable breakdown of all things.",
  Ðethapart:
    "The Dethapart strand embodies separation, fragmentation, and distance. These cards relate to what has been lost, forgotten, or exists only in memory.",
  none: "The Jokers stand apart from the strands, representing wildcard energies that transcend categorization. They embody chaos, transformation, and unexpected twists of fate.",
};

// Predefined card spreads
export const cardSpreads = {
  threeCard: {
    name: "Three Card Spread",
    positions: [
      { name: "Past", description: "Influences from your past" },
      { name: "Present", description: "Current situation" },
      { name: "Future", description: "Potential outcomes" },
    ],
  },
  crossSpread: {
    name: "Cross Spread",
    positions: [
      { name: "Self", description: "Your current state of mind" },
      { name: "Challenge", description: "Obstacle you're facing" },
      { name: "Advice", description: "Guidance to overcome challenges" },
      {
        name: "Outcome",
        description: "Possible result if advice is followed",
      },
      { name: "Hidden Influence", description: "Unseen forces at work" },
    ],
  },
  decisionSpread: {
    name: "Decision Spread",
    positions: [
      { name: "You", description: "Your current position" },
      { name: "Path A", description: "First option" },
      { name: "Path B", description: "Second option" },
      {
        name: "External Influence",
        description: "Outside factors affecting decision",
      },
    ],
  },
  challengesSpread: {
    name: "Challenges & Growth Spread",
    positions: [
      { name: "Current Challenge", description: "The main obstacle you face" },
      { name: "Root Cause", description: "What underlies this challenge" },
      {
        name: "Hidden Strength",
        description: "Resources you may not be aware of",
      },
      {
        name: "Growth Opportunity",
        description: "How this challenge can transform you",
      },
      { name: "Next Steps", description: "Practical action to move forward" },
    ],
  },
  selfDiscoverySpread: {
    name: "Self-Discovery Spread",
    positions: [
      { name: "Outer Self", description: "How you present to the world" },
      { name: "Inner Self", description: "Your private thoughts and feelings" },
      {
        name: "Blind Spot",
        description: "What you may not see about yourself",
      },
      { name: "Potential", description: "What you could become" },
    ],
  },
};

// For backward compatibility
export const cardSpreadz = cardSpreads;

// Export all as default object
export default {
  strandOrder,
  strandImages,
  strandColors,
  strandColours,
  strandDescriptions,
  cardSpreads,
  cardSpreadz,
};
