import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchPedido,
  fetchPedidoById,
  deletePedido,
  updatePedido,
  inputPedido
} from '../../features/pedido/pedidoAPI'

export default function Pedido() {
  const [pedidos, setPedidos] = useState([])
  const [numeroBusca, setNumeroBusca] = useState('')
  const [erro, setErro] = useState(null)
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null)

  useEffect(() => {
    fetchPedido().then(setPedidos)
  }, [])

  const buscar = async () => {
    if (!numeroBusca.trim()) {
      alert('Digite um número de pedido válido.')
      return
    }

    const res = await fetchPedidoById(numeroBusca)
    if (res) {
      setErro(null)
      setPedidos([res])
    } else {
      setErro('Nenhum registro encontrado.')
      setPedidos([])
    }
  }

  const limparBusca = async () => {
    setNumeroBusca('')
    setErro(null)
    const dados = await fetchPedido()
    setPedidos(dados)
  }

  const deletar = async (numero) => {
    const ok = await deletePedido(numero)
    if (ok) {
      setPedidos(prev => prev.filter(p => p.numero !== numero))
    } else {
      alert('Erro ao deletar registro.')
    }
  }

  return (
    <>
      <TitleCard
        title="Pedidos Cadastrados"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="text"
              placeholder="Buscar por Número"
              className="input input-bordered w-52"
              value={numeroBusca}
              onChange={(e) => setNumeroBusca(e.target.value)}
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
          Novo Pedido
        </button>

        {/* Modal Inserir */}
        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Novo Pedido</h3>
            <form method="dialog" className="space-y-3">
              <label className="label text-sm">Data Emissão</label>
              <input type="date" className="input input-bordered w-full" id="novaData" defaultValue={new Date().toISOString().split('T')[0]} />
              <input type="number" placeholder="Valor Total" className="input input-bordered w-full" id="novoValor" />
              <select id="novoStatus" className="select select-bordered w-full">
                <option value="ABERTO">Aberto</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
              <select id="novaForma" className="select select-bordered w-full">
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="CARTAO_DEBITO">Cartão de Débito</option>
                <option value="PIX">PIX</option>
                <option value="BOLETO">Boleto</option>
              </select>
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const dataEmissao = document.getElementById('novaData').value
                    const valorTotal = parseFloat(document.getElementById('novoValor').value)
                    const status = document.getElementById('novoStatus').value
                    const formaPagamento = document.getElementById('novaForma').value

                    const novo = await inputPedido(null, dataEmissao, valorTotal, status, formaPagamento)

                    if (novo) {
                      setPedidos(prev => [...prev, novo])
                      document.getElementById('popupModalInserir').close()
                    } else {
                      alert('Erro ao inserir pedido.')
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
                <th>Número</th>
                <th>Data Emissão</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Forma Pagamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.numero}>
                    <td>{p.numero}</td>
                    <td>{p.dataEmissao}</td>
                    <td>{p.valorTotal}</td>
                    <td>{p.status}</td>
                    <td>{p.formaPagamento}</td>
                    <td className="flex gap-3">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setPedidoSelecionado(p)
                          document.getElementById('popupModalEditar').showModal()
                        }}
                      >Alterar</button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          document.getElementById(`popupModalDeletar-${p.numero}`).showModal()
                        }}
                      >Deletar</button>
                      <dialog id={`popupModalDeletar-${p.numero}`} className="modal">
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
                                await deletar(p.numero)
                                document.getElementById(`popupModalDeletar-${p.numero}`).close()
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

      {/* Modal de edição */}
      <dialog id="popupModalEditar" className="modal">
        {pedidoSelecionado && (
          <div className="modal-box">
            <h3 className="font-bold text-lg">Alterar Pedido</h3>
            <form method="dialog" className="space-y-3">
              <input defaultValue={pedidoSelecionado.dataEmissao} className="input input-bordered w-full" id="editarData" type="date" />
              <input defaultValue={pedidoSelecionado.valorTotal} className="input input-bordered w-full" id="editarValor" type="number" />
              <select defaultValue={pedidoSelecionado.status} id="editarStatus" className="select select-bordered w-full">
                <option value="ABERTO">Aberto</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
              <select defaultValue={pedidoSelecionado.formaPagamento} id="editarForma" className="select select-bordered w-full">
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="CARTAO_DEBITO">Cartão de Débito</option>
                <option value="PIX">PIX</option>
                <option value="BOLETO">Boleto</option>
              </select>
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={async () => {
                    const dataEmissao = document.getElementById('editarData').value
                    const valorTotal = parseFloat(document.getElementById('editarValor').value)
                    const status = document.getElementById('editarStatus').value
                    const formaPagamento = document.getElementById('editarForma').value

                    const atualizado = await updatePedido(
                      pedidoSelecionado.numero,
                      dataEmissao,
                      valorTotal,
                      status,
                      formaPagamento
                    )

                    if (atualizado) {
                      setPedidos(prev => prev.map(item => item.numero === pedidoSelecionado.numero ? atualizado : item))
                      document.getElementById('popupModalEditar').close()
                      setPedidoSelecionado(null)
                    } else {
                      alert('Erro ao atualizar.')
                    }
                  }}
                >Salvar</button>
              </div>
            </form>
          </div>
        )}
      </dialog>
    </>
  )
}