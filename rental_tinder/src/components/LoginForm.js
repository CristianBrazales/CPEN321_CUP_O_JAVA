import React ,{ Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import {Button, Card, CardSection, Input, Header} from './common';
import { Actions } from  'react-native-router-flux';


class LoginForm extends Component {
    state = { email: '', password: ''};
    

    render(){
        return(
            <View>
            <Header headerText ='Rental Tinder'/>
            <Card>
                <CardSection>
                    <Input 
                    placeholder = "user@gmail.com"
                    label ="Email:"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
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