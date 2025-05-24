import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import { fetchProdutosAcabados } from '../../features/produtoAcabado/produtoAcabadoAPI';
import ProdutoAcabado from '../../features/produtoAcabado/produtoAcabado';

export default function ProdutoAcabadoPage() {
  const dispatch = useDispatch();
  const [produtosAcabados, setProdutosAcabados] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Produto Acabado' }));
    fetchProdutosAcabados()
      .then(setProdutosAcabados)
      .catch((err) => {
        console.error('Erro ao buscar dados:', err);
        alert('Erro ao buscar registros de produto acabado.');
      });
  }, []);

  return (
    <ProdutoAcabado lista={produtosAcabados} />
  );
}
