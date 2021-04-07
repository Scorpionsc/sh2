import {useCallback, useEffect, useState} from 'react';

import {ApiResponse} from '../interfaces/apiResponse';

const useGetRequest = <T>(path: string): ApiResponse<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    await setIsLoading(true);
    try {
      const res = await fetch(path);
      const result = await res.json();
      setData(result);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  const reFetch = useCallback(() => {
    fetchData().then();
  }, [fetchData]);

  return {
    isLoading,
    data,
    error,
    reFetch,
  };
};

export default useGetRequest;
