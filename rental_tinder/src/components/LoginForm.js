import React ,{ Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import {Button, Card, CardSection, Input, Header} from './common';
import { Actions } from  'react-native-router-flux';


class LoginForm extends Component {
    state = { username: '', password: ''};
    

    render(){
        return(
            <View>
            <Header headerText ='Rental Tinder'/>
            <Card>
                <CardSection>
                    <Input 
                    placeholder = "user@gmail.com"
                            label="Email:"
                            value={this.state.username}
                    onChangeText={email => this.setState({ username })}
                    />
                </CardSection>



                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder ="      password"
                        label= "Password:"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                                       
                    />
                </CardSection>

                
                
                <CardSection>
                        <Button onPress={() => { Actions.Signup() }}>
                    Log In
                </Button>
                </CardSection>

                
                <CardSection>
                        <Button onPress={this.handlePress_login_user.bind(this)}>
                    Sign Up
                </Button>
                </CardSection>
            </Card>
            </View>
        );
    }
}

const mapStateToProps = state => {

    return{
        email: state.auth.email

    };


};

handlePress_login_user = async () => {
    fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
           

        }),

    })
        .catch(error => console.error('Error:', error));
}


export default LoginForm;