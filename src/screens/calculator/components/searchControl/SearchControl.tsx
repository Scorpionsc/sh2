import React, {FC, useCallback, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  searchControl: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingRight: 20,
    paddingLeft: 20,
  },
  searchControlItem: {
    backgroundColor: '#ffffff',
    height: 40,
    alignSelf: 'stretch',
    color: '#535353',
    flex: 1,
  },
  searchControlIcon: {
    marginRight: 5,
  },
});

interface SearchControlProps {
  searchText: string;
  onChangeText: (val: string) => void;
}

const SearchControl: FC<SearchControlProps> = ({onChangeText, searchText}) => {
  const searchInputRef = useRef<TextInput>(null);

  const onSearchControlPress = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef]);

  return (
    <View style={[styles.searchControl]}>
      <Icon
        name="ios-search"
        color="#cccccc"
        onPress={onSearchControlPress}
        style={styles.searchControlIcon}
        size={25}
      />
      <TextInput
        style={[styles.searchControlItem]}
        onChangeText={onChangeText}
        ref={searchInputRef}
        value={searchText}
      />
    </View>
  );
};

export default SearchControl;
