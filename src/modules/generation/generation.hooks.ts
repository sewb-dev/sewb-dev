import { CreateGenerationRequest, GenerationQNAIDto } from '@/dto/generation';
import requestClient from '@/lib/requestClient';
import { useMutation } from '@tanstack/react-query';

export const useCreateQNAIGeneration = () =>
  useMutation<GenerationQNAIDto, Error, CreateGenerationRequest>({
    mutationKey: ['createGeneration'],
    mutationFn: async (data) => {
      const response = await requestClient.post<GenerationQNAIDto>(
        '/generations',
        data
      );
      return response.data;
    },
  });
