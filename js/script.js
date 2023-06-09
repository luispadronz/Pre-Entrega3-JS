//Variables que necesito para mi proyecto

const formulario = document.querySelector("#formulario");
const listaNotas = document.querySelector("#lista-notas");
let notas = [];

//Event Listeners
eventListeners();

//Funciones que necesito:

function eventListeners() {
  formulario.addEventListener("submit", agregarNota);

  document.addEventListener("DOMContentLoaded", () => {
    notas = JSON.parse(localStorage.getItem("notas")) || [];
    console.log("notas");
  });
}

function agregarNota(e) {
  e.preventDefault();

  const nota = document.querySelector("#nota").value;

  //Realizo una validacion para que no introduzcan un string vacio.
  if (nota === "") {
    mostrarError("Tus notas no pueden estar vacías");
    return;
  }

  const notaObj = {
    id: Date.now(),
    nota,
  };

  notas = [...notas, notaObj];
  console.log(notaObj);
  crearHTML();
  formulario.reset();
}

//Funcion que hago para mostrar un error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Para luego insertarlo en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  //Elimina la alerta luego para que no quede siempre
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

//Funcion que hago para mostrar una lista de mis notas:
function crearHTML() {
  limpiarHTML();
  if (notas.length > 0) {
    notas.forEach((nota) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";
      btnEliminar.onclick = () => {
        borrarNota(nota.id);
      };

      const li = document.createElement("li");
      li.innerText = nota.nota;
      li.appendChild(btnEliminar);
      listaNotas.appendChild(li);
    });
  }
  sincronizarStorage();
}

//Funcion que hago para limpiar el HTML, y no me repita las notas.
function limpiarHTML() {
  while (listaNotas.firstChild) {
    listaNotas.removeChild(listaNotas.firstChild);
  }
}

//Funcion para agregar las notas a LS
function sincronizarStorage() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

//Funcion que hago para que el usuario elimine las notas que desee
function borrarNota(id) {
  notas = notas.filter((nota) => nota.id !== id);
  crearHTML();
}
