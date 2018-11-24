// JavaScript source code
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { Button, Card, CardSection, Welcome_header } from './common';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
var welcome_message = 'Welcome';
function findAndReplace_2(string, target, replacement) {

var i = 0, length = string.length;

for (i; i < length; i++) {

 string = string.replace(target, replacement);

}
return string;

}
class profile extends Component {
    constructor(props) {
        super(props);
       // var name = await AsyncStorage.getItem('user');
        this.state = { username: '' };


    }

    componentDidMount() {
        this._mounted = true
       this._retrieveData().done();
    }

    componentWillUnmount() {
        this._mounted = false
    }
    search = () => {
      this.props.navigation.navigate('search');


    }
    logout = () => {
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('login');

    }
    create_post = () => {/*
        this.props.navigation.navigate('post');*/
    }
    _retrieveData = async () => {
        //this.setState({ username: 'cristian' })
     //   var value = await AsyncStorage.getItem('user');
        //username => this.setState({ username: user})

        try {
            var val = await AsyncStorage.getItem('username');
            var det = findAndReplace_2(val, "\"","");
              AsyncStorage.setItem('username',det);
                this.setState({ username: det})

            if (val!== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {

        //
         this._retrieveData().done();
        return (
            //await this._retrieveData()
            <View >
                <Welcome_header >
                    {welcome_message + " " + this.state.username + "!"}
                </Welcome_header>
                <Card>

                <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('post_screen') }>
                    Post your place!
                </Button>
                </CardSection>
                <CardSection>
                        <Button onPress={this.search}>
                        advance search!
                </Button>
                </CardSection>

                <CardSection>
                        <Button onPress={this.search}>
                    Look for a place (advance search)!
                </Button>
                </CardSection>

                <CardSection>
                <Button>
                    Manage my posts
                </Button>
                </CardSection>

                <CardSection>
                <Button onPress={this.logout}>
                    Log out!
                </Button>
                </CardSection>

                </Card>
            </View>
        );
    }

}
export default profile;
