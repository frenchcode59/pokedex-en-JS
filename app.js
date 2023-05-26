const grid = document.getElementById("grid");
const pokeArray = [];
const searchName = document.getElementById("searchInput");

fetch("https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0")
    .then(response => response.json())
    .then(data => {
        const results = data.results;
        pokeArray.push(...results);

        displayPokemons(pokeArray);

        searchName.addEventListener('input', () => {
            const searchTerm = searchName.value.toLowerCase();
            const filteredPokemons = pokeArray.filter(pokemon => pokemon.name.includes(searchTerm));
            displayPokemons(filteredPokemons);
        });
    });

    function displayPokemons(pokemons) {
        // Obtenir les éléments actuels de la grille
        const currentItems = Array.from(grid.getElementsByClassName("item"));
      
        // Supprimer les éléments actuels de la grille
        currentItems.forEach(item => grid.removeChild(item));

    pokemons.forEach((pokemon, index) => {
        const ceil = document.createElement("div");
        ceil.classList.add("item");
        const pokemonNumber = index + 1;

        const img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;

        const name = document.createElement("div");
        const pokemonName = pokemon.name;
        name.innerText = `#${pokemonNumber} ${pokemonName}`;


        ceil.appendChild(img);
        ceil.appendChild(name);
        grid.appendChild(ceil);
    });
}