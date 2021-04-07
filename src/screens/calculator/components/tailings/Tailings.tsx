import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TailingsData} from '../../../../shared/interfaces/tailingsData';
import moment from 'moment';

interface TailingsProps {
  isLoading: boolean;
  source?: TailingsData;
}

const styles = StyleSheet.create({
  container: {},
  line: {
    flexDirection: 'row',
    backgroundColor: '#cccccc',
    borderRadius: 4,
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    color: '#535353',
  },
  value: {
    paddingHorizontal: 4,
    marginHorizontal: 4,
    backgroundColor: '#535353',
    borderRadius: 4,
  },
  valueText: {
    color: '#cccccc',
  },
});

const Tailings: FC<TailingsProps> = ({isLoading, source}) => {
  const cob = source ? Math.round(source.cob.cob) : '---';
  const iob = source ? Math.round(source.iob.iob * 100) / 100 : '---';
  const cobTime =
    source && !isLoading ? moment(source.cob.timestamp).fromNow() : '';
  const iobTime =
    source && !isLoading ? moment(source.iob.timestamp).fromNow() : '';

  return (
    <View>
      <View style={styles.line}>
        <Text style={styles.text}>IOB</Text>
        <View style={styles.value}>
          <Text style={styles.valueText}>{isLoading ? '---' : iob}U</Text>
        </View>
        <Text style={styles.text}>{iobTime}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>COB</Text>
        <View style={styles.value}>
          <Text style={styles.valueText}>{isLoading ? '---' : cob}g</Text>
        </View>
        <Text style={styles.text}>{cobTime}</Text>
      </View>
    </View>
  );
};

export default Tailings;
