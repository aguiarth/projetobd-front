import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import {
  fetchCliente,
  fetchClienteById,
  deleteCliente,
  updateCliente,
  inputCliente
} from '../../features/cliente/clienteAPI'

export default function Cliente() {
  const [clientes, setClientes] = useState([])
  const [cnpjBusca, setCnpjBusca] = useState('')
  const [erro, setErro] = useState(null)
  const [clienteSelecionado, setClienteSelecionado] = useState(null)

  useEffect(() => {
    fetchCliente().then(setClientes)
  }, [])

  fetchCliente().then(data => {
  const adaptado = data.map(c => ({
    ...c,
    cnpj: c.cnpjCliente || c.cnpj
  }))
  setClientes(adaptado)
})

  const buscar = async () => {
    if (!cnpjBusca.trim()) {
      alert('Digite um CNPJ válido.')
      return
    }

    const res = await fetchClienteById(cnpjBusca)
    if (res) {
      setErro(null)
      setClientes([res])
    } else {
      setErro('Nenhum registro encontrado.')
      setClientes([])
    }
  }

  const limparBusca = async () => {
    setCnpjBusca('')
    setErro(null)
    const dados = await fetchCliente()
    setClientes(dados)
  }

  const deletar = async (cnpj) => {
    const ok = await deleteCliente(cnpj)
    if (ok) {
      setClientes(prev => prev.filter(f => f.cnpj !== cnpj))
    } else {
      alert('Erro ao deletar registro.')
    }
  }

  const clientesValidos = clientes.filter(c => typeof c.cnpj === 'string' && c.cnpj.trim() !== '')


  return (
    <>
      <TitleCard
        title="Clientes Cadastrados"
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
          Novo Cliente
        </button>

        {/* Modal Inserção */}
        <dialog id="popupModalInserir" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Inserir Novo Cliente</h3>
            <form method="dialog" className="space-y-3">
              <input type="text" placeholder="CNPJ" className="input input-bordered w-full" id="novoCnpj" />
              <input type="text" placeholder="Razão Social" className="input input-bordered w-full" id="novoRazao" />
              <input type="text" placeholder="Rua" className="input input-bordered w-full" id="novoRua" />
              <input type="text" placeholder="Número" className="input input-bordered w-full" id="novoNumero" />
              <input type="text" placeholder="Cidade" className="input input-bordered w-full" id="novoCidade" />
              <input type="text" placeholder="CEP" className="input input-bordered w-full" id="novoCep" />
              <input type="email" placeholder="Email" className="input input-bordered w-full" id="novoEmail" />
              <input type="text" placeholder="Telefones separados por vírgula" className="input input-bordered w-full" id="novoTelefones" />

              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const cnpj = document.getElementById('novoCnpj').value
                    const razaoSocial = document.getElementById('novoRazao').value
                    const rua = document.getElementById('novoRua').value
                    const numero = document.getElementById('novoNumero').value
                    const cidade = document.getElementById('novoCidade').value
                    const cep = document.getElementById('novoCep').value
                    const email = document.getElementById('novoEmail').value
                    const telefonesRaw = document.getElementById('novoTelefones').value

                    const telefones = telefonesRaw.split(',').map(tel => ({ telefoneCliente: tel.trim() }))

                    const novo = await inputCliente(cnpj, razaoSocial, rua, numero, cidade, cep, email, telefones)

                    if (novo) {
                      setClientes(prev => [...prev, novo])
                      document.getElementById('popupModalInserir').close()
                    } else {
                      alert('Erro ao inserir cliente.')
                    }
                  }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {erro && (
          <p className="text-red-500 text-sm mb-2">{erro}</p>
        )}

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>CNPJ</th>
                <th>Razão Social</th>
                <th>Cidade</th>
                <th>Email</th>
                <th>Telefones</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesValidos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                clientesValidos.map((c) => (
                  <tr key={`cliente-${c.cnpj}`}>
                    <td>{c.cnpj}</td>
                    <td>{c.razaoSocial}</td>
                    <td>{c.cidade}</td>
                    <td>{c.email}</td>
                    <td>{c.telefones?.map(t => t.telefoneCliente).join(', ')}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setClienteSelecionado(c)
                          document.getElementById('popupModalEditar').showModal()
                        }}
                      >Alterar</button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => 
                            document.getElementById(`popupModalDeletar-${c.cnpj}`).showModal()
                        }
                      >Deletar</button>

                      <dialog id={`popupModalDeletar-${c.cnpj}`} className="modal">
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
                                await deletar(c.cnpj)
                                document.getElementById(`popupModalDeletar-${c.cnpj}`).close()
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

      
      <dialog id="popupModalEditar" className="modal">
        {clienteSelecionado && (
          <div className="modal-box">
            <h3 className="font-bold text-lg">Alterar Cliente</h3>
            <form method="dialog" className="space-y-3">
              <input defaultValue={clienteSelecionado.razaoSocial} className="input input-bordered w-full" id="editarRazao" />
              <input defaultValue={clienteSelecionado.rua} className="input input-bordered w-full" id="editarRua" />
              <input defaultValue={clienteSelecionado.numero} className="input input-bordered w-full" id="editarNumero" />
              <input defaultValue={clienteSelecionado.cidade} className="input input-bordered w-full" id="editarCidade" />
              <input defaultValue={clienteSelecionado.cep} className="input input-bordered w-full" id="editarCep" />
              <input defaultValue={clienteSelecionado.email} className="input input-bordered w-full" id="editarEmail" />
              <input defaultValue={clienteSelecionado.telefones?.map(t => t.telefoneCliente).join(', ')} className="input input-bordered w-full" id="editarTelefones" />
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={async () => {
                    const razaoSocial = document.getElementById('editarRazao').value
                    const rua = document.getElementById('editarRua').value
                    const numero = document.getElementById('editarNumero').value
                    const cidade = document.getElementById('editarCidade').value
                    const cep = document.getElementById('editarCep').value
                    const email = document.getElementById('editarEmail').value
                    const telefones = document.getElementById('editarTelefones').value
                      .split(',').map(tel => ({ telefoneCliente: tel.trim() }))

                    const atualizado = await updateCliente(clienteSelecionado.cnpj, razaoSocial, rua, numero, cidade, cep, email, telefones)

                    if (atualizado) {
                      setClientes(prev =>
                        prev.map(item => item.cnpj === clienteSelecionado.cnpj ? atualizado : item)
                      )
                      document.getElementById('popupModalEditar').close()
                      setClienteSelecionado(null)
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
        )}
      </dialog>
    </>
  )
}