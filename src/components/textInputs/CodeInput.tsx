import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { Colors, Fonts } from '../../constants/styleConstants';
interface ICodeInput {
  onChangeText?: (text: string) => void;
  arrayWidth?:number
}
const CodeInput: FC<ICodeInput> = ({ onChangeText,arrayWidth }) => {
  const [state, setstate] = useState<any>({
    inputRefs: {} as any,
    inputValues: {} as any,
    value: '',
    active: null,
  });
  const GetInputValues = () => {
    setstate((old: any) => ({
      ...old,
      value: Object.keys(state.inputValues)
        .reduce((res, v) => {
          return res.concat(state.inputValues[v]);
        }, [])
        .join(''),
    }));
  };
  useEffect(() => {
    GetInputValues();
  }, [state.inputValues]);
  useEffect(() => {
    onChangeText && onChangeText(state.value);
  }, [state.value]);

  useEffect(() => {
    if (state.inputRefs[`input_0`]) {
      state.inputRefs[`input_0`].focus();
    }
  }, []);
  //onChangeText
  return (
    <View style={styles.container}>
      {[...Array(arrayWidth).keys()].map(index => (
        <View style={styles.textInpuContainer} key={index}>
          <TextInput
            style={[
              styles.textInput,
              state.active === index && {
                borderBottomColor: Colors.minColor,
              },
            ]}
            keyboardType="numeric"
            maxLength={1}
            ref={ref => {
              state.inputRefs[`input_${index}`] = ref;
            }}
            onKeyPress={keyPress => {
              keyPress.persist();
              if (keyPress.nativeEvent.key === 'Backspace') {
                if (
                  state.inputValues[`input_${index}`]?.length != 0 &&
                  index !== 5 &&
                  index !== 0
                ) {
                  state.inputRefs[`input_${index + 1}`]?.focus();
                } else if (
                  index !== 0 &&
                  state.inputValues[`input_${index}`]?.length === 0
                ) {
                  state.inputRefs[`input_${index - 1}`]?.focus();
                }
              }
            }}
            onChangeText={text => {
              setstate((old: any) => ({
                ...old,
                inputValues: { ...old.inputValues, [`input_${index}`]: text },
              }));
              if (text.length != 0 && index !== 5) {
                state.inputRefs[`input_${index + 1}`]?.focus();
              } else if (index !== 0 && text.length === 0) {
                state.inputRefs[`input_${index - 1}`]?.focus();
              }
            }}
            onFocus={() => {
              setstate((old: any) => ({ ...old, active: index }));
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default CodeInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInpuContainer: {
    width: 50,
    height: 50,
    paddingHorizontal: 5,
  },
  textInput: {
    borderBottomColor: Colors.dark,
    borderBottomWidth: 2,
    width: '100%',
    color: Colors.dark,
    height: '100%',
    fontSize: 20,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
