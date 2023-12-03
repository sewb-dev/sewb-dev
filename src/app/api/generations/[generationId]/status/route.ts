import { GenerationModelDto } from '@/dto/generation';
import { config } from '@/lib/auth';
import envVariables from '@/lib/env';
import requestClient from '@/lib/requestClient';
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

    const request = await requestClient.get<GenerationStatus>(
      `${envVariables.getEnv('MODEL_URL')}/generations/${params.generationId}`,
      {
        headers: {
          'x-caller-token': envVariables.getEnv('MODEL_CALLER_TOKEN'),
          'Content-Type': 'application/json',
        },
      }
    );

    if (request.data.status === 'INCOMPLETE') {
      return NextResponse.json(
        { done: false, qnai: new QNAIGenerationModel([], []) },
        { status: StatusCodes.ACCEPTED }
      );
    }

    if (request.data.error) {
      console.error(request.data.error);
      throw new Error(
        'Failed to fetch your newly created questions and answers. Please try again.'
      );
    }

    const generationModel = await generationService.handleLongPolling(
      request.data.content,
      params.generationId
    );

    return NextResponse.json(
      { done: true, qnai: generationModel },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.error(error);
  }
}
