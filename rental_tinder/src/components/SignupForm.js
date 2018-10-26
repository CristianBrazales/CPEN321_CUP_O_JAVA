import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common'


class SignupForm extends Component {

    state ={ userName:'', email: '', setpassword: '', phonenumber: ''};



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
                <Button onPress={() =>{this.handlePress_create_user.bind(this)}}>
                   Submit!
                </Button>
                </CardSection>

                
                
            </Card>
        );
    }


    handlePress_create_user = async () => {
        fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.userName,
                password: this.state.setpassword,
               
    
            }),
    
        })
            .catch(error => console.error('Error:', error));
    };

}

export default SignupForm;