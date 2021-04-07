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
    color: '#d7d7d7',
  },
  textFieldInput: {
    fontSize: 16,
    color: '#d7d7d7',
    padding: 0,
  },
  textFieldError: {
    color: '#ff614e',
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
  isRequired: boolean;
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

  const focusHandler = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  const onBlurHandler = useCallback(() => {
    setIsTouched(true);

    onBlur(value);
  }, [value, onBlur]);

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
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextField;
