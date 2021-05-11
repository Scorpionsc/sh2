import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';

interface UseDeleteDishRes {
  deleteDish: (dishId: string) => Promise<boolean>;
}

const useDeleteProduct: () => UseDeleteDishRes = () => {
  const deleteDish = async (dishId: string) => {
    try {
      const result = await fetch(`${DOMAIN}${SugarCollectorPaths.DeleteDish}`, {
        method: 'DELETE',
        body: dishId,
      });

      return result.ok;
    } catch (err) {
      return true;
    }
  };
  return {
    deleteDish,
  };
};

export default useDeleteProduct;
