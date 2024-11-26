import SleepChart from "./Chart";
import DaySelector from "./DaySelector";
import QualityChart from "./QualityChart";

const ReportHome = () => {
    return (
      <div className="max-w-3xl">
        <h1 className="ml-6 mb-3 font-semibold text-[#FFBB00] text-lg">Relatório</h1>
        <div className="bg-[#1A153C] rounded-lg shadow-xl py-12 px-8 max-w-3xl">
          <div className="flex justify-center mb-12">
            <DaySelector />
          </div>
          <div className="flex gap-28 items-center">
          <SleepChart />
          <QualityChart />
          </div>
        </div>
      </div>
    );
};

export default ReportHome;
