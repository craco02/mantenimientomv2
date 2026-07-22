// JSON incrustado de máquinas/equipos
const datosMaquinas = [
  {
    "Codigo": "M001",
    "Descripcion": "Amoladora angular Makita 9 pulg"
  },
  {
    "Codigo": "M002",
    "Descripcion": "Autoelevador electrico 2.5 TN"
  },
  {
    "Codigo": "M003",
    "Descripcion": "Bomba centrifuga de agua"
  },
  {
    "Codigo": "M004",
    "Descripcion": "Bomba hidraulica principal"
  },
  {
    "Codigo": "M005",
    "Descripcion": "Caldera industrial vertical"
  },
  {
    "Codigo": "M006",
    "Descripcion": "Compresor de aire 10 HP"
  },
  {
    "Codigo": "M007",
    "Descripcion": "Cortadora de plasma CNC"
  },
  {
    "Codigo": "M008",
    "Descripcion": "Cortadora sensitiva de metal"
  },
  {
    "Codigo": "M009",
    "Descripcion": "Dobladora hidraulica de chapas"
  },
  {
    "Codigo": "M010",
    "Descripcion": "Esmeril de banco doble"
  },
  {
    "Codigo": "M011",
    "Descripcion": "Extractor industrial con manga"
  },
  {
    "Codigo": "M012",
    "Descripcion": "Fresadora universal"
  },
  {
    "Codigo": "M013",
    "Descripcion": "Generador electrico diesel"
  },
  {
    "Codigo": "M014",
    "Descripcion": "Grua puente 5 TN"
  },
  {
    "Codigo": "M015",
    "Descripcion": "Guillotina hidraulica"
  },
  {
    "Codigo": "M016",
    "Descripcion": "Hidrolavadora industrial"
  },
  {
    "Codigo": "M017",
    "Descripcion": "Horno de tratamiento termico"
  },
  {
    "Codigo": "M018",
    "Descripcion": "Inyectora de plastico"
  },
  {
    "Codigo": "M019",
    "Descripcion": "Lijadora de banda"
  },
  {
    "Codigo": "M020",
    "Descripcion": "Maquina de soldar MIG"
  },
  {
    "Codigo": "M021",
    "Descripcion": "Maquina de soldar TIG"
  },
  {
    "Codigo": "M022",
    "Descripcion": "Montacargas manual"
  },
  {
    "Codigo": "M023",
    "Descripcion": "Motobomba naftera"
  },
  {
    "Codigo": "M024",
    "Descripcion": "Motor electrico trifasico"
  },
  {
    "Codigo": "M025",
    "Descripcion": "Nivel laser rotativo"
  },
  {
    "Codigo": "M026",
    "Descripcion": "Osciloscopio digital"
  },
  {
    "Codigo": "M027",
    "Descripcion": "Panel electrico trifasico"
  },
  {
    "Codigo": "M028",
    "Descripcion": "Pantografo CNC"
  },
  {
    "Codigo": "M029",
    "Descripcion": "Prensa hidraulica 30 TN"
  },
  {
    "Codigo": "M030",
    "Descripcion": "Pulidora industrial"
  },
  {
    "Codigo": "M031",
    "Descripcion": "Rectificadora plana"
  },
  {
    "Codigo": "M032",
    "Descripcion": "Roladora de perfiles"
  },
  {
    "Codigo": "M033",
    "Descripcion": "Sierra circular de banco"
  },
  {
    "Codigo": "M034",
    "Descripcion": "Sierra cinta horizontal"
  },
  {
    "Codigo": "M035",
    "Descripcion": "Sistema de aspiracion de polvo"
  },
  {
    "Codigo": "M036",
    "Descripcion": "Tablero electrico portatil"
  },
  {
    "Codigo": "M037",
    "Descripcion": "Taladro de banco"
  },
  {
    "Codigo": "M038",
    "Descripcion": "Taladro magnetico"
  },
  {
    "Codigo": "M039",
    "Descripcion": "Torno paralelo"
  },
  {
    "Codigo": "M040",
    "Descripcion": "Transpaleta hidraulica"
  },
  {
    "Codigo": "M041",
    "Descripcion": "Torre de iluminacion"
  },
  {
    "Codigo": "M042",
    "Descripcion": "Unidad de aire acondicionado"
  },
  {
    "Codigo": "M043",
    "Descripcion": "Ventilador axial industrial"
  },
  {
    "Codigo": "M044",
    "Descripcion": "Vibroapisonador"
  },
  {
    "Codigo": "M045",
    "Descripcion": "Zorra hidraulica paletera"
  },
  {
    "Codigo": "M046",
    "Descripcion": "Afiladora de mechas"
  },
  {
    "Codigo": "M047",
    "Descripcion": "Balanza industrial digital"
  },
  {
    "Codigo": "M048",
    "Descripcion": "Carro portaherramientas"
  },
  {
    "Codigo": "M049",
    "Descripcion": "Detector de gases"
  },
  {
    "Codigo": "M050",
    "Descripcion": "Elevador de tijera"
  }
];

