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
    
    login = async () => {
       
        fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/login',{
            method: 'POST',
            credentials: 'include',

         
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            body: 'username=' + this.state.username + '&password=' + this.state.password
            })
            .then((response) => response.json())
            .then((res) => {
               
                if (res.success == true) {
                    alert(res.username);
                    var string = JSON.stringify(res.username);
                    console.warn(string);

                    AsyncStorage.setItem('username', string);
                    this.props.navigation.navigate('profile');
                }
                else {
                    alert(res.message);
                }
            }).catch((error) => {
                alert("please, check the password and username");
                this.props.navigation.navigate('login');
            }).done();
            
        }


    /*
    login =  async () => {
        
        fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                username : this.state.username,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.message);
                if (res.success == true) {
                    AsyncStorage.setItem('user', res.user);
                    this.props.navigation.navigate('profile');
                }
                else {
                    alert(res.message);
                }
            }).catch((error) => {
                console.error(error);
            }).done();
    }*/
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
                        <Button onPress={ this.login} >
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


        


const mapStateToProps = state => {

    return {
        username: state.auth.username

    };


};




export default LoginForm;