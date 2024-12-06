"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Willing from '@/app/public/WillingIcon.svg';

interface DaySelectorProps {
    className?: string;
  }

function DaySelector ({ className = '' }: DaySelectorProps) {
  // Definindo os dias da semana manualmente e o dia selecionado
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const [selectedDay, setSelectedDay] = useState(3); // Definindo "Q" como o dia selecionado

  // Função para alterar o dia selecionado
  const handleDayClick = (index: number) => {
    setSelectedDay(index);
  };

  return (
    <div className="flex text-white font-medium space-x-40 items-center">
      <div className="flex items-center space-x-3">
            <Image src={Willing} alt="Feedback do Sono do Dia"/>
            <span className="text-[#00FFBF]">Disposto</span>
      </div>
      <div className="flex space-x-5">
        {days.map((day, index) => (
          <span
            key={index}
            className={`cursor-pointer ${index === selectedDay ? 'text-yellow-400' : 'text-gray-500'} transition-colors`}
            onClick={() => handleDayClick(index)}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Data exibida */}
      <span className="text-yellow-400 tracking-widest">06/11/2024</span>
    </div>
  );
};

export default DaySelector;
