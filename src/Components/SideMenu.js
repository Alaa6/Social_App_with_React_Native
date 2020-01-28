
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import store from '../store';
import { Provider } from 'react-redux';
import {  StyleSheet, View, Text , Dimensions ,TouchableWithoutFeedback} from 'react-native';
import Home from '../Screens/Home/Home'
import AddItem from '../Screens/Item/AddItem'
import Login from '../Screens/Login/Login'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';







const { width } = Dimensions.get('window');
const {uid} = auth().currentUser.uid ;
const {ref} = database().ref(`/users/${uid}`);

//     ref.on('value', (snapshot) => {
//     const userObj = snapshot.val();
//     const name = userObj.firstName;
//    // this.avatar = userObj.avatar;
//   });


Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
            <Home {...props} />
    </Provider>
), () => Home);
Navigation.registerComponent('AddItem', () => (props) => (
        <Provider store={store}>
                <AddItem {...props} />
        </Provider>
    ), () => AddItem);

Navigation.registerComponent('Login', () => (props) => (
    <Provider store={store}>
            <Login {...props} />
    </Provider>
), () => Login);



  class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photo: true,
           

        };

    }


    // goToChat() {
    //     Navigation.dismissAllModals();
    //     Navigation.showModal({
    //         component: {
    //             //id: 'chatId',
    //             //name: 'Guide.chat'
    //         }
    //     });

    // }
    goToAddItem() {
        Navigation.dismissAllModals();
        Navigation.showModal({
            component: {
                id: 'addItemId',
                name: 'AddItem',
                passProps: {
                    title: 'Add Item'
                }
            }
        });
    }


    goToFavorite() {
        Navigation.dismissAllModals();
        Navigation.showModal({
            component: {
                id: 'favId',
                name: 'Guide.fav'
            }
        });

    }

 
   
    render() {
        const {photo} = this.state
      
      const  goToLogin =()=>{
            console.log("aaaa");
            Navigation.push( 'homeId' ,{
                component: {
                    id: 'loginId',
                    name: 'Login',
                   
                }
                
            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                  left: {
                    visible: false,
                   
                  },
                },
              });
            
    
        }
        
        

        const goToAddItem =()=> {
            
             Navigation.push( 'homeId' ,{
                 component: {
                     id: 'addItemId',
                     name: 'AddItem',
                     passProps: {
                         title: 'Add Item'
                     }
                 }
             });

             Navigation.mergeOptions('homeId', {
                sideMenu: {
                  left: {
                    visible: false,
                   
                  },
                },
              });
            
         }

         const goToHome =()=> {
            
            Navigation.push( 'homeId' ,{
                component: {
                    id: 'homeId',
                    name: 'Home',
                    passProps: {
                        title: 'Home'
                    }
                }
            });

            Navigation.mergeOptions('homeId', {
               sideMenu: {
                 left: {
                   visible: false,
                   
                 },
               },
             });
           
        }
     
   
      
    

         
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                   {/* { !photo ? <Image source ={require('../assets/images/profile.png') } style ={styles.imageHeader}/>
                   : <Image source ={{uri : ref.child('photo').child('uri')}} style ={styles.imageHeader}/>} */}

                    <Text style={styles.textHeader} >
                        {this.props.email}
                   </Text>
                </View>


                <View style={styles.MenuItems}>

                    <Icon1
                        style={styles.Icons}
                        name='home'
                        size={30}
                        color='#3b3c4e' />
                    <Text style={styles.ItemsText}
                     onPress={goToHome}> Home</Text>

                </View>

                <View style={styles.MenuItems}>

                    <Icon2
                        style={styles.Icons}
                        name='chat'
                        size={30}
                        color='#3b3c4e' />
                    <Text style={styles.ItemsText} onPress={goToAddItem} > Add Item</Text>

                </View>

                {/* <View style={styles.MenuItems}>
                  <Icon2 
                  style ={styles.Icons}
                  name ='favorite'
                  size = {30}
                  color ='green'/>
                  <Text style ={styles.ItemsText} onPress={this.goToFavorite}> المفضلة</Text>
              </View> */}
                {/* 
              <View style={styles.MenuItems}>
                  <Icon2 
                  style ={styles.Icons}
                  name ='settings'
                  size = {30}
                  color ='green'/>
                  <Text style ={styles.ItemsText} > الاعدادات</Text>
              </View> */}

                {/* <View style={styles.MenuItems}>
                  <Icon2 
                  style ={styles.Icons}
                  name ='share'
                  size = {30}
                  color ='green'/>
                  <Text style ={styles.ItemsText} > مشاركة التطبيق</Text>
              </View> */}

               <TouchableWithoutFeedback >
               <View style={styles.LogoutItem}  >
                  <Icon3 
                  style ={styles.logoutIcon}
                  name ='logout'
                  size = {30}
                  color ='green'/>
                  <Text style ={styles.logoutText} onPress ={goToLogin}>  {"Logout"} </Text>
              </View> 

               </TouchableWithoutFeedback>

                 
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },

    header: {

        backgroundColor: '#3b3c4e',
        height: width / 1.7,
        width: width,
        justifyContent: 'center', // vertical
        //alignContent : 'center' , // nothing
        // alignItems :'center' , //horizental


    },
    imageHeader: {
        width: width / 3,
        height: width / 3,
        marginLeft: width / 4,
        borderRadius :100


    },
    textHeader: {
        fontSize: 25,
        color: 'white',
        marginRight: width / 6,
        textAlign: 'center',
        marginTop: 15,

    },
    MenuItems: {
        flexDirection: 'row',
        marginVertical: 10

    },
    LogoutItem: {
        flexDirection: 'row',
        marginVertical: 10 ,
        borderTopColor : '#d4d4d7',
        borderTopWidth :1

    },
    Icons: {
        marginLeft: 20


    },
    ItemsText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 25,
        //marginTop :3 ,
        marginRight: 4,
        textAlign: 'justify'


    },
    logoutIcon: {
        color: 'rgba(255,99,71 ,0.8) ',
        marginLeft: 20,
        paddingTop :7


    },
    logoutText: {
        color: 'rgba(255,99,71,0.7) ',
        fontSize: 25,
        paddingTop :7

    }


});



const mapStateToProps = state => ({
    email : state.auth.email 

})


export default connect(mapStateToProps)(SideMenu);



