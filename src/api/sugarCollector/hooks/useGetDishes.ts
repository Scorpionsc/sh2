import DOMAIN from '../../constants/domain';
import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import {Dish} from '../../../shared/interfaces/dish';
import {ApiResponse} from '../interfaces/apiResponse';
import useGetRequest from './useGetRequest';

interface UseGetDishesRes {
  isLoading: boolean;
  dishes: Dish[] | null;
  error: Error | null;
}

const useGetDishes: () => ApiResponse<Dish[]> = () => {
  const {data, error, isLoading, reFetch} = useGetRequest<Dish[]>(
    `${DOMAIN}${SugarCollectorPaths.GetDishes}`,
  );

  return {
    isLoading,
    data,
    error,
    reFetch,
  };
};

export default useGetDishes;
