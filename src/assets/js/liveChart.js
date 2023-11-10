import Chart from "chart.js/auto";

const chartCanvas = document.createElement("canvas");
const title = document.getElementById("firstHeading");

title.parentNode.insertBefore(chartCanvas, title);

var dataPoints = [];
var myChart;

fetch(
  "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(function (value) {
      dataPoints.push({ x: value[0], y: parseInt(value[1]) });
    });

    myChart = new Chart(chartCanvas, {
      type: "line",
      data: {
        datasets: [
          {
            label: "RealTime evolution",
            data: dataPoints,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    updateChart();
  });

function updateChart() {
  // Nouvelle requête fetch pour obtenir de nouvelles données depuis l'URL
  fetch(
    "https://canvasjs.com/services/data/datapoints.php?xstart=" +
      (dataPoints.length + 1) +
      "&ystart=" +
      dataPoints[dataPoints.length - 1].y +
      "&length=1&type=json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Extraction des nouvelles données et ajout aux dataPoints
      data.forEach(function (value) {
        dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
      });

      // Mise à jour du graphique
      myChart.update();

      // Planification de la prochaine mise à jour après 1 seconde
      setTimeout(updateChart, 1000);
    });
}
