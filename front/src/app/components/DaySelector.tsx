"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Willing from '@/app/public/WillingIcon.svg';

interface DaySelectorProps {
    className?: string;
  }

function DaySelector ({ className = '' }: DaySelectorProps) {
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const [selectedDay, setSelectedDay] = useState(3); 
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
      <span className="text-yellow-400 tracking-widest">06/12/2024</span>
    </div>
  );
};

export default DaySelector;
