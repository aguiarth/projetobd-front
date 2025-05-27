// src/features/dashboard/dashboardAPI.js

const urlBase = 'http://localhost:8081/api/dashboard'; // A URL base do seu DashboardController

export async function fetchPedidosResumo() {
  const response = await fetch(`${urlBase}/pedidos-resumo`);
  if (!response.ok) {
    throw new Error('Erro ao buscar resumo de pedidos.');
  }
  return await response.json();
}

export async function fetchContasResumo() {
  const response = await fetch(`${urlBase}/contas-resumo`);
  if (!response.ok) {
    throw new Error('Erro ao buscar resumo de contas.');
  }
  return await response.json();
}

export async function fetchTotalClientes() {
  const response = await fetch(`${urlBase}/clientes-total`);
  if (!response.ok) {
    throw new Error('Erro ao buscar total de clientes.');
  }
  return await response.json();
}

export async function fetchTotalLotesRegistrados() {
  const response = await fetch(`${urlBase}/lotes-registrados-total`);
  if (!response.ok) {
    throw new Error('Erro ao buscar total de lotes registrados.');
  }
  return await response.json();
}

export async function fetchValorTotalCustoLotes() {
  const response = await fetch(`${urlBase}/lotes-custo-total`);
  if (!response.ok) {
    throw new Error('Erro ao buscar valor total do custo dos lotes.');
  }
  return await response.json();
}

export async function fetchLucroMensalHistorico(ultimosMeses = 12) {
  const response = await fetch(`${urlBase}/lucro-mensal-historico?ultimosMeses=${ultimosMeses}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar histórico de lucro mensal.');
  }
  return await response.json();
}