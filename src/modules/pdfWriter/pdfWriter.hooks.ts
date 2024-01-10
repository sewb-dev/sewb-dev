import { GenerationModelDto } from '@/dto/generation';
import requestClient from '@/lib/requestClient';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';

const useExportPDF = (generationId: string) =>
  useCallback(async () => {
    const response: AxiosResponse = await requestClient.get(
      `generations/${generationId}/export/pdf`,
      { responseType: 'blob' }
    );

    const generationMeta: AxiosResponse<GenerationModelDto, any> =
      await requestClient.get(`generations/${generationId}/info`);

    const generationTitle = generationMeta.data.generationTitle;
    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${generationTitle}_qna.pdf`);

    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, [generationId]);

export default useExportPDF;
