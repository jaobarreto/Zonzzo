import SleepChart from "./Chart";
import DaySelector from "./DaySelector";
import QualityChart from "./QualityChart";

const ReportHome = () => {
    return (
      <div className="max-w-3xl">
        <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Relatório</h1>
        <div className="bg-black/30 rounded-3xl shadow-2xl py-9 px-16">
          <div className="flex justify-center mb-20">
            <DaySelector />
          </div>
          <div className="flex gap-20 items-center mb-24">
          <SleepChart />
          <QualityChart />
          </div>
        </div>
      </div>
    );
};

export default ReportHome;
