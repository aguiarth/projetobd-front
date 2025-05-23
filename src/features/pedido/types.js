export const defaultPedido = {
    numero: '',
    dataEmissao: new Date().toISOString().split('T')[0],
    valorTotal: 0,
    status: 'PENDENTE',
    formaPagamento: ''
}