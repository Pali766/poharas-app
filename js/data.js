// ===== PULTOK =====
const COUNTERS = ["Garden", "Pub", "Koncert"];

// ===== ITALOK (közösek minden pultra) =====
const DRINKS = [
  { id: 1, name: "Sör", price: 1200, refundable: true },
  { id: 2, name: "Bor", price: 1500, refundable: false },
  { id: 3, name: "Üdítő", price: 800, refundable: true }
];

// ===== ALAP KÉSZLETEK (ha még nincs localStorage) =====
const DEFAULT_STOCKS = {
  Garden: { 1: 0, 2: 0, 3: 0 },
  Pub: { 1: 0, 2: 0, 3: 0 },
  Koncert: { 1: 0, 2: 0, 3: 0 }
};

const DEFAULT_BOTTLES = {
  Garden: 0,
  Pub: 0,
  Koncert: 0
};

