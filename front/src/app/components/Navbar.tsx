import Link from 'next/link';
import Image from 'next/image';
import User from '@/app/public/User.svg';
import Report from '@/app/public/Report.svg';
import Teach from '@/app/public/Teach.svg';
import Home from '@/app/public/Home.svg';

export default function Navbar() {
  return (
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
            src={Home}
            alt="Ícone de Home"
             />
            <Link href="/home">
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
  );
};
