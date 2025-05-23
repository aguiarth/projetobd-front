const urlBase = 'http://localhost:8081/api/pedido'

export async function fetchPedido() {
    const response = await fetch(urlBase)
    if (!response.ok) {
        throw new Error('Erro ao buscar dados de pedido.')
    }
    return await response.json()
}

export async function fetchPedidoById(numero) {
    const response = await fetch(`${urlBase}/${numero}`)
    if (!response.ok) return null
    return await response.json()
}

export async function deletePedido(numero) {
    const response = await fetch(`${urlBase}/${numero}`, { method: 'DELETE' })
    return response.ok
}

export async function updatePedido(numero, dataEmissao, valorTotal, status, formaPagamento) {
  const response = await fetch(`${urlBase}/${numero}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      numero: numero,
      dataEmissao,
      valorTotal,
      status,
      formaPagamento
    }),
  })

  if (!response.ok) return null
  return await response.json()
}

export async function inputPedido(numero, dataEmissao, valorTotal, status, formaPagamento) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      numero,
      dataEmissao,
      valorTotal,
      status,
      formaPagamento
    })
  })

  if (!response.ok) {
    const erro = await response.text()
    console.error('Erro ao inserir:', erro)
    return null
  }

  return await response.json()
}