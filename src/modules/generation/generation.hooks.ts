import {
  CreateGenerationRequest,
  GenerationQNAIDto,
  GenerationStatusQNAIDto,
} from '@/dto/generation';
import requestClient from '@/lib/requestClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  QNAIGenerationModel,
  QNAITest as QNAITestClass,
} from '../qnai/qnai.model';
import { QNAITest } from '@/lib/types';

const getStatus = async (generationId: string) => {
  const request = await requestClient.get<GenerationStatusQNAIDto>(
    `/generations/${generationId}/status`
  );

  return request.data;
};

export const useCreateQNAIGeneration = () =>
  useMutation<GenerationQNAIDto, Error, CreateGenerationRequest>({
    mutationKey: ['createGeneration'],
    mutationFn: async (data) => {
      const response = await requestClient.post<GenerationQNAIDto>(
        'generations',
        data
      );

      return response.data;
    },
  });

export const useGetQNAIGenerationStatus = (
  generationId: string,
  enabled = false
) => {
  return useQuery({
    queryKey: ['getGenerationStatus', generationId],
    queryFn: () => getStatus(generationId),
    refetchInterval: (d) => (!d || !d.state.data?.done ? 2000 : false),

    enabled,
  });
};

export const getQNAIGenerationById = async (generationId: string) => {
  const res = await requestClient.get<QNAIGenerationModel>(
    `generations/${generationId}`
  );

  return res.data;
};
export const useGetQNAIGenerationById = (generationId: string) => {
  return useQuery({
    queryKey: ['getQNAIGenerationById', generationId],
    queryFn: () => getQNAIGenerationById(generationId),
  });
};

export const useSubmitTest = (generationId: string) =>
  useMutation<QNAITestClass, Error, QNAITest>({
    mutationKey: ['createTestSession'],
    mutationFn: async (data) => {
      try {
        const response = await requestClient.post<QNAITestClass>(
          `tests/${generationId}`,
          data
        );

        return response.data;
      } catch (error: any) {
        console.error(error);
        throw new Error(error);
      }
    },
  });
