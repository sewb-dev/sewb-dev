import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { QNAI } from '../qnai/qnai.model';


class PDFWriterService {
  private indexToOptions: { [key: number]: string } = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}

  constructor() {
    const root = __dirname.split(".next")[0];
    const destinationFolder = `${root}.next/server/app/api/generations/[generationId]/export/pdf/data`;
    const dataFolder = `${root}node_modules/pdfkit/js/data`;

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    const files = fs.readdirSync(dataFolder);

    files.forEach(file => {
      const sourceFile = path.join(dataFolder, file);
      const destinationFile = path.join(destinationFolder, file);
      fs.copyFileSync(sourceFile, destinationFile);
    });
  }

  createDocument = async () => {
    const doc = new PDFDocument({ margin: 50, font: 'Helvetica', autoFirstPage: false });

    
    
    doc.on('pageAdded', () => {
      this.addPage(doc);
    })
    
    doc.addPage({ margin: 50 })
    
    let margins = doc.page.margins
    doc.page.margins = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }

    doc.moveDown()

    doc.font('Helvetica-Bold')

    doc.page.margins = margins
    console.info(doc.page.margins)
    doc.fontSize(20)
    doc.text('Questions and Answers', { align: 'center' })

    doc.font('Helvetica')
    doc.fontSize(16)
    doc.fillColor('blue')
      .text('Powered by QnAI', { link: 'https://qnai.sewb.dev', align: 'center' })
      .fillColor('black')

    doc.moveDown(2)
    return doc;
  }

  addPage = async (doc: PDFKit.PDFDocument) => {
    doc.fontSize(10)
    doc.font('Helvetica-Oblique')
      .text('Built by ', 20, 10, { continued: true })
      .fillColor('blue')
      .text('Temiloluwa Ojo', { link: 'https://github.com/themmyloluwaa', continued: true, underline: true })
      .fillColor('black')
      .text(' and ', { continued: true, underline: false  })
      .fillColor('blue')
      .text("'Wole Ajewole", { link: 'https://github.com/wolemercy', continued: true, underline: true })
      .text('', { continued: false, underline: false  })
      .fillColor('black')
    doc.moveDown(4)

    doc.font('Helvetica')
        .fontSize(12)

    return doc
  }

  addQuestion = async (doc: PDFKit.PDFDocument, qnai: QNAI, questionNumber: number) => {
    doc.font('Helvetica')
      .fontSize(12)
      .text(`${questionNumber}. ${qnai.question}`, { lineGap: 5 })

    for (let i = 0; i < qnai.options.length; i++) {
      doc.moveDown()

      doc.font('Helvetica')
        .fontSize(12)
        .text(`${this.indexToOptions[i]}. ${qnai.options[i]}`, { indent: 12 })
    }

    return doc;
  }

  addAnswer = async (doc: PDFKit.PDFDocument, qnai: QNAI, questionNumber: number) => {
    doc.font('Helvetica')
    doc.fontSize(12)

    const answerOption = qnai.answer as number;

    doc.text(`${questionNumber}. ${this.indexToOptions[answerOption]} => ${qnai.options[answerOption]}`)

    return doc;
  }

  generateQuestionsPDF = async (qnai: QNAI[]) => {
    const doc = await this.createDocument();

    doc.font('Helvetica-Bold')
    doc.fontSize(16)
    doc.text('Questions', { align: 'left' })
    
    doc.moveDown()

    for (let i = 0; i < qnai.length; i++) {
      await this.addQuestion(doc, qnai[i], i + 1);
      doc.moveDown(2)
    }

    doc.addPage({ margin: 50 })

    doc.font('Helvetica-Bold')
    doc.fontSize(16)
    doc.text('Answers', { align: 'left' })

    doc.moveDown()

    for (let i = 0; i < qnai.length; i++) {
      await this.addAnswer(doc, qnai[i], i + 1);
      doc.moveDown(1)
    }

    doc.end();
    return doc

  }
}

const pdfWriterService = new PDFWriterService();
export default pdfWriterService;