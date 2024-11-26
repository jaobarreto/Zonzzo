"use client";

import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ScriptableContext,
    ChartData,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SleepChart = () => {
    const chartRef = useRef(null);

    // Tipagem explícita para os dados do gráfico
    const data: ChartData<"line", number[], string> = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                label: '',
                data: [2, 2, 1, 0, 1, 1, 2, 1, 2, 2],
                fill: false,
                borderColor: (context: ScriptableContext<'line'>) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return 'rgba(255, 255, 0, 0.8)'; 
                    }

                    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(255, 255, 0, 0.8)");
                    gradient.addColorStop(1, "rgba(255, 165, 0, 0.2)");
                    return gradient;
                },
                borderWidth: 3,
                tension: 0.5,
                pointRadius: 0,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                border: {
                    display: true,
                    width: 1,
                    color: '#FFF',
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#FFF',
                    font: {
                        size: 15,
                        family: 'Arial',
                    },
                    callback: (value: string | number) => {
                        if (typeof value === 'number') {
                            switch (value) {
                                case 0: return 'Sono Profundo';
                                case 1: return 'Sono';
                                case 2: return 'Acordado';
                                default: return '';
                            }
                        }
                        return '';
                    },
                },
                min: -0.5,
                max: 2.5,
                border: {
                    display: true,
                    width: 1, 
                    color: '#FFF',
                },
            },
        },     
    };    

    return (
        <div className="max-w-md min-w-96">
            <Line ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default SleepChart;
