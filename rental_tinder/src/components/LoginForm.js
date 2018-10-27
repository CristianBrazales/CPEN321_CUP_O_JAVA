import React ,{ Component } from 'react';
import { View } from 'react-native';
import {Button, Card, CardSection, Input, Header} from './common';
import { Actions } from  'react-native-router-flux';

// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
class LoginForm extends Component {
    state = { username: '', password: ''};
    

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
                <Button >
                    Log In
                </Button>
                </CardSection>

                
                <CardSection>
                <Button  onPress={() =>{Actions.Signup()}}>
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




export default LoginForm;