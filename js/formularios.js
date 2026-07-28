(function () {
  const form = document.querySelector('main form');
  const action = form?.getAttribute('action') || '';
  if (!form || !action.startsWith('/api/ordenes')) return;
  if (action.endsWith('/cierre')) return;
  const token = () => localStorage.getItem('token');
  const value = id => document.getElementById(id)?.value || '';
  const selectedText = element => element?.selectedOptions?.[0]?.text?.trim() || '';
  const sectorNames = ['', 'Mantenimiento', 'Maquinado', 'Armado', 'Accesorios', 'Herrería', 'Pintura', 'Logística', 'Galvamax', 'Administración'];
  const categoryNames = ['', 'Correctivo', 'Preventivo', 'Predictivo'];

  function requestPayload() {
    const machine = document.getElementById('maquinaEquipo') || document.getElementById('maquina');
    const incluirDeclarado = document.getElementById('declarado-radio')?.checked;
    return {
      id: value('ordenId'),
      codigo: machine.dataset.codigo || machine.value,
      maquina_equipo: machine.dataset.descripcion || '',
      nombre_declarado: incluirDeclarado ? value('declarado') : null,
      averia: value('averia'),
      solicitado: value('solicitante'),
      sector: sectorNames[Number(value('sector'))],
      categoria: categoryNames[Number(value('categoria'))],
      prioridad: value('prioridad') || null
    };
  }

  function payload() {
    if (action.endsWith('/cierre')) {
      const selects = form.querySelectorAll('select');
      return {
        id: selects[0].value,
        reparacion: form.querySelector('textarea')?.value || '',
        apoyo: selectedText(selects[1]),
        clasificacion: selectedText(selects[2]),
        notas: form.querySelectorAll('textarea')[1]?.value || '',
        horas: value('horas')
      };
    }
    if (action.endsWith('/asignacion')) {
      const selects = form.querySelectorAll('select');
      return { id: selects[0].value, responsable: selectedText(selects[1]), apoyo: selectedText(selects[2]) };
    }
    return requestPayload();
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (localStorage.getItem('role') !== 'editor' || !token()) return alert('Debe iniciar sesion como editor.');
    const data = payload();
    if ((action.endsWith('/ordenes') && (!data.codigo || !data.maquina_equipo)) || (!action.endsWith('/ordenes') && !data.id)) return alert('Seleccione primero una opcion de la lista.');
    try {
      const response = await API_FETCH(action, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(data) });
      const responseText = await response.text();
      let result = {};
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        throw new Error(responseText || 'No se pudo interpretar la respuesta del servidor.');
      }
      if (!response.ok) throw new Error(result.detalle || result.error || 'No se pudo guardar');
      alert(result.message || 'Operacion completada.');
      if (action.endsWith('/ordenes') || action.endsWith('/cierre') || action.endsWith('/asignacion') || action.endsWith('/solicitud')) {
        form.reset();
        window.location.href = 'lista_solicitudes.html';
      }
    } catch (error) { alert(error.message); }
  });
})();
