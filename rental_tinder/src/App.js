import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';





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
            <View>
                <Header headerText ='Rental Tinder'/>
                <LoginForm/>
            </View>
        );
    }

} 

export default App;