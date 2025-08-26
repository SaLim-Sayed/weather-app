import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from "@tanstack/react-query";


import axios from 'axios';
import { API_URL } from './api';
 
type ApiQueryProps<TResponse> = {
  key: unknown[];
  url: any;
  config?: UseQueryOptions<TResponse>;
  enabled?: boolean;
};

export function useApiQuery<TResponse = any>({
  key,
  url,
  config,
  enabled = true,
}: ApiQueryProps<TResponse>) {
  const isQueryEnabled = !!url && enabled;
 
  return useQuery<TResponse>({
    queryKey: key,
    staleTime: 1000 * 60 * 2,
    enabled: isQueryEnabled,
    retry: 1,
    queryFn: async () => {
      const { data } = await axios.get<TResponse>(`${API_URL}${url}`);
      return data;
    },
    ...config,
  });
}
