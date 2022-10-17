API_URL = "http://192.9.241.53:8080";

function getAndUpdateTable() {
  fetch(`${API_URL}/api/Client/all`)
    .then((response) => response.json())
    .then((data) => updateTable(data));
}

function getForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;

  let data = {
    email:email,
    password:password,
    name:name,
    age:age
  };
  return data;
}



function postClient() {
    body = getForm();
    if (body.email && body.password && body.name && body.age)  {
  
      fetch(API_URL + "/api/Client/save", {
        method: "POST", 
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.ok) {
            alert("Cliente creado correctamente");
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


function updateClient(idClient, body) {
    if (body.email && body.password && body.name && body.age)  {
      data = {
        idClient: idClient,
        email: body.email,
        password: body.password,
        name: body.name,
        age: body.age,
      };
  
      if (confirm("Esta seguro de actualizar el cliente?")) {
        fetch(API_URL + "/api/Client/update", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              alert("Cliente actualizado correctamente");
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

  function deleteClient(idClient) {
    if (confirm("Esta seguro de borrar el Cliente? con el id: " + idClient)) {
      fetch(API_URL + "/api/Client/" + idClient, {
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


  /////////////////////////


function updateTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";
    tbody += `<th scope="row">${items[i].idClient}</th>`;
    tbody += `<td>${items[i].email}</td>`;
    tbody += `<td>${items[i].name}</td>`;
    tbody += `<td>${items[i].age}</td>`;
    tbody += `<td>`;
    tbody += `<button onclick=updateClient(${items[i].idClient},getForm()) type="button" class="btn btn-secondary btn-update table-btn btn-sm mr-2">Actualizar</button>`;
    tbody += `<button onclick=deleteClient(${items[i].idClient}) type="button" class="btn btn-secondary btn-delete table-btn btn-sm">Borrar</button>`;
    tbody += `</td>`;
    tbody += "</tr>";
  }
  document.getElementById("tableBody").innerHTML = tbody;
}
