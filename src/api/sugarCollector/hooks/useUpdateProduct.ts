import {Product} from '../../../shared/interfaces/product';
import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';

interface UseUpdateProductRes {
  updateProduct: (product: Product) => Promise<boolean>;
}

const useUpdateProduct: () => UseUpdateProductRes = () => {
  const updateProduct = async (product: Product) => {
    try {
      const result = await fetch(
        `${DOMAIN}${SugarCollectorPaths.UpdateProduct}`,
        {
          method: 'PUT',
          body: JSON.stringify(product),
        },
      );

      return result.ok;
    } catch (err) {
      return true;
    }
  };
  return {
    updateProduct,
  };
};

export default useUpdateProduct;
