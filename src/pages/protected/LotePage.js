import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import { fetchLotes } from '../../features/lote/loteAPI';
import Lote from '../../features/lote/lote';

export default function LotePage() {
  const dispatch = useDispatch();
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Lotes' }));
    fetchLotes()
      .then(setLotes)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err);
        alert('Erro ao buscar registros de lotes.');
      });
  }, []);

  return (
    <Lote lista={lotes} />
  );
}
