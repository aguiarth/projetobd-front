import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice' 
import { fetchConta } from '../../features/contas/contaAPI'
import Conta from '../../features/contas/conta'

export default function ContaPage() {
  const dispatch = useDispatch()
  const [contas, setContas] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Conta" }))
    fetchConta()
      .then(setContas)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros de contas.')
      })
  }, [])

  return (
      <Conta lista={contas} setLista={setContas} />
  )
}
