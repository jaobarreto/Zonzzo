export default function GetStarted() {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Comece a dormir melhor hoje mesmo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="bg-blue-800 text-white py-3 px-6 rounded-md mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Configurar</h3>
            <p className="text-gray-300">
              Instale o aplicativo e conecte seu dispositivo de rastreio de
              sono.
            </p>
          </div>
          <div>
            <div className="bg-blue-800 text-white py-3 px-6 rounded-md mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rastrear</h3>
            <p className="text-gray-300">
              Seu sono será monitorado automaticamente durante a noite.
            </p>
          </div>
          <div>
            <div className="bg-blue-800 text-white py-3 px-6 rounded-md mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Melhorar</h3>
            <p className="text-gray-300">
              Analise os insights e siga as dicas para melhorar a qualidade do
              sono.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800">
            Fazer Login
          </button>
        </div>
      </div>
    </section>
  );
}
