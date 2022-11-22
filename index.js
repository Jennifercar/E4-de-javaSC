const input_number = document.getElementById('input-number')
const conteiner = document.getElementById('conteiner')
const form = document.getElementById("form")
const input_buton = document.getElementById('input-buton')


let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveLocalStorage = (pokeList) => {
  localStorage.setItem("pokemones", JSON.stringify(pokeList));
};

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

let isFetching = false;

const nextURL = {
  next: null,
};

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

  const renderPokemonList = (pokeList) => {
    conteiner.innerHTML = pokeList.map((pokemon) => renderPokemon(pokemon)).join("");
  };

  const searchPoke = async (e) => {
    e.preventDefault();
  
    const searchedPoke = input_buton.value.trim();
  
    if (searchedPoke === "") {
      alert("Por favor ingrese un numero");
      return;
    }
     }
    const fetchPokemons = async () => {
      const res = await fetch(`${baseURL}`);
      const data = await res.json();
    
      return data;
    };

    function init() {
      window.addEventListener("DOMContentLoaded", async () => {
        let { next, results } = await fetchPokemons();
    
        nextURL.next = next;
    
        const URLS = results.map((pokemon) => pokemon.url);
    
        const InfoPokemones = await Promise.all(
          URLS.map(async (url) => {
            const nextPokemons = await fetch(url);
            return await nextPokemons.json();
          })
        );
    
        renderPokemonList(InfoPokemones);
      });
 }

  
  
  init();
  
