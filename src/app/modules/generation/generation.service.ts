import authService from "../auth/auth.service";
import BaseService from "../base.service";
import { GenerationModel } from "./generation.model";
import GenerationRepository from "./generation.repository";

class GenerationService extends BaseService {
  private generationRepository: GenerationRepository

  constructor() {
    super()
    this.generationRepository = new GenerationRepository()
  }

  addGeneration = async (email: string, generatedAt: Date, generationId: string) => {
    const generationModel: GenerationModel = {
      generationId,
      generatedAt: generatedAt.getTime(),
      userId: authService.getUserId(email),
    }

    return await this.generationRepository.addGeneration(generationModel)
  }
}

const generationService = new GenerationService()

export default generationService