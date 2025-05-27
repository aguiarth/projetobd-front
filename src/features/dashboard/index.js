import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../common/headerSlice';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon';
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import BuildingOfficeIcon from '@heroicons/react/24/outline/BuildingOfficeIcon';
import BoltIcon from '@heroicons/react/24/outline/BoltIcon';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';

import DashboardStats from './components/DashboardStats';
import DashboardTopBar from './components/DashboardTopBar';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';
import AmountStats from './components/AmountStats';
import PageStats from './components/PageStats';
import UserChannels from './components/UserChannels';

import {
    fetchPedidosResumo,
    fetchContasResumo,
    fetchTotalClientes,
    fetchTotalLotesRegistrados,
    fetchValorTotalCustoLotes,
    fetchLucroMensalHistorico
} from '../../features/dashboard/dashboardAPI';


function Dashboard() {
    const dispatch = useDispatch();

    const [pedidosResumo, setPedidosResumo] = useState(null);
    const [ContasResumo, setContasResumo] = useState(null);
    const [totalClientes, setTotalClientes] = useState(0);
    const [totalLotesRegistrados, setTotalLotesRegistrados] = useState(0);
    const [valorTotalCustoLotes, setValorTotalCustoLotes] = useState(0);
    const [lucroMensalHistorico, setLucroMensalHistorico] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                const [
                    pedidosData,
                    ContasData,
                    clientesData,
                    lotesData,
                    custoLotesData,
                    lucroHistoricoData
                ] = await Promise.all([
                    fetchPedidosResumo(),
                    fetchContasResumo(),
                    fetchTotalClientes(),
                    fetchTotalLotesRegistrados(),
                    fetchValorTotalCustoLotes(),
                    fetchLucroMensalHistorico(12) // Buscar os últimos 12 meses
                ]);

                setPedidosResumo(pedidosData);
                setContasResumo(ContasData);
                setTotalClientes(clientesData);
                setTotalLotesRegistrados(lotesData);
                setValorTotalCustoLotes(custoLotesData);
                setLucroMensalHistorico(lucroHistoricoData);

            } catch (err) {
                console.error("Erro ao carregar dados do dashboard:", err);
                setError("Não foi possível carregar os dados do dashboard.");
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    const iconClasses = `w-8 h-8`;

    // Dados para Cards de PEDIDOS
    const pedidosStatsData = [
        {
            title: "Total de Pedidos",
            value: pedidosResumo?.totalPedidos?.toString() || '0',
            icon: <ShoppingCartIcon className={iconClasses} />,
            description: "Todos os pedidos registrados"
        },
        {
            title: "Pedidos Abertos",
            value: pedidosResumo?.pedidosAbertos?.toString() || '0',
            icon: <ShoppingCartIcon className={iconClasses} />,
            description: "Aguardando processamento"
        },
        {
            title: "Pedidos Finalizados",
            value: pedidosResumo?.pedidosFinalizados?.toString() || '0',
            icon: <ShoppingCartIcon className={iconClasses} />,
            description: "Concluídos no sistema"
        },
        {
            title: "Receita Mês Atual (Pedidos)",
            value: `R$ ${pedidosResumo?.receitaMensalPedidos?.toFixed(2).replace('.', ',') || '0,00'}`,
            icon: <CreditCardIcon className={iconClasses} />,
            description: "Valor total dos pedidos do mês"
        }
    ];

    // Dados para Cards Contas
    const ContasStatsData = [
        {
            title: "Contas a Pagar (Pendentes)",
            value: `R$ ${ContasResumo?.totalContasAPagarPendente?.toFixed(2).replace('.', ',') || '0,00'}`,
            icon: <CreditCardIcon className={`${iconClasses} text-red-500`} />,
            description: "Valores a serem pagos"
        },
        {
            title: "Contas a Receber (Pendentes)",
            value: `R$ ${ContasResumo?.totalContasAReceberPendente?.toFixed(2).replace('.', ',') || '0,00'}`,
            icon: <CreditCardIcon className={`${iconClasses} text-green-500`} />,
            description: "Valores a serem recebidos"
        }
    ];

    // Dados para Cards de ESTOQUE/LOTES E CLIENTES
    const operacionalStatsData = [
        {
            title: "Total de Clientes",
            value: totalClientes?.toString() || '0',
            icon: <UserGroupIcon className={iconClasses} />,
            description: "Clientes cadastrados"
        },
        {
            title: "Lotes Registrados",
            value: totalLotesRegistrados?.toString() || '0',
            icon: <ArchiveBoxIcon className={iconClasses} />,
            description: "Total de lotes no sistema"
        },
        {
            title: "Custo Total de Lotes",
            value: `R$ ${valorTotalCustoLotes?.toFixed(2).replace('.', ',') || '0,00'}`,
            icon: <BuildingOfficeIcon className={iconClasses} />,
            description: "Soma dos custos dos lotes"
        }
    ];


    // --- Preparando os dados para o Gráfico de Lucro Mensal (LineChart) ---
    const chartLabels = lucroMensalHistorico.map(item => item.mesAno);
    const chartLucroData = lucroMensalHistorico.map(item => item.lucro);

    const chartDataLucroMensal = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Lucro (R$)',
                data: chartLucroData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1,
                fill: false,
            },
        ],
    };

    // --- Preparando dados para o BarChart (Pedidos por Status) 
    const pedidosStatusData = [
        { label: 'Abertos', value: pedidosResumo?.pedidosAbertos || 0 },
        { label: 'Finalizados', value: pedidosResumo?.pedidosFinalizados || 0 },
        { label: 'Cancelados', value: (pedidosResumo?.totalPedidos - (pedidosResumo?.pedidosAbertos || 0) - (pedidosResumo?.pedidosFinalizados || 0)) || 0 }
    ];

    const chartDataPedidosStatus = {
        labels: pedidosStatusData.map(item => item.label),
        datasets: [
            {
                label: 'Número de Pedidos',
                data: pedidosStatusData.map(item => item.value),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // --- Preparando dados para o DoughnutChart (Exemplo: Clientes vs Lotes) ---
    const clientesLotesData = [
        { label: 'Clientes', value: totalClientes || 0 },
        { label: 'Lotes Registrados', value: totalLotesRegistrados || 0 }
    ];

    const chartDataClientesLotes = {
        labels: clientesLotesData.map(item => item.label),
        datasets: [
            {
                label: 'Contagem',
                data: clientesLotesData.map(item => item.value),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // --- Preparando dados para AmountStats ---
    const totalContasAReceberPendente = ContasResumo?.totalContasAReceberPendente || 0;
    const totalContasAPagarPendente = ContasResumo?.totalContasAPagarPendente || 0;
    const lucroPrevistoCalculado = (totalContasAReceberPendente - totalContasAPagarPendente);


    // --- Preparando dados para PageStats ---
    const totalPedidosPageStats = pedidosResumo?.totalPedidos || 0;
    const pedidosAbertosPageStats = pedidosResumo?.pedidosAbertos || 0;

    // --- Preparando dados para UserChannels ---
    const userChannelsData = [
        { label: "Total Clientes", value: totalClientes?.toString() || '0', details: "Total de clientes cadastrados" },
        { label: "Total Lotes", value: totalLotesRegistrados?.toString() || '0', details: "Total de lotes no sistema" },
        { label: "Custo Lotes", value: `R$ ${valorTotalCustoLotes?.toFixed(2).replace('.', ',') || '0,00'}`, details: "Soma dos custos" },
    ];


    // --- Funções do Template ---
    const updateDashboardPeriod = (newRange) => {
        dispatch(showNotification({ message: `Período atualizado: ${newRange.startDate} a ${newRange.endDate}`, status: 1 }))
        // Lógica para recarregar dados filtrados por período aqui,
        // se seus endpoints de backend suportarem (ex: fetchLucroMensalHistorico(range.numMeses, newRange.startDate, newRange.endDate))
    }

    // --- Renderização ---
    if (loading) {
        return <div className="text-center text-xl mt-8">Carregando Dashboard...</div>;
    }

    if (error) {
        return <div className="text-center text-xl text-red-500 mt-8">{error}</div>;
    }

    return (
        <>
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Visão Geral de Pedidos</h2>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                    {pedidosStatsData.map((d, k) => (
                        <DashboardStats key={k} {...d} colorIndex={k} />
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                    <BarChart data={chartDataPedidosStatus} title="Pedidos por Status" />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Finanças</h2>
                <div className="grid lg:grid-cols-2 mt-2 grid-cols-1 gap-6">
                    <AmountStats
                        totalContasAReceberPendente={totalContasAReceberPendente}
                        lucroPrevisto={lucroPrevistoCalculado}
                    />
                    {ContasStatsData.map((d, k) => (
                        <DashboardStats key={`finance-${k}`} {...d} colorIndex={k} />
                    ))}
                </div>
                <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
                    <LineChart data={chartDataLucroMensal} title="Lucro Mensal Histórico" />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Operacional</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {operacionalStatsData.map((d, k) => (
                        <DashboardStats key={`operacional-${k}`} {...d} colorIndex={k} />
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                    <DoughnutChart data={chartDataClientesLotes} title="Clientes vs Lotes Registrados" />
                    <UserChannels
                        data={userChannelsData}
                        title="Outras Métricas Operacionais"
                    />
                </div>
            </div>
        </>
    );
}

export default Dashboard;