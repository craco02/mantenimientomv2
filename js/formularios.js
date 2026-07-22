(function () {
  const form = document.querySelector('main form');
  if (!form || !form.action.includes('/api/ordenes')) return;
  const token = () => localStorage.getItem('token');
  const value = id => document.getElementById(id)?.value || '';
  const selectedText = element => element?.selectedOptions?.[0]?.text?.trim() || '';
  const sectorNames = ['', 'Mantenimiento', 'Maquinado', 'Armado', 'Accesorios', 'Herrería', 'Pintura', 'Logística', 'Galvamax', 'Administración'];
  const categoryNames = ['', 'Correctivo', 'Preventivo', 'Predictivo'];

  function requestPayload() {
    const machine = document.getElementById('maquinaEquipo') || document.getElementById('maquina');
    return {
      id: value('ordenId'),
      codigo: machine.dataset.codigo || machine.value,
      maquina_equipo: machine.dataset.descripcion || '',
      nombre_declarado: value('declarado'),
      averia: value('averia'),
      solicitado: value('solicitante'),
      sector: sectorNames[Number(value('sector'))],
      categoria: categoryNames[Number(value('categoria'))]
    };
  }

  function payload() {
    if (form.action.endsWith('/cierre')) {
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
    if (form.action.endsWith('/asignacion')) {
      const selects = form.querySelectorAll('select');
      return { id: selects[0].value, responsable: selectedText(selects[1]), apoyo: selectedText(selects[2]) };
    }
    return requestPayload();
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (localStorage.getItem('role') !== 'editor' || !token()) return alert('Debe iniciar sesion como editor.');
    const data = payload();
    if ((form.action.endsWith('/ordenes') && (!data.codigo || !data.maquina_equipo)) || (!form.action.endsWith('/ordenes') && !data.id)) return alert('Seleccione primero una opcion de la lista.');
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detalle || result.error || 'No se pudo guardar');
      alert(result.message || 'Operacion completada.');
      if (form.action.endsWith('/ordenes') || form.action.endsWith('/cierre') || form.action.endsWith('/asignacion')) {
        form.reset();
        window.location.href = 'lista_solicitudes.html';
      }
    } catch (error) { alert(error.message); }
  });
})();
