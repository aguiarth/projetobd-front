import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchContaReceber,
  fetchContaReceberById,
  deleteContaReceber,
  inputContaReceber,
  fetchContaById
} from '../../features/contasReceber/contasReceberAPI'

export default function ContaReceber() {
  const [contas, setContas] = useState([])
  const [id, setId] = useState('')
  const [erro, setErro] = useState(null)
  const [contaDetalhe, setContaDetalhe] = useState(null)

  useEffect(() => {
    fetchContaReceber().then(setContas)
  }, [])

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.')
      return
    }

    const res = await fetchContaReceberById(id)
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
    const dados = await fetchContaReceber()
    setContas(dados)
  }

  const deletar = async (id) => {
    const ok = await deleteContaReceber(id)
    if (ok) {
      setContas(prev => prev.filter(c => c.idConta !== id))
    } else {
      alert('Erro ao deletar registro.')
    }
  }

  const abrirDetalhes = async (idConta) => {
    const conta = await fetchContaById(idConta)
    if (!conta) {
      alert('Conta não encontrada.')
      return
    }
    setContaDetalhe(conta)
    document.getElementById('popupModalDetalhes').showModal()
  }

  return (
    <>
      <TitleCard
        title="Contas a Receber"
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
          Nova Conta a Receber
        </button>

        {/* Modal Inserir */}
        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Vincular Conta à ContaReceber</h3>
            <form method="dialog" className="space-y-3">
              <div>
                <label className="label text-sm">ID da Conta Existente</label>
                <input type="number" className="input input-bordered w-full" id="idConta" />
              </div>
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const idConta = parseInt(document.getElementById('idConta').value)

                    if (isNaN(idConta)) {
                      alert('Preencha corretamente o ID da conta.')
                      return
                    }

                    const resp = await inputContaReceber(idConta)

                    if (resp) {
                      setContas(prev => [...prev, resp])
                      document.getElementById('popupModalInserir').close()
                    } else {
                      alert('Erro ao vincular conta a receber.')
                    }
                  }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* Modal Detalhes */}
        <dialog id="popupModalDetalhes" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Detalhes da Conta</h3>
            {contaDetalhe ? (
              <div className="space-y-2">
                <p><strong>ID Conta:</strong> {contaDetalhe.idConta}</p>
                <p><strong>ID Financeiro:</strong> {contaDetalhe.idFinanceiro}</p>
                <p><strong>Data Emissão:</strong> {contaDetalhe.dataEmissao}</p>
                <p><strong>Data Vencimento:</strong> {contaDetalhe.dataVencimento}</p>
                <p><strong>Valor Total:</strong> {contaDetalhe.valorTotal}</p>
                <p><strong>Status:</strong> {contaDetalhe.status}</p>
              </div>
            ) : (
              <p>Carregando...</p>
            )}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Fechar</button>
              </form>
            </div>
          </div>
        </dialog>

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th >ID Conta</th>
                <th >Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                contas.map((c) => (
                  <tr key={c.idConta}>
                    <td>{c.idConta}</td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => abrirDetalhes(c.idConta)}
                      >
                        Ver Detalhes
                      </button>

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
                          <p className="py-4">Essa ação remove o vínculo com ContaReceber, mas não exclui a Conta base.</p>
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
