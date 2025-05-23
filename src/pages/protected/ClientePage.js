import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice' 
import { fetchCliente } from '../../features/cliente/clienteAPI'
import Cliente from '../../features/cliente/cliente'

export default function ClientePage() {
  const dispatch = useDispatch()
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Cliente" }))
    fetchCliente()
      .then(setClientes)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros de clientes.')
      })
  }, [])

  return (
      <Cliente lista={clientes} setLista={setClientes} />
  )
}
