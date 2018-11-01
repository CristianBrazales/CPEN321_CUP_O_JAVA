// JavaScript source code
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, CardSection, Input, Header } from './common';
import { Actions } from 'react-native-router-flux';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
class profile extends Component {
    render() {
        return (
            <View >
                <Text> LOGIN SUCCESFULLY </Text>
            </View>
        );
    }

}
export default profile;