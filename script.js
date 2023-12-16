var addButton = document.getElementById("");
var form = document.getElementById("form");
var nameInput = document.getElementById("nameInput");
var isJobInput = document.getElementById("isJobInput");
var hourPriceInput = document.getElementById("hourPrice");
var jobForm = document.querySelector("#jobForm");
var activityControl = document.querySelector('#activityControl');
var startButton = document.getElementById('startButton');

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

startButton.addEventListener('click', function(){
  if(actividadActual){
    iniciarCronometro(actividadActual);
  }
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
  form.reset()
  form.parentNode.style.display = "none";
  document.getElementById('activityName').innerText = actividad.nombre;
  document.getElementById('activityTime').innerText = "0";
  document.getElementById('activityPrice').innerText = "$"+actividad.precioHora;
  document.getElementById('activityTotal').innerText = "$0";
  if(!actividad.trabajo){
    document.getElementById('activityPrice').style.display = "none";
    document.getElementById('activityTotal').style.display = "none";
  }else{
    document.getElementById('activityPrice').style.display = "inline-block";
    document.getElementById('activityTotal').style.display = "inline-block";
  }
  // iniciarCronometro(actividad);
}

function iniciarCronometro(actividad) {
  actividad.tiempoInicio = new Date();
  document.getElementById('startButton').classList.remove('active');
  document.getElementById('stopButton').classList.add('active');
  actividad.timeoutObj = setInterval(actualizarCronometro, 1000);
}



function actualizarCronometro() {
  actividadActual.tiempo++;

  if(actividadActual.trabajo) {
    calcularCosto(actividadActual);
    document.getElementById('activityTotal').innerText = "$"+(actividadActual.tiempo*(actividadActual.precioHora/3600)).toFixed(2);
  }
  document.getElementById('activityTime').innerText = actividadActual.tiempo;
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
