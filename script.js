var addButton = document.getElementById("");
var form = document.getElementById("form");
var nameInput = document.getElementById("nameInput");
var isJobInput = document.getElementById("isJobInput");
var hourPriceInput = document.getElementById("hourPrice");
var jobForm = document.querySelector("#jobForm");
var activityControl = document.querySelector('#activityControl');

isJobInput.addEventListener("change", function (event) {
  if (isJobInput.checked) {
    jobForm.style.display = "block";
  } else {
    jobForm.style.display = "none";
  }
  console.log(isJobInput.checked);
  console.log(jobForm.style.display);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  crearActividad();
});

var actividades = [];
var actividadActual = {};

function crearActividad() {
  let actividad = {
    timeoutObj: 0,
    nombre: nameInput.value,
    trabajo: isJobInput.checked,
    precioHora: hourPriceInput.valueAsNumber,
    tiempoInicio: undefined,
    tiempoFin: undefined,
    precioTotal: 0,
    tiempo: 0,
  };
  console.log(actividad);
  setActividad(actividad);
  // iniciarCronometro(actividad);
}

function iniciarCronometro(actividad) {
  actividad.tiempoInicio = new Date();
  actividad.timeoutObj = setInterval(actualizarCronometro, 1000);
}

function actualizarCronometro() {
  actividadActual.tiempo++;
  calcularCosto(actividadActual);
  console.log(
    actividadActual.nombre,
    " -> ",
    actividadActual.tiempo,
    " -> ",
    actividadActual.costo
  );
}

function detenerCronometro() {
  clearInterval(actividadActual.timeoutObj);
}

function setActividad(actividad){
    actividadActual = actividad;
    activityControl.style.display = "flex";
}

function calcularCosto(actividad) {
  let costo = (actividad.precioHora / 3600) * actividad.tiempo;
  actividad.costo = costo;
}

// crearActividad();
// setTimeout(detenerCronometro,5000)
