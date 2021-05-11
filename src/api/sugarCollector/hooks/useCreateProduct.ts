import {Product} from '../../../shared/interfaces/product';
import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';

interface UseCreateProductRes {
  createProduct: (product: Product) => Promise<boolean>;
}

const useCreateProduct: () => UseCreateProductRes = () => {
  const createProduct = async (product: Product) => {
    try {
      const result = await fetch(
        `${DOMAIN}${SugarCollectorPaths.CreateProduct}`,
        {
          method: 'POST',
          body: JSON.stringify(product),
        },
      );

      return result.ok;
    } catch (err) {
      return true;
    }
  };
  return {
    createProduct,
  };
};

export default useCreateProduct;
