const urlBase = 'http://localhost:8081/api/conta'

export async function fetchConta() {
    const response = await fetch(urlBase)
    if (!response.ok) {
        throw new Error('Erro ao buscar dados de conta.')
    }
    return await response.json()
}

export async function fetchContaById(id) {
    const response = await fetch(`${urlBase}/${id}`)
    if (!response.ok) return null
    return await response.json()
}

export async function deleteConta(id) {
    const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' })
    return response.ok
}

export async function updateConta(id, idFinanceiro, dataEmissao, dataVencimento, valorTotal, status) {
  const response = await fetch(urlBase, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idConta: id,
      idFinanceiro,
      dataEmissao,
      dataVencimento,
      valorTotal,
      status
    }),
  })

  if (!response.ok) return null
  return await response.json()
}


export async function inputConta(idFinanceiro, dataEmissao, dataVencimento, valorTotal, status) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idFinanceiro,
      dataEmissao,
      dataVencimento,
      valorTotal,
      status
    })
  })

  if (!response.ok) {
    const erro = await response.text()
    console.error('Erro ao inserir:', erro)
    return null
  }

  return await response.json()
}
