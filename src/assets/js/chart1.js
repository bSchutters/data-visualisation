import Chart from "chart.js/auto";

const chartCanvas = document.createElement("canvas");
const table = document.getElementById("table1");
const rows = table.querySelectorAll("tbody tr");

table.parentNode.insertBefore(chartCanvas, table);

// Years
var years = [];

// Data (countries + datas)
var data = [];

// recup years
var headerRow = table.rows[1];
for (var i = 2; i < headerRow.cells.length; i++) {
  years.push(headerRow.cells[i].textContent);
}

// recup data + countries
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  const cells = row.querySelectorAll("td");
  var country = cells[0].textContent;
  const values = [];

  for (let j = 1; j < cells.length; j++) {
    values.push(parseFloat(cells[j].textContent.replace(",", "."))); // Convertir en nombre
  }

  data.push({ country, values });
}

const lineChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: years,
    datasets: data.map((values, index) => ({
      label: data[index].country,
      data: data[index].values,
    })),
  },
});
