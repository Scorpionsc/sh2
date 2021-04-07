import {Product} from '../../../shared/interfaces/product';
import DOMAIN from '../../constants/domain';
import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import {ApiResponse} from '../interfaces/apiResponse';
import useGetRequest from './useGetRequest';

interface UseGetProductsRes {
  isLoading: boolean;
  products: Product[] | null;
  error: Error | null;
}

const useGetProducts: () => ApiResponse<Product[]> = () => {
  const {data, error, isLoading, reFetch} = useGetRequest<Product[]>(
    `${DOMAIN}${SugarCollectorPaths.GetProducts}`,
  );

  return {
    isLoading,
    data,
    error,
    reFetch,
  };
};

export default useGetProducts;
