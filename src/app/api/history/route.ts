import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const history = await prisma.participant.findMany();
  return NextResponse.json(history);
}