crearSelectConBusqueda('maquina', datosMaquinas);

function crearSelectConBusqueda(selectId, datos) {
  const select = document.getElementById(selectId);

  if (!select) return;

  select.innerHTML = '<option value="">Seleccione una maquina/equipo</option>';

  datos.forEach(item => {
    const option = document.createElement('option');
    option.value = item.Codigo;
    option.textContent = item.Descripcion;
    select.appendChild(option);
  });

  select.classList.add('select-buscador-original');

  const contenedor = document.createElement('div');
  contenedor.className = 'select-buscador';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'select-buscador-input';
  input.placeholder = 'Buscar maquina/equipo...';
  input.autocomplete = 'off';
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-expanded', 'false');

  const lista = document.createElement('ul');
  lista.className = 'select-buscador-lista';
  lista.setAttribute('role', 'listbox');

  contenedor.appendChild(input);
  contenedor.appendChild(lista);
  select.insertAdjacentElement('afterend', contenedor);

  let resultadosActuales = [];
  let indiceActivo = -1;

  function normalizar(texto) {
    return texto
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function abrirLista() {
    lista.classList.add('is-visible');
    input.setAttribute('aria-expanded', 'true');
  }

  function cerrarLista() {
    lista.classList.remove('is-visible');
    input.setAttribute('aria-expanded', 'false');
    indiceActivo = -1;
    marcarActivo();
  }

  function marcarActivo() {
    const opciones = lista.querySelectorAll('.select-buscador-opcion');

    opciones.forEach((opcion, index) => {
      opcion.classList.toggle('is-active', index === indiceActivo);
    });

    if (indiceActivo >= 0 && opciones[indiceActivo]) {
      opciones[indiceActivo].scrollIntoView({ block: 'nearest' });
    }
  }

  function seleccionar(item) {
    select.value = item.Codigo;
    input.value = item.Descripcion;
    cerrarLista();
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function mostrarResultados(busqueda = '') {
    const texto = normalizar(busqueda);

    if (!texto) {
      resultadosActuales = datos.slice(0, 60);
    } else {
      const empiezanConTexto = [];
      const contienenTexto = [];

      datos.forEach(item => {
        const descripcion = normalizar(item.Descripcion);
        const codigo = normalizar(item.Codigo);
        const buscarEnCodigo = texto.length > 1 || /\d/.test(texto);
        const empieza = descripcion.startsWith(texto) || (buscarEnCodigo && codigo.startsWith(texto));
        const contiene = descripcion.includes(texto) || (buscarEnCodigo && codigo.includes(texto));

        if (empieza) {
          empiezanConTexto.push(item);
        } else if (texto.length > 1 && contiene) {
          contienenTexto.push(item);
        }
      });

      resultadosActuales = [...empiezanConTexto, ...contienenTexto].slice(0, 60);
    }

    lista.innerHTML = '';

    if (resultadosActuales.length === 0) {
      const vacio = document.createElement('li');
      vacio.className = 'select-buscador-vacio';
      vacio.textContent = 'Sin resultados';
      lista.appendChild(vacio);
      abrirLista();
      return;
    }

    resultadosActuales.forEach(item => {
      const opcion = document.createElement('li');
      const descripcion = document.createElement('span');
      const codigo = document.createElement('small');

      opcion.className = 'select-buscador-opcion';
      opcion.setAttribute('role', 'option');
      opcion.tabIndex = -1;
      descripcion.textContent = item.Descripcion;
      codigo.textContent = item.Codigo;
      opcion.appendChild(descripcion);
      opcion.appendChild(codigo);

      opcion.addEventListener('mousedown', event => {
        event.preventDefault();
        seleccionar(item);
      });

      lista.appendChild(opcion);
    });

    indiceActivo = resultadosActuales.length > 0 ? 0 : -1;
    abrirLista();
    marcarActivo();
  }

  input.addEventListener('input', () => {
    select.value = '';
    mostrarResultados(input.value);
  });

  input.addEventListener('focus', () => {
    mostrarResultados(input.value);
  });

  input.addEventListener('keydown', event => {
    if (!lista.classList.contains('is-visible') && event.key !== 'Tab') {
      mostrarResultados(input.value);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      indiceActivo = Math.min(indiceActivo + 1, resultadosActuales.length - 1);
      marcarActivo();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      indiceActivo = Math.max(indiceActivo - 1, 0);
      marcarActivo();
    }

    if (event.key === 'Enter' && indiceActivo >= 0) {
      event.preventDefault();
      seleccionar(resultadosActuales[indiceActivo]);
    }

    if (event.key === 'Escape') {
      cerrarLista();
    }
  });

  document.addEventListener('click', event => {
    if (!contenedor.contains(event.target)) {
      cerrarLista();
    }
  });
}
