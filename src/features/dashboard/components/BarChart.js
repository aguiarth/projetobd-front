import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data, title }) { // Alterado para receber props

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
            <Bar options={options} data={data} />
        </TitleCard>
    );
}

export default BarChart;