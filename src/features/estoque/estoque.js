import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchEstoques,
  fetchEstoqueById,
  deleteEstoque,
  updateEstoque,
  inputEstoque
} from '../../features/estoque/estoqueAPI';

export default function EstoqueLista() {
  const [estoques, setEstoques] = useState([]);
  const [id, setId] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchEstoques().then(setEstoques);
  }, []);

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.');
      return;
    }

    const res = await fetchEstoqueById(id);
    if (res) {
      setErro(null);
      setEstoques([res]);
    } else {
      setErro('Nenhum registro encontrado.');
      setEstoques([]);
    }
  };

  const limparBusca = async () => {
    setId('');
    setErro(null);
    const dados = await fetchEstoques();
    setEstoques(dados);
  };

  const deletar = async (id) => {
    const ok = await deleteEstoque(id);
    if (ok) {
      setEstoques(prev => prev.filter(e => e.idEstoque !== id));
    } else {
      alert('Erro ao deletar registro.');
    }
  };

  return (
    <>
      <TitleCard
        title="Movimentações de Estoque"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="number"
              placeholder="Buscar por ID"
              className="input input-bordered w-40"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={buscar} className="btn btn-primary btn-sm">Buscar</button>
            <button onClick={limparBusca} className="btn btn-ghost btn-sm">Limpar</button>
          </div>
        }
      >
        <button
          className="mb-8 btn btn-sm btn-accent"
          onClick={() => document.getElementById('popupModalInserir').showModal()}
        >
          Nova Movimentação
        </button>

        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Nova Movimentação</h3>
            <form method="dialog" className="space-y-3">
              <select id="novoTipoMovimentacao" className="select select-bordered w-full">
                <option value="">Selecione o tipo</option>
                <option value="ENTRADA">Entrada</option>
                <option value="SAIDA">Saída</option>
              </select>

              <p className="text-sm text-gray-500">
                Data e hora serão inseridas automaticamente.
              </p>

              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const tipoMovimentacao = document.getElementById('novoTipoMovimentacao').value;

                    if (!tipoMovimentacao) {
                      alert('Selecione um tipo de movimentação.');
                      return;
                    }

                    const novo = await inputEstoque(tipoMovimentacao);

                    if (novo) {
                      setEstoques(prev => [...prev, novo]);
                      document.getElementById('popupModalInserir').close();
                    } else {
                      alert('Erro ao inserir movimentação.');
                    }
                  }}
                >
                  Confirmar
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
                <th>Tipo Movimentação</th>
                <th>Data Movimentação</th>
                <th>Hora Movimentação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {estoques.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                estoques.map((e) => (
                  <tr key={e.idEstoque}>
                    <td className="font-bold">{e.idEstoque}</td>
                    <td>{e.tipoMovimentacao}</td>
                    <td>{e.dataMovimentacao}</td>
                    <td>{new Date('1970-01-01T' + e.horaMovimentacao + 'Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => document.getElementById(`alterar-${e.idEstoque}`).showModal()}
                      >
                        Alterar
                      </button>

                      <dialog id={`alterar-${e.idEstoque}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Movimentação</h3>
                          <form method="dialog" className="space-y-2">
                            <select defaultValue={e.tipoMovimentacao} id={`tipo-${e.idEstoque}`} className="select select-bordered w-full">
                              <option value="ENTRADA">Entrada</option>
                              <option value="SAIDA">Saída</option>
                            </select>
                            <p className="text-sm text-gray-500">
                              Data e hora são geradas automaticamente e não podem ser alteradas.
                            </p>
                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const tipo = document.getElementById(`tipo-${e.idEstoque}`).value;

                                  const atualizado = await updateEstoque(e.idEstoque, tipo);

                                  if (atualizado) {
                                    setEstoques(prev => prev.map(item => item.idEstoque === e.idEstoque ? atualizado : item));
                                    document.getElementById(`alterar-${e.idEstoque}`).close();
                                  } else {
                                    alert('Erro ao atualizar.');
                                  }
                                }}
                              >
                                Salvar
                              </button>
                            </div>
                          </form>
                        </div>
                      </dialog>

                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => document.getElementById(`popupModalDeletar-${e.idEstoque}`).showModal()}
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${e.idEstoque}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Tem certeza?</h3>
                          <p className="py-4">Esta ação não poderá ser desfeita.</p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Cancelar</button>
                            </form>
                            <button
                              className="btn btn-error"
                              onClick={async () => {
                                await deletar(e.idEstoque);
                                document.getElementById(`popupModalDeletar-${e.idEstoque}`).close();
                              }}
                            >
                              Confirmar
                            </button>
                          </div>
                        </div>
                      </dialog>
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
