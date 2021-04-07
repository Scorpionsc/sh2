import {EnergyValue} from '../../../../../shared/interfaces/energyValue';
import {KitchenProduct} from '../../../interfaces/kitchenProduct';

const productsToEnergyValue = (products: KitchenProduct[]): EnergyValue => {
  const totalProduct = products.reduce(
    (accum, product) => {
      const weight = product.weight || 0;
      return {
        carbohydrates:
          accum.carbohydrates + (+product.carbohydrates / 100) * weight,
        fats: accum.fats + (+product.fats / 100) * weight,
        proteins: accum.proteins + (+product.proteins / 100) * weight,
        weight: accum.weight + weight,
      };
    },
    {
      carbohydrates: 0,
      fats: 0,
      proteins: 0,
      weight: 0,
    },
  );

  return {
    fats: Number.isNaN(totalProduct.fats) ? 0 : totalProduct.fats,
    carbohydrates: Number.isNaN(totalProduct.carbohydrates)
      ? 0
      : totalProduct.carbohydrates,
    proteins: Number.isNaN(totalProduct.proteins) ? 0 : totalProduct.proteins,
  };
};

export default productsToEnergyValue;
