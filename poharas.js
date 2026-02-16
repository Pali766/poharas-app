// Minta italok
const DRINKS = [
  {name:"Sör", price:450},
  {name:"Üdítő", price:350},
  {name:"Bor", price:600},
  {name:"Whiskey", price:1200},
  {name:"Vodka", price:1000}
];

// Pulthoz tartozó listák
const pultok = {
  garden: [],
  pub: [],
  koncert: []
};

// DOM elemek
const pulthoz = document.getElementById('pulthoz');
const searchInput = document.getElementById('search');
const quantityInput = document.getElementById('quantity');
const addBtn = document.getElementById('addBtn');
const summaryBtn = document.getElementById('summaryBtn');
const drinkList = document.getElementById('drinkList');
const bottleCollector = document.getElementsByName('bottle');

// Autocomplete funkció
searchInput.addEventListener('input', ()=>{
  const val = searchInput.value.toLowerCase();
  const matches = DRINKS.filter(d => d.name.toLowerCase().includes(val));
  // listázás a találatokból
  drinkList.innerHTML = '';
  matches.forEach(d=>{
    const div = document.createElement('div');
    div.className="drinkCard";
    div.textContent = `${d.name} - ${d.price} Ft`;
    div.onclick = ()=>searchInput.value = d.name;
    drinkList.appendChild(div);
  });
});

// Hozzáadás gomb
addBtn.addEventListener('click', ()=>{
  const name = searchInput.value.trim();
  const qty = parseInt(quantityInput.value);
  const pulthozVal = pulthoz.value;
  if(!name || isNaN(qty) || qty<1){
    alert("Adj meg egy ital nevet és mennyiséget!");
    return;
  }
  // Ellenőrzés, létezik-e már a listában
  const existing = pultok[pulthozVal].find(i=>i.name===name);
  if(existing) existing.qty += qty;
  else pultok[pulthozVal].push({name:name,qty:qty});
  updateDrinkList();
  searchInput.value='';
  quantityInput.value=1;
});

// Összesítés
summaryBtn.addEventListener('click', ()=>updateDrinkList(true));

function updateDrinkList(showSummary=false){
  drinkList.innerHTML='';
  if(showSummary){
    for(const pult in pultok){
      const h3 = document.createElement('h3');
      h3.textContent = pult.toUpperCase();
      drinkList.appendChild(h3);
      pultok[pult].forEach(item=>{
        const div = document.createElement('div');
        div.className="drinkCard";
        div.innerHTML = `${item.name} - ${item.qty} db <button class="delBtn">Törlés</button>`;
        const btn = div.querySelector('button');
        btn.onclick = ()=>{
          item.qty--;
          if(item.qty<=0) {
            const index = pultok[pult].indexOf(item);
            pultok[pult].splice(index,1);
          }
          updateDrinkList(true);
        };
        drinkList.appendChild(div);
      });
    }
  } else {
    // Ha nem összesítés, csak autocomplete listázás
  }
}

// Üveggyűjtő
for(const b of bottleCollector){
  b.addEventListener('change', ()=>console.log("Kiválasztott üveg:",b.value));
}

// TODO: felhő/GitHub mentés később
