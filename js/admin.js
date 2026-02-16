// ===== 1. VÁLTOZÓK =====
const adminDrinkTable = document.getElementById("adminDrinkTable");
const addDrinkForm = document.getElementById("addDrinkForm");
const newDrinkName = document.getElementById("newDrinkName");
const newDrinkPrice = document.getElementById("newDrinkPrice");

// ===== 2. LOCALSTORAGE BETÖLTÉS =====
function loadDrinks() {
  const storedDrinks = localStorage.getItem("drinks");
  if(storedDrinks){
    return JSON.parse(storedDrinks);
  } else {
    localStorage.setItem("drinks", JSON.stringify(DRINKS));
    return [...DRINKS];
  }
}

let drinks = loadDrinks();

// ===== 3. ITALOK LISTÁZÁSA =====
function renderAdminDrinks() {
  adminDrinkTable.innerHTML = "";
  drinks.forEach((drink, index) => {
    const tr = document.createElement("tr");

    // Ital neve
    const tdName = document.createElement("td");
    tdName.textContent = drink.name;
    tr.appendChild(tdName);

    // Ár
    const tdPrice = document.createElement("td");
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.value = drink.price;
    priceInput.min = 1;
    priceInput.onchange = () => {
      drinks[index].price = parseInt(priceInput.value) || 0;
      saveDrinks();
    };
    tdPrice.appendChild(priceInput);
    tr.appendChild(tdPrice);

    // Művelet – törlés
    const tdAction = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Törlés";
    removeBtn.className = "remove";
    removeBtn.onclick = () => {
      if(confirm(`Biztosan törlöd az italt: ${drink.name}?`)) {
        drinks.splice(index,1);
        saveDrinks();
        renderAdminDrinks();
      }
    };
    tdAction.appendChild(removeBtn);
    tr.appendChild(tdAction);

    adminDrinkTable.appendChild(tr);
  });
}

// ===== 4. MENTÉS LOCALSTORAGE-BE =====
function saveDrinks() {
  localStorage.setItem("drinks", JSON.stringify(drinks));
}

// ===== 5. ÚJ ITAL HOZZÁADÁSA =====
addDrinkForm.onsubmit = (e) => {
  e.preventDefault();

  const name = newDrinkName.value.trim();
  const price = parseInt(newDrinkPrice.value);

  if(!name || price <= 0) return alert("Érvényes nevet és árat adj meg!");

  drinks.push({id: name.toLowerCase().replace(/\s+/g,"_"), name, price});
  saveDrinks();
  renderAdminDrinks();

  newDrinkName.value = "";
  newDrinkPrice.value = "";
};

// ===== 6. INITIALIZÁCIÓ =====
renderAdminDrinks();

