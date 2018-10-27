import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common'
import {Alert} from 'react-native';


class SignupForm extends Component {

    state ={ userName:'', email: '', password: '', phonenumber: ''};



    render(){
        return(
            <Card>
                <CardSection>
                    <Input 
                    placeholder = "please enter username"
                    label ="User name:"
                    value={this.state.userName}
                    onChangeText={userName =>this.setState({userName})}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                    placeholder = "user@gmail.com"
                    label ="Email:"
                    value={this.state.email}
                    onChangeText={email =>this.setState({email})}
                    />
                </CardSection>



                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder ="At least 6 characters"
                        label= "Set Password:"
                        value={this.state.password}
                        onChangeText={password=>this.setState({password})}                   
                    />
                </CardSection>

                
                <CardSection>
                    <Input 
                    placeholder = "123-4567890"
                    label ="Phone:"
                    value={this.state.phonenumber}
                    onChangeText={phonenumber =>this.setState({phonenumber})}
                    />
                </CardSection>
                
                <CardSection>
                <Button onPress={this.handlePress_create_user.bind(this)}>
                   Submit!
                </Button>
                </CardSection>

                
                
            </Card>
        );
    }


    handlePress_create_user = async () => {
        Alert.alert(JSON.stringify({
            "username": this.state.userName,
            "password": this.state.password
        
        }));
        fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'username=' + this.state.userName + '&password=' + this.state.password + '&email=' + this.state.email + '&phonenumber=' + this.state.phonenumber
        })
            .catch(error => console.error('Error:', error));
    };

}

export default SignupForm;