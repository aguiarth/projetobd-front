// expedicaoAPI.js

const urlBase = 'http://localhost:8081/api/expedicao';

export async function fetchExpedicoes() {
    const response = await fetch(urlBase);
    if (!response.ok) {
        throw new Error('Erro ao buscar expedições.');
    }
    return await response.json();
}

export async function fetchExpedicaoById(id) {
    const response = await fetch(`${urlBase}/${id}`);
    if (!response.ok) return null;
    return await response.json();
}

export async function deleteExpedicao(id) {
    const response = await fetch(`${urlBase}/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
}

export async function updateExpedicao(id, status) {
    const response = await fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idExpedicao: id,
            status
        }),
    });
    if (!response.ok) return null;
    return await response.json();
}

export async function inputExpedicao(
    dataExpedicao,
    horaExpedicao,
    status) {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dataExpedicao,
            horaExpedicao,
            status
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        console.error('Erro ao inserir expedição:', erro);
        return null;
    }

    return await response.json();
}