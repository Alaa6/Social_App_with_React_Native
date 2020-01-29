
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

export const loginRequest = (email , password ,remeber, shouldLogin) => async (dispatch) => {
  dispatch({ type: LOGIN_ATTEMPT });
  console.log(  'i am ' +email + '&&'+ password)
   
   handleResponse(dispatch , email ,password)
  

    // Get the users ID
  const uid = auth().currentUser.uid;

  // Create a reference
  const ref = database().ref(`/users/${uid}`);

  // Fetch the data snapshot
  const snapshot = await ref.once('value');
  const  firstName= snapshot.child('firstName').val();
  const  lastName= snapshot.child('lastName').val();
  const  photoUri= snapshot.child('photo').child('uri').val();
  const  address= snapshot.child('address').val();

  saveUserData(dispatch ,firstName,lastName,photoUri,address);


  // axios.post(`${API_ENDPOINT}/signin`, values, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept-Language': getLang()
  //   },
  // }).then(async response => {
  //   dispatch({ type: LOGIN_SUCCESS, payload: response.data.user, token: response.data.token });
  //   if (response.data.user.activated) {

  //     if (remeber) {
  //       await AsyncStorage.setItem("User", JSON.stringify(response.data.user));
  //       await AsyncStorage.setItem("Token", JSON.stringify(response.data.token));
  //     }
  //     initFirebase(response.data.token);

  //     Navigation.init('MAIN_STACK', {
  //       rtl: store.getState().lang.rtl,
  //       sideMenu: 'SideMenu',
  //       name: 'Home',
  //     });
  //   } else {
  //     showInfo(I18n.t('Not_Active'))

  //   }

  // }).catch((error) => {
  //   console.log(error.response);
  //   if (!error.response) {
  //     showError(I18n.t('ui-networkConnectionError'));
  //     dispatch({ type: LOGIN_FAILURE, error: I18n.t('ui-networkConnectionError') });
  //     return;
  //   }
  //   if (error.response.data.errors) {
  //     showError(error.response.data.errors);
  //     dispatch({ type: LOGIN_FAILURE, error: error.response.data.errors });
  //   }
  //   else {
  //     showError(I18n.t('ui-error-happened'));
  //     dispatch({ type: LOGIN_FAILURE, error: I18n.t('ui-error-happened') });
  //   }
  // })
};


const handleResponse =(dispatch ,email ,password ,fName ,lName,photoUri ,address)=>{
  if(email){

      onLoginSuccess(dispatch ,email ,password ,fName ,lName,photoUri ,address);

  }
  else
  {
      onLoginFailed(dispatch ,'user  not found '); 

  }
  
}
const onLoginSuccess =(dispatch ,email ,password,fName ,lName,photoUri ,address)=>{
  dispatch ({
      type :LOGIN_SUCCESS ,
      email : email ,
      password :password,
      fName :fName ,
      lName:lName,
      photoUri:photoUri,
      address:address

  })

}

const onLoginFailed =(dispatch ,errorMessage)=>{
  dispatch({
      type :LOGIN_FAILED ,
      error :errorMessage
  })

}

const saveUserData =(dispatch ,fName ,lName,photoUri ,address)=>{

  dispatch ({
    type :GET_USER_DATA ,
    fName :fName ,
    lName:lName,
    photoUri:photoUri,
    address:address

})
 
  
}



const initFirebase = async (token) => {
  console.log("vvvvvvvvv", token)
  console.log("notificationListener", token)
  if (!notificationListener) {
    
    if (Platform.OS === 'android') {
      // const channel = new firebase.notifications.Android.Channel(
      //   'main-channel',
      //   'Main Channel',
      //   firebase.notifications.Android.Importance.Max,
      // ).setDescription('cash back ');
      // firebase.notifications().android.createChannel(channel);
      // notificationListener = firebase
      //   .notifications()
      //   .onNotification(notification => {
      //     notification.android.setChannelId('main-channel');
      //     firebase.notifications().displayNotification(notification);
      //   });

    } else {
      notificationListener = true;
    }
  }
  console.log('111111111111111111111 ');
  const deviceToken = await AsyncStorage.getItem('deviceToken');
  console.log('111111111111111111111 deviceToken', deviceToken);
  if (deviceToken) return;
  const fcmToken = await firebase.messaging().getToken();
  console.log('111111111111111111111 fcmToken', fcmToken);

  console.log('fcmToken ', fcmToken);
  if (fcmToken) {
    try {
      AsyncStorage.setItem('deviceToken', fcmToken);
      const resp = await axios.post(`${API_ENDPOINT}/addToken`, {
        token: fcmToken,
        type: Platform.OS === 'ios' ? 'ios' : 'android',
      }, {
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': "application/json",
          'Accept-Language': getLang()
        }
      });
      console.log("token", fcmToken)
      console.log("ahmed", resp)
      notificationListener = false;
    } catch (error) { console.log("error in add token", error), console.log("error in add token", error.response) }
  }
};


