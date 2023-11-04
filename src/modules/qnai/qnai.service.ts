import OpenAI from 'openai'
import { QNAI, QNAIGenerationModel } from "./qnai.model"

class QNAIService {
  private openai: OpenAI
  jsonResponseStartingMarker = 'BEGIN_JSON'
  jsonResponseEndingMarker = 'END_JSON'

  constructor() {
    this.openai = new OpenAI()
  }

  getQuestionsFromText = async (sourceText: string, numberOfQuestions = 10): Promise<QNAIGenerationModel> => {
    const prompt = `
    Generate a set of ${numberOfQuestions} difficult educational questions and answers from the following text. I want to use these questions to prepare an examination for my students. Please format the questions and answers as JSON and wrap the JSON response with specific characters for easy parsing in code. Format each question as a question object which comprises of the following five properties;

    1. Question Number. Call this property 'id'. Its value should be the question number
    2. Question Type. Call this property 'type'. Its value should be the type of question. There are two possible question types, namely 'trueOrFalse' and 'multipleChoice'
    3. Question. Call this property 'question'. Its value should be the question that the student has to answer based on the text. If the 'type' is 'trueOrFalse', then the value of the 'q' should be a question that students can answer either 'True' or 'False' to. If the 'type' is 'multipleChoice', then the value of the 'q' should be a question that has only one correct answer from a list of options.
    3. Options. Call this property 'options'. Its value should be a list of string options available for my students to pick from.  If the 'type' is 'trueOrFalse', the options should be 'True' and 'False' because those are the only options available to my students. If the 'type' is 'multipleChoice', the options should be a list of the options my students have to pick from. I want four options only.
    4. Answer. Call this property 'answer'. Its value should be the correct answer to the question. The value should be the zero-based index of the correct answer in the list of 'options'.
    5. Context. Call this property 'context'. Its value should be the specific portion of the text that contains the answer to the question. It must read word for word from the text.
    
    It is important that you add these five properties to each of the question objects. It is equally important that 70% of the questions are of type 'multipleChoice', and '30%' are of type 'trueOrFalse'. Also, ensure that the questions and answers are relevant to the text, and that the answer is correct. Return a JSON object that has one key named questions and the value is a list of question objects with the five previously named properties. Wrap the JSON response with ${this.jsonResponseStartingMarker} at the beginning and ${this.jsonResponseEndingMarker} at the end. Here is the relevant text:
    
    '''
    ${sourceText}
    '''
    `
    try {
      const completions = await this.sendOpenAIRequest({
        messages: [
          {role: 'system', content: 'You are a world class Question Generator'},
          {role: 'user', content: prompt},
        ],
        model: 'gpt-3.5-turbo'
      }) as OpenAI.Chat.Completions.ChatCompletion
  
      const qnaiGenerationModel = this.parseQuestionsFromCompletions(completions)
      return qnaiGenerationModel

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private sendOpenAIRequest = async (params: OpenAI.Chat.ChatCompletionCreateParams) => {
    return this.openai.chat.completions.create(params)
      .then((response) => response)
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  private parseQuestionsFromCompletions = (response: OpenAI.Chat.Completions.ChatCompletion): QNAIGenerationModel => {
    try {
      const jsonContent = response.choices[0].message.content
      if (!jsonContent) {
        throw new Error("Response contained no content") 
      }

      const startIndex = jsonContent.indexOf(this.jsonResponseStartingMarker) + this.jsonResponseStartingMarker.length
      const endIndex = jsonContent.lastIndexOf(this.jsonResponseEndingMarker)

      const questions = jsonContent.substring(startIndex, endIndex)
      const jsonQuestions = JSON.parse(questions) as QNAI[]

      const qnaiGenerationModel: QNAIGenerationModel = new QNAIGenerationModel(
        jsonQuestions, []
      )
      
      return qnaiGenerationModel
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const qnaiService = new QNAIService()

export default qnaiService