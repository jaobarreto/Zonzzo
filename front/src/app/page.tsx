import Image from 'next/image';
import SleepTrackingSection from '@/app/components/SleepTracking';
import HowItWorks from '@/app/components/HowItWorks';
import GetStarted from '@/app/components/GetStarted';
import HeaderImage from '@/app/public/SleepHeader.jpg';

export default function Login() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white p-6 md:p-12 ">
        <div className="md:w-1/2 flex flex-col space-y-6 md:ml-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Dorme bem, vive melhor: <br /> Saiba a importância de uma boa noite
            de sono
          </h1>
          <p className="text-lg text-gray-300">
            Uma noite de sono de qualidade é fundamental para a nossa saúde e
            bem-estar. Aprenda como ter uma rotina de sono saudável e os
            benefícios de dormir bem.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Começar Agora
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2 mt-8 md:mt-0">
          <Image
            src={HeaderImage}
            alt="Uma boa noite de sono"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>

      <SleepTrackingSection />

      <HowItWorks />

      <GetStarted />
    </>
  );
}
