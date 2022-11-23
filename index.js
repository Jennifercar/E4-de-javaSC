const input_number = document.getElementById('input-number')
const conteiner = document.getElementById('conteiner')
const form = document.getElementById("form")
const input_buton = document.getElementById('input-buton')


let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveLocalStorage = () => {
  localStorage.setItem("pokemones", JSON.stringify(pokemones));
};

const baseURL = "https://pokeapi.co/api/v2/pokemon/";


const renderPokemon = (pokemon) => {
    const { id, name, sprites, height, weight, types } = pokemon;
  
    return `
    <div class="poke">
          <img  src="${sprites.other.home.front_default}"/>
          <h2>${name.toUpperCase()}</h2>
          <span class="exp">EXP: ${pokemon.base_experience}</span>
          <div class="tipo-poke">
              ${types
                .map((tipo) => {
                  return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
                })
                .join("")}
          </div>
          <p class="id-poke">#${id}</p>
          <p class="height">Height: ${height / 10}m</p>
          <p class="weight">Weight: ${weight / 10}Kg</p>
      </div>
    `;
  };

  const renderPokemonList = (pokemon) => {
    pokemones=pokemon;
    saveLocalStorage();
    conteiner.innerHTML = renderPokemon(pokemones);
  };

  const searchPoke = async (e) => {
    e.preventDefault();
  
  const searchedPoke = input_number.value;
  
    if (searchedPoke === "") {
      alert("Por favor ingrese un numero");
      return;
    }
     
const fetchPokemons = async () => {
      const res = await fetch(`${baseURL}`);
      const data = await res.json();
    
      return data;
    };
    
    renderPokemonList(fetchPokemons)
    
};


 
 const init = () => {
   form.addEventListener("submit", searchPoke);
   renderPokemonList(pokemones);
 };
 
 init();
