API_URL = "http://192.9.241.53:8080";

function updateSelect(items) {
  let options = "";
  for (i = 0; i < items.length; i++) {
    options += `<option value="${items[i].idGama}">${items[i].name}</option>`;
  }
  document.getElementById("select-categoria").innerHTML = options;
}

function populateSelect() {
  fetch(`${API_URL}/api/Gama/all`)
    .then((response) => response.json())
    .then((data) => updateSelect(data));
}

function getAndUpdateTable() {
  fetch(`${API_URL}/api/Car/all`)
    .then((response) => response.json())
    .then((data) => updateTable(data));
}

function getForm() {
  var model = document.getElementById("modelo").value;
  var manufacturer = document.getElementById("fabricante").value;
  var year = document.getElementById("year").value;
  var description = document.getElementById("descripcion").value;
  var idGama = document.getElementById("select-categoria").value;
  let data = {
    name: model,
    brand: manufacturer,
    year: year,
    description: description,
    gama: { idGama: idGama },
  };
  return data;
}

function postCar() {
  body = getForm();
  if (body.name && body.brand && body.year && body.description && body.gama) {
    fetch(API_URL + "/api/Car/save", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          alert("Carro creado correctamente");
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

function updateCar(idCar, body) {
  if (body.name && body.brand && body.year && body.description && body.gama) {
    data = {
      idCar: idCar,
      name: body.name,
      brand: body.brand,
      year: body.year,
      description: body.description,
      gama: { idGama: body.gama.idGama },
    };

    if (confirm("Esta seguro de actualizar el carro?")) {
      fetch(API_URL + "/api/Car/update", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            alert("Carro actualizado correctamente");
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

function deleteCar(idCar) {
  if (confirm("Esta seguro de borrar el carro? con el id: " + idCar)) {
    fetch(API_URL + "/api/Car/" + idCar, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Carro eliminado correctamente");
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

function updateTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";
    tbody += `<td>${items[i].name}</td>`;
    tbody += `<td>${items[i].brand}</td>`;
    tbody += `<td>${items[i].year}</td>`;
    tbody += `<td>${items[i].description}</td>`;
    tbody += `<td>${items[i].gama.name}</td>`;
    tbody += `<td>`;
    tbody += `<button onclick=updateCar(${items[i].idCar},getForm()) type="button" class="btn btn-secondary btn-update table-btn btn-sm mr-2">Actualizar</button>`;
    tbody += `<button onclick=deleteCar(${items[i].idCar}) type="button" class="btn btn-secondary btn-delete table-btn btn-sm">Borrar</button>`;
    tbody += `</td>`;
    tbody += "</tr>";
  }
  document.getElementById("tableBody").innerHTML = tbody;
}
