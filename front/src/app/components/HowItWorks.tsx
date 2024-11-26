export default function HowItWorks() {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Como o aplicativo funciona?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Configuração Fácil</h3>
            <p className="text-gray-300">
              Basta conectar seu dispositivo de rastreio de sono e o aplicativo
              fará o resto.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Monitoramento Automático
            </h3>
            <p className="text-gray-300">
              O aplicativo rastreia seu sono durante a noite e sincroniza os
              dados automaticamente.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Análise Inteligente</h3>
            <p className="text-gray-300">
              Nossos algoritmos avançados transformam os dados em insights
              personalizados sobre seu sono.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
