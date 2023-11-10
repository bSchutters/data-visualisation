import Chart from "chart.js/auto";

const chartCanvas = document.createElement("canvas");
const table = document.getElementById("table2");

table.parentNode.insertBefore(chartCanvas, table);

var data = [];

for (let i = 1; i < table.rows.length; i++) {
  var row = table.rows[i];
  var countries = row.cells[1].textContent;
  var data1 = parseFloat(row.cells[2].textContent);
  var data2 = parseFloat(row.cells[3].textContent);

  data.push({ countries, data1, data2 });
}

const barChart = new Chart(chartCanvas, {
  type: "bar",
  data: {
    labels: data.map((values, index) => data[index].countries),
    datasets: [
      {
        label: ["2007-09"],
        data: data.map((values, index) => data[index].data1),
      },
      {
        label: ["2010-12"],
        data: data.map((values, index) => data[index].data2),
      },
    ],
  },
});
