import {Entry} from './entry';
import {TailingsData} from './tailingsData';

export interface SugarCollectorSource {
  lastEntry: Entry;
  loopData?: TailingsData;
}
