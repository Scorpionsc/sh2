import React, {FC} from 'react';
import ProductsConstructor from '../components/ProductsConstructor';
import useProductsConstructor from '../hooks/useProductsConstructor';

const ProductsConstructorContainer: FC = () => {
  const {product, onProductChange} = useProductsConstructor();

  return (
    <ProductsConstructor product={product} onProductChange={onProductChange} />
  );
};

export default ProductsConstructorContainer;
