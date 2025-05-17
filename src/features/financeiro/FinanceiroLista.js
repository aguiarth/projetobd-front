import React from 'react'
import TitleCard from '../../components/Cards/TitleCard'

export default function FinanceiroLista({ lista }) {
  return (
    <TitleCard title="Financeiros Cadastrados" topMargin="mt-2">
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
            {lista.map((f) => (
              <tr key={f.idFinanceiro}>
                <td>{f.idFinanceiro}</td>
                <td>{f.historicoLucro}</td>
                <td>{f.historicoPrejuizo}</td>
                <td>{f.dataAtualizacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  )
}
