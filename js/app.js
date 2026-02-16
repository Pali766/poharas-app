// ===== 1. VÁLTOZÓK =====
const counterSelect = document.getElementById("counter");
const drinkTable = document.getElementById("drinkTable");
const bottleCountEl = document.getElementById("bottleCount");
const bottleAddBtn = document.getElementById("bottleAdd");
const bottleRemoveBtn = document.getElementById("bottleRemove");

let currentCounter = COUNTERS[0]; // alapértelmezett pult
let stocks = {}; // ital készletek pultonként
let bottles = {}; // visszaváltható üvegek pultonként

// ===== 2. LOCALSTORAGE BETÖLTÉS =====
function loadStorage() {
  const storedStocks = localStorage.getItem("stocks");
  const storedBottles = localStorage.getItem("bottles");

  if(storedStocks) stocks = JSON.parse(storedStocks);
  else {
    stocks = {};
    COUNTERS.forEach(c => {
      stocks[c] = {};
      DRINKS.forEach(d => stocks[c][d.id] = 0);
    });
  }

  if(storedBottles) bottles = JSON.parse(storedBottles);
  else {
    bottles = {};
    COUNTERS.forEach(c => bottles[c] = 0);
  }
}

// ===== 3. LOCALSTORAGE MENTÉS =====
function saveStorage() {
  localStorage.setItem("stocks", JSON.stringify(stocks));
  localStorage.setItem("bottles", JSON.stringify(bottles));
}

// ===== 4. PULTOK BETÖLTÉSE =====
function populateCounters() {
  COUNTERS.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    counterSelect.appendChild(opt);
  });
}

// ===== 5. ITALOK MEGJELENÍTÉSE =====
function renderDrinks() {
  drinkTable.innerHTML = "";

  DRINKS.forEach(drink => {
    const tr = document.createElement("tr");

    // Ital neve
    const tdName = document.createElement("td");
    tdName.textContent = drink.name;
    tr.appendChild(tdName);

    // Műveletek (+ / −)
    const tdOps = document.createElement("td");
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.className = "add";
    addBtn.onclick = () => {
      stocks[currentCounter][drink.id]++;
      saveStorage();
      renderDrinks();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "−";
    removeBtn.className = "remove";
    removeBtn.onclick = () => {
      if(stocks[currentCounter][drink.id]>0) stocks[currentCounter][drink.id]--;
      saveStorage();
      renderDrinks();
    };

    tdOps.appendChild(addBtn);
    tdOps.appendChild(removeBtn);
    tr.appendChild(tdOps);

    // Darabszám
    const tdCount = document.createElement("td");
    tdCount.textContent = stocks[currentCounter][drink.id];
    tr.appendChild(tdCount);

    drinkTable.appendChild(tr);
  });
}

// ===== 6. VISSZAVÁLTHATÓ ÜVEGEK =====
function renderBottles() {
  bottleCountEl.textContent = bottles[currentCounter];
}

bottleAddBtn.onclick = () => {
  bottles[currentCounter]++;
  saveStorage();
  renderBottles();
};

bottleRemoveBtn.onclick = () => {
  if(bottles[currentCounter]>0) bottles[currentCounter]--;
  saveStorage();
  renderBottles();
};

// ===== 7. PULT VÁLTÁS =====
counterSelect.onchange = () => {
  currentCounter = counterSelect.value;
  renderDrinks();
  renderBottles();
};

// ===== 8. INICIALIZÁCIÓ =====
function init() {
  loadStorage();
  populateCounters();
  counterSelect.value = currentCounter;
  renderDrinks();
  renderBottles();
}

init();

