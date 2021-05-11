import {useContext, useEffect, useState} from 'react';
import FoodContext from '../../../store/foodContext';
import {Product} from '../../../shared/interfaces/product';
import useCreateProduct from '../../../api/sugarCollector/hooks/useCreateProduct';
import {
  setIsProductSaving,
  setProduct as setStateProduct,
} from '../../../store/foodActions';
import {useNavigation} from '@react-navigation/native';
import useUpdateProduct from '../../../api/sugarCollector/hooks/useUpdateProduct';

interface UseProductsConstructorRes {
  isProcessing: boolean;
  product: Product;
  onProductChange: (valueName: string) => (value: string) => void;
}

const useProductsConstructor: () => UseProductsConstructorRes = () => {
  const [product, setProduct] = useState<Product>({
    _id: '',
    proteins: '0',
    name: '',
    carbohydrates: '0',
    gi: '0',
    description: '',
    fats: '0',
    updatedAt: 0,
  });
  const {
    foodState: {product: sourceProduct, isProductSaving},
    dispatchFoodState,
  } = useContext(FoodContext);
  const {createProduct} = useCreateProduct();
  const {updateProduct} = useUpdateProduct();
  const {navigate, goBack} = useNavigation();

  useEffect(() => {
    if (sourceProduct) {
      setProduct(sourceProduct);
    }
  }, [sourceProduct]);

  useEffect(() => {
    if (isProductSaving) {
      if (product.name.trim() === '') {
        dispatchFoodState(setIsProductSaving({value: false}));
        return;
      }
      const now = Date.now();
      if (product._id === '') {
        createProduct({...product, _id: now.toString(), updatedAt: now}).then(
          () => {
            dispatchFoodState(setIsProductSaving({value: false}));
            navigate('Products', {screen: 'ProductsList'});
          },
        );
        return;
      }
      updateProduct({...product, updatedAt: now}).then(() => {
        dispatchFoodState(setIsProductSaving({value: false}));
        dispatchFoodState(setStateProduct({value: product}));
        goBack();
      });
    }
  }, [
    updateProduct,
    navigate,
    goBack,
    isProductSaving,
    product,
    createProduct,
    dispatchFoodState,
  ]);

  const onProductChange = (valueName: string) => (value: string) => {
    if (
      (valueName === 'carbohydrates' ||
        valueName === 'proteins' ||
        valueName === 'fats') &&
      Number.isNaN(+value)
    ) {
      return false;
    }

    setProduct(prevState => ({
      ...prevState,
      [valueName]: value,
    }));
  };

  return {
    isProcessing: true,
    product,
    onProductChange,
  };
};

export default useProductsConstructor;
