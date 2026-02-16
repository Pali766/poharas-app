// --- ADMIN.JS ---

// Lekéri a név paramétert a URL-ből
const urlParams = new URLSearchParams(window.location.search);
const adminName = urlParams.get('name') || "Admin";

// Üdvözlő üzenet
document.getElementById("welcome").textContent = `Üdvözlünk, ${adminName}! Itt szerkesztheted az italokat.`;

// HTML elemek
const adminTableBody = document.querySelector("#adminTable tbody");
const addDrinkBtn = document.getElementById("addDrinkBtn");

// --- Funkció: Admin tábla betöltése ---
function loadAdminTable(){
  adminTableBody.innerHTML = ""; // Törli a táblát

  DRINKS.forEach((drink, index)=>{
    const tr = document.createElement("tr");

    // Ital neve
    const tdName = document.createElement("td");
    tdName.textContent = drink.name;
    tr.appendChild(tdName);

    // Ital ára
    const tdPrice = document.createElement("td");
    tdPrice.textContent = drink.price;
    tr.appendChild(tdPrice);

    // Ital készlete
    const tdStock = document.createElement("td");
    tdStock.textContent = drink.stock;
    tr.appendChild(tdStock);

    // Műveletek
    const tdActions = document.createElement("td");

    const btnInc = document.createElement("button");
    btnInc.textContent = "+";
    btnInc.addEventListener("click", ()=>{
      drink.stock++;
      loadAdminTable();
    });

    const btnDec = document.createElement("button");
    btnDec.textContent = "-";
    btnDec.addEventListener("click", ()=>{
      if(drink.stock>0) drink.stock--;
      loadAdminTable();
    });

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Ár módosítása";
    btnEdit.addEventListener("click", ()=>{
      const newPrice = parseInt(prompt(`Ár módosítása (${drink.name}):`, drink.price));
      if(!isNaN(newPrice)) drink.price = newPrice;
      loadAdminTable();
    });

    tdActions.appendChild(btnInc);
    tdActions.appendChild(btnDec);
    tdActions.appendChild(btnEdit);

    tr.appendChild(tdActions);

    adminTableBody.appendChild(tr);
  });
}

// --- Új ital hozzáadása ---
addDrinkBtn.addEventListener("click", ()=>{
  const name = prompt("Új ital neve:");
  if(!name) return;
  const price = parseInt(prompt("Ár (Ft):"));
  if(isNaN(price)) return;
  DRINKS.push({name:name, price:price, stock:0});
  loadAdminTable();
});

// --- Betöltés ---
loadAdminTable();
