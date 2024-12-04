import Image from "next/image";

import SleepChart from "./Chart";
import QualityChart from "./QualityChart";
import Willing from "@/app/public/WillingIcon.svg";

const NightSleepReport = () => {
    return(
        <div className="max-w-7xl">
        <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Relatório</h1>
        <div className="flex space-x-5 bg-[#1A153C] rounded-lg shadow-xl py-12 px-8">

          <div className="flex flex-col">
              <div className="flex items-center space-x-3 mt-5 ml-24">
                  <Image src={Willing} alt="Feedback do Sono do Dia"/>
                  <span className="text-[#00FFBF]">Disposto</span>
              </div>

             <div className="flex gap-20 items-center mt-12">
                  <SleepChart />
                  <QualityChart />
             </div>
          </div>

        <div className="border-l-2 border-gray-500 px-5">
          <div className="grid grid-cols-2 px-5 max-h-16">
            <div className="space-y-5">
            <p>Dormiu: <span className="text-yellow-400">23:01</span></p>
            <p>Acordou: <span className="text-yellow-400">06:59</span></p>
            </div>

            <div className="space-y-5">
            <p>Horas Dormidas: <span className="text-yellow-400">7h e 58 min</span></p>
            <p>Adormeceu Após: <span className="text-yellow-400">16 min</span></p>
            </div>
          </div>

          <div className="flex flex-col items-center mt-5">
              <h2 className="text-yellow-400 mb-2">Anotação de Sonho</h2>
              <textarea
              className="w-full h-32 bg-[#0D1B2A] text-white rounded-lg p-3 text-sm leading-relaxed outline-none resize-none border border-transparent focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
              placeholder="Escreva aqui o seu sonho..."
              defaultValue={`Hoje eu sonhei que estava em um casamento e acabei caindo em um buraco de uma árvore, era muito fundo...`}
              />
          </div>

          <div className="flex flex-col items-center mt-3">
              <h2 className="text-yellow-400 mb-2">Nota do Dia</h2>
              <textarea
              className="w-full h-32 bg-[#0D1B2A] text-white rounded-lg p-3 text-sm leading-relaxed outline-none resize-none border border-transparent focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
              placeholder="Escreva aqui como foi seu dia..."
              defaultValue={`Hoje eu tive um dia muito corrido no trabalho e acabei indo dormir mais tarde do que o normal...`}
              />
          </div>
        </div> 
        </div>
      </div>
    );
};

export default NightSleepReport;
