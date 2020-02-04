import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions ,Image } from 'react-native';
import { View } from 'native-base';
import { Navigation } from 'react-native-navigation'
import Header from '../../Components/header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AllMenuItems from '../AllMenuItems/AllMenuItems'
import store from '../../store';
import {connect ,Provider } from 'react-redux'
import Realm from 'realm'
import auth from '@react-native-firebase/auth';
import { MenuProvider } from 'react-native-popup-menu';

import database from '@react-native-firebase/database';
import Notifications from '../../Components/Notifications/notifications'
import PushNotification from 'react-native-push-notification'


 



const { width } = Dimensions.get('window');
const {height} =Dimensions.get('window')
console.log(height);
console.log(width);


Navigation.registerComponent('Login',() => (props) => (
  <Provider store={store}>
    <Login {...props} />
  </Provider>
), () => Login);


let realm ;
 class Home extends Component {

  constructor(props) {
    super(props);

    realm = new Realm({
      path: 'SocialDB.realm',
      schemaVersion: 6 ,
      schema: [
        {
          name: 'Item_Details',
          properties: {
            userId : { type: 'string' },
            userName : {type : 'string' ,indexed:true ,default :false} ,
            userPhoto :'string' ,
            userEmail: {type : 'string' ,indexed:true ,default :false} ,

            post_id    : { type: 'int', default: 0 },
            item_video :{type : 'string' ,indexed:true ,default :false},
            item_Image :'string' ,
            item_description :{type : 'string' ,indexed:true ,default :false} ,
            post_date : 'string' 
          },
        },
      ],
     
    });
   
}

 componentDidMount(){
  const uid = auth().currentUser.uid;

  // const ref = database().ref(`/users/${uid}`);

  // // Fetch the data snapshot
  // const snapshot = await ref.once('value');
  // const  firstName= snapshot.child('firstName').val();

  if(uid ){
    PushNotification.localNotification({

      /* Android Only Properties */
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
   
      /* iOS only properties */
      //alertAction: // (optional) default: view
     // category: // (optional) default: null
      //userInfo: // (optional) default: null (object containing additional notification data)
   
      /* iOS and Android properties */
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  });
 }
}
 
  render() {
   const goToAddItem =()=> {



     console.log( 'uiiiid        ' + auth().currentUser.uid );
     
       Navigation.push( this.props.componentId ,{
           component: {
               id: 'addItemId',
               name: 'AddItem',
               passProps: {
                   title: 'Add Item'
               }
           }
       });
   }

     
      
      
      
    return (
      <View style={styles.container}>

       <Header  title ='Home' color='#FFF' backgroundColor='#3b3c4e'  showMenu componentId={this.props.componentId }  />
       {/* <Notifications/> */}
       
       <View style ={{width :width , height :width*1.75 , justifyContent:'flex-end'}}>
       <MenuProvider>
       <AllMenuItems />

       </MenuProvider>
      
      
       <View style={styles.addView}>
       <MaterialIcons
          style={{color :'#FFF'  }}
          name='add'
          size={40} 
          onPress={goToAddItem}/>
          
      


      </View>

       </View>
   
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',




  },

  BeViewStyle: {
    backgroundColor: '#3b3c4e',
    width: width / 4,
    height: width / 4,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: width / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  BStyle: {

    color: '#ffffff',
    fontSize: 40,



  },
  eStyle: {

    color: '#ffffff',
    fontSize: 40,

    borderTopWidth: 3,
    borderTopColor: '#fbc563',



  },
  TxtStyle: {

    color: '#3b3c4e',
    fontSize: 17,
    marginTop: width / 10,
    alignSelf: 'center' ,
    fontStyle:'italic'
    



  },
  addView: {
   width: width/3,
   height: width/4 ,
   backgroundColor:'#3b3c4e' ,
   borderTopRightRadius: 100 ,
   justifyContent:'center' ,
   alignItems: 'center'
  

  },





});


const mapStateToProps = state => ({
  email : state.auth.email
  
})

export default connect(mapStateToProps)(Home);
