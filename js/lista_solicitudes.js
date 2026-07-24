let datos = [];
let ordenAsc = true;
let columnaOrden = "id"; // columna inicial
let ordenInicialDesc = true;

// Cargar datos desde backend (solo ordenes)
async function cargarOrdenes() {
  try {
    const res = await fetch("https://192.168.23.210:3000/api/ordenes");
    let data = await res.json();

    // Ordenar por id descendente y limitar a 1500
    datos = data.sort((a, b) => b.id - a.id).slice(0, 1500);

    renderTabla(datos);

    // marcar encabezado ID con indicador ▼
    const thId = document.querySelector('th[data-col="id"]');
    if (thId) thId.classList.add("desc");
    ordenAsc = false;
    columnaOrden = "id";
  } catch (err) {
    console.error("Error cargando ordenes:", err);
  }
}

// Renderizar tabla
function renderTabla(data) {
  const tbody = document.querySelector("#tablaOrdenes tbody");
  tbody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.NE || ""}</td>
      <td>${row.codigo || ""}</td>
      <td>${row.maquina_equipo || ""}</td>
      <td>${row.nombre_declarado || ""}</td>
      <td>${row.averia || ""}</td>
      <td>${row.prioridad || ""}</td>
      <td>${row.solicitado || ""}</td>
      <td>${row.sector || ""}</td>
      <td>${row.registrado || ""}</td>
      <td>${row.fecha_inicio || ""}</td>
      <td>${row.fecha_vencimiento || ""}</td>
      <td>${row.fecha_final || ""}</td>
      <td>${row.reparacion || ""}</td>
      <td>${row.responsable || ""}</td>
      <td>${row.apoyo || ""}</td>
      <td>${row.categoria || ""}</td>
      <td>${row.clasificacion || ""}</td>
      <td>${row.costo_repuestos || ""}</td>
      <td>${row.unidad_mo || ""}</td>
      <td>${row.horas || ""}</td>
      <td>${row.total_mo || ""}</td>
      <td>${row.total_costo || ""}</td>
      <td>${row.notas || ""}</td>
      <td>${row.progreso || ""}</td>
      <td>${row.carga || ""}</td>
      <td>${row.horas_paro || ""}</td>
      <td>${row.horas_mes || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Ordenar por columna al hacer clic en el encabezado
document.querySelectorAll("#tablaOrdenes th").forEach(th => {
  th.addEventListener("click", () => {
    const col = th.getAttribute("data-col");
    if (!col) return;

    document.querySelectorAll("#tablaOrdenes th").forEach(h => {
      h.classList.remove("asc", "desc");
    });

    if (columnaOrden === col) {
      ordenAsc = !ordenAsc;
    } else {
      columnaOrden = col;
      ordenAsc = true;
    }

    datos.sort((a, b) => {
      let valA = (a[col] || "").toString().toLowerCase();
      let valB = (b[col] || "").toString().toLowerCase();

      if (!isNaN(valA) && !isNaN(valB) && valA !== "" && valB !== "") {
        return ordenAsc ? valA - valB : valB - valA;
      } else {
        return ordenAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });

    th.classList.add(ordenAsc ? "asc" : "desc");
    renderTabla(datos);
  });
});

// Buscador dinámico
document.getElementById("buscador").addEventListener("input", e => {
  const palabras = e.target.value.toLowerCase().split(" ").filter(p => p);
  const filtrados = datos.filter(row => {
    const campos = `${row.codigo || ""} ${row.nombre_declarado || ""} ${row.maquina_equipo || ""}`.toLowerCase();
    return palabras.every(p => campos.includes(p));
  });
  renderTabla(filtrados);
});

// Ejecutar carga inicial
cargarOrdenes();

