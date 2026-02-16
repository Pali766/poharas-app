/* =========================
   PULTOK (később bővíthető)
   ========================= */

const COUNTERS = [
  "Garden",
  "Pub",
  "Koncert"
];


/* =========================
   ITALOK
   - minden pultnál ugyanaz
   - árakat itt tároljuk,
     de a poharas nem látja
   ========================= */

const DRINKS = [
  {
    id: "sor",
    name: "Sör",
    price: 900
  },
  {
    id: "frccs",
    name: "Fröccs",
    price: 800
  },
  {
    id: "bor",
    name: "Bor",
    price: 850
  },
  {
    id: "cola",
    name: "Cola",
    price: 700
  },
  {
    id: "viz",
    name: "Ásványvíz",
    price: 500
  }
];


/* =========================
   ALAP ÉRTÉKEK
   ========================= */

const DEFAULT_DRINK_COUNT = 0;
const DEFAULT_BOTTLE_COUNT = 0;
