import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Keyboard, ActivityIndicator ,Alert ,AsyncStorage,} from 'react-native';
import { View } from 'native-base';
import MyButton from '../../Components/MyButton'
import { Input } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RegisterSteps from '../Register/StepsScreen'
import { Navigation } from 'react-native-navigation'
import ValidationComponent from 'react-native-form-validator';
import Home from '../Home/Home'
import { connect, Provider } from 'react-redux'
import store from '../../store';
import { loginRequest } from '../../actions/auth';

import Styles from './styles'

/*Firebase */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const { width } = Dimensions.get('window');


Navigation.registerComponent('RegisterSteps', () => (props) => (
    <Provider store={store}>
        <RegisterSteps {...props} />
    </Provider>
), () => RegisterSteps);

Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
        <Home {...props} />
    </Provider>
), () => Home);

Navigation.registerComponent('Login', () => (props) => (
    <Provider store={store}>
        <Login {...props} />
    </Provider>
), () => Login);







// async function login(email, password) {

//     try {
//         await auth().signInWithEmailAndPassword(email, password);
        
//         goToHomeScreen(email)
       
      


//     } catch (e) {
//        // alert(e.message)
//         Alert.alert(
//             'Error',
//             e.message,
//             [
//                 {
//                     text: 'Ok',
//                     onPress: () => {
//                         Navigation.push('loginId', {
//                             component: {
//                                 id: 'loginId',
//                                 name: 'Login',
//                                 passProps: {
                                   
                                    
//                                 }
//                             }
//                         });
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     }
// }




class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
     
            user :{
                email :'alaa' ,
                password:'' ,
            },
           // email: '',
           // password: '',
            isLoading: false


        }
    }

    componentDidMount = () => {
        // AsyncStorage.getItem('email').then((value) =>
        // this.setState({ email: value }))

        AsyncStorage.setItem('email', 'alaa');
        AsyncStorage.getItem('email').then((value)=>{
           console.log('2' +value);
           
       })
       AsyncStorage.removeItem('email')
       AsyncStorage.getItem('email').then((value)=>{
        console.log('1' +value);
        
    })

        

    }

    setEmail = (value) => {
        AsyncStorage.setItem('email', this.state.email);
        this.setState({ email : value });
    }
   

    goToHomeScreen =(email) =>{

        Navigation.push('loginId' , {
            
            sideMenu: {
            // right:{
            //   component :{
            //     id : 'SideMenu' ,
            //     name :'SideMenu'
            //   }
            // } , // end right
            center: {
                stack: {
                    children: [{
                        component: {
                            id: 'homeId',
                            name: 'Home',
                            passProps: {
                                email: email,
                                componentId: 'SideMenu' ,
                                testAsynch :AsyncStorage.getItem('email')

                            }
                        }

                    }],
                    options: {
                        topBar: {
                            visible: false,
                        }
                    }
                }
            } //end center
            , left: {
                component: {
                    id: 'SideMenu',
                    name: 'SideMenu'
                }

            }

        } // end side menu 
        
    })
}
    




    userLogin = () => {


        if (this.state.user.email) {
            if (this.state.user.password) {
               

                this.setState({ isLoading: true })
                //login(this.state.email, this.state.password);
                this.props.loginRequest(this.state.user)
                Keyboard.dismiss();
               // this.setEmail(this.state.user.email)
                this.goToHomeScreen(this.state.user.email)
               
    

            }
            else{
                alert('please enter your password')

            }
           
        }
        else {
            alert('please enter your email')
        }




    }




    render() {


  //  console.log('eeemmaal' +this.state.user.email);
    

        const goToRegisterScreen = () => {

            Navigation.push(this.props.componentId, {
                component: {
                    id: 'registerStepsId',
                    name: 'RegisterSteps',
                    passProps: {


                    }  ,

                     options: {
                    // topBar: { visible: false, drawBehind: true },
                     sideMenu: {
                       left: {
                         visible: false,
                         enabled: false
                         }
                     }
                     
                   },
                } ,
               
            });

            
        }

        return (
            <View style={styles.container}>
                <View style={styles.BeViewStyle}>
                    <Text style={styles.BStyle}>B</Text>
                    <Text style={styles.eStyle}>e</Text>
                </View>


                <View style={styles.InputView}>
                    <Input
                        containerStyle={{ marginTop: 8 }}
                        autoCapitalize="none"
                        placeholder='Account'
                        onChangeText={(email) =>{ this.setState(prevState =>({
                            user :{
                                ...prevState.user ,
                                email :email
                            }

                        }))}}
                        placeholderTextColor='#9899a2'
                        inputStyle={
                            { color: '#9899a2' }
                        }
                        inputContainerStyle={
                            {
                                borderBottomWidth: 1
                                , borderBottomColor: '#e3e3e3'
                            }
                        }
                        leftIcon={
                            <FontAwesome5
                                name='user-alt'
                                size={20}
                                color='#9899a2'

                            />
                        }
                    />

                    <Input

                        placeholder='Password'
                        autoCapitalize="none"
                        onChangeText={(password) =>{ this.setState(prevState =>({
                            user :{
                                ...prevState.user ,
                                password :password
                            }

                        }))}}
                        placeholderTextColor='#9899a2'
                        inputStyle={
                            { color: '#9899a2' }
                        }
                        inputContainerStyle={
                            {
                                borderBottomWidth: 0
                            }
                        }
                        leftIcon={
                            <MaterialIcons
                                name='lock'
                                size={25}
                                color='#9899a2'

                            />
                        }
                    />

                </View>
                {this.state.isLoading ?

                    <View style={Styles.activity}>
                        <ActivityIndicator size="small" color="#3b3c4e" />
                    </View>
                    : <MyButton title="Log in" customClick={this.userLogin}  btnWidth={width/1.1}  backgroundColor='#3b3c4e' ></MyButton>


                }


                <Text style={styles.TxtStyle} onPress={goToRegisterScreen} >{'Sign Up'}</Text>

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
        flexDirection: 'row',
        width: width / 4,
        height: width / 4,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: width / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BStyle: {
        color: '#3b3c4e',
        fontSize: 45,
        fontWeight: '200'





    },

    InputView: {
        width: width / 1.1,
        height: width / 3,
        color: '#f3f3f3',
        fontSize: 20,
        backgroundColor: '#f3f3f3',
        alignSelf: 'center',
        elevation: 1


    },
    eStyle: {

        color: '#3b3c4e',
        fontSize: 45,
        fontWeight: '200',
        borderTopWidth: 3,
        borderTopColor: '#fbc563',



    },
    TxtStyle: {

        color: '#3b3c4e',
        fontSize: 20,
        marginTop: width / 10,
        alignSelf: 'center',
        fontStyle: 'italic'



    },
    ButtonView: {
        justifyContent: 'flex-end',






    },





});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { loginRequest })(Login);