import React from 'react';
import {TextInput, View, Text} from 'react-native';

const MessageInput = ({ label, value, onChangeText, placeholder, secureTextEntry , testID}) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            multiline = {true}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            testID={testID}
            numberOfLines = {5}
          />
        </View>
      );
    };

const styles = {
    inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 19,
      lineHeight: 23,
      flex: 2
    },
    labelStyle: {
      fontSize: 19,
      paddingLeft: 5,
      flex: 1
    },
    containerStyle: {
      height: 150,
      flex: 1,
      flexDirection: 'row',
    //  alignItems: 'center'
    }
  };
export {MessageInput};
