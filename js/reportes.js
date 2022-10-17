API_URL = "http://192.9.241.53:8080";

function showStatus() {
  document.getElementById("cards-container").classList.remove("d-none");
  document.getElementById("dates-form").classList.add("d-none");

  document.getElementById("btn-report-status").classList.add("active");
  document.getElementById("btn-report-dates").classList.remove("active");
  document.getElementById("dates-table").classList.add("d-none");
  hideClientsReport();
  hideDatesReport();
}

function showClientsReport() {
  document.getElementById("clients-table").classList.remove("d-none");
  document.getElementById("btn-report-clients").classList.add("active");
  hideDatesReport();
  hideStatus();
}

function showDatesForm() {
  hideStatus();
  hideClientsReport();
  document.getElementById("btn-report-dates").classList.add("active");
  document.getElementById("btn-report-status").classList.remove("active");
  document.getElementById("dates-table").classList.add("d-none");

  document.getElementById("dates-form").classList.remove("d-none");
}

function showDatesTable() {
  document.getElementById("dates-table").classList.remove("d-none");
}

function hideStatus() {
  document.getElementById("cards-container").classList.add("d-none");
  document.getElementById("btn-report-status").classList.remove("active");
}

function hideDatesReport() {
  document.getElementById("dates-table").classList.add("d-none");
  document.getElementById("dates-form").classList.add("d-none");

  document.getElementById("btn-report-dates").classList.remove("active");
}

function hideClientsReport() {
  document.getElementById("clients-table").classList.add("d-none");
  document.getElementById("btn-report-clients").classList.remove("active");
}

function getAndUpdateCards() {
  fetch(`${API_URL}/api/Reservation/report-status`)
    .then((response) => response.json())
    .then((data) => updateCards(data));
}

function updateCards(data) {
  document.getElementById("completed-value").innerHTML = data.completed;
  document.getElementById("cancelled-value").innerHTML = data.cancelled;
}

function getStartEndDateForm() {
  var startDate = document.getElementById("start-date").value;
  var endDate = document.getElementById("end-date").value;
  var data = {
    start: startDate,
    end: endDate,
  };

  getAndUpdateTableDates(
    `/api/Reservation/report-dates/${data.start}/${data.end}`
  );
}

function getAndUpdateTableDates(URL) {
  console.log(`${API_URL}${URL}`);
  fetch(`${API_URL}${URL}`)
    .then((response) => response.json())
    .then((data) => updateDatesTable(data))
    .then(() => showDatesTable());
}

function updateDatesTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";

    tbody += `<th scope="row">${items[i].idReservation}</th>`;
    
    if (items[i].status == "") {
        tbody += `<td>Reservado</td>`;
      } else if (items[i].status == "cancelled") {
        tbody += `<td>Cancelado</td>`;
      } else if (items[i].status == "completed") {
        tbody += `<td>Completado</td>`;
      }
    
     

    tbody += `<td>${items[i].client.name}</td>`;
    tbody += `<td>${items[i].client.email}</td>`;
    tbody += `<td>${items[i].startDate.replace(
        "T00:00:00.000+00:00",
        ""
      )}</td>`;

    tbody += `<td>${items[i].devolutionDate.replace(
        "T00:00:00.000+00:00",
        ""
      )}</td>`;
      tbody += `<td>${items[i].car.brand}</td>`;
      tbody += `<td>${items[i].car.name}</td>`;

      tbody += `<td></td>`;
    tbody += "</tr>";
  }
  document.getElementById("tableBody-Dates").innerHTML = tbody;
}

function getAndUpdateTableClients() {
  fetch(`${API_URL}/api/Reservation/report-clients`)
    .then((response) => response.json())
    .then((data) => updateClientsTable(data))
    .then(() => showClientsReport());
}

function updateClientsTable(items) {
  let tbody = "";
  for (i = 0; i < items.length; i++) {
    tbody += "<tr>";
    tbody += `<th scope="row">${items[i].client.name}</th>`;
    tbody += `<td>${items[i].client.email}</td>`;
    tbody += `<td>${items[i].total}</td>`;

    tbody += "</tr>";
  }
  document.getElementById("tableBody-clients").innerHTML = tbody;
}
