import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {Button, Card, CardSection, Input, Header} from './common';
import { Actions } from  'react-native-router-flux';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }
    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('user');

        if (value !== null)
            this.props.navigation.navigate('profile');
    }

    render(){
        return(
            <View>
            <Header headerText ='Rental Tinder'/>
            <Card>
                <CardSection>
                    <Input 
                    placeholder = "username"
                            label="Username:"
                            value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    />
                </CardSection>



                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder ="      password"
                        label= "Passwords:"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                                       
                    />
                </CardSection>

                
                
                <CardSection>
                        <Button onPress={this.login} >
                    Log In 
                </Button>
                </CardSection>

                
                <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('signup') }>
                    Sign Up
                </Button>
                </CardSection>
            </Card>
            </View>
        );
    }
}
signup = () => {
    this.props.navigation.navigate('SignupForm');
}
login = () => {
    this.props.navigation.navigate('profile');
    fetch('', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        })
    })
            .then((response) => response.json())
            .then((res) => {

                if (res.sucess == true) {
                    AsyncStorage.setItem('user', res.user);
                    this.props.navigation.navigate('profile');
                }
                else {
                    alert(res.message);
                }
            })
                .done();
    }
        


const mapStateToProps = state => {

    return {
        username: state.auth.username

    };


};




export default LoginForm;