'use client';

import { useEffect, useState } from 'react';

type Participant = {
  id: number;
  name: string;
  isMember: boolean;
  address: string;
  phone: string;
};

export default function Sorteio() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);

  useEffect(() => {
    async function fetchParticipants() {
      const response = await fetch('/api/participants');
      const data = await response.json();
      // Filtra apenas participantes que não são membros
      const nonMembers = data.filter(
        (participant: Participant) => !participant.isMember
      );
      setParticipants(nonMembers);
    }

    fetchParticipants();
  }, []);

  const draw = async () => {
    // Verifica se existem participantes não membros
    if (participants.length === 0) {
      alert('Não há participantes disponíveis para sorteio.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * participants.length);
    const selected = participants[randomIndex];
    setWinner(selected);

    setParticipants((prev) =>
      prev.filter((participant) => participant.id !== selected.id)
    );

    // Adiciona o ganhador ao histórico
    await fetch('/api/history', {
      method: 'POST',
      body: JSON.stringify({ participantId: selected.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sorteio</h2>
      {winner && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-blue-500 w-full max-w-sm">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Ganhador</h3>
          <p className="text-gray-800">
            Nome: <span className="font-bold">{winner.name}</span>
          </p>
          <p className="text-gray-800">
            Endereço: <span className="font-bold">{winner.address}</span>
          </p>
          <p className="text-gray-800">
            Telefone: <span className="font-bold">{winner.phone}</span>
          </p>
        </div>
      )}
      <button
        onClick={draw}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Realizar Sorteio
      </button>
      {participants.length === 0 && (
        <p className="mt-4 text-red-500">
          Todos os participantes foram sorteados!
        </p>
      )}
    </div>
  );
}
