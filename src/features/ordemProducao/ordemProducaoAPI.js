// features/ordemProducao/ordemProducaoAPI.js

const urlBase = 'http://localhost:8081/api/ordem-producao'; // Ajuste a URL base da sua API de Ordem de Produção

export async function fetchOrdensProducao() {
  const response = await fetch(urlBase);
  if (!response.ok) {
    throw new Error('Erro ao buscar ordens de produção.');
  }
  return await response.json();
}

export async function fetchOrdemProducaoById(id) {
  const response = await fetch(`${urlBase}/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

export async function deleteOrdemProducao(id) {
  const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
  return response.ok;
}

export async function updateOrdemProducao(
  id,
  idOrdemDependente,
  idOrdemRequisitada,
  produtoFabricado,
  quantidadeProduto,
  dataInicio,
  dataFinal,
  descricao
) {
  const response = await fetch(`${urlBase}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idOrdem: id,
      idOrdemDependente,
      idOrdemRequisitada,
      produtoFabricado,
      quantidadeProduto,
      dataInicio,
      dataFinal,
      descricao
    }),
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function inputOrdemProducao(
  idOrdemDependente,
  idOrdemRequisitada,
  produtoFabricado,
  quantidadeProduto,
  dataInicio,
  dataFinal,
  descricao
) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idOrdemDependente,
      idOrdemRequisitada,
      produtoFabricado,
      quantidadeProduto,
      dataInicio,
      dataFinal,
      descricao
    }),
  });

  if (!response.ok) {
    const erro = await response.text();
    console.error('Erro ao inserir ordem de produção:', erro);
    return null;
  }

  return await response.json();
}