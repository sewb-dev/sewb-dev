import { GenerationModelDto, GenerationQNAIDto } from '@/dto/generation';
import { config } from '@/lib/auth';
import {
  GenerationAPIResponse,
  GenerationModel,
} from '@/modules/generation/generation.model';
import generationService from '@/modules/generation/generation.service';
import userService from '@/modules/user/user.service';
import {
  isEnglishWithLangDetect,
  isEnglishWithWordCheck,
} from '@/utils/checkLanguage';
import { StatusCodes } from 'http-status-codes';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(config);

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in' },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { numberOfQuestions, sourceText } = await req.json();

    if (!numberOfQuestions || isNaN(numberOfQuestions) || !sourceText) {
      return NextResponse.json(
        { message: 'Invalid request data' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const isEnglish =
      isEnglishWithLangDetect(sourceText) || isEnglishWithWordCheck(sourceText);

    if (!isEnglish) {
      return NextResponse.json(
        { message: 'Only English texts are supported' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const { email } = session.user;
    const { generationId } = await generationService.createQNAGeneration(
      email,
      sourceText,
      numberOfQuestions
    );

    if (!generationId) {
      return NextResponse.json(
        { message: 'An error occured while saving the generation' },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json({ generationId }, { status: StatusCodes.CREATED });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Server Error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(config);

  if (!session) {
    return NextResponse.json(
      { message: 'You must be logged in' },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  const userGenerations = await userService.getUserGenerationIds(
    session.user.email
  );

  return NextResponse.json({ message: userGenerations });
}
