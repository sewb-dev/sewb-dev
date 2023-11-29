import { GenerationModelDto } from '@/dto/generation';
import { config } from '@/lib/auth';
import envVariables from '@/lib/env';
import authService from '@/modules/auth/auth.service';
import { GenerationStatus } from '@/modules/generation/generation.model';
import generationService from '@/modules/generation/generation.service';
import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';
import qnaiService from '@/modules/qnai/qnai.service';
import { StatusCodes } from 'http-status-codes';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { generationId: string } }
) {
  try {
    const session = await getServerSession(config);

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in' },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    console.log('1');

    const request = await fetch(
      `${envVariables.getEnv('MODEL_URL')}/generations/${params.generationId}`,
      {
        method: 'get',
        headers: {
          'x-caller-token': envVariables.getEnv('MODEL_CALLER_TOKEN'),
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('2');

    const generationStatus = (await request.json()) as GenerationStatus;
    console.log('3');

    if (generationStatus.status === 'INCOMPLETE') {
      return NextResponse.json(
        { done: false, qnai: new QNAIGenerationModel([], []) },
        { status: StatusCodes.ACCEPTED }
      );
    }
    console.log('4');

    const generationModel = await qnaiService.handleLongPolling(
      generationStatus.content,
      params.generationId
    );
    console.log('5');

    return NextResponse.json(
      { done: true, qnai: generationModel },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.log(error);
  }
}
