import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchLotes,
  fetchLoteById,
  deleteLote,
  updateLote,
  inputLote
} from '../../features/lote/loteAPI';
import { fetchEstoques } from '../../features/estoque/estoqueAPI';
import { fetchMateriasPrimas } from '../../features/materiaPrima/materiaPrimaAPI';
import { fetchProdutosAcabados } from '../../features/produtoAcabado/produtoAcabadoAPI';

export default function LoteLista() {
  const [lotes, setLotes] = useState([]);
  const [id, setId] = useState('');
  const [erro, setErro] = useState(null);
  const [estoques, setEstoques] = useState([]);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchLotes().then(setLotes);
    fetchEstoques().then(setEstoques);
    fetchMateriasPrimas().then(setMateriasPrimas);
    fetchProdutosAcabados().then(setProdutos);
  }, []);

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um código válido.');
      return;
    }

    const res = await fetchLoteById(id);
    if (res) {
      setErro(null);
      setLotes([res]);
    } else {
      setErro('Nenhum registro encontrado.');
      setLotes([]);
    }
  };

  const limparBusca = async () => {
    setId('');
    setErro(null);
    const dados = await fetchLotes();
    setLotes(dados);
  };

  const deletar = async (codigo) => {
    const ok = await deleteLote(codigo);
    if (ok) {
      setLotes(prev => prev.filter(l => l.codigo !== codigo));
    } else {
      alert('Erro ao deletar registro.');
    }
  };

  return (
    <>
      <TitleCard
        title="Lotes Cadastrados"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="text"
              placeholder="Buscar por Código"
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
          Novo Lote
        </button>

        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Novo Lote</h3>
            <form method="dialog" className="space-y-3">
              <select id="idEstoque" className="select select-bordered w-full">
                <option value="">Selecione o Estoque</option>
                {estoques.map(e => (
                  <option key={e.idEstoque} value={e.idEstoque}>{e.idEstoque}</option>
                ))}
              </select>

              <select id="idMateriaPrima" className="select select-bordered w-full">
                <option value="">Selecione a Matéria-Prima</option>
                {materiasPrimas.map(m => (
                  <option key={m.idMateriaPrima} value={m.idMateriaPrima}>{m.idMateriaPrima} - {m.descricao}</option>
                ))}
              </select>

              <select id="idProduto" className="select select-bordered w-full">
                <option value="">Selecione o Produto Acabado</option>
                {produtos.map(p => (
                  <option key={p.idProduto} value={p.idProduto}>{p.idProduto} - {p.descricao}</option>
                ))}
              </select>

              <input type="text" placeholder="Descrição" id="descricao" className="input input-bordered w-full" />
              <input type="text" placeholder="Custo" id="custo" className="input input-bordered w-full" />
              <input type="number" placeholder="Quantidade" id="quantidade" className="input input-bordered w-full" />
              <input type="date" id="dataValidade" className="input input-bordered w-full" />

              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const idEstoque = parseInt(document.getElementById('idEstoque').value);
                    const idMateriaPrima = parseInt(document.getElementById('idMateriaPrima').value);
                    const idProduto = parseInt(document.getElementById('idProduto').value);
                    const custo = document.getElementById('custo').value;
                    const descricao = document.getElementById('descricao').value;
                    const quantidade = parseInt(document.getElementById('quantidade').value);
                    const dataValidade = document.getElementById('dataValidade').value;

                    if (!idEstoque || !idMateriaPrima || !idProduto || !descricao || !custo || isNaN(quantidade) || !dataValidade) {
                      alert('Preencha todos os campos corretamente.');
                      return;
                    }

                    const novo = await inputLote(idEstoque, idMateriaPrima, idProduto, custo, descricao, quantidade, dataValidade);

                    if (novo) {
                      setLotes(prev => [...prev, novo]);
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
                <th>Código</th>
                <th>Estoque</th>
                <th>Matéria-Prima</th>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Custo</th>
                <th>Quantidade</th>
                <th>Validade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lotes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                lotes.map((l) => (
                  <tr key={l.codigo}>
                    <td className="font-bold">{l.codigo}</td>
                    <td>{l.idEstoque}</td>
                    <td>{l.idMateriaPrima}</td>
                    <td>{l.idProduto}</td>
                    <td>{l.descricao}</td>
                    <td>{l.custo}</td>
                    <td>{l.quantidade}</td>
                    <td>{l.dataValidade}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => document.getElementById(`alterar-${l.codigo}`).showModal()}
                      >
                        Alterar
                      </button>

                      <dialog id={`alterar-${l.codigo}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Editar Lote</h3>
                          <form method="dialog" className="space-y-2">
                            <select defaultValue={l.idEstoque} id={`estoque-${l.codigo}`} className="select select-bordered w-full">
                              <option value="">Selecione o Estoque</option>
                              {estoques.map(e => (
                                <option key={e.idEstoque} value={e.idEstoque}>{e.idEstoque}</option>
                              ))}
                            </select>

                            <select defaultValue={l.idMateriaPrima} id={`materia-${l.codigo}`} className="select select-bordered w-full">
                              <option value="">Selecione a Matéria-Prima</option>
                              {materiasPrimas.map(m => (
                                <option key={m.idMateriaPrima} value={m.idMateriaPrima}>{m.idMateriaPrima}</option>
                              ))}
                            </select>

                            <select defaultValue={l.idProduto} id={`produto-${l.codigo}`} className="select select-bordered w-full">
                              <option value="">Selecione o Produto Acabado</option>
                              {produtos.map(p => (
                                <option key={p.idProduto} value={p.idProduto}>{p.idProduto}</option>
                              ))}
                            </select>

                            <input type="text" defaultValue={l.descricao} id={`descricao-${l.codigo}`} className="input input-bordered w-full" />
                            <input type="text" defaultValue={l.custo} id={`custo-${l.codigo}`} className="input input-bordered w-full" />
                            <input type="number" defaultValue={l.quantidade} id={`quantidade-${l.codigo}`} className="input input-bordered w-full" />
                            <input type="date" defaultValue={l.dataValidade} id={`validade-${l.codigo}`} className="input input-bordered w-full" />

                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const idEstoque = parseInt(document.getElementById(`estoque-${l.codigo}`).value);
                                  const idMateriaPrima = parseInt(document.getElementById(`materia-${l.codigo}`).value);
                                  const idProduto = parseInt(document.getElementById(`produto-${l.codigo}`).value);
                                  const descricao = document.getElementById(`descricao-${l.codigo}`).value;
                                  const custo = document.getElementById(`custo-${l.codigo}`).value;
                                  const quantidade = parseInt(document.getElementById(`quantidade-${l.codigo}`).value);
                                  const dataValidade = document.getElementById(`validade-${l.codigo}`).value;

                                  if (!idEstoque || !idMateriaPrima || !idProduto || !descricao || !custo || isNaN(quantidade) || !dataValidade) {
                                    alert('Preencha todos os campos corretamente.');
                                    return;
                                  }

                                  const atualizado = await updateLote(
                                    l.codigo,
                                    idEstoque,
                                    idMateriaPrima,
                                    idProduto,
                                    custo,
                                    descricao,
                                    quantidade,
                                    dataValidade
                                  );

                                  if (atualizado) {
                                    setLotes(prev => prev.map(item => item.codigo === l.codigo ? atualizado : item));
                                    document.getElementById(`alterar-${l.codigo}`).close();
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
                        onClick={() => document.getElementById(`popupModalDeletar-${l.codigo}`).showModal()}
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${l.codigo}`} className="modal">
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
                                await deletar(l.codigo);
                                document.getElementById(`popupModalDeletar-${l.codigo}`).close();
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