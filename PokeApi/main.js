const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(data) {
  let tipos = data.types.map(
    (type) => ` <p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  //devuelve un array y sus elementos son un parrafo por cada uno de los tipos que tiene ese pokemon

  tipos = tipos.join(" "); // une todos los elementos del array en un string, por lo que ahora tenemos varios parrafos juntos
  //   console.log(tipos);

  let pokeId = data.id.toString();

  if (pokeId.length == 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length == 2) {
    pokeId = "0" + pokeId;
  }

  //   console.log(typeof pokeId, pokeId);
  const div = document.createElement("div");
  div.classList.add("pokemon");

  div.innerHTML = ` 
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${data.sprites.front_default}"
            alt="${data.name}">
    </div>
    
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}m</p>
            <p class="stat">${data.weight}Kg</p>
        </div>
    
    </div>`;

  listaPokemon.append(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonID = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {

          if (botonID === "ver-todos") {
            mostrarPokemon(data);
            
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonID))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);
