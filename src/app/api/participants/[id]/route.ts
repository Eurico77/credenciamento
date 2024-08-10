import { PrismaClient } from '@prisma/client/extension';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedParticipant = await prisma.participant.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedParticipant);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete participant' },
      { status: 500 }
    );
  }
}
