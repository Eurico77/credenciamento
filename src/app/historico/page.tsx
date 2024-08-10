'use client';

import { useEffect, useState } from 'react';

type Participant = {
  id: number;
  name: string;
  address: string;
  phone: string;
  isMember: boolean;
};

export default function Historico() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [nonMemberCount, setNonMemberCount] = useState(0);

  const fetchParticipants = async () => {
    const response = await fetch('/api/history');
    if (!response.ok) {
      throw new Error('Failed to fetch participants');
    }
    const data = await response.json();
    setParticipants(data);

    const total = data.length;
    const members = data.filter(
      (participant: Participant) => participant.isMember
    ).length;
    const nonMembers = total - members;

    setTotalCount(total);
    setMemberCount(members);
    setNonMemberCount(nonMembers);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-black mb-4">
        Histórico de Participantes
      </h2>
      <div className="w-full max-w-md mb-4 bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-lg font-bold text-black">
          Contagem de Participantes
        </h3>
        <p className="text-black">Total: {totalCount}</p>
        <p className="text-black">Membros da Igreja: {memberCount}</p>
        <p className="text-black">Não Membros: {nonMemberCount}</p>
      </div>
      <ul className="w-full max-w-md">
        {participants.map((participant) => (
          <li
            key={participant.id}
            className="p-2 border border-gray-300 rounded mb-2 bg-white shadow"
          >
            <h4 className="font-bold text-lg text-black">{participant.name}</h4>
            <p className="text-black">Endereço: {participant.address}</p>
            <p className="text-black">Telefone: {participant.phone}</p>
            <p className="text-black">
              Status: {participant.isMember ? 'Membro' : 'Não Membro'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
