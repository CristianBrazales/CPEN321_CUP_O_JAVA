import React, { Component } from 'react';
import Router from './Router';

import { createStackNavigator } from 'react-navigation';
import LoginForm from './components/LoginForm';
import profile from './components/profile';
import SignupForm from './components/SignupForm';
//The main module of the app
const Application = createStackNavigator({

    login:  LoginForm ,
    signup: SignupForm,
    profile: profile,

    
});

class App extends Component {

    
    render(){
        return (

            <Application />  

        );
    }

} 

export default App;