import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice' 
import { fetchFinanceiros } from '../../features/financeiro/financeiroAPI'
import FinanceiroLista from '../../features/financeiro/FinanceiroLista'

export default function FinanceiroPage() {
  const dispatch = useDispatch()
  const [financeiros, setFinanceiros] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Financeiros" }))
    fetchFinanceiros()
      .then(setFinanceiros)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros do financeiro.')
      })
  }, [])

  return (
      <FinanceiroLista lista={financeiros} />
  )
}
