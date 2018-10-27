import React from 'react';
import { Scene, Router }from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

//router use for connect the different pages
const RouterComponent =() =>{

    return (
        <Router>
            <Scene key= "root">
                <Scene key="Login" component={LoginForm} hideNavBar={true} initial/>
                <Scene key="Signup" component={SignupForm} title="Please sign up" />
            </Scene>
        </Router>
    );

};

export default RouterComponent;