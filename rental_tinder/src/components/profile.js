// JavaScript source code
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, CardSection, Welcome_header } from './common';
import { Actions } from 'react-native-router-flux';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
var welcome_message = 'Welcome';
class profile extends Component {
    
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
         } catch (error) {
           // Error retrieving data
         }
      }
    
    render() {
        return (
            await this._retrieveData()
            <View >
                <Welcome_header > 
                    {welcome_message+ " " +this.value + "!"} 
                </Welcome_header> 
                <Card>
               
                <CardSection>
                <Button>
                    Creat a post
                </Button> 
                </CardSection>

                <CardSection>
                <Button>
                    Search a post
                </Button> 
                </CardSection>

                <CardSection>
                <Button>
                    Manage my post
                </Button> 
                </CardSection>

                <CardSection>
                <Button>
                    Log out
                </Button>
                </CardSection>

                </Card>
            </View>
        );
    }

}
export default profile;