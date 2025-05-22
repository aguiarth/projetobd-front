import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchConta,
  fetchContaById,
  deleteConta,
  updateConta,
  inputConta
} from '../../features/contas/contaAPI'

export default function Conta() {
  const [contas, setContas] = useState([])
  const [id, setId] = useState('')
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetchConta().then(setContas)
  }, [])

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.')
      return
    }

    const res = await fetchContaById(id)
    if (res) {
      setErro(null)
      setContas([res])
    } else {
      setErro('Nenhum registro encontrado.')
      setContas([])
    }
  }

  const limparBusca = async () => {
    setId('')
    setErro(null)
    const dados = await fetchConta()
    setContas(dados)
  }

  const deletar = async (id) => {
    const ok = await deleteConta(id)
    if (ok) {
      setContas(prev => prev.filter(c => c.idConta !== id))
    } else {
      alert('Erro ao deletar registro.')
    }
  }

  return (
    <>
      <TitleCard
        title="Contas Cadastradas"
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
          Nova Conta
        </button>

        {/* Modal Inserir */}
        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Nova Conta</h3>
            <form method="dialog" className="space-y-3">
              <div>
                <label className="label text-sm">ID Financeiro</label>
                <input type="number" className="input input-bordered w-full" id="idFinanceiro" />
              </div>
              <div>
                <label className="label text-sm">Data de Vencimento</label>
                <input type="date" className="input input-bordered w-full" id="dataVencimento" />
              </div>
              <div>
                <label className="label text-sm">Valor Total</label>
                <input type="number" className="input input-bordered w-full" id="valorTotal" />
              </div>
              <div>
                <label className="label text-sm">Status</label>
                <select id="status" className="select select-bordered w-full">
                  <option value="PENDENTE">PENDENTE</option>
                  <option value="PAGO">PAGO</option>
                  <option value="VENCIDO">VENCIDO</option>
                </select>
              </div>
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const idFinanceiro = parseInt(document.getElementById('idFinanceiro').value)
                    const dataVencimento = document.getElementById('dataVencimento').value
                    const valorTotal = parseFloat(document.getElementById('valorTotal').value)
                    const status = document.getElementById('status').value
                    const dataEmissao = new Date().toISOString().split('T')[0]

                    if (isNaN(idFinanceiro) || isNaN(valorTotal) || !dataVencimento || !status) {
                        alert('Preencha todos os campos corretamente.')
                        return
                    }

                    const resp = await fetch(`http://localhost:8081/api/financeiros/${idFinanceiro}`)
                    if (!resp.ok) {
                        alert(`Financeiro com ID ${idFinanceiro} não encontrado.`)
                        return
                    }

                    const nova = await inputConta(idFinanceiro, dataEmissao, dataVencimento, valorTotal, status)


                    if (nova) {
                      setContas(prev => [...prev, nova])
                      document.getElementById('popupModalInserir').close()
                    } else {
                      alert('Erro ao inserir.')
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
                <th>ID Financeiro</th>
                <th>Data Emissão</th>
                <th>Data Vencimento</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                contas.map((c) => (
                  <tr key={c.idConta}>
                    <td>{c.idConta}</td>
                    <td>{c.idFinanceiro}</td>
                    <td>{c.dataEmissao}</td>
                    <td>{c.dataVencimento}</td>
                    <td>{c.valorTotal}</td>
                    <td>{c.status}</td>
                    <td className="flex gap-3">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          document.getElementById(`popupModalAlterar-${c.idConta}`).showModal()
                        }
                      >
                        Alterar
                      </button>

                      <dialog id={`popupModalAlterar-${c.idConta}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Conta</h3>
                          <form method="dialog" className="space-y-3">
                            <div>
                              <label className="label text-sm">Data Vencimento</label>
                              <input
                                type="date"
                                className="input input-bordered w-full"
                                defaultValue={c.dataVencimento}
                                id={`vencimento-${c.idConta}`}
                              />
                            </div>
                            <div>
                              <label className="label text-sm">Valor Total</label>
                              <input
                                type="number"
                                className="input input-bordered w-full"
                                defaultValue={c.valorTotal}
                                id={`valor-${c.idConta}`}
                              />
                            </div>
                            <div>
                              <label className="label text-sm">Status</label>
                              <select
                                defaultValue={c.status}
                                id={`status-${c.idConta}`}
                                className="select select-bordered w-full"
                              >
                                <option value="PENDENTE">PENDENTE</option>
                                <option value="PAGO">PAGO</option>
                                <option value="VENCIDO">VENCIDO</option>
                              </select>
                            </div>
                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const vencimento = document.getElementById(`vencimento-${c.idConta}`).value
                                  const valor = parseFloat(document.getElementById(`valor-${c.idConta}`).value)
                                  const status = document.getElementById(`status-${c.idConta}`).value

                                  const atualizado = await updateConta(
                                    c.idConta,
                                    c.idFinanceiro,
                                    c.dataEmissao,
                                    vencimento,
                                    valor,
                                    status
                                  )

                                  if (atualizado) {
                                    setContas(prev =>
                                      prev.map(item =>
                                        item.idConta === c.idConta ? atualizado : item
                                      )
                                    )
                                    document.getElementById(`popupModalAlterar-${c.idConta}`).close()
                                  } else {
                                    alert('Erro ao atualizar.')
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
                        onClick={() =>
                          document.getElementById(`popupModalDeletar-${c.idConta}`).showModal()
                        }
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${c.idConta}`} className="modal">
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
                                await deletar(c.idConta)
                                document.getElementById(`popupModalDeletar-${c.idConta}`).close()
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
  )
}
