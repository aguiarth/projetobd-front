import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
  fetchEntregas,
  fetchEntregaById,
  deleteEntrega,
  updateEntrega,
  inputEntrega
} from '../../features/entrega/entregaAPI';
import { fetchExpedicoes } from '../../features/expedicao/expedicaoAPI';

export default function EntregaLista() {
  const [entregas, setEntregas] = useState([]);
  const [expedicoes, setExpedicoes] = useState([]);
  const [numero, setNumero] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchEntregas().then(setEntregas);
    fetchExpedicoes().then(setExpedicoes);
  }, []);

  const buscar = async () => {
    if (!numero.trim()) {
      alert('Digite um número válido.');
      return;
    }

    const res = await fetchEntregaById(numero);
    if (res) {
      setErro(null);
      setEntregas([res]);
    } else {
      setErro('Nenhum registro encontrado.');
      setEntregas([]);
    }
  };

  const limparBusca = async () => {
    setNumero('');
    setErro(null);
    const dados = await fetchEntregas();
    setEntregas(dados);
  };

  const deletar = async (numero) => {
    const ok = await deleteEntrega(numero);
    if (ok) {
      setEntregas(prev => prev.filter(e => e.numeroEntrega !== numero));
    } else {
      alert('Erro ao deletar registro.');
    }
  };

  return (
    <>
      <TitleCard
        title="Entregas"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex items-center justify-end gap-2 mb-4">
            <input
              type="text"
              placeholder="Buscar por Número"
              className="input input-bordered w-40"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <button onClick={buscar} className="btn btn-primary btn-sm">Buscar</button>
            <button onClick={limparBusca} className="btn btn-ghost btn-sm">Limpar</button>
          </div>
        }
      >
        <button
          className="mb-8 btn btn-sm btn-accent"
          onClick={() => document.getElementById('popupNovaEntrega').showModal()}
        >
          Nova Entrega
        </button>

        <dialog id="popupNovaEntrega" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Nova Entrega</h3>
            <form method="dialog" className="space-y-2">

              <select id="idExpedicao" className="select select-bordered w-full">
                <option value="">Selecione a Expedição</option>
                {expedicoes.map(e => (
                  <option key={e.idExpedicao} value={e.idExpedicao}>{e.idExpedicao}</option>
                ))}
              </select>
              <label className="label text-sm">Data Prevista</label>
              <input type="date" id="dataPrevista" className="input input-bordered w-full" placeholder="Data Prevista" />
              <label className="label text-sm">Data Saída</label>
              <input type="date" id="dataSaida" className="input input-bordered w-full" placeholder="Data Saída" />
              <label className="label text-sm">Data Entrega</label>
              <input type="date" id="dataEntrega" className="input input-bordered w-full" placeholder="Data Entrega" />
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    const idExpedicao = parseInt(document.getElementById('idExpedicao').value);
                    const dataPrevista = document.getElementById('dataPrevista').value;
                    const dataSaida = document.getElementById('dataSaida').value;
                    const dataEntrega = document.getElementById('dataEntrega').value;

                    if (!idExpedicao || !dataPrevista || !dataSaida || !dataEntrega) {
                      alert('Preencha todos os campos corretamente.');
                      return;
                    }

                    // A ÚNICA ALTERAÇÃO NECESSÁRIA ESTÁ AQUI:
                    // Remova 'e.numeroEntrega' da chamada, pois ele não é gerado no frontend
                    // e a função inputEntrega no API agora espera 4 argumentos
                    const nova = await inputEntrega(dataPrevista, dataSaida, dataEntrega, idExpedicao);

                    if (nova) {
                      setEntregas(prev => [...prev, nova]);
                      document.getElementById('popupNovaEntrega').close();
                    } else {
                      alert('Erro ao inserir entrega.');
                    }
                  }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Número</th>
                <th>Data Prevista</th>
                <th>Data Saída</th>
                <th>Data Entrega</th>
                <th>ID Expedição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {entregas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                </tr>
              ) : (
                entregas.map((e) => (
                  <tr key={e.numeroEntrega}>
                    <td className="font-bold">{e.numeroEntrega}</td>
                    <td>{e.dataPrevista}</td>
                    <td>{e.dataSaida}</td>
                    <td>{e.dataEntrega}</td>
                    <td>{e.idExpedicao}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => document.getElementById(`alterar-${e.numeroEntrega}`).showModal()}
                      >
                        Alterar
                      </button>

                      <dialog id={`alterar-${e.numeroEntrega}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Alterar Entrega</h3>
                          <form method="dialog" className="space-y-2">
                            <input type="date" defaultValue={e.dataPrevista} id={`prevista-${e.numeroEntrega}`} className="input input-bordered w-full" />
                            <input type="date" defaultValue={e.dataSaida} id={`saida-${e.numeroEntrega}`} className="input input-bordered w-full" />
                            <input type="date" defaultValue={e.dataEntrega} id={`entrega-${e.numeroEntrega}`} className="input input-bordered w-full" />
                            <select defaultValue={e.idExpedicao} id={`expedicao-${e.numeroEntrega}`} className="select select-bordered w-full">
                              <option value="">Selecione a Expedicao</option>
                              {expedicoes.map(e => (
                                <option key={e.idExpedicao} value={e.idExpedicao}>{e.idExpedicao}</option>
                              ))}
                            </select>

                            <div className="modal-action">
                              <button className="btn">Cancelar</button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={async () => {
                                  const dataPrevista = document.getElementById(`prevista-${e.numeroEntrega}`).value;
                                  const dataSaida = document.getElementById(`saida-${e.numeroEntrega}`).value;
                                  const dataEntrega = document.getElementById(`entrega-${e.numeroEntrega}`).value;
                                  const idExpedicao = parseInt(document.getElementById(`expedicao-${e.numeroEntrega}`).value);

                                  const atualizada = await updateEntrega(e.numeroEntrega, dataPrevista, dataSaida, dataEntrega, idExpedicao);

                                  if (atualizada) {
                                    setEntregas(prev => prev.map(item => item.numeroEntrega === e.numeroEntrega ? atualizada : item));
                                    document.getElementById(`alterar-${e.numeroEntrega}`).close();
                                  } else {
                                    alert('Erro ao atualizar.');
                                  }
                                }}
                              >
                                Salvar
                              </button>
                            </div>
                          </form>
                        </div>
                      </dialog>

                      <button className="btn btn-sm btn-error" onClick={() => deletar(e.numeroEntrega)}>Deletar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}