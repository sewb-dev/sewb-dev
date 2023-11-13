import { QNAIGenerationModel } from "@/modules/qnai/qnai.model"

export type GenerationModelDto = {
  generationId: string
  generatedAt: string
  userId: string
}

export type GenerationQNAIDto = {
  qnai: QNAIGenerationModel
  generation: GenerationModelDto
}