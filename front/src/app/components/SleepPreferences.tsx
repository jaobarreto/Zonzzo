const SleepPreferences = () => {
  return (
    <div className="max-w-xl">
      <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Preferências de Sono</h1>
    <div className="bg-[#1A153C] rounded-xl shadow-xl py-10 px-14">
      <div className="space-y-5">
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

        <div className="border-t border-gray-600 my-4"></div>

        <div className="space-y-2">
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
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Acordar:</span>
            <span className="text-yellow-400 text-sm">07:00</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="text-yellow-400 text-sm flex items-center gap-2 hover:underline">
            Alterar Informações
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SleepPreferences;
