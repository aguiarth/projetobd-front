import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import { fetchExpedicoes } from '../../features/expedicao/expedicaoAPI'
import Expedicao from '../../features/expedicao/expedicao'

export default function ExpedicaoPage() {
    const dispatch = useDispatch()
    const [expedicoes, setExpedicoes] = useState([])

    useEffect(() => {
        dispatch(setPageTitle({ title: "Expedição" }))
        fetchExpedicoes()
            .then(setExpedicoes)
            .catch((err) => {
                console.error('Erro ao buscar dados:', err)
                alert('Erro ao buscar registros de expedição.')
            })
    }, [])

    return (
        <Expedicao lista={expedicoes} />
    )
}
