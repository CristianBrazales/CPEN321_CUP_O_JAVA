import React, { Component } from 'react';
import Router from './Router';

import { createStackNavigator } from 'react-navigation';
import LoginForm from './components/LoginForm';
import profile from './components/profile';
import SignupForm from './components/SignupForm';
//import PostForm from './components/PostForm';
//The main module of the app

const Application = createStackNavigator({
    login: {
        screen: LoginForm,
        navigationOptions: () => ({
            header: null,
        }),

    },
  
    signup: {
        screen: SignupForm,
    },
    profile: {
        screen: profile,
        navigationOptions: () => ({
            header: null,
        }),
    },
    /*post: {
        screen: PostForm,
        navigationOptions: () => ({
            header: null,
        }),
    } */

    
});

class App extends Component {

    
    render(){
        return (

            <Application />  

        );
    }

} 

export default App;