const urlBase = 'http://localhost:8081/api/financeiros'

export async function fetchFinanceiros() {
  const response = await fetch(urlBase)
  if (!response.ok) {
    throw new Error('Erro ao buscar dados do financeiro.')
  }
  return await response.json()
}

export async function fetchFinanceiroById(id) {
  const response = await fetch(`${urlBase}/${id}`)
  if (!response.ok) return null
  return await response.json()
}

export async function deleteFinanceiro(id) {
    const response = await fetch(`${urlBase}/${id}`, { method: 'DELETE' })
    return response.ok
}

export async function updateFinanceiro(id, lucro, prejuizo) {
    const response = await fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idFinanceiro: id,
          historicoLucro: lucro,
          historicoPrejuizo: prejuizo,
        }),
      });
    if (!response.ok) return null
    return await response.json()
}

export async function inputFinanceiro(lucro, prejuizo) {
    const response = await fetch(urlBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        historicoLucro: lucro, 
        historicoPrejuizo: prejuizo }),
    })
    
    if (!response.ok) {
    const erro = await response.text()
    console.error('Erro ao inserir:', erro)
    return null
  }

  return await response.json()
}