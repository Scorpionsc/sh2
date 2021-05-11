import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';
import {Dish} from '../../../shared/interfaces/dish';

interface UseUpdateDishRes {
  updateDish: (product: Dish) => Promise<boolean>;
}

const useUpdateDish: () => UseUpdateDishRes = () => {
  const updateDish = async (dish: Dish) => {
    try {
      const result = await fetch(`${DOMAIN}${SugarCollectorPaths.UpdateDish}`, {
        method: 'PUT',
        body: JSON.stringify(dish),
      });

      return result.ok;
    } catch (err) {
      return true;
    }
  };
  return {
    updateDish,
  };
};

export default useUpdateDish;
