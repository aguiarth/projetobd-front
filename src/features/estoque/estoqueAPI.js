const urlBase = 'http://localhost:8081/api/estoque';

export async function fetchEstoques() {
  const response = await fetch(urlBase);
  if (!response.ok) {
    throw new Error('Erro ao buscar movimentações de estoque.');
  }
  return await response.json();
}

export async function fetchEstoqueById(id) {
  const response = await fetch(`${urlBase}/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

export async function deleteEstoque(id) {
  const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
  return response.ok;
}

export async function updateEstoque(id, tipoMovimentacao) {
  const response = await fetch(`${urlBase}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idEstoque: id,
      tipoMovimentacao
    }),
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function inputEstoque(tipoMovimentacao) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tipoMovimentacao
    }),
  });

  if (!response.ok) {
    const erro = await response.text();
    console.error('Erro ao inserir movimentação de estoque:', erro);
    return null;
  }

  return await response.json();
}