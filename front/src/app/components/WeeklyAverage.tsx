"use client";

import Image from 'next/image';

import { Doughnut } from 'react-chartjs-2';
import Willing from '@/app/public/WillingIcon.svg';
import Regular from '@/app/public/RegularIcon.svg';
import Exhausted from '@/app/public/ExhaustedIcon.svg';

const WeeklyAverage = () => {
  
  const data = {
    labels: ['Qualidade'],
    datasets: [
      {
        data: [71.4, 28.6], // Percentual da qualidade e espaço restante
        backgroundColor: ['#A69CE6', '#0D1B2A'], // Roxo e fundo escuro
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
      <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Status Semanal do Sono</h1>
    <div className="bg-black/30 rounded-3xl shadow-2xl text-center py-10 px-14">
      <div>
        <p>Você utilizou o Zonzzo em <span className="text-yellow-400">4 dias</span> <br /> no mês de Novembro</p>
        <hr className="border-[#3D22F1]/20 my-2" />
      </div>

      <div className="grid grid-cols-2 mt-7">
          <p>Média de Horas <br /> Dormidas: <span className="text-yellow-400">7h e 32 min</span></p>
          <p>Média de Tempo para Adormecer: <span className="text-yellow-400">15 min</span></p>
      </div>

      <div className="flex items-center">
        <div className="relative w-40 mx-auto">
        <p className="mt-7 mb-5">Média da <br /> Qualidade do Sono</p>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center text-xl text-[#A69CE6] mt-24">
            71.4 %
          </div>
        </div>
        <div className="flex flex-col space-y-5 mt-20">
            <div className="flex items-center">
              <Image src={Willing} alt="Ícone de disposto" className="w-11"/>
              <div className="grid grid-cols-2 text-[#00FFB7] mb-2">
                <p>Disposto</p>
                <p>3 dias (75%)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Image src={Regular} alt="Ícone de Regular" className="w-10"/>
              <div className="grid grid-cols-2 text-[#A69CE6]">
                <p>Normal</p>
                <p>1 dias (20%)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Image src={Exhausted} alt="Ícone de Exausto" className="w-10 mt-1"/>
              <div className="grid grid-cols-2 text-[#FF2600] mt-1">
                <p>Exausto</p>
                <p>2 dias (45%)</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WeeklyAverage;
