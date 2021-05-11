import FOOD_FORCE from '../configs/foodForce';

const calculateCalories = <
  T extends {fats: string; proteins: string; carbohydrates: string}
>(
  product: T,
): number => {
  const foodForce = FOOD_FORCE;

  const fatsCalories = Number(product.fats) * foodForce.fats;
  const proteinsCalories = Number(product.proteins) * foodForce.proteins;
  const carbohydratesCalories =
    Number(product.carbohydrates) * foodForce.carbohydrates;

  return fatsCalories + proteinsCalories + carbohydratesCalories;
};

export default calculateCalories;
