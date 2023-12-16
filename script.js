var addButton = document.getElementById("");
var form = document.getElementById("form");
var nameInput = document.getElementById("nameInput");
var isJobInput = document.getElementById("isJobInput");
var hourPriceInput = document.getElementById("hourPrice");
var jobForm = document.querySelector("#jobForm");
var activityControl = document.querySelector("#activityControl");
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");

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

startButton.addEventListener("click", function () {
  if (actividadActual) {
    iniciarCronometro(actividadActual);
  }
});
pauseButton.addEventListener("click", function () {
  isPaused = !isPaused;
  pauseButton.innerText = isPaused ? "Continuar" : "Pausar";
});
stopButton.addEventListener("click", function () {
  if (actividadActual) {
    detenerCronometro();
  }
});

var actividades = [];
var actividadActual = {};
var isPaused = false;

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
  form.reset();
  form.parentNode.style.display = "none";
  document.getElementById("activityName").innerText = actividad.nombre;
  document.getElementById("activityTime").innerText = "0";
  document.getElementById("activityPrice").innerText =
    "$" + actividad.precioHora;
  document.getElementById("activityTotal").innerText = "$0";
  if (!actividad.trabajo) {
    document.getElementById("activityPrice").style.display = "none";
    document.getElementById("activityTotal").style.display = "none";
  } else {
    document.getElementById("activityPrice").style.display = "inline-block";
    document.getElementById("activityTotal").style.display = "inline-block";
  }
  // iniciarCronometro(actividad);
  jobForm.style.display = "none";

}

function iniciarCronometro(actividad) {
  actividad.tiempoInicio = new Date();
  startButton.classList.remove("active");
  stopButton.classList.add("active");
  pauseButton.classList.add("active");
  actividad.timeoutObj = setInterval(actualizarCronometro, 1000);
}

function actualizarCronometro() {
  if (!isPaused) {
    actividadActual.tiempo++;

    if (actividadActual.trabajo) {
      calcularCosto(actividadActual);
      document.getElementById("activityTotal").innerText =
        "$" +
        (actividadActual.tiempo * (actividadActual.precioHora / 3600)).toFixed(
          2
        );
    }
    if (actividadActual.tiempo < 60) {
      document.getElementById("activityTime").innerText =
        actividadActual.tiempo.toFixed(2) + " s";
    } else if (actividadActual.tiempo < 3600) {
      document.getElementById("activityTime").innerText =
        (actividadActual.tiempo / 60).toFixed(2) + " min";
    } else {
      document.getElementById("activityTime").innerText =
        (actividadActual.tiempo / 3600).toFixed(2) + " hs";
    }
  }
}

function detenerCronometro() {
  clearInterval(actividadActual.timeoutObj);
  actividades.push(actividadActual);
  actividadActual = {};
  stopButton.classList.remove("active");
  pauseButton.classList.remove('active')
  startButton.classList.add("active");
  activityControl.style.display = "none";
  form.parentNode.style.display = "flex";

  rellenarHistorial();
}

function rellenarHistorial() {
  let history = document.getElementById("history");
  history.innerHTML = "<p>Historial de actividades</p>";
  let ul = document.createElement("ul");
  actividades.forEach((act) => {
    let li = document.createElement("li");
    act.precioTotal = ((act.precioHora/3600)*act.tiempo);
    li.innerHTML += "<span>" + act.nombre + "</span>";
    if (act.tiempo < 60) {
      li.innerHTML += "<span>" + act.tiempo.toFixed(2) + " s</span>";
    } else if (act.tiempo < 3600) {
      li.innerHTML += "<span>" + (act.tiempo / 60).toFixed(2) + " min</span>";
    } else {
      li.innerHTML += "<span>" + (act.tiempo / 3600).toFixed(2) + " hs</span>";
    }
    li.innerHTML += "<span>$ " + act.precioHora.toFixed(2) + "/hr</span>";
    li.innerHTML += "<span>$ " + act.precioTotal.toFixed(2);
    ul.appendChild(li);
  });
  history.appendChild(ul);
}

function setActividad(actividad) {
  actividadActual = actividad;
  activityControl.style.display = "flex";
}

function calcularCosto(actividad) {
  let costo = (actividad.precioHora / 3600) * actividad.tiempo;
  actividad.costo = costo;
}

// crearActividad();
// setTimeout(detenerCronometro,5000)
