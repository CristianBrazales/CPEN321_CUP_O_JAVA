import React, { Component } from 'react';
import firebase from 'firebase';
import {View} from 'react-native';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Router from './Router';




class App extends Component {

    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyAKh6VaaSSeiX7hzvRNJgYEn5BxfT8Tiqs',
            authDomain: 'rental-tinder.firebaseapp.com',
            databaseURL: 'https://rental-tinder.firebaseio.com',
            storageBucket: 'rental-tinder.appspot.com',
            messagingSenderId: '970333568549'
          });
    }
    render(){
        return (
            
                <Router/>  

        );
    }

} 

export default App;