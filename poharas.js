// -------------------------
// POHARAS JS
// -------------------------
const DRINKS = [
  "Sör","Bor","Üdítő","Pepsi","Coca-Cola","Fanta","Sprite","Vízi","Energiaital"
];

// Pulthoz tartozó lista
const counters = {
  garden: [],
  pub: [],
  concert: []
};

// Üvegek gyűjtő
let bottleCounts = { glass:0, plastic:0, can:0 };

// DOM elemek
const counterSelect = document.getElementById("counterSelect");
const drinkSearch = document.getElementById("drinkSearch");
const drinkQuantity = document.getElementById("drinkQuantity");
const addDrinkBtn = document.getElementById("addDrinkBtn");
const summaryBtn = document.getElementById("summaryBtn");
const drinkList = document.getElementById("drinkList");
const suggestions = document.getElementById("suggestions");

const bottleType = document.getElementById("bottleType");
const bottleQuantity = document.getElementById("bottleQuantity");
const addBottleBtn = document.getElementById("addBottleBtn");
const bottleInfo = document.getElementById("bottleInfo");

// -------------------------
// DRINK ADD / AUTOCOMPLETE
// -------------------------
drinkSearch.addEventListener("input", ()=>{
  const query = drinkSearch.value.toLowerCase();
  suggestions.innerHTML="";
  if(query.length===0) return;
  DRINKS.forEach(d=>{
    if(d.toLowerCase().includes(query)){
      const div = document.createElement("div");
      div.className="suggestion";
      div.textContent=d;
      div.onclick=()=>{
        drinkSearch.value=d;
        suggestions.innerHTML="";
      };
      suggestions.appendChild(div);
    }
  });
});

// -------------------------
// ADD DRINK
// -------------------------
addDrinkBtn.addEventListener("click", ()=>{
  const drink = drinkSearch.value.trim();
  const quantity = parseInt(drinkQuantity.value);
  const counter = counterSelect.value;
  if(!drink || quantity<1) return alert("Adj meg egy italt és mennyiséget!");
  
  for(let i=0;i<quantity;i++){
    counters[counter].push(drink);
  }
  drinkSearch.value="";
  drinkQuantity.value=1;
  renderDrinks();
});

// -------------------------
// RENDER DRINK LIST
// -------------------------
function renderDrinks(){
  drinkList.innerHTML="";
  for(const [counter, drinks] of Object.entries(counters)){
    const div = document.createElement("div");
    div.className="counterBlock";
    const title = document.createElement("h4");
    title.textContent = counter.toUpperCase();
    div.appendChild(title);

    drinks.forEach((d,i)=>{
      const dDiv = document.createElement("div");
      dDiv.className="drinkItem";
      dDiv.textContent=d + " ";
      const delBtn = document.createElement("button");
      delBtn.textContent="Törlés";
      delBtn.onclick=()=>{
        drinks.splice(i,1);
        renderDrinks();
      };
      dDiv.appendChild(delBtn);
      div.appendChild(dDiv);
    });
    drinkList.appendChild(div);
  }
}

// -------------------------
// SUMMARY BUTTON
// -------------------------
summaryBtn.addEventListener("click", ()=>{
  renderDrinks();
  alert("Összesítés megjelenítve a lapon.");
});

// -------------------------
// BOTTLE ADD
// -------------------------
addBottleBtn.addEventListener("click", ()=>{
  const type = bottleType.value;
  const qty = parseInt(bottleQuantity.value);
  if(qty<1) return;
  bottleCounts[type]+=qty;
  renderBottles();
  bottleQuantity.value=1;
});

// -------------------------
// RENDER BOTTLES
// -------------------------
function renderBottles(){
  bottleInfo.textContent=`Üvegek visszaváltása: Üveg ${bottleCounts.glass}, Műanyag ${bottleCounts.plastic}, Doboz ${bottleCounts.can}`;
}

// -------------------------
// INIT
// -------------------------
renderDrinks();
renderBottles();
