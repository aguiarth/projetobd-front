const urlBase = 'http://localhost:8081/api/lote';

export async function fetchLotes() {
    const response = await fetch(urlBase);
    if (!response.ok) {
        throw new Error('Erro ao buscar lotes.');
    }
    return await response.json();
}

export async function fetchLoteById(codigo) {
    const response = await fetch(`${urlBase}/${codigo}`);
    if (!response.ok) return null;
    return await response.json();
}

export async function deleteLote(codigo) {
    const response = await fetch(`${urlBase}/${codigo}`, { method: 'DELETE' });
    return response.ok;
}

export async function updateLote(
    codigo,
    idEstoque,
    idMateriaPrima,
    idProduto,
    custo,
    descricao,
    quantidade,
    dataValidade
) {
    const response = await fetch(`${urlBase}/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            codigo: codigo,
            idEstoque,
            idMateriaPrima,
            idProduto,
            custo,
            descricao,
            quantidade,
            dataValidade
        }),
    });

    if (!response.ok) return null;
    return await response.json();
}

export async function inputLote(
    idEstoque,
    idMateriaPrima,
    idProduto,
    custo,
    descricao,
    quantidade,
    dataValidade
) {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idEstoque,
            idMateriaPrima,
            idProduto,
            custo,
            descricao,
            quantidade,
            dataValidade
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        console.error('Erro ao inserir lote:', erro);
        return null;
    }

    return await response.json();
}