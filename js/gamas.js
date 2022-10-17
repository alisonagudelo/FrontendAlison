API_URL = "http://192.9.241.53:8080";

function getGamas() {
  fetch(`${API_URL}/api/Gama/all`)
    .then((response) => response.json())
    .then((data) => updateTable(data));
}

function postGama() {
  body = getForm();
  if (body.name && body.description) {

    fetch(API_URL + "/api/Gama/save", {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          alert("Gama creada correctamente");
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

function deleteGama(idGama) {
  if (confirm("Esta seguro de borrar la gama? con el id: " + idGama)) {
    fetch(API_URL + "/api/Gama/" + idGama, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Gama eliminada correctamente");
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

function updateGama(idGama, body) {
  if (body.name && body.description) {
    data = {
      idGama: idGama,
      name: body.name,
      description: body.description,
    };

    if (confirm("Esta seguro de actualizar la gama?")) {
      fetch(API_URL + "/api/Gama/update", {
        method: "PUT", 
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            alert("Gama actualizada correctamente");
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


function getForm() {
    var gama = document.getElementById("gama").value;
    var description = document.getElementById("description").value;
    let data = {
      name: gama,
      description: description,
    };
    return data;
  }

function updateTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";
    tbody += `<th scope="row">${items[i].idGama}</th>`;
    tbody += `<td>${items[i].name}</td>`;
    tbody += `<td>${items[i].description}</td>`;
    tbody += `<td>`;
    tbody += `<button onclick=updateGama(${items[i].idGama},getForm()) type="button" class="btn btn-secondary btn-update table-btn btn-sm mr-2">Actualizar</button>`;
    tbody += `<button onclick=deleteGama(${items[i].idGama}) type="button" class="btn btn-secondary btn-delete table-btn btn-sm">Borrar</button>`;
    tbody += `</td>`;
    tbody += "</tr>";
  }
  document.getElementById("tableBody").innerHTML = tbody;
}

