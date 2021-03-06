import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common'
import { View, AsyncStorage, StyleSheet, KeyboardAvoidingView, TouchableOpacity , Alert} from 'react-native';
//import {Keyboard} from 'react-native'
const MIN_CHARACTERS = 6;

class SignupForm extends Component {
    // for sign in, we need the following fields
    constructor(props) {
        super(props);
        this.state = { userName: '', email: '', password: '', phonenumber: '', nameValidate: false, passwordValidate: false,emailValidate:false,phoneValidate:false };

    }
   // validate the user name input
    validate_username (userName) {
        alph = /^[a-zA-Z0-9]+$/
        if (alph.test(userName) && userName.length >= MIN_CHARACTERS) {
            this.setState({ nameValidate: true, })
        } else {
            this.setState({ nameValidate: false, })
        }
    }
    //validate the password input
    validate_password  (password){
        if (password.length >= MIN_CHARACTERS) {
                this.setState({ passwordValidate: true, })
            } else {
                this.setState({ passwordValidate: false, })
            }
  }
  validate_email  (email){
      if (email!='') {
              this.setState({ emailValidate: true, })
          } else {
              this.setState({ emailValidate: false, })
          }
  }

  validate_phone  (phone){
      if (phone!='') {
              this.setState({ phoneValidate: true, })
          } else {
              this.setState({ phoneValidate: false, })
          }
  }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                    placeholder = "please enter username"
                    label ="User name:"
                    value={this.state.userName}
                        onChangeText={userName => this.setState({ userName })}

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
                        placeholder ="At least 6 characters (only characters)"
                        label= "Set Password:"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}

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
        // upon submit first check the inputs, on sucess send the data
        await this.validate_username(this.state.userName)
        await  this.validate_password(this.state.password)
        await this.validate_email(this.state.email)
        await this.validate_phone(this.state.phonenumber)


        if (this.state.passwordValidate == true && this.state.nameValidate== true && this.state.emailValidate==true && this.state.phoneValidate==true) {


            fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'username=' + this.state.userName + '&password=' + this.state.password + '&email=' + this.state.email + '&phonenumber=' + this.state.phonenumber
            })




            .then((response) => response.json())
            .then((res) => {

                if (res.success == true) {
                  alert("Success!");
                  this.props.navigation.navigate('login');
                }

                if (res.success == false){

                  alert(res.message.message);
                }
            }).catch((error) => {
                alert("something goes wrong");

            })

        }
        // look for the error
        else {
            if (this.state.passwordValidate == false && this.state.nameValidate == false) {

                Alert.alert(JSON.stringify(
                    "please check the username and password"

                ));
            } else if(this.state.passwordValidate == false) {
                Alert.alert(JSON.stringify(
                    "please check the  password (at least 6 characters)"

                ));
            }
            else if (this.state.nameValidate == false) {
                Alert.alert(JSON.stringify(
                    "please check the username (at least 6 alphabetical characters)"

                ));
            }
            else if (this.state.emailValidate == false) {
                Alert.alert(JSON.stringify(
                    "The email cannot be empty"

                ));
            }
            else if (this.state.phoneValidate == false) {
                Alert.alert(JSON.stringify(
                    "The phone number cannot be empty"

                ));
            }

            // set flags


        }
    };

}

export default SignupForm;
