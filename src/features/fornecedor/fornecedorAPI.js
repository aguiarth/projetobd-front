const urlBase = 'http://localhost:8081/api/fornecedor'

export async function fetchFornecedor() {
    const response = await fetch(urlBase)
    if (!response.ok){
        throw new Error('Erro ao buscar dados de fornecedor.')
    }
    return await response.json()
}

export async function fetchFornecedorById(cnpj){
    const response = await fetch(`${urlBase}/${cnpj}`)
    if (!response.ok) return null
    return await response.json()
}

export async function deleteFornecedor(cnpj) {
    const response = await fetch(`${urlBase}/${cnpj}`, { method: 'DELETE' })
    return response.ok
}

export async function updateFornecedor(cnpj, razaoSocial, endereco, telefone, condicoesPagamento){
    const response = await fetch(`${urlBase}/${cnpj}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cnpj,
      razaoSocial,
      endereco,
      telefone,
      condicoesPagamento
    }),
  })

  if (!response.ok) return null
  return await response.json()
}

export async function inputFornecedor(cnpj, razaoSocial, endereco, telefone, condicoesPagamento) {
  const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cnpj,
      razaoSocial,
      endereco,
      telefone,
      condicoesPagamento,
    })
  })

  if (!response.ok) {
    const erro = await response.text()
    console.error('Erro ao inserir:', erro)
    return null
  }

  return await response.json()
}