import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';

import {Product} from '../../../shared/interfaces/product';
import FoodContext from '../../../store/foodContext';
import {setFoodTitle, setProduct} from '../../../store/foodActions';
import useDeleteProduct from '../../../api/sugarCollector/hooks/useDeleteProduct';
import {Alert} from 'react-native';

interface UseProductsProps {
  onProductDeleted: () => void;
  onProductsFocus: () => void;
}

interface UseProductsRes {
  productClickHandler: (item: Product) => void;
  addProductHandler: () => void;
  deleteProductHandler: (product: Product) => void;
  isDeleting: boolean;
}

const useProducts: (props: UseProductsProps) => UseProductsRes = ({
  onProductDeleted,
  onProductsFocus,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {navigate} = useNavigation();
  const {dispatchFoodState} = useContext(FoodContext);
  const {deleteProduct} = useDeleteProduct();
  const {addListener} = useNavigation();

  useEffect(() => {
    return addListener('focus', () => onProductsFocus());
  }, [addListener, onProductsFocus]);

  const productClickHandler = (item: Product) => {
    dispatchFoodState(setFoodTitle({value: item.name}));
    dispatchFoodState(setProduct({value: item}));
    navigate('Products', {
      screen: 'Product',
      params: {
        screen: 'ProductItem',
      },
    });
  };

  const addProductHandler = () => {
    dispatchFoodState(setProduct({value: null}));
    navigate('Products', {
      screen: 'Product',
      params: {
        screen: 'ProductConstructor',
      },
    });
  };

  const removeProduct = async (productId: string) => {
    setIsDeleting(true);
    await deleteProduct(productId);
    setIsDeleting(false);

    onProductDeleted();
  };

  const deleteProductHandler = (product: Product) => {
    Alert.alert(`Delete product ${product.name}`, 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeProduct(product._id).then();
        },
      },
    ]);
  };

  return {
    productClickHandler,
    addProductHandler,
    deleteProductHandler,
    isDeleting,
  };
};

export default useProducts;
