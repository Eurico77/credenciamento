import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const participants = await prisma.participant.findMany();
  return NextResponse.json(participants);
}

export async function POST(request: Request) {
  const { name, age, isMember, address, phone } = await request.json();
  const participant = await prisma.participant.create({
    data: {
      name,
      age,
      isMember,
      address,
      phone,
    },
  });
  return NextResponse.json(participant);
}
