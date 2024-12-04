"use client";

import Image from 'next/image';
import Willing from '@/app/public/WillingIcon.svg';
import Regular from '@/app/public/RegularIcon.svg';
import Exhausted from '@/app/public/ExhaustedIcon.svg';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyReport = () => {
  
  const data = {
    labels: ['Qualidade'],
    datasets: [
      {
        data: [79.5, 20.5], // Percentual da qualidade e espaço restante
        backgroundColor: ['#00FFB7', '#0D1B2A'], // Roxo e fundo escuro
        hoverBackgroundColor: ['#7C3AED', '#2C2F49'],
        borderWidth: 0, // Remove bordas entre as seções
      },
    ],
  };

  const options = {
    cutout: '70%', // Faz o gráfico "vazio" no centro
    plugins: {
      legend: {
        display: false, // Remove a legenda
      },
      tooltip: {
        enabled: false, // Desabilita tooltips
      },
    },
  };

  return (
    <div className="max-w-xl">
      <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Novembro</h1>
    <div className="bg-[#1A153C] rounded-xl shadow-xl text-center py-10 px-14">
      <div>
        <p>Você utilizou o Zonzzo em <span className="text-yellow-400">10 dias</span> <br /> no mês de Novembro</p>
        <hr className="border-gray-500 my-2" />
      </div>

      <div className="grid grid-cols-2 mt-7">
          <p>Média de Horas <br /> Dormidas: <span className="text-yellow-400">7h e 14 min</span></p>
          <p>Média de Tempo para Adormecer: <span className="text-yellow-400">18 min</span></p>
      </div>

      <div className="flex items-center">
        <div className="relative w-40 mx-auto">
        <p className="mt-7 mb-5">Média da <br /> Qualidade do Sono</p>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center text-xl text-[#00FFB7] font-semibold mt-24">
            79.5 %
          </div>
        </div>
        <div className="flex flex-col space-y-5 mt-20">
            <div className="flex items-center">
              <Image src={Willing} alt="Ícone de disposto" className="w-11"/>
              <div className="grid grid-cols-2 text-[#00FFB7] mb-2">
                <p>Disposto</p>
                <p>5 dias (50%)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Image src={Regular} alt="Ícone de disposto" className="w-10"/>
              <div className="grid grid-cols-2 text-[#A69CE6]">
                <p>Normal</p>
                <p>7 dias (10%)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Image src={Exhausted} alt="Ícone de disposto" className="w-10 mt-1"/>
              <div className="grid grid-cols-2 text-[#FF2600] mt-1">
                <p>Exausto</p>
                <p>8 dias (10%)</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MonthlyReport;
