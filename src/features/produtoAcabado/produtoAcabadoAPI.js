const urlBase = 'http://localhost:8081/api/produto-acabado';

export async function fetchProdutosAcabados() {
  const response = await fetch(urlBase);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos acabados.');
  }
  return await response.json();
}

export async function fetchProdutoAcabadoById(id) {
  const response = await fetch(`${urlBase}/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

export async function deleteProdutoAcabado(id) {
  const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
  return response.ok;
}

export async function updateProdutoAcabado(id, descricao, dataFinalizacao) {
  const response = await fetch(`${urlBase}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idProduto: id,
      descricao,
      dataFinalizacao
    }),
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function inputProdutoAcabado(descricao, dataFinalizacao) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descricao,
      dataFinalizacao
    }),
  });

  if (!response.ok) {
    const erro = await response.text();
    console.error('Erro ao inserir produto acabado:', erro);
    return null;
  }

  return await response.json();
}