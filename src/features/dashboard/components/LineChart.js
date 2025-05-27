// dashboard/components/LineChart.js
import React from 'react'; // Adicionar import do React, se não estiver explícito
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard'; // Verifique o caminho

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Recebe 'data' e 'title' como props
function LineChart({ data, title }) { // Alterado para receber props

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title, // Usa o título passado via props
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <TitleCard title={title}> {/* Usa o título passado via props */}
            <Line data={data} options={options} />
        </TitleCard>
    );
}

export default LineChart;