export const updateUser = (user) => async (dispatch, getState) => {

  console.log('before set local storage', user);
  dispatch({ type: UPDATE_INFO, payload: user });
  await AsyncStorage.setItem('User', JSON.stringify(user));
}
export const updateInfo = (formData) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_ATTEMPT });
  axios.put(`${API_ENDPOINT}/user/updateInfo`, formData, {
    headers: {
      'Authorization': "Bearer " + getState().auth.token,
      // 'Content-Type': 'multipart/form-data',
      'Accept-Language': getLang()
    }
  }).then(async response => {
    dispatch({ type: UPDATE_INFO, payload: response.data });
    await AsyncStorage.setItem('User', JSON.stringify(response.data));
    RNToasty.Success({ title: I18n.t('save_all_change') });
    Navigation.pop();
  }).catch((error) => {
    console.log(error.response);
    dispatch({ type: UPDATE_Failed });

    if (!error.response) {
      showError(I18n.t('ui-networkConnectionError'));
      return;
    }
    if (error.response.status === 422) {
      if (error.response.data.errors[0].param === 'email') {
        showError(error.response.data.errors[0].msg);
      }
      else if (error.response.data.errors[0].param === 'phone') {
        showError(error.response.data.errors[0].msg);
      }
      else {
        showError(error.response.data.errors[0].msg);
      }
    }
    else {
      showError(I18n.t('error'));
    }
  })
}

export const registerRequest = (values) => async (dispatch) => {
  { console.log('kkjk') }
  dispatch({ type: REGISTER_ATTEMPT })
  await axios.post(`${API_ENDPOINT}/signup`, values, {
    headers: {
      'Accept-Language': getLang()
    }

  }).then(async (response) => {

    dispatch({ type: REGISTER_SUCCESS, payload: response.data.user, token: response.data.token });
    await AsyncStorage.setItem('User', JSON.stringify(response.data.user));
    await AsyncStorage.setItem('Token', JSON.stringify(response.data.token));

    initFirebase(response.data.token);

    Navigation.init('MAIN_STACK', {
      rtl: store.getState().lang.rtl,
      sideMenu: 'SideMenu',
      name: 'Home',
    });


  }).catch((error) => {
    console.log(error.response);
    if (!error.response) {
      showError(I18n.t('ui-networkConnectionError'));
      dispatch({ type: REGISTER_FAILURE, error: -1 });
      return;
    }
    if (error.response.status === 422) {
      if (error.response.data.errors[0].param === 'email') {
        showError(error.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAILURE, error: error.response.data.errors[0].msg });
      }
      else if (error.response.data.errors[0].param === 'phone') {
        showError(error.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAILURE, error: error.response.data.errors[0].msg });
      }
      else {
        showError(error.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAILURE, error: error.response.data.errors[0].msg });
      }
    }
    else {
      showError(I18n.t('error'));
      dispatch({ type: REGISTER_FAILURE, error: I18n.t('error') });
    }
  })
}

export const logout = () => async (dispatch, getState) => {
  Navigation.init('MAIN_STACK', {
    rtl: store.getState().lang.rtl,
    // sideMenu: 'SideMenu',
    name: 'Login',
  });
  try {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    await AsyncStorage.removeItem('deviceToken');
    await AsyncStorage.removeItem('User');
    await AsyncStorage.removeItem('Token');
    axios.post(
      `${API_ENDPOINT}/logout`, { token: deviceToken }, {
      headers: {
        'Authorization': "Bearer " + getState().auth.token,
        'Content-Type': "application/json",
        'Accept-Language': getLang()
      }
    },
    );
  } catch (error) { }
  dispatch({ type: LOGOUT });

};