const urlBase = 'http://localhost:8081/api/materia-prima';

export async function fetchMateriasPrimas() {
  const response = await fetch(urlBase);
  if (!response.ok) {
    throw new Error('Erro ao buscar matérias-primas.');
  }
  return await response.json();
}

export async function fetchMateriaPrimaById(id) {
  const response = await fetch(`${urlBase}/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

export async function deleteMateriaPrima(id) {
  const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
  return response.ok;
}

export async function updateMateriaPrima(
  id,
  descricao,
  quantidade,
  custoUnitario,
  custoTotal
) {
  const response = await fetch(`${urlBase}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idMateriaPrima: id,
      descricao,
      quantidade,
      custoUnitario,
      custoTotal
    }),
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function inputMateriaPrima(
  descricao,
  dataValidade,
  quantidade,
  custoUnitario,
  custoTotal
) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descricao,
      dataValidade,
      quantidade,
      custoUnitario,
      custoTotal
    }),
  });

  if (!response.ok) {
    const erro = await response.text();
    console.error('Erro ao inserir matéria-prima:', erro);
    return null;
  }

  return await response.json();
}