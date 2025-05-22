const urlBase = 'http://localhost:8081/api/contaReceber'

export async function fetchContaReceber() {
    const response = await fetch(urlBase)
    if (!response.ok){
        throw new Error('Erro ao buscar dados de contas a receber.')
    }
    return await response.json()
}

export async function fetchContaReceberById(id) {
    const response = await fetch(`${urlBase}/${id}`)
    if (!response.ok) return null
    return await response.json()
}

export async function deleteContaReceber(id) {
    const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' })
    return response.ok
}

export async function inputContaReceber(idConta){
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        idConta
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
