import {KitchenProduct} from '../../../shared/interfaces/kitchenProduct';
import {Ingredient} from '../../../shared/interfaces/ingredient';

const productsToIngredient = (
  products: KitchenProduct[],
): Record<string, Ingredient> =>
  products.reduce(
    (accum, product) => ({
      ...accum,
      [product.id]: {
        id: product.id,
        title: product.name,
        type: 'product',
        weight: product.weight,
        fats: product.fats,
        proteins: product.proteins,
        carbohydrates: product.carbohydrates,
      },
    }),
    {},
  );

export default productsToIngredient;
