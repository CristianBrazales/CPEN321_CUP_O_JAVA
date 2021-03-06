import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input, MessageInput} from './common'
import {Alert} from 'react-native';
import { Text, TouchableOpacity, View,Switch, StyleSheet,AsyncStorage} from 'react-native';

class SendEmail extends Component{

  state = {username:'', name:'', email:'', phonenumber:'', message:'' ,emptyValidate:false};

  getdata = async () =>{
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'NO-ID');
    this.setState({username:username});
  }
  componentDidMount(){
      this.getdata().done();
  }
  validate_empty  (name,email,phonenumber,message){
      if (name!='' && email!='' && phonenumber!=''&& message!='') {
              this.setState({ emptyValidate: true, })
          } else {
              this.setState({ emptyValidate: false, })
          }

  }

render(){
  return(
    <Card>

    <CardSection>
      <Text style={{fontWeight: 'bold',fontSize: 18}}>Please fill your information:</Text>
      </CardSection>

    <CardSection>
        <Input
          placeholder = "Please enter your full name"
          label ="full name:"
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          />
      </CardSection>

      <CardSection>
          <Input
            placeholder = "Please enter your email"
            label ="email:"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            />
        </CardSection>

        <CardSection>
            <Input
              placeholder = "Please enter your number"
              label ="phonenumber:"
              value={this.state.phonenumber}
              onChangeText={phonenumber => this.setState({phonenumber})}
              />
          </CardSection>

          <CardSection>
              <MessageInput
                placeholder = ""
                label ="message:"
                value={this.state.message}
                onChangeText={message => this.setState({message})}
                />
            </CardSection>


            <CardSection>
            <Button onPress={this.handlePress_send_email.bind(this)}>
             Send!
            </Button>
            </CardSection>


    </Card>

  );
}
  handlePress_send_email = async () =>{
    await this.validate_empty(this.state.name,this.state.email,this.state.phonenumber,this.state.message)

    if(this.state.emptyValidate==true){
    fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:'username='+ this.state.username
        + '&email=' + this.state.email + '&phonenumber=' + this.state.phonenumber
        + '&name='+ this.state.name  + '&message='+this.state.message
    }).then((response) => response.json())
    .then((res) => {

        if (res.success == true){

          alert("Success!");
          this.props.navigation.navigate('tmppage');
        }
        if (res.success == false){

          alert(res.message);
        }
        }).catch((error) => {
            alert("Email sending failed");
          }).done();
        }
        else{
          Alert.alert(JSON.stringify(
              "please fill all the empty boxes"

          ));
        }
  };

}

export default SendEmail;
