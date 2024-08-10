'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import './globals.css';

interface Props {
  children: ReactNode;
}

const ClientSessionProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientSessionProvider>
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/credenciamento" className="hover:underline">
                  Credenciamento
                </Link>
              </li>
              <li>
                <Link href="/sorteio" className="hover:underline">
                  Sorteio
                </Link>
              </li>
              <li>
                <Link href="/historico" className="hover:underline">
                  Histórico
                </Link>
              </li>
              <li>
                <Link href="/participantes" className="hover:underline">
                  Participantes
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
