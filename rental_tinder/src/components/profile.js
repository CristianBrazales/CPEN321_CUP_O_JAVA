// JavaScript source code
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { Button, Card, CardSection, Welcome_header } from './common';
import { Actions } from 'react-native-router-flux';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
var welcome_message = 'Welcome';
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
        alert( AsyncStorage.getItem('user'));


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
            var value = await AsyncStorage.getItem('username');
            
                this.setState({ username: value})
            
            if (value !== null) {
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
                        <Button onPress={this.create_post}>
                    Creat a post
                </Button> 
                </CardSection>

                <CardSection>
                        <Button onPress={this.search}>
                    Search a post
                </Button> 
                </CardSection>

                <CardSection>
                <Button>
                    Manage my post
                </Button> 
                </CardSection>

                <CardSection>
                        <Button onPress={this.logout}>
                    Log out
                </Button>
                </CardSection>

                </Card>
            </View>
        );
    }

}
export default profile;