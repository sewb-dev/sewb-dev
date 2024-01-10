import { config } from '@/lib/auth';
import generationService from '@/modules/generation/generation.service';
import { StatusCodes } from 'http-status-codes';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { generationId: string } }
) {
  const session = await getServerSession(config);

  if (!session) {
    return NextResponse.json(
      { message: 'You must be logged in' },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  const { email } = session.user;

  const generation = await generationService.getUserGenerationFromDB(
    email,
    params.generationId
  );

  if (!generation) {
    return NextResponse.json(
      { message: 'Generation Not Found' },
      { status: StatusCodes.NOT_FOUND }
    );
  }

  return NextResponse.json({
    ...generation,
    generatedAt: new Date(generation.generatedAt).toISOString(),
  });
}
