const urlBase = 'http://localhost:8081/api/entrega';

export async function fetchEntregas() {
    const response = await fetch(urlBase);
    if (!response.ok) {
        throw new Error('Erro ao buscar entregas.');
    }
    return await response.json();
}

export async function fetchEntregaById(numeroEntrega) {
    const response = await fetch(`${urlBase}/${numeroEntrega}`);
    if (!response.ok) return null;
    return await response.json();
}

export async function deleteEntrega(numeroEntrega) {
    const response = await fetch(`${urlBase}/${numeroEntrega}`, {
        method: 'DELETE'
    });
    return response.ok;
}

export async function updateEntrega(numeroEntrega, dataPrevista, dataSaida, dataEntrega, idExpedicao) {
    const response = await fetch(`${urlBase}/${numeroEntrega}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            numeroEntrega: numeroEntrega,
            dataPrevista,
            dataSaida,
            dataEntrega,
            idExpedicao
        }),
    });

    if (!response.ok) return null;
    return await response.json();
}

export async function inputEntrega(dataPrevista, dataSaida, dataEntrega, idExpedicao) {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dataPrevista,
            dataSaida,
            dataEntrega,
            idExpedicao
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        console.error('Erro ao inserir entrega:', erro);
        return null;
    }

    return await response.json();
}
