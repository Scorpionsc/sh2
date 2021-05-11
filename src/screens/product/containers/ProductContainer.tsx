import React, {FC, useContext} from 'react';
import FoodContext from '../../../store/foodContext';
import ProductItem from '../components/productItem/ProductItem';

const ProductContainer: FC = () => {
  const {
    foodState: {product},
  } = useContext(FoodContext);

  return product ? <ProductItem product={product} /> : null;
};

export default ProductContainer;
