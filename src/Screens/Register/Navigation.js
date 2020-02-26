import React, { Component } from 'react';
import Login from '../Login/Login';
import { Navigation } from 'react-native-navigation'
import store from '../../store';
import { connect, Provider } from 'react-redux'


Navigation.registerComponent('Login', () => (props) => (
    <Provider store={store}>
      <Login {...props} />
    </Provider>
  ), () => Login);

  Navigation.registerComponent('RegisterSteps', () => (props) => (
    <Provider store={store}>
      <RegisterSteps {...props} />
    </Provider>
  ), () => RegisterSteps);


 export function GoToLoginScreen  () {

    Navigation.push('registerStepsId', {
      component: {
        id: 'loginId',
        name: 'Login',
        passProps: {

        }
      }

    })

  }

  export function RefreshScreen  ()  {

    Navigation.push('registerStepsId', {
      component: {
        id: 'registerStepsId',
        name: 'RegisterSteps',
        passProps: {

        }
      }

    })

  }

