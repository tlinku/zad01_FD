function general() {
  document
    .getElementById("submitButton")
    .addEventListener("click", async function () {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        displayPokemonList(data.results);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    });
}

function displayPokemonList(pokemonList) {
  const pokemonListDiv = document.getElementById("pokemonList");
  pokemonListDiv.innerHTML = pokemonList
    .map((pokemon) => `<p>${pokemon.name}</p>`)
    .join("");
}

function details() {
  document
    .getElementById("submitButton")
    .addEventListener("click", async function () {
      const pokemon = document.getElementById("userInput").value;
      try {
        const wynik = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const wynik2 = await wynik.json;
        console.log(wynik);
      } catch (error) {
        console.error("wystąpił błąd pobierania");
      }
    });
  const wynik3 = {
    name: wynik2.name,
    height: wynik2.height,
    weight: wynik2.weight,
    abilities: wynik2.abilities.map((ability) => ability.name),
  };
  return wynik3;
}
general();
