API_URL = "http://192.9.241.53:8080";

function getAndUpdateTable() {
  fetch(`${API_URL}/api/Reservation/all`)
    .then((response) => response.json())
    .then((data) => updateTable(data));
}

function populateSelectCar() {
  fetch(`${API_URL}/api/Car/all`)
    .then((response) => response.json())
    .then((data) => updateSelectCar(data));
}

function updateSelectCar(items) {
  let options = "";
  for (i = 0; i < items.length; i++) {
    options += `<option value="${items[i].idCar}">${items[i].name}</option>`;
  }
  document.getElementById("model").innerHTML = options;
}

function populateSelectClient() {
  fetch(`${API_URL}/api/Client/all`)
    .then((response) => response.json())
    .then((data) => updateSelectClient(data));
}

function updateSelectClient(items) {
  let options = "";
  for (i = 0; i < items.length; i++) {
    options += `<option value="${items[i].idClient}">${items[i].name}</option>`;
  }
  document.getElementById("client").innerHTML = options;
}

function getForm() {
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var status = document.getElementById("status").value;
  var carID = document.getElementById("model").value;
  var clientID = document.getElementById("client").value;

  let data = {
    startDate: startDate,
    devolutionDate: endDate,
    status: status,
    car: {
      idCar: carID,
    },
    client: {
      idClient: clientID,
    },
  };
  return data;
}

function postReservation() {
  body = getForm();
  if (
    body.startDate &&
    body.devolutionDate &&
    body.car.idCar &&
    body.client.idClient
  ) {
    fetch(API_URL + "/api/Reservation/save", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          alert("Reservacion creada correctamente");
          window.location.reload();
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  } else {
    alert("Todos los campos son obligatorios");
  }
}

function updateReservation(idReservation, body) {
  let data = {
    idReservation: idReservation,
    startDate: body.startDate,
    devolutionDate: body.devolutionDate,
    status: body.status,
    car: {
      idCar: body.car.idCar,
    },
    client: {
      idClient: body.client.idClient,
    },
  };

  if (
    body.startDate &&
    body.devolutionDate &&
    body.car.idCar &&
    body.client.idClient
  ) {
    if (confirm("Esta seguro de actualizar la reservacion?")) {
      fetch(API_URL + "/api/Reservation/update", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            alert("Reservacion actualizada correctamente");
            window.location.reload();
          } else {
            console.log("HTTP request unsuccessful");
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } else {
    }
  } else {
    alert("Campo obligatorio faltante");
  }
}

function deleteReservation(idReservation) {
  if (
    confirm("Esta seguro de borrar la reservacion? con el id: " + idReservation)
  ) {
    fetch(API_URL + "/api/Reservation/" + idReservation, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Reservacion eliminada correctamente");
          window.location.reload();
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  } else {
  }
}

/////////////////////////

function updateTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";

    tbody += `<td>${items[i].startDate.replace(
      "T00:00:00.000+00:00",
      ""
    )}</td>`;

    tbody += `<td>${items[i].devolutionDate.replace(
      "T00:00:00.000+00:00",
      ""
    )}</td>`;
    if (items[i].status == "") {
      tbody += `<td>Reservado</td>`;
    } else if (items[i].status == "cancelled") {
      tbody += `<td>Cancelado</td>`;
    } else if (items[i].status == "completed") {
      tbody += `<td>Completado</td>`;
    }
    tbody += `<td>${items[i].car.name}</td>`;
    tbody += `<td>${items[i].client.name}</td>`;

    // tbody += `<td>${items[i].age}</td>`;
    tbody += `<td>`;
    tbody += `<button onclick=updateReservation(${items[i].idReservation},getForm()) type="button" class="btn btn-secondary btn-update table-btn btn-sm mr-2">Actualizar</button>`;
    tbody += `<button onclick=deleteReservation(${items[i].idReservation}) type="button" class="btn btn-secondary btn-delete table-btn btn-sm">Borrar</button>`;
    tbody += `</td>`;
    tbody += "</tr>";
  }
  document.getElementById("tableBody").innerHTML = tbody;
}
