"use client";

import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const QualityChart = () => {
    const data = {
        labels: ['Sono Profundo', 'Sono Leve'],
        datasets: [
            {
                data: [87.5, 12.5], // Percentual de qualidade do sono e o restante
                backgroundColor: ['#00FFBF', '#0D1B2A'], // Cores para cada seção
                hoverBackgroundColor: ['#00E6AC', '#0D1B2A'],
                borderWidth: 0,
                cutout: '70%', // Faz o "buraco" no centro do gráfico
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Oculta a legenda
            },
            tooltip: {
                enabled: false, // Desativa o tooltip ao passar o mouse
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '200px', height: '200px', textAlign: 'center' }}>
            <Doughnut data={data} options={options} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#00FFBF',
                fontSize: '20px',
                fontFamily: 'Arial',
                fontWeight: 'bold',
            }}>
                87.5 %
            </div>
            <p style={{
                color: '#FFFFFF',
                fontSize: '15px',
                marginTop: '10px',
            }}>
                Qualidade do Sono
            </p>
        </div>
    );
};

export default QualityChart;
