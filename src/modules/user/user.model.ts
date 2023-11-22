export type UserModel = {
  email: string;
  fullName: string;
  generation: {
    wordCount: number;
    lastGenerationId: string;
    generationCount: number;
    lastGenerationTime: number;
    generationStartDate: number;
  };
};
