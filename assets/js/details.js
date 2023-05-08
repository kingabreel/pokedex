function getDetail(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.number}`;
    //const detailDiv = document.getElementById("pokemon-detail");

    fetch(url)
        .then((response) => response.json())
        .then((detail) => {
            console.log(detail);

            // Create an HTML string with the pokemon details
            const htmlString = `
                <h2>${detail.name}</h2>
                <p>Height: ${detail.height}</p>
                <p>Weight: ${detail.weight}</p>
                <p>Abilities:</p>
                <ul>
                    ${detail.abilities.map((ability) => `<li>${ability.ability.name}</li>`).join("")}
                </ul>
                <p>Types:</p>
                <ul>
                    ${detail.types.map((type) => `<li>${type.type.name}</li>`).join("")}
                </ul>
            `;

            // Update the content of the detailDiv with the HTML string
            menu.innerHTML += htmlString;
        })
        .catch((error) => console.error(error))
}
