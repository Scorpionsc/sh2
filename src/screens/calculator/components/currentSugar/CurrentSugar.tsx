import React, {FC} from 'react';
import {Entry} from '../../../../shared/interfaces/entry';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Drop from './svg/drop.svg';
import DROP_COLORS from './configs/dropColors';
import moment from 'moment';

interface CurrentSugarProps {
  isLoading: boolean;
  entry?: Entry;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drop: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dropImage: {
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#535353',
  },
  DoubleUp: {
    transform: [
      {
        rotateZ: '-90deg',
      },
    ],
  },
  SingleUp: {
    transform: [
      {
        rotateZ: '-90deg',
      },
    ],
  },
  FortyFiveUp: {
    transform: [
      {
        rotateZ: '-45deg',
      },
    ],
  },
  Flat: {},
  FortyFiveDown: {
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
  },
  SingleDown: {
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
  },
  DoubleDown: {
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
  },
  normal: {},
  old: {
    textDecorationLine: 'line-through',
    color: 'rgba(83,83,83, 0.5)',
  },
});

const CurrentSugar: FC<CurrentSugarProps> = ({entry, isLoading}) => {
  const spendTime =
    entry && entry.date ? (moment.now() - entry?.date) / 60000 : Infinity;
  const textStyle = spendTime < 10 ? 'normal' : 'old';
  const dropColors = DROP_COLORS;
  return (
    <View style={styles.container}>
      {entry?.direction && (
        <View style={[styles.drop, styles[entry?.direction]]}>
          <Drop
            width={80}
            height={80}
            fill={dropColors[entry?.direction]}
            style={styles.dropImage}
          />
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={[styles.text, styles[textStyle]]}>
          {entry ? Math.round((entry.sgv / 18) * 10) / 10 : '--'}
        </Text>
      )}
    </View>
  );
};

export default CurrentSugar;
