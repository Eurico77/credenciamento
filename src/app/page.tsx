'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona diretamente para a página de credenciamento
    router.push('/credenciamento');
  }, [router]);

  return null; // Retorna null enquanto redireciona
}
