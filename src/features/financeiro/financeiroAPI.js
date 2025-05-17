const urlBase = 'http://localhost:8081/api/financeiros'

export async function fetchFinanceiros() {
  const response = await fetch(urlBase)
  if (!response.ok) {
    throw new Error('Erro ao buscar dados do financeiro.')
  }
  return await response.json()
}
