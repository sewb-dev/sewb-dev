import { QNAIGenerationModel } from '@/modules/qnai/qnai.model';
import qnaiService from '@/modules/qnai/qnai.service';
import { NextRequest, NextResponse } from 'next/server';
import { questions  as q } from '@/utils/ai/mockResponse';
export async function POST(req: NextRequest) {
  try {
    const { numberOfQuestions, sourceText } = await req.json();

    if (!numberOfQuestions || isNaN(numberOfQuestions) || !sourceText) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // const questions = await qnaiService.getQuestionsFromText(
    //   sourceText,
    //   numberOfQuestions
    // );
    const mockQuestions = new QNAIGenerationModel(q, [])
    return NextResponse.json({q:mockQuestions}, { status: 201 });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // todo: should replace fixed id with generation id from the server.
  const qnai = new QNAIGenerationModel([], []);
  qnaiService.saveGeneratedQuestionToCache('1', qnai);
  const response = await qnaiService.getCachedGeneratedQuestion('1');
  return NextResponse.json({ message: response });
}
