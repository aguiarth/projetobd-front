import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import { fetchContaPagar } from '../../features/contasPagar/contaPagarAPI'
import ContaPagar from '../../features/contasPagar/contaPagar'

export default function ContaPagarPage() {
  const dispatch = useDispatch()
  const [contas, setContas] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Contas a Pagar" }))
    fetchContaPagar()
      .then(setContas)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros de contas a pagar.')
      })
  }, [])

  return (
    <ContaPagar lista={contas} setLista={setContas} />
  )
}
