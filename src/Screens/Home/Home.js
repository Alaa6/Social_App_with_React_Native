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
