import React from 'react';
import {TextInput, View, Text} from 'react-native';

const SearchInput = ({ label, value, onChangeText, placeholder, secureTextEntry , testID}) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            testID={testID}
          />
        </View>
      );
    };

const styles = {
    inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 16,
      lineHeight: 23,
      flex: 2
    },
    labelStyle: {
      fontSize: 19,
      paddingLeft: 5,
      flex: 0
    },
    containerStyle: {
      height: 40,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    }
  };
export {SearchInput};
