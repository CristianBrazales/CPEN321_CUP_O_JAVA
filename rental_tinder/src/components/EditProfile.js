import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common';
import {Alert} from 'react-native';
const MIN_CHARACTERS = 6;


class EditProfile extends Component{

    state = { username:'', newemail: '', newpassword: '', newphonenumber: '', passwordValidate: false, info:[],emailValidate:false,phoneValidate:false };

    validate_password  (newpassword){
        if (newpassword.length >= MIN_CHARACTERS) {
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

    getdata = async () =>{
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        this.setState({info: otherParam});
        this.setState({username:name});
    }

    componentDidMount(){
        this.getdata().done();
    }


    render(){

      const { email, password, phonenumber } = this.state.info;
        return(
            <Card>

                <CardSection>
                    <Input
                    placeholder = {email}
                    label ="New Email:"
                    value={this.state.newemail}
                    onChangeText={newemail =>this.setState({newemail})}
                    />
                </CardSection>



                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder ="At lease 6 characters"
                        label= "New Password:"
                        value={this.state.newpassword}
                        onChangeText={newpassword => this.setState({ newpassword })}

                />
                </CardSection>


                <CardSection>
                    <Input
                    placeholder = {phonenumber}
                    label ="New Phone"
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
        await  this.validate_password(this.state.newpassword)
        await  this.validate_phone(this.state.newphonenumber)
        await  this.validate_email(this.state.newemail)

        if (this.state.passwordValidate == true && this.state.emailValidate==true && this.state.phoneValidate==true) {

          fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/user/edit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:'username=' + this.state.username + '&password=' + this.state.newpassword
                    + '&email=' +this.state.newemail +'&phonenumber=' + this.state.newphonenumber
          }).then((response) => response.json())
          .then((res) => {

              if (res.success == true){

                alert("Success!");
                this.props.navigation.navigate('profile');
              }
              if (res.success == false){

                  alert(res.message.message);
              }
              }).catch((error) => {
                  alert("Something goes wrong");
        }).done();
        }
        // look for the error
        else {
           if(this.state.passwordValidate == false) {
              Alert.alert(JSON.stringify(
                  "please check the  password (at least 6 characters)"

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
        }
    }

}


export default EditProfile;
