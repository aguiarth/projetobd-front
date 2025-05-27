import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import Subtitle from '../../../components/Typography/Subtitle';

ChartJS.register(ArcElement, Tooltip, Legend,
    Tooltip,
    Filler,
    Legend);

// Recebe 'data' e 'title' como props
function DoughnutChart({ data, title }) { // Alterado para receber props

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
    };

    return (
        <TitleCard title={title}> {/* Usa o título passado via props */}
            <Doughnut options={options} data={data} />
        </TitleCard>
    );
}

export default DoughnutChart;