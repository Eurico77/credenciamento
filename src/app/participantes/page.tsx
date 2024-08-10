'use client';

import { useEffect, useState } from 'react';

type Participant = {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  isMember: boolean;
};

export default function ParticipantsList() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    async function fetchParticipants() {
      const response = await fetch('/api/participants');
      const data = await response.json();
      setParticipants(data);
    }

    fetchParticipants();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Lista de Participantes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {participant.name}
            </h3>
            <p className="text-gray-700">
              Idade: <span className="font-bold">{participant.age}</span>
            </p>
            <p className="text-gray-700">
              Endereço: <span className="font-bold">{participant.address}</span>
            </p>
            <p className="text-gray-700">
              Telefone:{' '}
              <span className="font-bold">{participant.phone || 'N/A'}</span>
            </p>
            <p className="text-gray-700">
              Membro da Igreja:{' '}
              <span className="font-bold">
                {participant.isMember ? 'Sim' : 'Não'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
