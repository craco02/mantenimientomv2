let data = [];

// Cargar datos desde archivo JSON
fetch("../data/codigos.json")
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    renderTable(data);
  })
  .catch(error => console.error("Error cargando JSON:", error));

// Renderizar tabla
function renderTable(filteredData) {
  const tableBody = document.getElementById("codigos-body");
  tableBody.innerHTML = "";

  filteredData.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.codigo}</td>
      <td>${item["Descripción"]}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Filtrar datos dinámicamente
document.getElementById("codigos-search").addEventListener("input", function () {
  let searchValue = this.value.toLowerCase().trim();

  // Elimina % y divide en palabras
  let terms = searchValue.replace(/%/g, " ").split(/\s+/).filter(Boolean);

  const filtered = data.filter(item => {
    const codigo = String(item.codigo).toLowerCase();
    const descripcion = String(item["Descripción"]).toLowerCase();

    return terms.every(term =>
      codigo.includes(term) || descripcion.includes(term)
    );
  });

  renderTable(filtered);
});
