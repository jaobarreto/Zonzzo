"use client";

import React, { useState } from 'react';

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
    <div className="flex text-white font-extralight space-x-40">
      {/* Dias da semana */}
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
      <span className="text-yellow-400">06/11/2024</span>
    </div>
  );
};

export default DaySelector;
