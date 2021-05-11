import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';

interface UseDeleteProductRes {
  deleteProduct: (productId: string) => Promise<boolean>;
}

const useDeleteProduct: () => UseDeleteProductRes = () => {
  const deleteProduct = async (productId: string) => {
    try {
      const result = await fetch(
        `${DOMAIN}${SugarCollectorPaths.DeleteProduct}`,
        {
          method: 'DELETE',
          body: productId,
        },
      );

      return result.ok;
    } catch (err) {
      return true;
    }
  };
  return {
    deleteProduct,
  };
};

export default useDeleteProduct;
