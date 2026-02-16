// Példa ital lista (később adminból tölthető)
const DRINKS = [
  "Sör","Bor","Üdítő","Víz","Whiskey","Rum","Vodka","Koktél","Pepsi","Coca Cola"
];

// Poharas adatai
const poharasData = {
  Garden:{}, Pub:{}, Koncert:{}
};

// Üveggyűjtő adatok
const bottles = {glass:0, plastic:0, can:0};

// DOM elemek
const pultSelect = document.getElementById("pultSelect");
const drinkInput = document.getElementById("drinkInput");
const autocompleteList = document.getElementById("autocompleteList");
const drinkAmount = document.getElementById("drinkAmount");
const addDrinkBtn = document.getElementById("addDrinkBtn");
const showSummaryBtn = document.getElementById("showSummaryBtn");
const summaryDiv = document.getElementById("summary");

const glassCount = document.getElementById("glassCount");
const plasticCount = document.getElementById("plasticCount");
const canCount = document.getElementById("canCount");
const showBottleSummaryBtn = document.getElementById("showBottleSummaryBtn");
const bottleSummaryDiv = document.getElementById("bottleSummary");

// Autocomplete funkció
drinkInput.addEventListener("input", ()=>{
  const val = drinkInput.value.toLowerCase();
  autocompleteList.innerHTML = "";
  if(!val) return;
  DRINKS.filter(d=>d.toLowerCase().includes(val)).forEach(d=>{
    const div = document.createElement("div");
    div.className="autocompleteItem";
    div.textContent=d;
    div.onclick=()=>{
      drinkInput.value=d;
      autocompleteList.innerHTML="";
    };
    autocompleteList.appendChild(div);
  });
});

// Ital hozzáadás
addDrinkBtn.addEventListener("click", ()=>{
  const pult = pultSelect.value;
  const drink = drinkInput.value.trim();
  const amount = parseInt(drinkAmount.value);
  if(!drink || isNaN(amount) || amount<=0){
    alert("Add meg az italt és a mennyiséget!");
    return;
  }
  if(!poharasData[pult][drink]) poharasData[pult][drink]=0;
  poharasData[pult][drink]+=amount;
  drinkInput.value=""; drinkAmount.value=1;
  updateSummary();
});

// Összesítés
showSummaryBtn.addEventListener("click", updateSummary);

function updateSummary(){
  summaryDiv.innerHTML="";
  for(const pult in poharasData){
    summaryDiv.innerHTML += `<h3>${pult}</h3>`;
    const table = document.createElement("table");
    table.className="tableSummary";
    const header = document.createElement("tr");
    header.innerHTML="<th>Ital</th><th>Mennyiség</th><th>Művelet</th>";
    table.appendChild(header);
    for(const drink in poharasData[pult]){
      const tr = document.createElement("tr");
      tr.innerHTML=`<td>${drink}</td><td>${poharasData[pult][drink]}</td>`;
      const td = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.textContent="Törlés";
      delBtn.onclick=()=>{
        delete poharasData[pult][drink];
        updateSummary();
      };
      td.appendChild(delBtn);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    summaryDiv.appendChild(table);
  }
}

// Üveggyűjtő
showBottleSummaryBtn.addEventListener("click", ()=>{
  bottles.glass = parseInt(glassCount.value) || 0;
  bottles.plastic = parseInt(plasticCount.value) || 0;
  bottles.can = parseInt(canCount.value) || 0;
  bottleSummaryDiv.innerHTML = `
    <p>Üveg: ${bottles.glass}</p>
    <p>Műanyag flakon: ${bottles.plastic}</p>
    <p>Alumínium doboz: ${bottles.can}</p>
  `;
});
