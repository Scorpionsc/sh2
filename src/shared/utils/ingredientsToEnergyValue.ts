import {Ingredient} from '../interfaces/ingredient';
import {EnergyValue} from '../interfaces/energyValue';

const ingredientsToEnergyValue = (
  ingredients: Record<string, Ingredient>,
): EnergyValue => {
  const totalProduct = Object.values(ingredients).reduce(
    (accum, ingredient) => {
      return {
        carbohydrates:
          accum.carbohydrates +
          (+ingredient.carbohydrates / 100) * +ingredient.weight,
        fats: accum.fats + (+ingredient.fats / 100) * +ingredient.weight,
        proteins:
          accum.proteins + (+ingredient.proteins / 100) * +ingredient.weight,
        weight: accum.weight + +ingredient.weight,
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
    fats: totalProduct.fats / (totalProduct.weight / 100),
    carbohydrates: totalProduct.carbohydrates / (totalProduct.weight / 100),
    proteins: totalProduct.proteins / (totalProduct.weight / 100),
  };
};

export default ingredientsToEnergyValue;
