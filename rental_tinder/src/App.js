import React, { Component } from 'react';
import firebase from 'firebase';
import {View} from 'react-native';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Router from './Router';




class App extends Component {

    
    render(){
        return (
            
                <Router/>  

        );
    }

} 

export default App;