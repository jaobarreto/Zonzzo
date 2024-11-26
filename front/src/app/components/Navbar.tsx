import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-black/50 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Zonzzo</h1>
        <div className="flex items-center space-x-8">
          <Link href="/relatorio" className="text-sm">
            Relatório
          </Link>
          <div className="flex items-center space-x-2">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span className="text-sm">Luiz</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
