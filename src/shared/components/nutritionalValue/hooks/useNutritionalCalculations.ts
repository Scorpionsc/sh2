import {KitchenProduct} from '../../../interfaces/kitchenProduct';
import {useEffect, useMemo, useState} from 'react';
import productsToEnergyValue from '../utils/productsToEnergyValue';
import {EnergyValue} from '../../../interfaces/energyValue';
import FOOD_FORCE from '../../../configs/foodForce';
import perHundred from '../../../utils/perHundred';

interface UseNutritionalCalculationsRes {
  proteins: string;
  carbohydrates: string;
  fats: string;
  calories: number;
}

interface UseNutritionalCalculationsProps {
  products: KitchenProduct[];
  isDish: boolean;
}

const useNutritionalCalculations: (
  props: UseNutritionalCalculationsProps,
) => UseNutritionalCalculationsRes = ({products, isDish}) => {
  const [result, setResult] = useState({
    calories: 0,
    carbohydrates: '0',
    fats: '0',
    proteins: '0',
  });
  const [calories, setCalories] = useState<number>(0);
  const energyValue = useMemo<EnergyValue>(
    () => productsToEnergyValue(products),
    [products],
  );
  const weight = useMemo(
    () =>
      products.reduce((accum, product) => accum + +(product.weight || 0), 0),
    [products],
  );

  useEffect(() => {
    const foodForce = FOOD_FORCE;

    const proteinsCalories = +energyValue.proteins * foodForce.proteins;
    const fatsCalories = +energyValue.fats * foodForce.fats;
    const carbohydratesCalories =
      +energyValue.carbohydrates * foodForce.carbohydrates;

    setCalories(proteinsCalories + fatsCalories + carbohydratesCalories);
  }, [energyValue]);
  useEffect(() => {
    setResult({
      calories: isDish ? +perHundred(calories, weight) : calories,
      carbohydrates: isDish
        ? perHundred(+energyValue.carbohydrates, weight)
        : energyValue.carbohydrates,
      fats: isDish ? perHundred(+energyValue.fats, weight) : energyValue.fats,
      proteins: isDish
        ? perHundred(+energyValue.proteins, weight)
        : energyValue.proteins,
    });
  }, [calories, energyValue, isDish, weight]);

  return result;
};

export default useNutritionalCalculations;
