const urlBase = 'http://localhost:8081/api/cliente'

export async function fetchCliente() {
    const response = await fetch(urlBase)
    if (!response.ok){
        throw new Error('Erro ao buscar dados de clientes.')
    }
    return await response.json()
}

export async function fetchClienteById(cnpj){
    const response = await fetch(`${urlBase}/${cnpj}`)
    if (!response.ok) return null
    return await response.json()
}

export async function deleteCliente(cnpj){
    const response = await fetch(`${urlBase}/${cnpj}`, { method: 'DELETE' })
    return response.ok
}

export async function updateCliente(cnpj, razaoSocial, rua, numero, cidade, cep, email, telefones) {
    const response = await fetch(`${urlBase}/${cnpj}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cnpj,
            razaoSocial,
            rua,
            numero,
            cidade,
            cep,
            email,
            telefones
        }),
    });

    if (!response.ok) return null;
    return await response.json();
}


export async function inputCliente(cnpj, razaoSocial, rua, numero, cidade, cep, email, telefones){
    const response = await fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cnpj,
      razaoSocial,
      rua,
      numero,
      cidade,
      cep,
      email,
      telefones
    })
  })

  if (!response.ok) {
    const erro = await response.text()
    console.error('Erro ao inserir:', erro)
    return null
  }

  return await response.json()
}