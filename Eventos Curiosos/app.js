const fecha = document.getElementById("fecha");
const boton = document.getElementById("botonDatos");
const contenedor = document.getElementById("contenedor");
const parrafoAno = document.getElementById("año");
const parrafoSuceso = document.getElementById("suceso");

let dia;
let mes;

async function obtenDatos(url, options) {

  try {
    
    const response = await fetch(url, options);
    const result = await response.json();
    parrafoAno.innerText = "Esto sucedió en " + result.year;
    parrafoSuceso.innerText = result.text;

  } catch (error) {
    console.error(error);
  }
}

function obtenFecha() {
  dia = fecha.value.substring(8);
  mes = fecha.value.substring(5, 7);

  const url = `https://numbersapi.p.rapidapi.com/${mes}/${dia}/date?fragment=true&json=true`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "654d53b367msh60a39bf18368f6fp1df4afjsn198d7e9c22e0",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };

  obtenDatos(url, options);
}
