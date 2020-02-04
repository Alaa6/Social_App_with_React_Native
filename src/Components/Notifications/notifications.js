import React, {Fragment,useEffect ,Component} from 'react';
import {
 SafeAreaView,
 StyleSheet,
 ScrollView,
 View,
 Text,
 StatusBar,
 Alert
} from 'react-native';
import messaging   from '@react-native-firebase/messaging';
//import firebase from 'react-native-firebase'

import {connect ,Provider } from 'react-redux'

//var PushNotification = require("react-native-push-notification"); //ES5
import PushNotification from 'react-native-push-notification'




// useEffect(() => {
//     this.checkPermission();
//     this.messageListener();
//    }, []);
   
   class Notifications extends Component {



    checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
          this.getFcmToken();
        } else {
          this.requestPermission();
        }
       }

       getFcmToken = async () => {

        const fcmToken = await messaging().getToken();
        if (fcmToken) {
         console.log(fcmToken);
       // this.showAlert('Your Firebase Token is:', fcmToken);
        } else {
         this.showAlert('Failed', 'No token received');
        }
       }

       requestPermission = async () => {
        try {
         await messaging().requestPermission();
         // User has authorised
        } catch (error) {
          // User has rejected permissions
        }
       }

       messageListener = async () => {

           console.log('here');
           messaging().onMessage((msg)=>{
             console.log(msg);
             
            const { title, body } = msg;
               this.showAlert(title, body);

           });

        //    PushNotification.localNotification({
        //     /* Android Only Properties */
        //     id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //     ticker: "My Notification Ticker", // (optional)
        //     autoCancel: true, // (optional) default: true
        //     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        //     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        //     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        //     subText: "This is a subText", // (optional) default: none
        //     color: "red", // (optional) default: system default
        //     vibrate: true, // (optional) default: true
        //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        //     tag: 'some_tag', // (optional) add tag to message
        //     group: "group", // (optional) add group to message
        //     ongoing: false, // (optional) set whether this is an "ongoing" notification
        //     priority: "high", // (optional) set notification priority, default: high
        //     visibility: "private", // (optional) set notification visibility, default: private
        //     importance: "high", // (optional) set notification importance, default: high
         
        //     /* iOS only properties */
        //     //alertAction: // (optional) default: view
        //    // category: // (optional) default: null
        //     //userInfo: // (optional) default: null (object containing additional notification data)
         
        //     /* iOS and Android properties */
        //     title: "My Notification Title", // (optional)
        //     message: "My Notification Message", // (required)
        //     playSound: false, // (optional) default: true
        //     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //     number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //     repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        //     actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        // });
           

        // __________end 

        // PushNotification.configure({
       
            
        //     // (optional) Called when Token is generated (iOS and Android)
        //     onRegister: function(token) {
        //       console.log("TOKEN:           " +token.token);
        //     },
           
        //     // (required) Called when a remote or local notification is opened or received
        //     onNotification: function(notification) {
        //        // const { title, body } = notification;
        //        // this.showAlert(title, body);
        //       console.log("NOTIFICATION:        ", notification);
           
        //       // process the notification
            
           
        //       // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        //     //  notification.finish(PushNotificationIOS.FetchResult.NoData);
        //     },

          
               
           
        //     // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
        //     senderID: "556814022993",
           
        //     // IOS ONLY (optional): default: all - Permissions to register.
        //     permissions: {
        //       alert: true,
        //       badge: true,
        //       sound: true
        //     },
           
        //     // Should the initial notification be popped automatically
        //     // default: true
        //     popInitialNotification: true,
           
        //     /**
        //      * (optional) default: true
        //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
        //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
        //      */
        //     requestPermissions: true
        //   });



          //____end
        // this.notificationListener = firebase.notifications().onNotification((notification) => {
            
        //   const { title, body } = notification;
        //   this.showAlert(title, body);
        // });
       
        // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        //   const { title, body } = notificationOpen.notification;
        //   this.showAlert(title, body);
        // });

       
        // const notificationOpen = await firebase.notifications().getInitialNotification();
        
        // if (notificationOpen) {
        //   const { title, body } = notificationOpen.notification;
        //   this.showAlert(title, body);
        // }
       
        // this.messageListener = firebase.messaging().onMessage((message) => {
        //  console.log(JSON.stringify(message));
        // });
       }

       showAlert = (title, message) => {
        Alert.alert(
         title,
         message,
         [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         {cancelable: false},
        );
       }

       componentDidMount (){
        this.checkPermission();
        this.messageListener();
       }
    
  
    render() {
  
       const goToLoginScreen =() =>{
         console.log(this.props.componentId);
         
  
        Navigation.push( this.props.componentId ,{
          component: {
            id: 'loginId',
            name: 'Login',
            passProps: {
    
            }
          }
    
        })
      }
  
      
      return (
        <View >
  
        </View>
      );
    }
  }

  const mapStateToProps = state => ({
    
})

  export default connect(mapStateToProps)(Notifications);