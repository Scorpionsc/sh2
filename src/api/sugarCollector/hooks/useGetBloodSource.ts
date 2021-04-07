import DOMAIN from '../../constants/domain';
import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import {SugarCollectorSource} from '../../../shared/interfaces/sugarCollectorSource';
import {ApiResponse} from '../interfaces/apiResponse';
import useGetRequest from './useGetRequest';

const useGetBloodSource: () => ApiResponse<SugarCollectorSource> = () => {
  const {data, error, isLoading, reFetch} = useGetRequest<SugarCollectorSource>(
    `${DOMAIN}${SugarCollectorPaths.GetSugarCollector}`,
  );

  return {
    isLoading,
    data,
    error,
    reFetch,
  };
};

export default useGetBloodSource;
