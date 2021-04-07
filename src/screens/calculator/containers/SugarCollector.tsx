import React, {FC} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import CurrentSugar from '../components/currentSugar/CurrentSugar';
import Tailings from '../components/tailings/Tailings';
import useAppStateChange from '../../../shared/hooks/useAppStateChange';
import useGetBloodSource from '../../../api/sugarCollector/hooks/useGetBloodSource';

const styles = StyleSheet.create({
  treatmentInfo: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const SugarCollector: FC = () => {
  const {isLoading, data: source, reFetch: reFetchData} = useGetBloodSource();
  useAppStateChange({
    onActivate: reFetchData,
  });

  return (
    <View style={styles.treatmentInfo}>
      <TouchableWithoutFeedback onPress={reFetchData}>
        <View>
          <CurrentSugar isLoading={isLoading} entry={source?.lastEntry} />
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Tailings isLoading={isLoading} source={source?.loopData} />
      </View>
    </View>
  );
};

export default SugarCollector;
