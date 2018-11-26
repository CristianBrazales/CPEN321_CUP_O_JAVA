import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {Button, Card, CardSection, Input, Header,Welcome_header} from './common';

import {TextInput,  Text} from 'react-native';
//import { Actions } from  'react-native-router-flux';
//import SignupForm from 'SignupForm';
import { StackNavigator } from 'react-navigation';
// The main pages which is shown to the user, The loginform contains two input secion (Email, Password) and two buttons (login and signup)
class search_result extends Component {
    constructor(props) {
        super(props);
            this.state = { search_res :''}
    }
    componentDidMount() {
        this._loadsearch().done();
    }
    _loadsearch = async () => {


         var value = await AsyncStorage.getItem('search');
         //console.warn(value);
        this.setState ({search_res: value});
        var string_ob= value;
       var objec= JSON.parse(string_ob);
    }
    render(){
    //  console.warn("second"+ this.state.search_res);
      var string_ob= this.state.search_res.toString();
      //  const usNA= objec[0].username;

        return(
          <View >

              <Welcome_header >

                  {"place found, owner:" +"!"}
              </Welcome_header>
              </View>
            );
        }

    }
    export default search_result;
