import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchContaPagar,
  fetchContaRPagarById,
  deleteContaPagar,
  inputContaPagar,
  fetchContaById,
  fetchFornecedorById
} from '../../features/contasPagar/contaPagarAPI'

export default function ContaPagar() {
  const [contas, setContas] = useState([])
  const [id, setId] = useState('')
  const [cnpjBusca, setCnpjBusca] = useState('')
  const [erro, setErro] = useState(null)
  const [contaDetalhe, setContaDetalhe] = useState(null)
  const [fornecedorDetalhe, setFornecedorDetalhe] = useState(null)


  useEffect(() => {
    fetchContaPagar().then(setContas)
  }, [])

  const buscar = async () => {
    if (!id.trim() || !cnpjBusca.trim()) {
      alert('Digite ID e CNPJ válidos.')
      return
    }
    const res = await fetchContaRPagarById(id, cnpjBusca)
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
    setCnpjBusca('')
    setErro(null)
    const dados = await fetchContaPagar()
    setContas(dados)
  }

  const deletar = async (id, cnpj) => {
    const ok = await deleteContaPagar(id, cnpj)
    if (ok) {
      setContas(prev => prev.filter(c => !(c.idConta === id && c.cnpj === cnpj)))
    } else {
      alert('Erro ao deletar registro.')
    }
  }

  const abrirDetalhes = async (idConta, cnpj) => {
    const conta = await fetchContaById(idConta)
    const fornecedor = await fetchFornecedorById(cnpj)

    if (!conta || !fornecedor) {
        alert('Conta ou fornecedor não encontrados.')
        return
    }

    setContaDetalhe(conta)
    setFornecedorDetalhe(fornecedor)
    document.getElementById('popupModalDetalhes').showModal()
  }

  return (
    <>
      <TitleCard
        title="Contas a Pagar"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="number"
              placeholder="Buscar por ID"
              className="input input-bordered w-32"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Buscar por CNPJ"
              className="input input-bordered w-40"
              value={cnpjBusca}
              onChange={(e) => setCnpjBusca(e.target.value)}
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
          Nova Conta a Pagar
        </button>

        {/* Modal Inserir */}
        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Vincular Conta à ContaPagar</h3>
            <form method="dialog" className="space-y-3">
              <div>
                <label className="label text-sm">ID da Conta</label>
                <input type="number" className="input input-bordered w-full" id="idConta" />
              </div>
              <div>
                <label className="label text-sm">CNPJ do Fornecedor</label>
                <input type="text" className="input input-bordered w-full" id="cnpjFornecedor" />
              </div>
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const idConta = parseInt(document.getElementById('idConta').value)
                    const cnpj = document.getElementById('cnpjFornecedor').value.trim()

                    if (isNaN(idConta) || !cnpj) {
                      alert('Preencha corretamente os dados.')
                      return
                    }

                    const fornecedor = await fetchFornecedorById(cnpj)
                    if (!fornecedor) {
                      alert(`Fornecedor com CNPJ ${cnpj} não encontrado.`)
                      return
                    }

                    const resp = await inputContaPagar(idConta, cnpj)

                    if (resp) {
                      setContas(prev => [...prev, resp])
                      document.getElementById('popupModalInserir').close()
                    } else {
                      alert('Erro ao vincular conta a pagar.')
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
            {contaDetalhe && fornecedorDetalhe ? (
            <div className="space-y-2">
                <p><strong>ID Conta:</strong> {contaDetalhe.idConta}</p>
                <p><strong>ID Financeiro:</strong> {contaDetalhe.idFinanceiro}</p>
                <p><strong>Data Emissão:</strong> {contaDetalhe.dataEmissao}</p>
                <p><strong>Data Vencimento:</strong> {contaDetalhe.dataVencimento}</p>
                <p><strong>Valor Total:</strong> {contaDetalhe.valorTotal}</p>
                <p><strong>Status:</strong> {contaDetalhe.status}</p>
                <hr />
                <h3 className="font-bold text-lg">Detalhes do Fornecedor</h3>
                <p><strong>CNPJ:</strong> {fornecedorDetalhe.cnpj}</p>
                <p><strong>Razão Social:</strong> {fornecedorDetalhe.razaoSocial}</p>
                <p><strong>Endereço:</strong> {fornecedorDetalhe.endereco}</p>
                <p><strong>Telefone:</strong> {fornecedorDetalhe.telefone}</p>
                <p><strong>Condições de Pagamento:</strong> {fornecedorDetalhe.condicoesPagamento}</p>
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
                <th>ID Conta</th>
                <th>CNPJ Fornecedor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                contas.map((c) => (
                  <tr key={`${c.idConta}-${c.cnpj}`}>
                    <td>{c.idConta}</td>
                    <td>{c.cnpj}</td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => abrirDetalhes(c.idConta, c.cnpj)}
                      >
                        Ver Detalhes
                      </button>

                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => document.getElementById(`popupModalDeletar-${c.idConta}-${c.cnpj}`).showModal()}
                      >
                        Deletar
                      </button>

                      <dialog id={`popupModalDeletar-${c.idConta}-${c.cnpj}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Tem certeza?</h3>
                          <p className="py-4">Essa ação remove o vínculo com ContaPagar, mas não exclui a Conta base.</p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Cancelar</button>
                            </form>
                            <button
                              className="btn btn-error"
                              onClick={async () => {
                                await deletar(c.idConta, c.cnpj)
                                document.getElementById(`popupModalDeletar-${c.idConta}-${c.cnpj}`).close()
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