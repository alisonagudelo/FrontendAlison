API_URL = "http://192.9.241.53:8080";

function getAndUpdateTable() {
  fetch(`${API_URL}/api/Message/all`)
    .then((response) => response.json())
    .then((data) => updateTable(data));
}

function updateClientSelect(items) {
  let options = "";
  for (i = 0; i < items.length; i++) {
    options += `<option value="${items[i].idClient}">${items[i].name}</option>`;
  }
  document.getElementById("select-client").innerHTML = options;
}

function populateClientSelect() {
  fetch(`${API_URL}/api/Client/all`)
    .then((response) => response.json())
    .then((data) => updateClientSelect(data));
}

function updateCarSelect(items) {
  let options = "";
  for (i = 0; i < items.length; i++) {
    options += `<option value="${items[i].idCar}">${items[i].name}</option>`;
  }
  document.getElementById("select-car").innerHTML = options;
}

function populateCarSelect() {
  fetch(`${API_URL}/api/Car/all`)
    .then((response) => response.json())
    .then((data) => updateCarSelect(data));
}

function createMessage(){
    body = getForm();
    console.log(body)
    if (body.messageText && body.car.idCar && body.client.idClient)  {
  
      fetch(API_URL + "/api/Message/save", {
        method: "POST", 
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.ok) {
            alert("Mensaje guardado correctamente");
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

function deleteMessage(idMessage) {
    if (confirm("Esta seguro de borrar el mensaje? con el id: " + idMessage)) {
      fetch(API_URL + "/api/Message/" + idMessage, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("Mensaje eliminado correctamente");
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

function getForm() {
  var idClient = document.getElementById("select-client").value;
  var idCar = document.getElementById("select-car").value;
  var message = document.getElementById("message").value;

  let data = {
    messageText: message,
    car: {
      idCar: idCar,
    },
    client:{
        idClient: idClient,
    }
  };
  return data;
}

function updateMessage(idMessage, body) {
    if (body.messageText && body.car.idCar && body.client.idClient)  {
      data = {
        idMessage:idMessage,
       messageText:body.messageText,
       car:{idCar:body.car.idCar},
       client:{idClient:body.client.idClient}
      };

    
  
      if (confirm("Esta seguro de actualizar el mensaje?")) {
        fetch(API_URL + "/api/Message/update", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              alert("Mensaje actualizado correctamente");
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

function updateTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";
    tbody += `<td>${items[i].client.name}</td>`;
    tbody += `<td>${items[i].client.email}</td>`;
    tbody += `<td>${items[i].car.brand}</td>`;
    tbody += `<td>${items[i].car.name}</td>`;
    tbody += `<td>${items[i].messageText}</td>`;
    tbody += `<td>`;
    tbody += `<button onclick=updateMessage(${items[i].idMessage},getForm()) type="button" class="btn btn-secondary btn-update table-btn btn-sm mr-2">Actualizar</button>`;
    tbody += `<button onclick=deleteMessage(${items[i].idMessage}) type="button" class="btn btn-secondary btn-delete table-btn btn-sm">Borrar</button>`;
    tbody += `</td>`;
    tbody += "</tr>";
  }
  document.getElementById("tableBody").innerHTML = tbody;
}

