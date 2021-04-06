import sugarCollectorApiService from '../../../api/sugarCollector/sugarCollectorApiService';
import {useEffect, useState} from 'react';
import {SugarCollectorSource} from '../../../shared/interfaces/sugarCollectorSource';

interface UseGetSourceRes {
  isLoading: boolean;
  source: SugarCollectorSource | null;
  reFetchData: () => void;
}

const useGetSource: () => UseGetSourceRes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [source, setSource] = useState<SugarCollectorSource | null>(null);

  useEffect(() => {
    getSugarCollector().then();
  }, []);

  const getSugarCollector = async () => {
    setIsLoading(true);
    const res = await sugarCollectorApiService.getSugarCollector();
    setIsLoading(false);

    setSource(res);
  };

  return {
    isLoading,
    reFetchData: getSugarCollector,
    source,
  };
};

export default useGetSource;
