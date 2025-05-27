import React from 'react';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon'; // Exemplo de ícone
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'; // Exemplo de ícone
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon'; // Ícone mais relevante para pedidos

// Agora recebe props de `pedidos`
function PageStats({ totalPedidos, pedidosAbertos, pedidosFinalizados }) { // Alterado para receber as novas props

    const iconClasses = 'w-8 h-8';

    return (
        <div className="stats bg-base-100 shadow">

            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <ShoppingCartIcon className={iconClasses} /> {/* Ícone para total de pedidos */}
                </div>
                <div className="stat-title">Total de Pedidos</div>
                <div className="stat-value">{totalPedidos}</div>
                <div className="stat-desc">Pedidos registrados no sistema</div>
            </div>

            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <BoltIcon className={iconClasses} /> {/* Ícone para pedidos abertos */}
                </div>
                <div className="stat-title">Pedidos Abertos</div>
                <div className="stat-value">{pedidosAbertos}</div>
                <div className="stat-desc">Aguardando processamento</div>
            </div>

            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <BoltIcon className={iconClasses} /> {/* Ícone para pedidos abertos */}
                </div>
                <div className="stat-title">Pedidos Finalizados</div>
                <div className="stat-value">{pedidosFinalizados}</div>
            </div>
        </div>
    );
}

export default PageStats;