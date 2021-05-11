import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';
import {Dish} from '../../../shared/interfaces/dish';

interface UseCreateDishRes {
  createDish: (dish: Dish) => Promise<boolean>;
}

const useCreateDish: () => UseCreateDishRes = () => {
  const createDish = async (dish: Dish) => {
    try {
      const result = await fetch(`${DOMAIN}${SugarCollectorPaths.CreateDish}`, {
        method: 'POST',
        body: JSON.stringify(dish),
      });

      return result.ok;
    } catch (err) {
      return true;
    }
  };
  return {
    createDish,
  };
};

export default useCreateDish;
