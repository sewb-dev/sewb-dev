import qnaiService from '@/modules/qnai/qnai.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
      const { numberOfQuestions, sourceText } = await req.json();

      if (!numberOfQuestions || isNaN(numberOfQuestions) || !sourceText) {
        return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
      }

      const questions = await qnaiService.getQuestionsFromText(sourceText, numberOfQuestions);
      return NextResponse.json(questions, { status: 201 })
    } catch (error) {
      console.error('Error processing the request:', error);
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
};
