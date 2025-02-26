"use client";

import { useEffect, useState } from 'react';
import axios from 'axios'; 
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
    const [chartData, setChartData] = useState<{ deepSleep: number; lightSleep: number } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/sleep-quality');
                setChartData(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados do JSON Server:", error);
            }
        };
        fetchData();
    }, []);

    if (!chartData) {
        return <div>Carregando...</div>;
    }

    const data = {
        labels: ['Sono Profundo', 'Sono Leve'],
        datasets: [
            {
                data: [chartData.deepSleep, chartData.lightSleep],
                backgroundColor: ['#00FFBF', '#0D1B2A'],
                hoverBackgroundColor: ['#00E6AC', '#0D1B2A'],
                borderWidth: 0,
                cutout: '70%',
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
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
                {chartData.deepSleep} %
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
