import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import {
    fetchLotes,
    fetchLoteById,
    deleteLote,
    updateLote, // Agora será usada
    inputLote
} from '../../features/lote/loteAPI';
import { fetchEstoques } from '../../features/estoque/estoqueAPI';
import { fetchMateriasPrimas } from '../../features/materiaPrima/materiaPrimaAPI';
import { fetchProdutosAcabados } from '../../features/produtoAcabado/produtoAcabadoAPI';
import { defaultLote } from '../../features/lote/types'; // Importando defaultLote

export default function Lote() {
    const [lotes, setLotes] = useState([]);
    const [codigoBusca, setCodigoBusca] = useState(''); // Renomeado 'id' para 'codigoBusca' para clareza
    const [erro, setErro] = useState(null);
    const [estoques, setEstoques] = useState([]);
    const [materiasPrimas, setMateriasPrimas] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const [lotesData, estoquesData, materiasPrimasData, produtosData] = await Promise.all([
                    fetchLotes(),
                    fetchEstoques(),
                    fetchMateriasPrimas(),
                    fetchProdutosAcabados()
                ]);
                setLotes(lotesData);
                setEstoques(estoquesData);
                setMateriasPrimas(materiasPrimasData);
                setProdutos(produtosData);
            } catch (err) {
                console.error("Erro ao carregar dados iniciais:", err);
                setErro("Erro ao carregar dados. Verifique a conexão.");
            }
        };
        loadAllData();
    }, []);

    const buscar = async () => {
        if (!codigoBusca.trim()) {
            alert('Digite um código válido.');
            return;
        }

        try {
            const res = await fetchLoteById(codigoBusca);
            if (res) {
                setErro(null);
                setLotes([res]);
            } else {
                setErro('Nenhum registro encontrado.');
                setLotes([]);
            }
        } catch (error) {
            console.error("Erro ao buscar lote:", error);
            setErro("Erro ao buscar lote. Tente novamente.");
        }
    };

    const limparBusca = async () => {
        setCodigoBusca('');
        setErro(null);
        try {
            const dados = await fetchLotes();
            setLotes(dados);
        } catch (error) {
            console.error("Erro ao limpar busca:", error);
            setErro("Erro ao recarregar lotes.");
        }
    };

    const deletar = async (codigo) => {
        if (!window.confirm(`Tem certeza que deseja deletar o lote ${codigo}?`)) {
            return;
        }
        try {
            const ok = await deleteLote(codigo);
            if (ok) {
                setLotes(prev => prev.filter(l => l.codigo !== codigo));
            } else {
                alert('Erro ao deletar registro. Verifique as dependências.');
            }
        } catch (error) {
            console.error("Erro ao deletar lote:", error);
            alert('Ocorreu um erro ao deletar o lote.');
        }
    };

    // --- Funções para a Modal de Inserir Novo Lote ---
    const handleInsertLote = async () => {
        // Coleta os valores diretamente dos inputs da modal
        const idEstoque = parseInt(document.getElementById('novoIdEstoque').value);
        const idMateriaPrima = parseInt(document.getElementById('novoIdMateriaPrima').value);
        const idProduto = parseInt(document.getElementById('novoIdProduto').value);
        const descricao = document.getElementById('novaDescricao').value;
        const custo = document.getElementById('novoCusto').value; // O custo é VARCHAR no DB, enviar como string
        const quantidade = parseInt(document.getElementById('novaQuantidade').value);
        const dataValidade = document.getElementById('novaDataValidade').value;

        // Validação básica
        if (!idEstoque || isNaN(idEstoque) || !idMateriaPrima || isNaN(idMateriaPrima) || !idProduto || isNaN(idProduto) || !descricao.trim() || !custo.trim() || isNaN(quantidade) || quantidade <= 0 || !dataValidade.trim()) {
            alert('Por favor, preencha todos os campos corretamente para o novo lote.');
            return;
        }

        const novoLoteData = {
            // Código do lote é gerado no backend, não precisa ser enviado
            idEstoque,
            idMateriaPrima,
            idProduto,
            descricao,
            custo,
            quantidade,
            dataValidade
        };

        try {
            const novo = await inputLote(novoLoteData); // Chama a função inputLote
            if (novo) {
                setLotes(prev => [...prev, novo]); // Adiciona o novo lote à lista
                document.getElementById('popupModalInserir').close(); // Fecha a modal
                // Limpa os campos da modal após o sucesso
                document.getElementById('novoIdEstoque').value = '';
                document.getElementById('novoIdMateriaPrima').value = '';
                document.getElementById('novoIdProduto').value = '';
                document.getElementById('novaDescricao').value = '';
                document.getElementById('novoCusto').value = '';
                document.getElementById('novaQuantidade').value = '';
                document.getElementById('novaDataValidade').value = '';
            } else {
                alert('Erro ao inserir novo lote. Verifique o console para mais detalhes.');
            }
        } catch (error) {
            console.error("Erro ao inserir lote:", error);
            alert('Ocorreu um erro ao inserir o lote.');
        }
    };

    // --- Funções para a Modal de Alterar Lote ---
    const handleUpdateLote = async (codigoLoteOriginal) => {
        // Coleta os valores diretamente dos inputs da modal de alteração
        const idEstoque = parseInt(document.getElementById(`estoque-${codigoLoteOriginal}`).value);
        const idMateriaPrima = parseInt(document.getElementById(`materia-${codigoLoteOriginal}`).value);
        const idProduto = parseInt(document.getElementById(`produto-${codigoLoteOriginal}`).value);
        const descricao = document.getElementById(`descricao-${codigoLoteOriginal}`).value;
        const custo = document.getElementById(`custo-${codigoLoteOriginal}`).value;
        const quantidade = parseInt(document.getElementById(`quantidade-${codigoLoteOriginal}`).value);
        const dataValidade = document.getElementById(`validade-${codigoLoteOriginal}`).value;

        // Validação básica
        if (!idEstoque || isNaN(idEstoque) || !idMateriaPrima || isNaN(idMateriaPrima) || !idProduto || isNaN(idProduto) || !descricao.trim() || !custo.trim() || isNaN(quantidade) || quantidade <= 0 || !dataValidade.trim()) {
            alert('Preencha todos os campos corretamente para atualizar o lote.');
            return;
        }

        const loteParaAtualizar = {
            codigo: codigoLoteOriginal, // O código é usado para identificar qual lote alterar
            idEstoque,
            idMateriaPrima,
            idProduto,
            descricao,
            custo,
            quantidade,
            dataValidade
        };

        try {
            const atualizado = await updateLote(codigoLoteOriginal, loteParaAtualizar); // <--- updateLote É USADA AQUI!
            if (atualizado) {
                setLotes(prev => prev.map(item => item.codigo === codigoLoteOriginal ? atualizado : item));
                document.getElementById(`alterar-${codigoLoteOriginal}`).close();
            } else {
                alert('Erro ao atualizar lote. Verifique o console para mais detalhes.');
            }
        } catch (error) {
            console.error("Erro ao atualizar lote:", error);
            alert('Ocorreu um erro ao atualizar o lote.');
        }
    };


    return (
        <>
            <TitleCard
                title="Lotes Cadastrados"
                topMargin="mt-2"
                TopSideButtons={
                    <div className="flex items-center justify-end gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Buscar por Código"
                            className="input input-bordered w-40"
                            value={codigoBusca}
                            onChange={(e) => setCodigoBusca(e.target.value)}
                        />
                        <button onClick={buscar} className="btn btn-primary btn-sm">Buscar</button>
                        <button onClick={limparBusca} className="btn btn-ghost btn-sm">Limpar</button>
                    </div>
                }
            >
                <button
                    className="mb-8 btn btn-sm btn-accent"
                    onClick={() => document.getElementById('popupModalInserir').showModal()}
                >
                    Novo Lote
                </button>

                {/* Modal de Inserir Novo Lote */}
                <dialog id="popupModalInserir" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Inserir Novo Lote</h3>
                        <form method="dialog" className="space-y-3">
                            {/* Seleção de Estoque */}
                            <select id="novoIdEstoque" className="select select-bordered w-full">
                                <option value="">Selecione o Estoque</option>
                                {estoques.map(e => (
                                    <option key={e.idEstoque} value={e.idEstoque}>{e.idEstoque}</option>
                                ))}
                            </select>

                            {/* Seleção de Matéria-Prima */}
                            <select id="novoIdMateriaPrima" className="select select-bordered w-full">
                                <option value="">Selecione a Matéria-Prima</option>
                                {materiasPrimas.map(m => (
                                    <option key={m.idMateriaPrima} value={m.idMateriaPrima}>{m.descricao}</option>
                                ))}
                            </select>

                            {/* Seleção de Produto Acabado */}
                            <select id="novoIdProduto" className="select select-bordered w-full">
                                <option value="">Selecione o Produto Acabado</option>
                                {produtos.map(p => (
                                    <option key={p.idProduto} value={p.idProduto}>{p.descricao}</option>
                                ))}
                            </select>

                            {/* Campos de Input */}
                            <input type="text" placeholder="Descrição" id="novaDescricao" className="input input-bordered w-full" />
                            <input type="text" placeholder="Custo (ex: 123.45)" id="novoCusto" className="input input-bordered w-full" />
                            <input type="number" placeholder="Quantidade" id="novaQuantidade" className="input input-bordered w-full" />
                            <input type="date" id="novaDataValidade" className="input input-bordered w-full" />

                            <div className="modal-action">
                                <button type="button" className="btn" onClick={() => document.getElementById('popupModalInserir').close()}>Cancelar</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleInsertLote}
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
                                <th>Código</th>
                                <th>Estoque ID</th>
                                <th>Matéria-Prima ID</th>
                                <th>Produto ID</th>
                                <th>Descrição</th>
                                <th>Custo</th>
                                <th>Quantidade</th>
                                <th>Data Validade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lotes.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center text-gray-500">Nenhum dado para exibir.</td>
                                </tr>
                            ) : (
                                lotes.map((l) => (
                                    <tr key={l.codigo}>
                                        <td className="font-bold">{l.codigo}</td>
                                        <td>{l.idEstoque}</td>
                                        <td>{l.idMateriaPrima}</td>
                                        <td>{l.idProduto}</td>
                                        <td>{l.descricao}</td>
                                        <td>{l.custo}</td>
                                        <td>{l.quantidade}</td>
                                        <td>{l.dataValidade}</td>
                                        <td className="flex gap-2">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => {
                                                    // Preenche a modal de alteração com os valores atuais do lote
                                                    // É importante que o ID do input seja único para cada modal
                                                    document.getElementById(`estoque-${l.codigo}`).value = l.idEstoque;
                                                    document.getElementById(`materia-${l.codigo}`).value = l.idMateriaPrima;
                                                    document.getElementById(`produto-${l.codigo}`).value = l.idProduto;
                                                    document.getElementById(`descricao-${l.codigo}`).value = l.descricao;
                                                    document.getElementById(`custo-${l.codigo}`).value = l.custo;
                                                    document.getElementById(`quantidade-${l.codigo}`).value = l.quantidade;
                                                    document.getElementById(`validade-${l.codigo}`).value = l.dataValidade;

                                                    document.getElementById(`alterar-${l.codigo}`).showModal();
                                                }}
                                            >
                                                Alterar
                                            </button>

                                            {/* Modal de Alteração para cada Lote */}
                                            <dialog id={`alterar-${l.codigo}`} className="modal">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">Editar Lote - Código: {l.codigo}</h3>
                                                    <form method="dialog" className="space-y-2">
                                                        {/* Seleção de Estoque */}
                                                        <select defaultValue={l.idEstoque} id={`estoque-${l.codigo}`} className="select select-bordered w-full">
                                                            <option value="">Selecione o Estoque</option>
                                                            {estoques.map(e => (
                                                                <option key={e.idEstoque} value={e.idEstoque}>{e.idEstoque}</option>
                                                            ))}
                                                        </select>

                                                        {/* Seleção de Matéria-Prima */}
                                                        <select defaultValue={l.idMateriaPrima} id={`materia-${l.codigo}`} className="select select-bordered w-full">
                                                            <option value="">Selecione a Matéria-Prima</option>
                                                            {materiasPrimas.map(m => (
                                                                <option key={m.idMateriaPrima} value={m.idMateriaPrima}>{m.descricao}</option>
                                                            ))}
                                                        </select>

                                                        {/* Seleção de Produto Acabado */}
                                                        <select defaultValue={l.idProduto} id={`produto-${l.codigo}`} className="select select-bordered w-full">
                                                            <option value="">Selecione o Produto Acabado</option>
                                                            {produtos.map(p => (
                                                                <option key={p.idProduto} value={p.idProduto}>{p.descricao}</option>
                                                            ))}
                                                        </select>

                                                        {/* Campos de Input */}
                                                        <input type="text" defaultValue={l.descricao} id={`descricao-${l.codigo}`} className="input input-bordered w-full" placeholder="Descrição" />
                                                        <input type="text" defaultValue={l.custo} id={`custo-${l.codigo}`} className="input input-bordered w-full" placeholder="Custo (ex: 123.45)" />
                                                        <input type="number" defaultValue={l.quantidade} id={`quantidade-${l.codigo}`} className="input input-bordered w-full" placeholder="Quantidade" />
                                                        <input type="date" defaultValue={l.dataValidade} id={`validade-${l.codigo}`} className="input input-bordered w-full" />

                                                        <div className="modal-action">
                                                            <button type="button" className="btn" onClick={() => document.getElementById(`alterar-${l.codigo}`).close()}>Cancelar</button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                onClick={() => handleUpdateLote(l.codigo)} // Chama a função de atualização
                                                            >
                                                                Salvar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </dialog>

                                            <button className="btn btn-sm btn-error" onClick={() => deletar(l.codigo)}>Deletar</button>
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