
import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, COUNT_OF_UN_SEEN_NOTIFICATION, UPDATE_INFO,
  REGISTER_ATTEMPT, REGISTER_SUCCESS, UPDATE_Failed, USER_TYPE, REGISTER_FAILURE ,GET_USER_DATA,
} from './types';
import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import store from '../store'
import I18n from 'react-native-i18n'
import { RNToasty } from 'react-native-toasty';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


let notificationListener;


const getLang = () => {
  return store.getState().lang.lang
}


export const typeloginRequest = (type) => async (dispatch) => {
  dispatch({ type: USER_TYPE, payload: type });
}


export const saveUserInfo = (firstName,lastName, email,photoUri,address ,phone ,uid ,country ,token)  => async (dispatch) => {
  AsyncStorage.setItem('TOKEN' ,token)
  saveUserData(dispatch ,firstName,lastName,email,photoUri,address ,phone ,uid ,country ,token);
}

export const loginRequest = (user) => async (dispatch) => {
   
   dispatch({ type: LOGIN_ATTEMPT });

  await auth().signInWithEmailAndPassword(
    user.email ,
    user.password
    ).then(()=>{
      onLoginSuccess(dispatch ,user);

    }).catch((err)=>{
      onLoginFailed(dispatch ,err);

    })
  
};


const onLoginSuccess =(dispatch ,user)=>{
  dispatch ({
      type :LOGIN_SUCCESS ,
      user : user

  })

}

const onLoginFailed =(dispatch ,errorMessage)=>{
  dispatch({
      type :LOGIN_FAILURE ,
      error :errorMessage
  })

}

const saveUserData =(dispatch ,fName ,lName, email ,photoUri ,address ,phone ,uid ,country ,token)=>{
  console.log('test    ' +email);

  dispatch ({
    type :GET_USER_DATA ,
    fName :fName ,
    lName:lName,
    email :email ,
    photoUri:photoUri,
    address:address ,
    phone :phone ,
    uid :uid  ,
    country:country ,
    token:token 

})
 
  
}

export const logout = () => async (dispatch) => {
   
  dispatch({
     type: LOGOUT 
  
  });

  AsyncStorage.removeItem('TOKEN')

 
};



