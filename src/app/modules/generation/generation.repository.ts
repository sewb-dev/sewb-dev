import { update } from "firebase/database";
import BaseRepository from "../base.repository";
import { GenerationModel } from "./generation.model";

class GenerationRepository extends BaseRepository {
  constructor() {
    super()
  }

  addGeneration = async (generation: GenerationModel): Promise<GenerationModel | void> => {
    const updates: Record<string, GenerationModel> = {}
    
    updates[`/generations/${generation.userId}/${generation.generationId}`] = generation
    
    return update(this.dbRef, updates)
      .then(() => generation)
      .catch((error) => console.error(error))
  }
}

export default GenerationRepository
