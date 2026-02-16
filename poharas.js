// ==============================
// POHARAS.JS
// Pultok, italok, összesítés
// ==============================

/* === KÓDOS BELÉPTETÉS === */
const code = prompt("Add meg a poharas kódodat:");
if (!code || !/^P[A-Z]{2}[0-9]{2}$/.test(code)) {
    alert("Helytelen kód! Vissza a főoldalra.");
    window.location.href = "index.html";
} else {
    alert("Üdvözlünk, " + code + "!");
}

/* === ADATOK === */
const DRINKS = ["Sör","Bor","Üdítő","Pepsi","Fanta","Víz","Whiskey","Vodka"];
let counters = { garden: [], pub: [], concert: [] };
let bottles = { glass: 0, plastic: 0, can: 0 };

/* === DOM ELEMEK === */
const counterSelect = document.getElementById('counterSelect');
const drinkSearch = document.getElementById('drinkSearch');
const drinkQuantity = document.getElementById('drinkQuantity');
const addDrinkBtn = document.getElementById('addDrinkBtn');
const summaryBtn = document.getElementById('summaryBtn');
const drinkListDiv = document.getElementById('drinkList');
const suggestionsDiv = document.getElementById('suggestions');
const bottleType = document.getElementById('bottleType');
const bottleQuantity = document.getElementById('bottleQuantity');
const addBottleBtn = document.getElementById('addBottleBtn');
const bottleInfo = document.getElementById('bottleInfo');

/* === ITAL KERESÉS === */
drinkSearch.addEventListener('input', () => {
    const val = drinkSearch.value.toLowerCase();
    suggestionsDiv.innerHTML = '';
    if(!val) return;
    DRINKS.forEach(drink=>{
        if(drink.toLowerCase().includes(val)){
            const div = document.createElement('div');
            div.textContent = drink;
            div.className = 'suggestionItem';
            div.onclick = () => {
                drinkSearch.value = drink;
                suggestionsDiv.innerHTML = '';
            };
            suggestionsDiv.appendChild(div);
        }
    });
});

/* === ITAL HOZZÁADÁS === */
addDrinkBtn.addEventListener('click', () => {
    const drink = drinkSearch.value;
    const qty = parseInt(drinkQuantity.value);
    const counter = counterSelect.value;
    if(!drink || qty<1) { alert("Add meg az italt és mennyiséget!"); return; }
    const existing = counters[counter].find(d=>d.name===drink);
    if(existing) existing.qty += qty;
    else counters[counter].push({name: drink, qty});
    drinkSearch.value=''; drinkQuantity.value=1;
    renderList();
});

/* === ÖSSZESÍTÉS === */
summaryBtn.addEventListener('click', () => {
    let html = '';
    for(const counter in counters){
        html += `<h4>${counter.charAt(0).toUpperCase()+counter.slice(1)}</h4><ul>`;
        counters[counter].forEach(d=>html += `<li>${d.name} x ${d.qty} <button onclick="removeDrink('${counter}','${d.name}')">Törlés</button></li>`);
        html += '</ul>';
    }
    drinkListDiv.innerHTML = html;
});

/* === ITAL TÖRLÉS === */
function removeDrink(counter, name){
    const list = counters[counter];
    const index = list.findIndex(d=>d.name===name);
    if(index!==-1){
        if(list[index].qty>1) list[index].qty--;
        else list.splice(index,1);
        summaryBtn.click();
    }
}

/* === ÜVEG HOZZÁADÁS === */
addBottleBtn.addEventListener('click', () => {
    const type = bottleType.value;
    const qty = parseInt(bottleQuantity.value);
    if(qty<1) return;
    bottles[type] += qty;
    bottleQuantity.value=1;
    updateBottleInfo();
});

/* === VISSZAVÁLTOTT ÜVEG INFO === */
function updateBottleInfo(){
    bottleInfo.textContent = `Visszaváltott üvegek: Üveg: ${bottles.glass}, Műanyag: ${bottles.plastic}, Doboz: ${bottles.can}`;
}

/* === ITAL LISTA RENDER === */
function renderList(){
    let html = '';
    for(const counter in counters){
        html += `<h4>${counter.charAt(0).toUpperCase()+counter.slice(1)}</h4><ul>`;
        counters[counter].forEach(d=>html += `<li>${d.name} x ${d.qty} <button onclick="removeDrink('${counter}','${d.name}')">Törlés</button></li>`);
        html += '</ul>';
    }
    drinkListDiv.innerHTML = html;
}

renderList();
updateBottleInfo();
