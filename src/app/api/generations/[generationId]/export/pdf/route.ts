import { NextRequest, NextResponse } from 'next/server';
import blobstream from 'blob-stream';
import { QNAI } from '@/modules/qnai/qnai.model';
import pdfWriterService from '@/modules/pdfWriter/pdfWriter.service';

export async function POST(req: NextRequest) {
  const qnai = (await req.json()) as QNAI[];

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
