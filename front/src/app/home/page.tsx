import Image from 'next/image';
import Background from '@/app/public/Background.svg';
import Link from 'next/link';
import ReportHome from '../components/ReportHome';
import WeeklyStatus from '../components/WeeklyStatus';
import ZonzzoTeachs from '../components/ZonzzoTeaches';
import SleepPreferences from '../components/SleepPreferences';
import User from '@/app/public/User.svg';
import Report from '@/app/public/Report.svg';
import Teach from '@/app/public/Teach.svg';
import HomeIcon from '@/app/public/HomeSelected.svg';

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

    <nav className="w-full bg-black/70 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/home" className="text-2xl font-serif">
            Zonzzo
          </Link>
        </div>
        <div className="flex items-center space-x-10 text-sm">
          <div className="flex items-center space-x-2">
            <Image
            src={HomeIcon}
            alt="Ícone de Home"
             />
            <Link href="/home" className="text-yellow-400">
            Home
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Image
            src={Teach}
            alt="Ícone de Zonzzo Ensina"
             />
            <Link href="/relatorios">
            Zonzzo Ensina
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Image
            src={Report}
            alt="Ícone de Repertórios"
             />
            <Link href="/relatorios">
            Relatórios
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Image
            src={User}
            alt="Ícone de Usuário"
             />
            <span>Luiz</span>
          </div>
        </div>
      </div>
    </nav>
     
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
