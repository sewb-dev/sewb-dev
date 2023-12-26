import { config } from '@/lib/auth';
import generationService from '@/modules/generation/generation.service';
import { QNAIGenerationModel, QNAITest } from '@/modules/qnai/qnai.model';
import { StatusCodes } from 'http-status-codes';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
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

  const { answer, startedAt, submittedAt } = (await req.json()) as QNAITest;

  const response = await generationService.getCachedGeneratedQuestion(
    params.generationId
  );

  if (!response) {
    return NextResponse.json(
      { message: 'Question Not Found' },
      { status: StatusCodes.NOT_FOUND }
    );
  }
  const updatedGenerationModel = new QNAIGenerationModel(response.qna, [
    ...response.tests,
    new QNAITest(startedAt, submittedAt, answer),
  ]);
  
  await generationService.saveGeneratedQuestionToCache(
    params.generationId,
    updatedGenerationModel
  );

  return NextResponse.json(updatedGenerationModel);
}
