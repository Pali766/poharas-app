// --- POHARAS.JS ---

// Lekéri a felhasználó nevét/kódját az URL-ből
const urlParams = new URLSearchParams(window.location.search);
const workerName = urlParams.get('name') || "Poharas";

document.getElementById("welcome").textContent = `Üdvözlünk, ${workerName}! Itt dolgozhatsz a poharakkal.`;

// HTML elemek
const drinkListDiv = document.getElementById("drinkList");
const bottleCountSpan = document.getElementById("bottleCount");

// Visszaváltott poharak száma
let bottleCount = 0;

// --- Funkció: Italok listázása ---
function loadDrinks() {
  drinkListDiv.innerHTML = ""; // tisztítás

  DRINKS.forEach((drink, i)=>{
    const div = document.createElement("div");
    div.className = "drinkItem";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${drink.name} - ${drink.price} Ft - Készlet: ${drink.stock}`;

    const sellBtn = document.createElement("button");
    sellBtn.textContent = "Eladom";
    sellBtn.addEventListener("click", ()=>{
      if(drink.stock>0){
        drink.stock--;
        bottleCount++;
        updateUI();
      } else {
        alert("Nincs készleten!");
      }
    });

    const returnBtn = document.createElement("button");
    returnBtn.textContent = "Visszaváltom";
    returnBtn.addEventListener("click", ()=>{
      bottleCount++;
      updateUI();
    });

    div.appendChild(nameSpan);
    div.appendChild(sellBtn);
    div.appendChild(returnBtn);

    drinkListDiv.appendChild(div);
  });

  updateUI();
}

// --- Funkció: UI frissítése ---
function updateUI(){
  bottleCountSpan.textContent = bottleCount;
  // frissíti az italok készletét
  const drinkItems = document.querySelectorAll(".drinkItem span");
  DRINKS.forEach((drink,i)=>{
    drinkItems[i].textContent = `${drink.name} - ${drink.price} Ft - Készlet: ${drink.stock}`;
  });
}

// --- Betöltés ---
loadDrinks();

// --- Extra mobilbarát interakciók ---
// például swipe vagy touch eventeket később lehet hozzáadni
