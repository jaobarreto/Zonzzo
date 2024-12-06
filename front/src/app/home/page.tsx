import Image from 'next/image';
import Background from '@/app/public/Background.svg';
import Navbar from '@/app/components/Navbar';
import ReportHome from '../components/ReportHome';
import WeeklyStatus from '../components/WeeklyStatus';
import ZonzzoTeachs from '../components/ZonzzoTeaches';
import SleepPreferences from '../components/SleepPreferences';

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
     <ReportHome />
     <WeeklyStatus />
    </div>

    <div className="flex gap-14 justify-center mt-20">
     <ZonzzoTeachs />
     <SleepPreferences />
    </div>
</div>
  );
};
