// Página completa adaptada para Fornecedor, com condições de pagamento do tipo dropdown

import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchFornecedor,
  fetchFornecedorById,
  deleteFornecedor,
  updateFornecedor,
  inputFornecedor
} from '../../features/fornecedor/fornecedorAPI'

export default function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([])
  const [cnpjBusca, setCnpjBusca] = useState('')
  const [erro, setErro] = useState(null)
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null)

  useEffect(() => {
    fetchFornecedor().then(setFornecedores)
  }, [])

  const buscar = async () => {
    if (!cnpjBusca.trim()) {
      alert('Digite um CNPJ válido.')
      return
    }

    const res = await fetchFornecedorById(cnpjBusca)
    if (res) {
      setErro(null)
      setFornecedores([res])
    } else {
      setErro('Nenhum registro encontrado.')
      setFornecedores([])
    }
  }

  const limparBusca = async () => {
    setCnpjBusca('')
    setErro(null)
    const dados = await fetchFornecedor()
    setFornecedores(dados)
  }

  const deletar = async (cnpj) => {
    const ok = await deleteFornecedor(cnpj)
    if (ok) {
      setFornecedores(prev => prev.filter(f => f.cnpj !== cnpj))
    } else {
      alert('Erro ao deletar registro.')
    }
  }

  return (
    <>
      <TitleCard
        title="Fornecedores Cadastrados"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="text"
              placeholder="Buscar por CNPJ"
              className="input input-bordered w-52"
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
          Novo Fornecedor
        </button>

        {/* Modal Inserir */}
        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Novo Fornecedor</h3>
            <form method="dialog" className="space-y-3">
              <input type="text" placeholder="CNPJ" className="input input-bordered w-full" id="novoCnpj" />
              <input type="text" placeholder="Razão Social" className="input input-bordered w-full" id="novoRazao" />
              <input type="text" placeholder="Endereço" className="input input-bordered w-full" id="novoEndereco" />
              <input type="text" placeholder="Telefone" className="input input-bordered w-full" id="novoTelefone" />
              <label className="label text-sm">Condições de Pagamento</label>
              <select id="novoCondicoes" className="select select-bordered w-full">
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
                    const cnpj = document.getElementById('novoCnpj').value
                    const razaoSocial = document.getElementById('novoRazao').value
                    const endereco = document.getElementById('novoEndereco').value
                    const telefone = document.getElementById('novoTelefone').value
                    const condicoesPagamento = document.getElementById('novoCondicoes').value

                    const novo = await inputFornecedor(cnpj, razaoSocial, endereco, telefone, condicoesPagamento)

                    if (novo) {
                      setFornecedores(prev => [...prev, novo])
                      document.getElementById('popupModalInserir').close()
                    } else {
                      alert('Erro ao inserir fornecedor.')
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
                <th>CNPJ</th>
                <th>Razão Social</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Condições Pagamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                fornecedores.map((f) => (
                  <tr key={f.cnpj}>
                    <td>{f.cnpj}</td>
                    <td>{f.razaoSocial}</td>
                    <td>{f.endereco}</td>
                    <td>{f.telefone}</td>
                    <td>{f.condicoesPagamento}</td>
                    <td className="flex gap-3">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setFornecedorSelecionado(f)
                          document.getElementById('popupModalEditar').showModal()
                        }}
                      >Alterar</button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          document.getElementById(`popupModalDeletar-${f.cnpj}`).showModal()
                        }}
                      >Deletar</button>
                      <dialog id={`popupModalDeletar-${f.cnpj}`} className="modal">
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
                                await deletar(f.cnpj)
                                document.getElementById(`popupModalDeletar-${f.cnpj}`).close()
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
        {fornecedorSelecionado && (
          <div className="modal-box">
            <h3 className="font-bold text-lg">Alterar Fornecedor</h3>
            <form method="dialog" className="space-y-3">
              <input defaultValue={fornecedorSelecionado.razaoSocial} className="input input-bordered w-full" id="editarRazao" />
              <input defaultValue={fornecedorSelecionado.endereco} className="input input-bordered w-full" id="editarEndereco" />
              <input defaultValue={fornecedorSelecionado.telefone} className="input input-bordered w-full" id="editarTelefone" />
              <select defaultValue={fornecedorSelecionado.condicoesPagamento} id="editarCondicoes" className="select select-bordered w-full">
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
                    const razaoSocial = document.getElementById('editarRazao').value
                    const endereco = document.getElementById('editarEndereco').value
                    const telefone = document.getElementById('editarTelefone').value
                    const condicoesPagamento = document.getElementById('editarCondicoes').value

                    const atualizado = await updateFornecedor(
                      fornecedorSelecionado.cnpj,
                      razaoSocial,
                      endereco,
                      telefone,
                      condicoesPagamento
                    )

                    if (atualizado) {
                      setFornecedores(prev =>
                        prev.map(item => item.cnpj === fornecedorSelecionado.cnpj ? atualizado : item)
                      )
                      document.getElementById('popupModalEditar').close()
                      setFornecedorSelecionado(null)
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