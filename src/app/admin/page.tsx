'use client';

import { useEffect, useState } from 'react';

type Participant = {
  id: number;
  name: string;
  address: string;
  phone: string;
  isMember: boolean;
};

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const fetchParticipants = async () => {
    const response = await fetch('/api/participants');
    const data = await response.json();
    setParticipants(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/participants/${id}`, {
      method: 'DELETE',
    });
    fetchParticipants(); // Atualiza a lista após a exclusão
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Admin - Gerenciar Participantes
      </h2>
      <ul className="w-full max-w-md">
        {participants.map((participant) => (
          <li
            key={participant.id}
            className="p-4 border border-gray-300 rounded mb-2 flex justify-between items-center"
          >
            <div className="text-black">
              <h3 className="font-bold">{participant.name}</h3>
              <p>{participant.address}</p>
              <p>{participant.phone}</p>
              <p>Membro da Igreja: {participant.isMember ? 'Sim' : 'Não'}</p>
            </div>
            <button
              onClick={() => handleDelete(participant.id)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
