import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { fetchFinanceiros, fetchFinanceiroById } from '../../features/financeiro/financeiroAPI'

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

  return (
    <>

    <TitleCard title="Financeiros Cadastrados" topMargin="mt-2" TopSideButtons={

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
    }>

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
                <td colSpan={4} className="text-center text-gray-500">Nenhum dado para exibir.</td>
              </tr>
            ) : (
              financeiros.map((f) => (
                <tr key={f.idFinanceiro}>
                  <td>{f.idFinanceiro}</td>
                  <td>{f.historicoLucro}</td>
                  <td>{f.historicoPrejuizo}</td>
                  <td>{f.dataAtualizacao}</td>
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
