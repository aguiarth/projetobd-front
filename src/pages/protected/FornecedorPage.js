import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice' 
import { fetchFornecedor } from '../../features/fornecedor/fornecedorAPI'
import Fornecedor from '../../features/fornecedor/fornecedor'

export default function FornecedorPage() {
  const dispatch = useDispatch()
  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    dispatch(setPageTitle({ title: "Fornecedor" }))
    fetchFornecedor()
      .then(setFornecedores)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
        alert('Erro ao buscar registros do fornecedor.')
      })
  }, [])

  return (
      <Fornecedor lista={fornecedores} />
  )
}
