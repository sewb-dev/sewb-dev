import {
  AddUserToWaitingListRequest,
  AddUserToWaitingListResponse,
} from '@/dto/user';
import requestClient from '@/lib/requestClient';
import { useMutation } from '@tanstack/react-query';

export const useAddUserToWaitingList = () =>
  useMutation<AddUserToWaitingListResponse, Error, AddUserToWaitingListRequest>(
    {
      mutationKey: ['addWaitingListUser'],
      mutationFn: async (data) => {
        const response = await requestClient.post<AddUserToWaitingListResponse>(
          '/users/waiting-list',
          data
        );
        return response.data;
      },
    }
  );
