const table1 = document.getElementById("table1");
const rows = table1.querySelectorAll("tbody tr");

const data = [];
var country;

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  const cells = row.querySelectorAll("td");
  var country = cells[0].textContent;
  const values = [];

  for (let j = 2; j < cells.length; j++) {
    values.push(parseFloat(cells[j].textContent.replace(",", ""))); // Convertir en nombre
  }

  data.push({ country, values });
}

if (table1) {
  // Crée un conteneur pour les graphiques
  const chartContainer = document.createElement("div");

  // Insère le conteneur avant 'table1' en utilisant parentNode
  table1.parentNode.insertBefore(chartContainer, table1);

  data.forEach((item) => {
    const chartData = {
      categories: [
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
      ],
      series: [
        {
          name: item.country,
          data: item.values,
        },
      ],
    };

    const chart = new HeatmapChart({ chartContainer, data });
    // const chart = Chart.heatmapChart({ chartContainer, data });
  });
}
