import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import { fetchMateriasPrimas } from '../../features/materiaPrima/materiaPrimaAPI';
import MateriaPrima from '../../features/materiaPrima/materiaPrima';

export default function MateriaPrimaPage() {
  const dispatch = useDispatch();
  const [materiasPrimas, setMateriasPrimas] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Matéria-Prima' }));
    fetchMateriasPrimas()
      .then(setMateriasPrimas)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err);
        alert('Erro ao buscar registros de matéria-prima.');
      });
  }, []);

  return (
    <MateriaPrima lista={materiasPrimas} />
  );
}
