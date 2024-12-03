document
  .getElementById("wyświetlana_siatka6")
  .addEventListener("click", () => displayPokemonList(6));

document
  .getElementById("wyświetlana_siatka12")
  .addEventListener("click", () => displayPokemonList(12));

document
  .getElementById("wyświetlana_siatka24")
  .addEventListener("click", () => displayPokemonList(24));

function displayPokemonDetails(pokemon) {
  const pokemonListDiv = document.getElementById("pokemonList");

  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name;

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name;

  const pokemonHeight = document.createElement("p");
  pokemonHeight.textContent = `Height: ${pokemon.height}`;

  const pokemonWeight = document.createElement("p");
  pokemonWeight.textContent = `Weight: ${pokemon.weight}`;

  const pokemonAbilities = document.createElement("p");
  pokemonAbilities.textContent = `Abilities: ${pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ")}`;

  pokemonDiv.appendChild(pokemonName);
  pokemonDiv.appendChild(pokemonImage);
  pokemonDiv.appendChild(pokemonHeight);
  pokemonDiv.appendChild(pokemonWeight);
  pokemonDiv.appendChild(pokemonAbilities);
  pokemonListDiv.appendChild(pokemonDiv);
}
async function displayPokemonList(PokeNumber) {
  const pokemonListDiv = document.getElementById("pokemonList");
  pokemonListDiv.innerHTML = "";

  const promises = Array.from({ length: PokeNumber }, (_, i) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((response) =>
      response.json()
    )
  );

  try {
    const PokemonData = await Promise.all(promises);
    PokemonData.forEach((pokemon) => displayPokemonDetails(pokemon));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

displayPokemonList(20);

document
  .getElementById("submitButton")
  .addEventListener("click", async function () {
    const pokemon = document.getElementById("userInput").value.toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Clear previous results
      document.getElementById("pokemonList").innerHTML = "";
      displayPokemonDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
