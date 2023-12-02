import { GenerationModelDto, GenerationQNAIDto } from '@/dto/generation';
import { config } from '@/lib/auth';
import generationService from '@/modules/generation/generation.service';
import { isEnglishWithLangDetect, isEnglishWithWordCheck } from '@/utils/checkLanguage';
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

    const isEnglish = isEnglishWithLangDetect(sourceText) || isEnglishWithWordCheck(sourceText);

    if (!isEnglish) {
      return NextResponse.json(
        { message: 'Only English Language texts are supported' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const { email } = session.user;
    const { qnai, generation } = await generationService.createQNAGeneration(
      email,
      sourceText,
      numberOfQuestions
    );

    if (!(qnai && generation)) {
      return NextResponse.json(
        { message: 'An error occured while saving the generation' },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }

    const generationResponse: GenerationModelDto = {
      ...generation,
      generatedAt: new Date(generation.generatedAt).toISOString(),
    };

    const response: GenerationQNAIDto = {
      qnai,
      generation: generationResponse,
    };

    return NextResponse.json(response, { status: StatusCodes.CREATED });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Server Error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
