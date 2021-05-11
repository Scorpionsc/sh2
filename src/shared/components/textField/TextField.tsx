import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import noop from '../../utils/noop';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  textField: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 5,
  },
  textFieldLabel: {
    fontSize: 16,
    color: '#535353',
  },
  textFieldInput: {
    fontSize: 16,
    color: '#535353',
    padding: 0,
    flex: 1,
  },
  textFieldError: {
    color: '#ff614e',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface TextFieldProps {
  isEditable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  isMultiline?: boolean;
  numberOfLines?: number;
  value?: string;
  style?: ViewStyle[];
  isRequired?: boolean;
  onSubmitEditing?: (val: string) => void;
  onBlur?: (val?: string) => void;
  onChangeText?: (val: string) => void;
}

const TextField: FC<TextFieldProps> = ({
  isEditable = true,
  keyboardType = 'default',
  label,
  isMultiline = false,
  value,
  style = [],
  isRequired = false,
  numberOfLines = 1,
  onSubmitEditing = noop,
  onBlur = noop,
  onChangeText = noop,
}) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const valueMiddleware = useCallback(
    (val: string): string =>
      keyboardType === 'decimal-pad' ? val.replace(',', '.') : val,
    [keyboardType],
  );
  const focusHandler = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  const onBlurHandler = useCallback(() => {
    setIsTouched(true);

    onBlur(valueMiddleware(value || ''));
  }, [value, onBlur, valueMiddleware]);

  const isInvalid = useMemo(() => {
    return isRequired && isTouched ? !value : false;
  }, [isRequired, isTouched, value]);

  return (
    <View style={[styles.textField, ...style]}>
      {label && (
        <Text
          style={[
            styles.textFieldLabel,
            ...(isInvalid ? [styles.textFieldError] : []),
          ]}
          onPress={focusHandler}>
          {label}
        </Text>
      )}
      <View style={styles.input}>
        <TextInput
          style={styles.textFieldInput}
          ref={inputRef}
          multiline={isMultiline}
          editable={isEditable}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          value={value}
          onSubmitEditing={e => onSubmitEditing(e.nativeEvent.text)}
          onBlur={onBlurHandler}
          onChangeText={(val: string) => {
            onChangeText(valueMiddleware(val));
          }}
        />
        <Icon
          name="close-circle"
          color="#cccccc"
          size={15}
          onPress={() => onChangeText('')}
        />
      </View>
    </View>
  );
};

export default TextField;
