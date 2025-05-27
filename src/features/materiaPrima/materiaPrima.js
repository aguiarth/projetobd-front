import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchMateriasPrimas,
  fetchMateriaPrimaById,
  deleteMateriaPrima,
  updateMateriaPrima,
  inputMateriaPrima
} from '../../features/materiaPrima/materiaPrimaAPI';

export default function MateriaPrimaLista() {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [id, setId] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchMateriasPrimas().then(setMateriasPrimas);
  }, []);

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.');
      return;
    }

    const res = await fetchMateriaPrimaById(id);
    if (res) {
      setErro(null);
      setMateriasPrimas([res]);
    } else {
      setErro('Nenhum registro encontrado.');
      setMateriasPrimas([]);
    }
  };

  const limparBusca = async () => {
    setId('');
    setErro(null);
    const dados = await fetchMateriasPrimas();
    setMateriasPrimas(dados);
  };

  const deletar = async (id) => {
    const ok = await deleteMateriaPrima(id);
    if (ok) {
      setMateriasPrimas(prev => prev.filter(m => m.idMateriaPrima !== id));
    } else {
      alert('Erro ao deletar registro.');
    }
  };

  return (
    <>
      <TitleCard
        title="Matérias-Primas Cadastradas"
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
          Nova Matéria-Prima
        </button>

        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Nova Matéria-Prima</h3>
            <form method="dialog" className="space-y-3">
              <input type="text" placeholder="Descrição" id="novaDescricao" className="input input-bordered w-full" />
              <input type="date" id="novaValidade" className="input input-bordered w-full" />
              <input type="number" placeholder="Quantidade" id="novaQuantidade" className="input input-bordered w-full" />
              <input type="number" placeholder="Custo Unitário" id="novoCusto" className="input input-bordered w-full" />
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const descricao = document.getElementById('novaDescricao').value;
                    const dataValidade = document.getElementById('novaValidade').value;
                    const quantidade = parseInt(document.getElementById('novaQuantidade').value);
                    const custoUnitario = parseFloat(document.getElementById('novoCusto').value);
                    const custoTotal = quantidade * custoUnitario;

                    if (!descricao || !dataValidade || isNaN(quantidade) || isNaN(custoUnitario)) {
                      alert('Preencha todos os campos corretamente.');
                      return;
                    }

                    const novo = await inputMateriaPrima(descricao, dataValidade, quantidade, custoUnitario, custoTotal);

                    if (novo) {
                      setMateriasPrimas(prev => [...prev, novo]);
                      document.getElementById('popupModalInserir').close();
                    } else {
                      alert('Erro ao inserir.');
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
                <th>Descrição</th>
                <th>Validade</th>
                <th>Quantidade</th>
                <th>Custo Unitário</th>
                <th>Custo Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {materiasPrimas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                materiasPrimas.map((m) => (
                  <tr key={m.idMateriaPrima}>
                    <td className="font-bold">{m.idMateriaPrima}</td>
                    <td>{m.descricao}</td>
                    <td>{m.dataValidade}</td>
                    <td>{m.quantidade}</td>
                    <td>{m.custoUnitario}</td>
                    <td>{m.custoTotal}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => document.getElementById(`alterar-${m.idMateriaPrima}`).showModal()}
                      >
                        Alterar
                      </button>

                      <dialog id={`alterar-${m.idMateriaPrima}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Matéria-Prima</h3>
                          <form method="dialog" className="space-y-2">
                            <input type="text" defaultValue={m.descricao} id={`desc-${m.idMateriaPrima}`} className="input input-bordered w-full" />
                            <input type="number" defaultValue={m.quantidade} id={`qtde-${m.idMateriaPrima}`} className="input input-bordered w-full" />
                            <input type="number" defaultValue={m.custoUnitario} id={`custo-${m.idMateriaPrima}`} className="input input-bordered w-full" />
                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const desc = document.getElementById(`desc-${m.idMateriaPrima}`).value;
                                  const qtde = parseInt(document.getElementById(`qtde-${m.idMateriaPrima}`).value);
                                  const custo = parseFloat(document.getElementById(`custo-${m.idMateriaPrima}`).value);
                                  const total = qtde * custo;

                                  const atualizado = await updateMateriaPrima(m.idMateriaPrima, desc, qtde, custo, total);

                                  if (atualizado) {
                                    setMateriasPrimas(prev => prev.map(item => item.idMateriaPrima === m.idMateriaPrima ? atualizado : item));
                                    document.getElementById(`alterar-${m.idMateriaPrima}`).close();
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
                        onClick={() => document.getElementById(`popupModalDeletar-${m.idMateriaPrima}`).showModal()}
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${m.idMateriaPrima}`} className="modal">
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
                                await deletar(m.idMateriaPrima);
                                document.getElementById(`popupModalDeletar-${m.idMateriaPrima}`).close();
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
