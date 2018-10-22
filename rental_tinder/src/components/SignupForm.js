import React ,{ Component } from 'react';
import {Button, Card, CardSection, Input} from './common'

class LoginForm extends Component {

    state ={ userName:'', email: '', setpassword: '', phonenumber: ''};



    render(){
        return(
            <Card>
                <CardSection>
                    <Input 
                    placeholder = "please enter username"
                    label ="UserName:"
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
                <Button>
                   Submit!
                </Button>
                </CardSection>

                
                
            </Card>
        );
    }
}

export default LoginForm;