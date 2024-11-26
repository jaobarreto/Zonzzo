export default function SleepTrackingSection() {
  return (
    <>
      <section className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            O que é o rastreio de sono?
          </h2>
          <div className="grid gap-8 md:gap-16 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg">
              <div className="bg-blue-800 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Monitoramento Preciso
              </h3>
              <p className="text-gray-400 text-sm">
                O rastreio de sono utiliza dispositivos e sensores para coletar
                dados detalhados sobre seus padrões de sono.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg">
              <div className="bg-blue-800 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise Completa</h3>
              <p className="text-gray-400 text-sm">
                Esses dados são analisados para fornecer informações valiosas
                sobre a qualidade e duração do seu sono.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg">
              <div className="bg-blue-800 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Insights Personalizados
              </h3>
              <p className="text-gray-400 text-sm">
                Com base nesses insights, você pode identificar oportunidades de
                melhorar sua rotina de sono.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
