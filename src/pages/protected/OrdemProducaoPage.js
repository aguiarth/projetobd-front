import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import { fetchOrdensProducao } from '../../features/ordemProducao/ordemProducaoAPI'
import OrdemProducao from '../../features/ordemProducao/ordemProducao'

export default function OrdemProducaoPage() {
    const dispatch = useDispatch()
    const [ordensProducao, setOrdensProducao] = useState([])

    useEffect(() => {
        dispatch(setPageTitle({ title: "Ordem de Produção" }))
        fetchOrdensProducao()
            .then(setOrdensProducao)
            .catch((err) => {
                console.error('Erro ao buscar dados:', err)
                alert('Erro ao buscar registros de ordem de produção.')
            })
    }, [])

    return (
        <OrdemProducao lista={ordensProducao} />
    )
}
