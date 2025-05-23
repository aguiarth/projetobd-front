import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import { fetchEstoques } from '../../features/estoque/estoqueAPI';
import Estoque from '../../features/estoque/estoque';

export default function EstoquePage() {
  const dispatch = useDispatch();
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Estoque' }));
    fetchEstoques()
      .then(setEstoques)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err);
        alert('Erro ao buscar registros de estoque.');
      });
  }, [dispatch]);

  return (
    <Estoque lista={estoques} />
  );
}
