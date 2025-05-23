import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import { fetchPedido } from '../../features/pedido/pedidoAPI'
import Pedido from '../../features/pedido/pedido'

export default function PedidoPage() {
  const dispatch = useDispatch()
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Pedido' }))
    fetchPedido()
      .then(setPedidos)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros de pedidos.')
      })
  }, [])

  return (
    <Pedido lista={pedidos} setLista={setPedidos} />
  )
}
