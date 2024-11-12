import Image from 'next/image';
import Background from '@/app/public/Background.svg';
import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <Image 
        src={Background} 
        alt="Background" 
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        className="z-0" 
      />
      
      <Navbar />

      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">Bem-vindo ao Home</h1>
      </div>
    </div>
  );
}
