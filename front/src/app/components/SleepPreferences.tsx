import Image from "next/image";
import Informations from "@/app/public/ChangeInformation.svg";

const SleepPreferences = () => {
  return (
    <div className="max-w-md">
      <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Preferências de Sono</h1>
    <div className="bg-black/30 rounded-3xl shadow-2xl py-10 px-10">

      <div className="space-y-7 px-14">
        <div className="flex justify-between">
          <span className="text-sm">Intervalo para acordar:</span>
          <span className="text-yellow-400 text-sm">30 min</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm">Som para despertar:</span>
          <span className="text-yellow-400 text-sm">Birds</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Som para dormir:</span>
          <span className="text-yellow-400 text-sm">Rain</span>
        </div>

        <div className="border-t border-[#3D22F1]/20"></div>

        <div className="space-y-7">
          <h3 className="text-center text-sm">Meta de Sono</h3>
          <div className="flex justify-between">
            <span className="text-sm">Dias:</span>
            <span className="text-yellow-400 text-sm ml-2">
              Seg, Ter, Qua, Qui, Sex, Sáb
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Dormir:</span>
            <span className="text-yellow-400 text-sm">23:00</span>
            <span className="text-sm">Acordar:</span>
            <span className="text-yellow-400 text-sm">07:00</span>
          </div>
        </div>

        <div className="text-yellow-400 flex items-center justify-center space-x-2 cursor-pointer">
        <span><Image src={Informations} alt="Ícone de alterar informações" className="h-4" /></span>
        <span>Ver mais informações</span>
      </div>
      </div>
    </div>
    </div>
  );
};

export default SleepPreferences;
