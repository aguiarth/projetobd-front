import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchOrdensProducao,
  fetchOrdemProducaoById,
  deleteOrdemProducao,
  updateOrdemProducao,
  inputOrdemProducao
} from '../../features/ordemProducao/ordemProducaoAPI';

export default function OrdemProducao() {
  const [ordens, setOrdens] = useState([]);
  const [idBusca, setIdBusca] = useState('');
  const [erro, setErro] = useState(null);

  const [todasOrdens, setTodasOrdens] = useState([]);

  useEffect(() => {
    const loadOrdens = async () => {
      try {
        const data = await fetchOrdensProducao();
        setOrdens(data);
        setTodasOrdens(data); 
      } catch (error) {
        console.error("Erro ao carregar ordens de produção:", error);
        setErro("Erro ao carregar ordens de produção.");
      }
    };
    loadOrdens();
  }, []);

  const buscar = async () => {
    if (!idBusca.trim()) {
      alert('Digite um ID válido para buscar.');
      return;
    }
    const idNum = parseInt(idBusca);
    if (isNaN(idNum)) {
      alert('O ID da Ordem de Produção deve ser um número.');
      return;
    }

    try {
        const res = await fetchOrdemProducaoById(idNum);
        if (res) {
            setErro(null);
            setOrdens([res]); 
        } else {
            setErro('Nenhuma ordem de produção encontrada com o ID fornecido.');
            setOrdens([]); 
        }
    } catch (error) {
        console.error("Erro ao buscar ordem de produção:", error);
        setErro("Erro ao buscar ordem de produção.");
    }
  };

  const limparBusca = async () => {
    setIdBusca(''); 
    setErro(null);
    try {
        const dados = await fetchOrdensProducao(); 
        setOrdens(dados);
        setTodasOrdens(dados);
    } catch (error) {
        console.error("Erro ao limpar busca e recarregar ordens:", error);
        setErro("Erro ao recarregar ordens de produção.");
    }
  };

  const deletar = async (id) => {
    try {
        const ok = await deleteOrdemProducao(id);
        if (ok) {
            const dadosAtualizados = await fetchOrdensProducao();
            setOrdens(dadosAtualizados);
            setTodasOrdens(dadosAtualizados);
        } else {
            alert('Erro ao deletar ordem de produção. Verifique se não há dependências e o log do backend.');
        }
    } catch (error) {
        console.error("Erro ao deletar ordem de produção:", error);
        alert("Ocorreu um erro ao deletar a ordem de produção.");
    }
  };

  const handleNovaOrdemClick = async () => {
    const produtoFabricado = document.getElementById('novoProdutoFabricado').value;
    const quantidadeProduto = parseInt(document.getElementById('novaQuantidadeProduto').value);
    const dataInicio = document.getElementById('novaDataInicio').value;
    const dataFinal = document.getElementById('novaDataFinal').value;
    const descricao = document.getElementById('novaDescricao').value;
    const idOrdemDependenteStr = document.getElementById('novaIdOrdemDependente').value;
    const idOrdemRequisitadaStr = document.getElementById('novaIdOrdemRequisitada').value;

    if (!produtoFabricado.trim() || isNaN(quantidadeProduto) || quantidadeProduto <= 0 || !dataInicio.trim() || !dataFinal.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios: Produto, Quantidade, Data Início, Data Final.');
      return;
    }


    const idOrdemDependente = idOrdemDependenteStr ? parseInt(idOrdemDependenteStr) : null;
    const idOrdemRequisitada = idOrdemRequisitadaStr ? parseInt(idOrdemRequisitadaStr) : null;

    try {
        const nova = await inputOrdemProducao(
            idOrdemDependente,
            idOrdemRequisitada,
            produtoFabricado,
            quantidadeProduto,
            dataInicio,
            dataFinal,
            descricao
        );

        if (nova) {
            const dadosAtualizados = await fetchOrdensProducao();
            setOrdens(dadosAtualizados);
            setTodasOrdens(dadosAtualizados);
            document.getElementById('popupNovaOrdem').close();

            document.getElementById('novoProdutoFabricado').value = '';
            document.getElementById('novaQuantidadeProduto').value = '';
            document.getElementById('novaDataInicio').value = '';
            document.getElementById('novaDataFinal').value = '';
            document.getElementById('novaDescricao').value = '';
            document.getElementById('novaIdOrdemDependente').value = '';
            document.getElementById('novaIdOrdemRequisitada').value = '';

        } else {
            alert('Erro ao inserir nova ordem de produção. Por favor, verifique o console do navegador e o log do backend para mais detalhes.');
        }
    } catch (error) {
        console.error("Erro na requisição para criar nova ordem:", error);
        alert('Ocorreu um erro inesperado ao criar a ordem de produção. Tente novamente.');
    }
  };

  const handleAlterarOrdemClick = async (idOrdemOriginal) => {
    const produtoFabricado = document.getElementById(`produto-${idOrdemOriginal}`).value;
    const quantidadeProduto = parseInt(document.getElementById(`quantidade-${idOrdemOriginal}`).value);
    const dataFinal = document.getElementById(`dataFinal-${idOrdemOriginal}`).value;
    const descricao = document.getElementById(`descricao-${idOrdemOriginal}`).value;
    const idOrdemDependenteStr = document.getElementById(`dependente-${idOrdemOriginal}`).value;
    const idOrdemRequisitadaStr = document.getElementById(`requisitada-${idOrdemOriginal}`).value;

    if (!produtoFabricado.trim() || isNaN(quantidadeProduto) || quantidadeProduto <= 0 || !dataFinal.trim()) {
      alert('Por favor, preencha os campos obrigatórios para alteração: Produto, Quantidade, Data Final.');
      return;
    }

    const idOrdemDependente = idOrdemDependenteStr ? parseInt(idOrdemDependenteStr) : null;
    const idOrdemRequisitada = idOrdemRequisitadaStr ? parseInt(idOrdemRequisitadaStr) : null;

    const ordemOriginal = ordens.find(o => o.idOrdem === idOrdemOriginal);
    if (!ordemOriginal) {
      alert('Ordem original não encontrada para atualização.');
      return;
    }

    try {
        const atualizada = await updateOrdemProducao(
            idOrdemOriginal,
            idOrdemDependente,
            idOrdemRequisitada,
            produtoFabricado,
            quantidadeProduto,
            ordemOriginal.dataInicio,
            dataFinal,
            descricao
        );

        if (atualizada) {
            const dadosAtualizados = await fetchOrdensProducao();
            setOrdens(dadosAtualizados);
            setTodasOrdens(dadosAtualizados);
            document.getElementById(`alterar-${idOrdemOriginal}`).close();
        } else {
            alert('Erro ao atualizar ordem de produção. Por favor, verifique o console do navegador e o log do backend para mais detalhes.');
        }
    } catch (error) {
        console.error("Erro na requisição para atualizar ordem:", error);
        alert('Ocorreu um erro inesperado ao atualizar a ordem de produção. Tente novamente.');
    }
  };


  return (
    <>
      <TitleCard
        title="Ordens de Produção"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="number"
              placeholder="Buscar por ID"
              className="input input-bordered w-40"
              value={idBusca}
              onChange={(e) => setIdBusca(e.target.value)}
            />
            <button onClick={buscar} className="btn btn-primary btn-sm">Buscar</button>
            <button onClick={limparBusca} className="btn btn-ghost btn-sm">Limpar</button>
          </div>
        }
      >
        <button
          className="mb-8 btn btn-sm btn-accent"
          onClick={() => document.getElementById('popupNovaOrdem').showModal()}
        >
          Nova Ordem de Produção
        </button>

        <dialog id="popupNovaOrdem" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Criar Nova Ordem de Produção</h3>
            <form method="dialog" className="space-y-2">
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Produto Fabricado</span></div>
                <input type="text" id="novoProdutoFabricado" className="input input-bordered w-full" placeholder="Ex: Cadeira" />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Quantidade</span></div>
                <input type="number" id="novaQuantidadeProduto" className="input input-bordered w-full" placeholder="Ex: 100" />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Data Início</span></div>
                <input type="date" id="novaDataInicio" className="input input-bordered w-full" />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Data Final</span></div>
                <input type="date" id="novaDataFinal" className="input input-bordered w-full" />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Descrição</span></div>
                <textarea id="novaDescricao" className="textarea textarea-bordered h-24 w-full" placeholder="Detalhes da produção"></textarea>
              </label>

              {/* Select para idOrdemDependente */}
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Depende da Ordem (ID)</span></div>
                <select id="novaIdOrdemDependente" className="select select-bordered w-full">
                  <option value="">Nenhuma</option> {/* Opção para null */}
                  {/* Filtra para não permitir que uma ordem dependa de si mesma (ID 0 para nova ordem) */}
                  {todasOrdens.filter(o => o.idOrdem !== 0).map(o => (
                    <option key={`nova-dep-${o.idOrdem}`} value={o.idOrdem}>{o.idOrdem} - {o.produtoFabricado}</option>
                  ))}
                </select>
              </label>

              {/* Select para idOrdemRequisitada */}
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Requisitada pela Ordem (ID)</span></div>
                <select id="novaIdOrdemRequisitada" className="select select-bordered w-full">
                  <option value="">Nenhuma</option> {/* Opção para null */}
                  {todasOrdens
                    .filter(o => o.idOrdem !== 0) // Impede auto-referência
                    .map(o => (
                      <option key={`nova-req-${o.idOrdem}`} value={o.idOrdem}>{o.idOrdem} - {o.produtoFabricado}</option>
                  ))}
                </select>
              </label>

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => document.getElementById('popupNovaOrdem').close()}>Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNovaOrdemClick}
                >
                  Criar Ordem
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Data Início</th>
                <th>Data Final</th>
                <th>Depende de</th>
                <th>Requisitada por</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ordens.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                ordens.map((ordem) => (
                  <tr key={ordem.idOrdem}>
                    <td className="font-bold">{ordem.idOrdem}</td>
                    <td>{ordem.produtoFabricado}</td>
                    <td>{ordem.quantidadeProduto}</td>
                    <td>{ordem.dataInicio}</td>
                    <td>{ordem.dataFinal}</td>
                    <td>{ordem.idOrdemDependente || 'N/A'}</td>
                    <td>{ordem.idOrdemRequisitada || 'N/A'}</td>
                    <td>{ordem.descricao}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                            // Preenche a modal de alteração com os valores atuais da ordem
                            document.getElementById(`produto-${ordem.idOrdem}`).value = ordem.produtoFabricado;
                            document.getElementById(`quantidade-${ordem.idOrdem}`).value = ordem.quantidadeProduto;
                            document.getElementById(`dataFinal-${ordem.idOrdem}`).value = ordem.dataFinal;
                            document.getElementById(`descricao-${ordem.idOrdem}`).value = ordem.descricao;
                            // Preenche AMBOS os selects de auto-relação, tratando null para ""
                            document.getElementById(`dependente-${ordem.idOrdem}`).value = ordem.idOrdemDependente || '';
                            document.getElementById(`requisitada-${ordem.idOrdem}`).value = ordem.idOrdemRequisitada || '';

                            document.getElementById(`alterar-${ordem.idOrdem}`).showModal();
                        }}
                      >
                        Alterar
                      </button>

                      {/* Modal de Alteração */}
                      <dialog id={`alterar-${ordem.idOrdem}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Ordem de Produção - ID: {ordem.idOrdem}</h3>
                          <form method="dialog" className="space-y-2">
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Produto Fabricado</span></div>
                                <input type="text" id={`produto-${ordem.idOrdem}`} defaultValue={ordem.produtoFabricado} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Quantidade</span></div>
                                <input type="number" id={`quantidade-${ordem.idOrdem}`} defaultValue={ordem.quantidadeProduto} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Data Início</span></div>
                                <input type="date" defaultValue={ordem.dataInicio} className="input input-bordered w-full" disabled />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Data Final</span></div>
                                <input type="date" id={`dataFinal-${ordem.idOrdem}`} defaultValue={ordem.dataFinal} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Descrição</span></div>
                                <textarea id={`descricao-${ordem.idOrdem}`} defaultValue={ordem.descricao} className="textarea textarea-bordered h-24 w-full"></textarea>
                            </label>

                            {/* Select para idOrdemDependente na alteração */}
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Depende da Ordem (ID)</span></div>
                                <select id={`dependente-${ordem.idOrdem}`} defaultValue={ordem.idOrdemDependente || ''} className="select select-bordered w-full">
                                    <option value="">Nenhuma</option>
                                    {todasOrdens
                                        .filter(o => o.idOrdem !== ordem.idOrdem)
                                        .map(o => (
                                            <option key={`edit-dep-${o.idOrdem}`} value={o.idOrdem}>{o.idOrdem} - {o.produtoFabricado}</option>
                                    ))}
                                </select>
                            </label>

                            {/* Select para idOrdemRequisitada na alteração */}
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">Requisitada pela Ordem (ID)</span></div>
                                <select id={`requisitada-${ordem.idOrdem}`} defaultValue={ordem.idOrdemRequisitada || ''} className="select select-bordered w-full">
                                    <option value="">Nenhuma</option>
                                    {todasOrdens
                                        .filter(o => o.idOrdem !== ordem.idOrdem)
                                        .map(o => (
                                            <option key={`edit-req-${o.idOrdem}`} value={o.idOrdem}>{o.idOrdem} - {o.produtoFabricado}</option>
                                    ))}
                                </select>
                            </label>

                            <div className="modal-action">
                              <button type="button" className="btn" onClick={() => document.getElementById(`alterar-${ordem.idOrdem}`).close()}>Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleAlterarOrdemClick(ordem.idOrdem)}
                              >
                                Salvar Alterações
                              </button>
                            </div>
                          </form>
                        </div>
                      </dialog>

                      <button className="btn btn-sm btn-error" onClick={() => deletar(ordem.idOrdem)}>Deletar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}