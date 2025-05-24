import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchProdutosAcabados,
  fetchProdutoAcabadoById,
  deleteProdutoAcabado,
  updateProdutoAcabado,
  inputProdutoAcabado
} from '../../features/produtoAcabado/produtoAcabadoAPI';

export default function ProdutoAcabadoLista() {
  const [produtos, setProdutos] = useState([]);
  const [id, setId] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchProdutosAcabados().then(setProdutos);
  }, []);

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.');
      return;
    }

    const res = await fetchProdutoAcabadoById(id);
    if (res) {
      setErro(null);
      setProdutos([res]);
    } else {
      setErro('Nenhum registro encontrado.');
      setProdutos([]);
    }
  };

  const limparBusca = async () => {
    setId('');
    setErro(null);
    const dados = await fetchProdutosAcabados();
    setProdutos(dados);
  };

  const deletar = async (id) => {
    const ok = await deleteProdutoAcabado(id);
    if (ok) {
      setProdutos(prev => prev.filter(p => p.idProduto !== id));
    } else {
      alert('Erro ao deletar registro.');
    }
  };

  return (
    <>
      <TitleCard
        title="Produtos Acabados Cadastrados"
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
          Novo Produto Acabado
        </button>

        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Novo Produto Acabado</h3>
            <form method="dialog" className="space-y-3">
              <input type="text" placeholder="Descrição" id="novaDescricao" className="input input-bordered w-full" />
              <input type="date" id="novaFinalizacao" className="input input-bordered w-full" />
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const descricao = document.getElementById('novaDescricao').value;
                    const dataFinalizacao = document.getElementById('novaFinalizacao').value;

                    if (!descricao || !dataFinalizacao) {
                      alert('Preencha todos os campos corretamente.');
                      return;
                    }

                    const novo = await inputProdutoAcabado(descricao, dataFinalizacao);

                    if (novo) {
                      setProdutos(prev => [...prev, novo]);
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
                <th>Data de Finalização</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                produtos.map((p) => (
                  <tr key={p.idProduto}>
                    <td className="font-bold">{p.idProduto}</td>
                    <td>{p.descricao}</td>
                    <td>{p.dataFinalizacao}</td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm btn-primary" onClick={() => document.getElementById(`alterar-${p.idProduto}`).showModal()}>Alterar</button>
                      <dialog id={`alterar-${p.idProduto}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Produto Acabado</h3>
                          <form method="dialog" className="space-y-2">
                            <input type="text" defaultValue={p.descricao} id={`desc-${p.idProduto}`} className="input input-bordered w-full" />
                            <input type="date" defaultValue={p.dataFinalizacao} id={`finalizacao-${p.idProduto}`} className="input input-bordered w-full" />
                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const desc = document.getElementById(`desc-${p.idProduto}`).value;
                                  const finalizacao = document.getElementById(`finalizacao-${p.idProduto}`).value;

                                  const atualizado = await updateProdutoAcabado(p.idProduto, desc, finalizacao);

                                  if (atualizado) {
                                    setProdutos(prev => prev.map(item => item.idProduto === p.idProduto ? atualizado : item));
                                    document.getElementById(`alterar-${p.idProduto}`).close();
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
                      <button className="btn btn-sm btn-error" onClick={() => deletar(p.idProduto)}>Deletar</button>
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