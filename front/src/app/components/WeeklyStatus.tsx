"use client";

import { Doughnut } from 'react-chartjs-2';

const WeeklyStatus = () => {
  
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
    <div className="max-w-md">
      <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Status Semanal do Sono</h1>
    <div className="bg-black/30 rounded-3xl shadow-2xl text-center py-10 px-14">
      <div>
        <p>Você utilizou o Zonzzo em <span className="text-yellow-400">4 dias</span> nesta semana</p>
        <hr className="border-[#3D22F1]/20 my-2"/>
      </div>

      <div className="grid grid-cols-2 mt-7">
        <div>
          <p>Média de Horas Dormidas:</p>
          <p className="text-yellow-400">7h e 32 min</p>
        </div>
        <div>
          <p>Média de Tempo para Adormecer:</p>
          <p className="text-yellow-400">15 min</p>
        </div>
      </div>

      <div>
        <p className="mt-7">Média da Qualidade do Sono</p>
        <div className="relative w-36 h-36 mx-auto mt-5">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center text-xl text-[#A69CE6]">
            71.4 %
          </div>
        </div>
      </div>
      
      <div className="text-yellow-400 flex items-center justify-center space-x-2 cursor-pointer mt-5">
        <span>ℹ️</span>
        <span>Ver mais informações</span>
      </div>
    </div>
    </div>
  );
};

export default WeeklyStatus;
