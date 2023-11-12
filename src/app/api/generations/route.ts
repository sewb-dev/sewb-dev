import { config } from '@/lib/auth';
import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';
import qnaiService from '@/modules/qnai/qnai.service';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import generationService from "@/modules/generation/generation.service";


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(config)

    if (!session) {
      return NextResponse.json({ message: 'You must be logged in' }, { status: 401 })
    }

    const { numberOfQuestions, sourceText } = await req.json();

    if (!numberOfQuestions || isNaN(numberOfQuestions) || !sourceText) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const { email } = session.user
    const generation = await generationService.createQNAGeneration(email, sourceText, numberOfQuestions)

    if (!generation) {
      return NextResponse.json({ message: 'An error occured while saving the generation' }, { status: 500 })
    }

    return NextResponse.json(generation, { status: 201 })
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   // todo: should replace fixed id with generation id from the server.
//   const qnai = new QNAIGenerationModel([], []);
//   qnaiService.saveGeneratedQuestionToCache('1', qnai);
//   const response = await qnaiService.getCachedGeneratedQuestion('1');
//   return NextResponse.json({ message: response });
// }
