import {KitchenProduct} from '../../../interfaces/kitchenProduct';
import {useEffect, useMemo, useState} from 'react';
import productsToEnergyValue from '../utils/productsToEnergyValue';
import {EnergyValue} from '../../../../../shared/interfaces/energyValue';

interface UseNutritionalCalculationsRes {
  proteins: number;
  carbohydrates: number;
  fats: number;
  calories: number;
}

interface UseNutritionalCalculationsProps {
  products: KitchenProduct[];
}

const useNutritionalCalculations: (
  props: UseNutritionalCalculationsProps,
) => UseNutritionalCalculationsRes = ({products}) => {
  const [calories, setCalories] = useState<number>(0);
  const energyValue = useMemo<EnergyValue>(
    () => productsToEnergyValue(products),
    [products],
  );

  useEffect(() => {
    const foodForce = {
      proteins: 4.1,
      carbohydrates: 4.1,
      fats: 9.29,
    };

    const proteinsCalories = energyValue.proteins * foodForce.proteins;
    const fatsCalories = energyValue.fats * foodForce.fats;
    const carbohydratesCalories =
      energyValue.carbohydrates * foodForce.carbohydrates;

    setCalories(proteinsCalories + fatsCalories + carbohydratesCalories);
  }, [energyValue]);

  return {
    calories,
    carbohydrates: energyValue.carbohydrates,
    fats: energyValue.fats,
    proteins: energyValue.proteins,
  };
};

export default useNutritionalCalculations;
