const urlBase = 'http://localhost:8081/api/contaPagar'

export async function fetchContaPagar() {
    const response = await fetch(urlBase)
    if (!response.ok){
        throw new Error('Erro ao buscar dados de contas a pagar.')
    }
    return await response.json()
}

export async function fetchContaRPagarById(id, cnpj) {
    const response = await fetch(`${urlBase}/${id}/${cnpj}`)
    if (!response.ok) return null
    return await response.json()
}

export async function deleteContaPagar(id, cnpj) {
    const response = await fetch(`${urlBase}/${id}/${cnpj}`, { method: 'DELETE' })
    return response.ok
}

export async function inputContaPagar(idConta, cnpj){
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        idConta,
        cnpj
        })
    })

    if (!response.ok) {
        const erro = await response.text()
        console.error('Erro ao inserir:', erro)
        return null
    }

    return await response.json()
}

export async function fetchContaById(id) {
  const response = await fetch(`http://localhost:8081/api/conta/${id}`)
  if (!response.ok) return null
  return await response.json()
}

export async function fetchFornecedorById(cnpj){
    const response = await fetch(`http://localhost:8081/api/fornecedor/${cnpj}`)
    if (!response.ok) return null
    return await response.json()
}