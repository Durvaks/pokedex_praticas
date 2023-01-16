const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input__search");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading..."
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display = 'block';
        pokemonImage.style.height = `${data.weight<300 ? '10' : '18'}%`;        
        console.log(data.types[0].type.name);//identifica o tipo do pokemon
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = "";
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "not Found";
        pokemonNumber = "";
    }

}
renderPokemon(searchPokemon);

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
})

buttonNext.addEventListener("click", ()=> {
    searchPokemon++;
    renderPokemon(searchPokemon);
})
buttonPrev.addEventListener("click", ()=> {
    if(searchPokemon !== 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
})