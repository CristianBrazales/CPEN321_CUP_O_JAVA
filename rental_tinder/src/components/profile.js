// JavaScript source code
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { Button, Card, CardSection, Welcome_header ,Input,SearchButton, SearchInput,LogoutButton} from './common';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
var welcome_message = 'Welcome';
function findAndReplace_2(string, target, replacement) {

var i = 0, length = string.length;

for (i; i < length; i++) {

 string = string.replace(target, replacement);

}
return string;

}
class profile extends Component {
    constructor(props) {
        super(props);
       // var name = await AsyncStorage.getItem('user');
        this.state = { username: '' , zipcode:''};


    }

    componentDidMount() {
        this._mounted = true
       this._retrieveData().done();
    }

    componentWillUnmount() {
        this._mounted = false
    }
    search = () => {
      this.props.navigation.navigate('search');
    }

    changeprofile = async () =>{
      //  this.props.navigation.navigate('editprofile');

                  fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/user', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                      },
                     body:'username=' + this.state.username
                  }).then((response) => response.json())
                  .then((res) => {

                      if (res.success == true){
                      //  this.setState({info: res.message});
                        //alert(res.success);
                        this.props.navigation.navigate('editprofile',{
                          name: this.state.username,
                          otherParam: res.message,
                        });
                      }
                      if (res.success == false){

                        alert("faild");
                      }
                      }).catch((error) => {
                          alert("Something goes wrong");
              }).done();
    }

    managepost = async () =>{
      //  this.props.navigation.navigate('editprofile');

                  fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/posts', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                      },
                     body:'username=' + this.state.username
                  }).then((response) => response.json())
                  .then((res) => {

                      if (res.success == true){
                      //  this.setState({info: res.message});
                        //alert(res.success);
                        this.props.navigation.navigate('managepost',{
                          name: this.state.username,
                          otherParam: res.message,
                        });
                      }
                      if (res.success == false){

                        alert("faild");
                      }
                      }).catch((error) => {
                          alert("Something goes wrong");
              }).done();
    }

    logout = () => {
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('login');

    }
    create_post = () => {/*
        this.props.navigation.navigate('post');*/
    }
    _retrieveData = async () => {
        //this.setState({ username: 'cristian' })
     //   var value = await AsyncStorage.getItem('user');
        //username => this.setState({ username: user})

        try {
            var val = await AsyncStorage.getItem('username');
            var det = findAndReplace_2(val, "\"","");
              AsyncStorage.setItem('username',det);
                this.setState({ username: det})

            if (val!== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {

        //
         this._retrieveData().done();
        return (
            //await this._retrieveData()
            <View >
                <Welcome_header >
                    {welcome_message + " " + this.state.username + "!"}
                </Welcome_header>
                <Card>

                <CardSection>
                <SearchInput
                  placeholder = "Quick Search Here"
                  value={this.state.zipcode}
                  onChangeText={zipcode => this.setState({ zipcode})}
                  /><SearchButton onPress={this.handlePress_general_search.bind(this)}>Search!</SearchButton>
                </CardSection>

                <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('post_screen') }>
                    Post your place
                </Button>
                </CardSection>
                <CardSection>
                        <Button onPress={this.search}>
                        Advance search
                </Button>
                </CardSection>

                <CardSection>
                <Button onPress={this.managepost.bind(this)}>
                    Manage my posts
                </Button>
                </CardSection>

                <CardSection>
                <Button onPress={this.changeprofile.bind(this)}>
                      Change my profile
                </Button>
                </CardSection>

                <CardSection>
                <LogoutButton onPress={this.logout}>
                    Log out!
                </LogoutButton>
                </CardSection>

                </Card>
            </View>
        );
    }
    handlePress_general_search = async () =>{
      fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/regex', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:'zipcode='+ this.state.zipcode
      }).then((response) => response.json())
      .then((res) => {

          if (res.success == true){

            this.props.navigation.navigate('tmppage',{
              itemId: 86,
              otherParam: res.message,
            });
          }
          if (res.success == false){

            alert("No housing found near by, Please try again");
          }
          }).catch((error) => {
              alert("Something goes wrong");
  }).done();
    };
}
export default profile;
