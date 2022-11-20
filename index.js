const input_number = document.getElementById('input-number')
const conteiner = document.getElementById('conteiner')
const form = document.getElementById("form")
const input_buton = document.getElementById('input-buton')


let pokemon = JSON.parse(localStorage.getItem("pokemon")) || [];

const saveLocalStorage = (pokeList) => {
  localStorage.setItem("pokemon", JSON.stringify(pokeList));
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

  const renderPokemonList = (pokeList) => {
    conteiner.innerHTML = pokeList.map((pokemon) => renderPokemon(pokemon)).join("");
  };

 
  const fetchedPokemon = async (e) => {
    e.preventDefault();
  
    const searchedPokemon = input_buton.value.trim();
  
    if (searchedPokemon === "") {
      alert("Por favor ingrese un número");
      return;
    }
    const fetchedPokemon = await baseURL(Number(searchedPokemon));
  
    if (!fetchedPokemon.id) {
      alert("El numero ingresado no existe.");
      form.reset();
      return;
    }
  
    pokemon = [fetchedPokemon];
    renderPokemonList(pokemon);
    saveLocalStorage(pokemon);
    form.reset();
  };


    const init = () => {
      renderPokemonList(pokemon);
      form.addEventListener("submit", fetchedPokemon);
     
    };
    init();