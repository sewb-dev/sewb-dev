export type GenerationModel = {
  generationId: string;
  generatedAt: number;
  userId: string;
};

export type GenerationStatus = {
  status: 'INCOMPLETE' | 'COMPLETE';
  content: string;
  error: string | null;
};
