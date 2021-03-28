import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';

interface Props {
  options?: TextInputProps & {ref?: (ref: any) => void};
  contentContainerStyle?: StyleProp<ViewStyle>;
  textInputContainer?: StyleProp<ViewStyle>;
  iconRightStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: TextInputProps;
  leftContent?: () => JSX.Element;
  rightContent?: () => JSX.Element;
  erorrMessage?: string | boolean;
}

const Input: React.FC<Props> = ({
  options,
  contentContainerStyle,
  textInputContainer,
  placeholderTextColor,
  leftContent,
  rightContent,
  erorrMessage,
  iconRightStyle,
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          contentContainerStyle,
          !!erorrMessage && {borderColor: Colors.warning},
        ]}>
        {rightContent && (
          <View style={[styles.iconRight, iconRightStyle]}>
            {rightContent()}
          </View>
        )}
        <TextInput
          {...options}
          style={[
            styles.textInputContainer,
            textInputContainer,
            rightContent && {paddingRight: 30},
            leftContent && {paddingLeft: 30},
          ]}
        />
        {leftContent && <View style={styles.iconLeft}>{leftContent()}</View>}
      </View>
      {!!erorrMessage && (
        <View style={{marginVertical: 5}}>
          <Text
            style={[
              styles.errorMessage,
              {color: !!erorrMessage ? Colors.warning : 'transparent'},
            ]}>
            {erorrMessage}
          </Text>
        </View>
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 15,
    padding: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.inputBackground,
    paddingHorizontal: 20,
  },
  textInputContainer: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(25),
    color: '#707070',
  },
  iconLeft: {
    position: 'absolute',
    paddingLeft: 10,
    top: 18,
  },
  iconRight: {
    position: 'absolute',
    // paddingRight: 10,
    top: 14,
    right: 10,
    alignSelf: 'center',
    zIndex: 100,
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
});
