const input = document.getElementById("pokemon");
const btn = document.getElementById("btn");
const btnOrder = document.getElementById("btn-order");
const selectType = document.getElementById("sel");
const inputType = document.getElementById("type");
const btnType = document.getElementById("btn-type");
const container = document.querySelector(".container");
let database = [];
const btnload = document.createElement("button");
btnload.innerText = "carica altro";
let offset = 0;
const limit = 20;

async function recuperaPokemon(nome) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const result = await data.json();
    database.push(result);
    renderizzaDati(database);
  } catch (error) {
    console.error(error);
  }
}
async function recuperaTipi(tipo) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const result = await data.json();
    const pokeLista = result.pokemon.map((x) => x.pokemon.name);
    database = [];
    pokeLista.forEach((x) => recuperaPokemon(x));
  } catch (error) {
    console.error(error);
  }
}
function orderPokemon(array) {
  array.sort((a, b) => a.name.localeCompare(b.name)); 
  renderizzaDati(database);
}

async function fetchpokemon() {
  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const result = await data.json();
    result.results.forEach((x) => recuperaPokemon(x.name));
    document.body.appendChild(btnload);
    offset += 20;
  } catch (error) {
    console.log(error);
  }
}

fetchpokemon();

async function selezionaTipi() {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/type/`);
    const result = await data.json();
    result.results.forEach((x) => {
      const option = document.createElement("option");
      option.value = x.name;
      option.innerHTML = x.name;
      selectType.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}
selezionaTipi();

async function opzioni() {
  try {
    const option = selectType.value;
    recuperaTipi(option);
  } catch (error) {
    console.log(error);
  }
}
function renderizzaDati(pokemons) {
  container.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const h1 = document.createElement("h1");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const container = document.querySelector(".container");
    const types = pokemon.types.map((x) => x.type.name);
    types.forEach((type) =>  cardColor(div, type))
    const immagine = pokemon.sprites.front_default;
    const name = pokemon.name;
    h1.textContent = name;
    img.setAttribute("src", immagine);
    p.textContent = types.join(", ");
    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
  });
}
function cardColor(div, type){
  let color ;
    switch (type) {
      case "normal" :
        color = `background-color: rgba(224, 198, 168, 0.82)` 
        break;
      case "fighting" :
        color = `background-color: rgba(197, 112, 15, 0.64)` 
        break;
      case "flying" :
        color =`background-color: rgba(89, 187, 214, 0.34) ` 
        break
      case "poison" :
        color = `background-color:rgba(76, 98, 163, 0.46)` 
        break
      case "ground" :
        color =`background-color: rgba(86, 79, 4, 0.6)` 
        break
      case "rock" :
        color =`background-color: rgba(86, 85, 87, 0.49)` 
        break
      case "bug" :
        color =`background-color: rgba(23, 218, 186, 0.34)` 
        break
      case "ghost" :
        color =`background-color: rgba(235, 217, 160, 0.76)` 
        break
      case "steel" :
        color =`background-color: rgb(57, 77, 95)` 
        break
      case "fire" :
        color =`background-color: rgba(218, 23, 23, 0.68)` 
        break
      case "water" :
        color =`background-color: rgba(69, 150, 193, 0.95) `
        break
      case "grass" :
        color =`background-color: rgba(90, 173, 105, 0.95) ` 
        break
      case "electric" :
        color =`background-color:  rgba(247, 243, 13, 0.95)` 
        break
      case "psychic" :
        color =`background-color:  rgba(81, 69, 193, 0.8)` 
        break
      case "ice" :
        color =`background-color:  rgba(228, 235, 239, 0.95)` 
        break
      case "dragon" :
        color =`background-color:  rgba(243, 125, 0, 0.95)` 
        break
      case "dark" :
        color =`background-color:  rgba(9, 9, 10, 0.09)` 
        break
      case "fairy" :
        color =`background-color:  rgba(191, 135, 185, 0.95)` 
        break
      case "stellar" :
        color =`background-color:  rgb(239, 242, 66)` 
        break
      default:
        div.setAttribute("style" , `background-color: rgb(170, 217, 133)`); 
        break;
        
    }
        
    return div.setAttribute("style" , color)
}

btn.addEventListener("click", () => {
  const nome = input.value;
  recuperaPokemon(nome);
});
btnType.addEventListener("click", () => {
  const tipo = inputType.value;
  recuperaTipi(tipo);
});
btnOrder.addEventListener("click", () => {
  orderPokemon(database);
});

selectType.addEventListener("change", opzioni);

btnload.addEventListener("click", fetchpokemon);
