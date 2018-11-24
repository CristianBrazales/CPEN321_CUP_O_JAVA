import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common';
const MIN_CHARACTERS = 6;


class EditProfile extends Component{

    state = { newemail: '', newpassword: '', newphonenumber: '', passwordValidate: false };

    validate_password  (newpassword){
        if (newpassword.length >= MIN_CHARACTERS) {
                this.setState({ passwordValidate: true, })
            } else {
                this.setState({ passwordValidate: false, })
            }
    }

    render(){
        return(
            <Card>

                <CardSection>
                    <Input
                    placeholder = "user@gmail.com"
                    label ="New Email:"
                    value={this.state.newemail}
                    onChangeText={newemail =>this.setState({newemail})}
                    />
                </CardSection>



                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder ="At least 6 characters (only characters)"
                        label= "New Password:"
                        value={this.state.newpassword}
                        onChangeText={newpassword => this.setState({ newpassword })}

                />
                </CardSection>


                <CardSection>
                    <Input
                    placeholder = "123-4567890"
                    label ="New Phonenum:"
                    value={this.state.newphonenumber}
                    onChangeText={newphonenumber =>this.setState({newphonenumber})}
                    />
                </CardSection>

                <CardSection>
                <Button onPress={this.handlePress_edit_profile.bind(this)}>
                   Submit!
                </Button>
                </CardSection>

            </Card>
        );
    }

    handlePress_edit_profile = async () => {
        // upon submit first check the inputs, on sucess send the data
        await  this.validate_password(this.state.password)

        if (this.state.passwordValidate == true) {

            Alert.alert(JSON.stringify(
                "Sucess log in, please "

            ));

            fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'password=' + this.state.newpassword + '&email=' + this.state.newemail + '&phonenumber=' + this.state.newphonenumber
            })
                .catch(error => console.error('Error:', error));
            this.props.navigation.navigate('login');
        }
        // look for the error
        else {
            Alert.alert(JSON.stringify(
                "please check the  password (at least 6 characters)"

            ));
        }
    }

}


export default EditProfile;