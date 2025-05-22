import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice' 
import { fetchContaReceber } from '../../features/contasReceber/contasReceberAPI'
import ContaReceber from '../../features/contasReceber/contaReceber'

export default function ContaPage() {
  const dispatch = useDispatch()
  const [contas, setContas] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Contas a Receber" }))
    fetchContaReceber()
      .then(setContas)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros de contas a receber.')
      })
  }, [])

  return (
      <ContaReceber lista={contas} setLista={setContas} />
  )
}
