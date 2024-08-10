'use client';

import { useState } from 'react';

export default function Credenciamento() {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isMember, setIsMember] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/participants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        age: age as number,
        address,
        phone,
        isMember,
        userId: 1, // Substitua pelo ID do usuário logado, se necessário
      }),
    });

    if (response.ok) {
      // Limpar os campos após o sucesso
      setName('');
      setAge('');
      setAddress('');
      setPhone('');
      setIsMember(false);
      console.log('Participante criado com sucesso!');
    } else {
      console.error('Erro ao criar participante.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Credenciamento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-zinc-800"
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mb-2 p-2 border border-gray-300 rounded text-zinc-800"
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-zinc-800"
          required
        />
        <input
          type="text"
          placeholder="Telefone (opcional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-zinc-800"
        />
        <label className="flex items-center mb-4 text-zinc-800">
          <input
            type="checkbox"
            checked={isMember}
            onChange={(e) => setIsMember(e.target.checked)}
            className="mr-2"
          />
          Membro Da Igreja ?
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Credenciar
        </button>
      </form>
    </div>
  );
}
