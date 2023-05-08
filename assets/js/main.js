const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const overlay = document.getElementById('overlay')
const menu = document.getElementById('menu')
const content = document.getElementById('container')


const maxRecords = 151
const limit = 10
let offset = 0;




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
        `).join('')

        pokemonList.innerHTML += newHtml

        const pokemonItems = document.querySelectorAll('.pokemon')
        pokemonItems.forEach((item) => {
            item.addEventListener('click', () => {
                const pokemonId = item.querySelector('.number').textContent.replace('#', '')
                const pokemon = pokemons.find((p) => p.number === parseInt(pokemonId))
                if(menu.className != 'enabled'){
                    showPokemonDetail(pokemon)
                }
            })
        })
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//Menu
function pokeInfo(pokemon){
    menu.className = 'enabled';
    content.className = 'blur';
    getDetail(pokemon);
}

function pokeInfoClose(){
    const buttonReturn = document.getElementById('returnButton')

    buttonReturn.addEventListener('click', () => {
        menu.className = 'disabled';
        content.className = 'content';
        const pokemonListItems = document.querySelectorAll('.pokemon');
        pokemonListItems.forEach((item) => {
            item.style.cursor = 'pointer';
        })
    })


}

function showPokemonDetail(pokemon) {
    if(menu.className === 'disabled' && content.className != 'blur'){
        pokeInfo(pokemon);
        const pokemonListItems = document.querySelectorAll('.pokemon');
            pokemonListItems.forEach((item) => {
            item.style.cursor = 'auto';
        });
    }
    menu.innerHTML = pokemonDetailToHtml(pokemon);
    pokeInfoClose();

} 

function pokemonDetailToHtml(pokemon) {
    return `
      <div class="pokemon-detail">
        <button id="returnButton" type="button">&#8249;</button>
        <img src="${pokemon.photo}" alt="${pokemon.name}" style="max-width: 100%;
        height: 10rem;
        margin-top: 2rem;">
        <h2>${pokemon.name}</h2>
        <p>Number: ${pokemon.number}</p>
        <p>Type: ${pokemon.types.join(', ')}</p>
        <div class="details"></div>
      </div>
    `;
  }
  