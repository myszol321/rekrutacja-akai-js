/*
  1. W pliku data.js pod zmienna "pokemons" znajduje się tablica zawierająca dane wielu pokemonów, masz do niej dostęp również w tym pliku. 
  Chciałbym, abyś użył jej do wyświetlenia wszystkich pokemonów w naszym Pokedexie. 
  W tym celu dla każdego z nich możesz stworzyć nowy element drzeewa DOM i umieścić w nim informacje o Pokemonie (możesz zawrzeć tam jego nazwę, zdjęcie, a na kontener
  w którym się znajduje nadać specjalną klasę zależnie od typu)
*/
// tutaj złapiemy sekcję, do której będziemy dodawać pokemony
const pokemonsContainer = document.querySelector('.pokemons');

function renderPokemons(pokemonList) {
  // uzupełnij tutaj
  for (const pokemon of pokemonList) {
    const entry = document.createElement('div');
    entry.classList.add('pokemon');

    const name = document.createElement('h2');
    name.innerText = pokemon.name;
    entry.appendChild(name);

    const img = document.createElement('img');
    img.classList.add('img');
    img.src = pokemon.image;
    img.alt = 'pokemon picture';
    entry.appendChild(img);

    const type = document.createElement('p');
    type.classList.add('type');
    for (const i of pokemon.types) {
      entry.classList.add(i);
    }
    type.innerText = pokemon.types.join(', ');
    entry.appendChild(type);

    pokemonsContainer.appendChild(entry);
  }
}

/*
  2. Przeglądanie całej listy pokemonów może okazać się trochę uciążliwe. Fajnie byłoby skorzystać z filtrów, które już znajdują sie w pliku html. 
  Napisz ciało funkcji które pozwoli nam na:
  - filtrowanie po typie
  - filtrowanie po nazwie (wpisany fragment zawiera się w nazwie pokemona)
*/

function filterPokemons(pokemons) {
  // uzupełnij tutaj
  // zwróć odfiltrowaną tablicę pokemonów
  const options = document.getElementsByTagName('input');
  let filtered = { types: [], name: '' };
  for (const box of options) {
    if (box.checked) filtered.types.push(box.id);
    if (box.type === 'text' && box.value != '') filtered.name = box.value;
  }
  const pokemonList = new Set();
  for (const pokemon of pokemons) {
    for (const type of filtered.types) {
      console.log(type);
      if (pokemon.types.includes(type)) pokemonList.add(pokemon);
    }
    console.log(filtered.name);
    if (
      filtered.name != '' &&
      pokemon.name.toUpperCase().includes(filtered.name.toUpperCase())
    ) {
      pokemonList.add(pokemon);
    }
  }
  return pokemonList;
}

const form = document.querySelector('form');

function submitForm(event) {
  event.preventDefault();
  pokemonsContainer.innerHTML = '';
  renderPokemons(filterPokemons(pokemons));
}

form.addEventListener('submit', submitForm);

/*
  3. Pokedex powinien wyglądać trochę lepiej, niż ten tutaj. W folderze znajdziesz plik style.css, w którym możesz ulepszyć wygląd naszego pokedexa
  Liczymy na Twoją kreatywność 😉
*/
