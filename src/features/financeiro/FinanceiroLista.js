import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchFinanceiros,
  fetchFinanceiroById,
  deleteFinanceiro,
  updateFinanceiro
} from '../../features/financeiro/financeiroAPI'

export default function FinanceiroLista() {
  const [financeiros, setFinanceiros] = useState([])
  const [id, setId] = useState('')
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetchFinanceiros().then(setFinanceiros)
  }, [])

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.')
      return
    }

    const res = await fetchFinanceiroById(id)
    if (res) {
      setErro(null)
      setFinanceiros([res])
    } else {
      setErro('Nenhum registro encontrado.')
      setFinanceiros([])
    }
  }

  const limparBusca = async () => {
    setId('')
    setErro(null)
    const dados = await fetchFinanceiros()
    setFinanceiros(dados)
  }

  const deletar = async (id) => {
    const confirm = window.confirm(`Tem certeza que deseja deletar o ID ${id}?`)
    if (!confirm) return

    const ok = await deleteFinanceiro(id)
    if (ok) {
      setFinanceiros(prev => prev.filter(f => f.idFinanceiro !== id))
    } else {
      alert('Erro ao deletar registro.')
    }
  }


  return (
    <>
      <TitleCard
        title="Financeiros Cadastrados"
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
        {erro && (
          <p className="text-red-500 text-sm mb-2">{erro}</p>
        )}

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Histórico de Lucro</th>
                <th>Histórico de Prejuízo</th>
                <th>Data de Atualização</th>
              </tr>
            </thead>
            <tbody>
              {financeiros.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">
                    Nenhum dado para exibir.
                  </td>
                </tr>
              ) : (
                financeiros.map((f) => (
                  <tr key={f.idFinanceiro}>
                    <td>{f.idFinanceiro}</td>
                    <td>{f.historicoLucro}</td>
                    <td>{f.historicoPrejuizo}</td>
                    <td>{f.dataAtualizacao}</td>
                    <td className="flex gap-2">
                      {/* Botão ALTERAR */}
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          document.getElementById(`popupModalAlterar-${f.idFinanceiro}`).showModal()
                        }
                      >
                        Alterar
                      </button>

                      <dialog id={`popupModalAlterar-${f.idFinanceiro}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Financeiro</h3>
                          <form method="dialog" className="space-y-3">
                            <div>
                              <label className="label text-sm">Novo Lucro</label>
                              <input
                                type="number"
                                className="input input-bordered w-full"
                                defaultValue={f.historicoLucro}
                                id={`lucro-${f.idFinanceiro}`}
                              />
                            </div>
                            <div>
                              <label className="label text-sm">Novo Prejuízo</label>
                              <input
                                type="number"
                                className="input input-bordered w-full"
                                defaultValue={f.historicoPrejuizo}
                                id={`prejuizo-${f.idFinanceiro}`}
                              />
                            </div>

                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const lucro = parseFloat(document.getElementById(`lucro-${f.idFinanceiro}`).value)
                                  const prejuizo = parseFloat(document.getElementById(`prejuizo-${f.idFinanceiro}`).value)
                                  const atualizado = await updateFinanceiro(f.idFinanceiro, lucro, prejuizo)

                                  if (atualizado) {
                                    setFinanceiros(prev =>
                                      prev.map(item =>
                                        item.idFinanceiro === f.idFinanceiro ? atualizado : item
                                      )
                                    )
                                  document.getElementById(`popupModalAlterar-${f.idFinanceiro}`).close()
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

                      {/* Botão DELETAR */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() =>
                          document.getElementById(`popupModalDeletar-${f.idFinanceiro}`).showModal()
                        }
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${f.idFinanceiro}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Tem certeza?</h3>
                          <p className="py-4">Esta ação não poderá ser desfeita.</p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Cancelar</button>
                            </form>
                            <button
                              className="btn btn-error"
                              onClick={() => deletar(f.idFinanceiro)}
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
