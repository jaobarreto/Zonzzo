import Image from 'next/image';
import Background from '@/app/public/Background.svg';
import Navbar from '@/app/components/Navbar';
import MonthlyReport from '@/app/components/MonthlyReport';
import WeeklyAverage from '../components/WeeklyAverage';
import NightSleepReport from '../components/NightSleepReport';

export default function Home() {
  return (
    <div>
    <div className="absolute inset-0 -z-10">
    <Image
      src={Background}
      alt="Background"
      objectFit="cover"
      priority
    />
    </div>

    <Navbar />

    <div className="flex gap-14 justify-center mt-20">
    <MonthlyReport />
    <WeeklyAverage />
    </div>
    
    <div className="flex justify-center mt-10">
    <NightSleepReport />
    </div>
    </div>
  );
};
