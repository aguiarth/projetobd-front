import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchExpedicoes,
  fetchExpedicaoById,
  deleteExpedicao,
  updateExpedicao,
  inputExpedicao
} from '../../features/expedicao/expedicaoAPI';

export default function ExpedicaoLista() {
  const [expedicoes, setExpedicoes] = useState([]);
  const [id, setId] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchExpedicoes().then(setExpedicoes);
  }, []);

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.');
      return;
    }

    const res = await fetchExpedicaoById(id);
    if (res) {
      setErro(null);
      setExpedicoes([res]);
    } else {
      setErro('Nenhum registro encontrado.');
      setExpedicoes([]);
    }
  };

  const limparBusca = async () => {
    setId('');
    setErro(null);
    const dados = await fetchExpedicoes();
    setExpedicoes(dados);
  };

  const deletar = async (id) => {
    const ok = await deleteExpedicao(id);
    if (ok) {
      setExpedicoes(prev => prev.filter(e => e.idExpedicao !== id));
    } else {
      alert('Erro ao deletar registro.');
    }
  };

  return (
    <>
      <TitleCard
        title="Expedições"
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
          onClick={() => document.getElementById('popupInserirExpedicao').showModal()}
        >
          Nova Expedição
        </button>

        <dialog id="popupInserirExpedicao" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Expedição</h3>
            <form method="dialog" className="space-y-3">
              <select id="novoStatus" className="select select-bordered w-full">
                <option value="">Selecione o status</option>
                <option value="PENDENTE">Pendente</option>
                <option value="ENVIADO">Enviado</option>
              </select>

              <p className="text-sm text-gray-500">
                ID, Data e hora são geradas automaticamente.
              </p>

              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const status = document.getElementById('novoStatus').value;

                    if (!status) {
                      alert('Preencha todos os campos.');
                      return;
                    }

                    const now = new Date();
                    const data = now.toISOString().split('T')[0];
                    const hora = now.toTimeString().split(' ')[0];

                    const novo = await inputExpedicao(data, hora, status);

                    if (novo) {
                      setExpedicoes(prev => [...prev, novo]);
                      document.getElementById('popupInserirExpedicao').close();
                    } else {
                      alert('Erro ao inserir expedição.');
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
                <th>Data</th>
                <th>Hora</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {expedicoes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                expedicoes.map((e) => (
                  <tr key={e.idExpedicao}>
                    <td className="font-bold">{e.idExpedicao}</td>
                    <td>{e.dataExpedicao}</td>
                    <td>{e.horaExpedicao}</td>
                    <td>{e.status}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => document.getElementById(`editar-${e.idExpedicao}`).showModal()}
                      >
                        Alterar
                      </button>

                      <dialog id={`editar-${e.idExpedicao}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Status</h3>
                          <form method="dialog" className="space-y-2">
                            <select defaultValue={e.status} id={`status-${e.idExpedicao}`} className="select select-bordered w-full">
                              <option value="PENDENTE">Pendente</option>
                              <option value="ENVIADO">Enviado</option>
                            </select>
                            <p className="text-sm text-gray-500">
                              Apenas o status pode ser alterado.
                            </p>

                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const novoStatus = document.getElementById(`status-${e.idExpedicao}`).value;

                                  const atualizado = await updateExpedicao(e.idExpedicao, novoStatus);

                                  if (atualizado) {
                                    setExpedicoes(prev =>
                                      prev.map(item =>
                                        item.idExpedicao === e.idExpedicao ? atualizado : item
                                      )
                                    );
                                    document.getElementById(`editar-${e.idExpedicao}`).close();
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
                        onClick={() => document.getElementById(`popupModalDeletar-${e.idExpedicao}`).showModal()}
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${e.idExpedicao}`} className="modal">
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
                                await deletar(e.idExpedicao);
                                document.getElementById(`popupModalDeletar-${e.idExpedicao}`).close();
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
