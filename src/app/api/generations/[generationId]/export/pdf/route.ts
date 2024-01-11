import { NextRequest, NextResponse } from 'next/server';
import blobstream from 'blob-stream';
import pdfWriterService from '@/modules/pdfWriter/pdfWriter.service';
import generationService from '@/modules/generation/generation.service';
import { StatusCodes } from 'http-status-codes';

export async function GET(
  req: NextRequest,
  { params }: { params: { generationId: string } }
) {
  const response = await generationService.getCachedGeneratedQuestion(
    params.generationId
  );

  if (!response) {
    return NextResponse.json(
      { message: 'Generation Not Found' },
      { status: StatusCodes.NOT_FOUND }
    );
  }

  const qnai = response.qna;

  return new Promise(async (resolve, reject) => {
    const doc = await pdfWriterService.generateQuestionsPDF(qnai);

    const stream = doc.pipe(blobstream());

    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      const data: ReadableStream = blob.stream();
      resolve(
        new NextResponse(data, {
          headers: { 'Content-Type': 'application/pdf' },
        })
      );
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}
