import SugarCollectorPaths from '../enums/sugarCollectorPaths';
import DOMAIN from '../../constants/domain';
import {SugarCollectorSource} from '../../../shared/interfaces/sugarCollectorSource';

const getSugarCollector = async (): Promise<SugarCollectorSource> => {
  const res = await fetch(`${DOMAIN}${SugarCollectorPaths.GetSugarCollector}`);
  return await res.json();
};

export default getSugarCollector;
