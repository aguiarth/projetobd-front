export const defaultOrdemProducao = {
  idOrdem: 0,
  idOrdemDependente: null, // ID da ordem que esta ordem depende
  idOrdemRequisitada: null, // ID da ordem que requisitou esta ordem (o inverso do dependente)
  produtoFabricado: '',
  quantidadeProduto: 0,
  dataInicio: '',
  dataFinal: '',
  descricao: ''
}