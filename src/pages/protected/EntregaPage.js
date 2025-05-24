import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice' 
import { fetchEntregas } from '../../features/entrega/entregaAPI'
import Entrega from '../../features/entrega/entrega'

export default function EntregaPage() {
  const dispatch = useDispatch()
  const [entregas, setEntregas] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Entrega" }))
    fetchEntregas()
      .then(setEntregas)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros da entrega.')
      })
  }, [])

  return (
      <Entrega lista={entregas} />
  )
}
