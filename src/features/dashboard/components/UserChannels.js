// dashboard/components/UserChannels.js
import React from 'react'; // Adicionar import do React, se não estiver explícito
import TitleCard from "../../../components/Cards/TitleCard"; // Verifique o caminho

// Recebe 'data' (array de objetos) e 'title' como props
function UserChannels({ data, title }) { // Alterado para receber props
    return (
        <TitleCard title={title}> {/* Usa o título passado via props */}
            {/** Table Data */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="normal-case">Item</th> {/* Genérico */}
                            <th className="normal-case">Quantidade/Valor</th> {/* Genérico */}
                            <th className="normal-case">Detalhes</th> {/* Genérico */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500">Nenhum dado para exibir.</td>
                            </tr>
                        ) : (
                            data.map((item, k) => { // Renderiza os dados passados via props
                                return (
                                    <tr key={k}>
                                        <th>{k + 1}</th>
                                        <td>{item.label}</td> {/* Adapte para seus dados */}
                                        <td>{item.value}</td> {/* Adapte para seus dados */}
                                        <td>{item.details}</td> {/* Adapte para seus dados */}
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </TitleCard>
    );
}

export default UserChannels;