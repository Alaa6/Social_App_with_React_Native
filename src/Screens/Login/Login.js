import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Keyboard } from 'react-native';
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

/*Firebase */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';




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







function goToHomeScreen(email) {

   // console.log("go to home screen" + componentId);
    

    Navigation.showModal({

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
                                componentId: 'SideMenu'
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

async function login(email, password ) {
  
    try {
        await auth().signInWithEmailAndPassword(email, password);
        goToHomeScreen(email)
    } catch (e) {
        alert(e.message)
    }
}

const { width } = Dimensions.get('window');


class Login extends ValidationComponent {


    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            }


        }
    }

    

    userLogin = () => {
        login(this.state.email, this.state.password) ;
        this.props.loginRequest(this.state.email, this.state.password);
        Keyboard.dismiss();
    }


    EmailValidation(email) {
        this.validate({
            //name: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true },
            //number: { numbers: true },
            //date: { date: 'YYYY-MM-DD' }
        });

        this.setState({  email});
    }

    PasswordValidation(password) {
        this.validate({
            ////name: { minlength: 3, maxlength: 7, required: true },
            password: { minlength: 7, required: true },
            //number: { numbers: true },
            //date: { date: 'YYYY-MM-DD' }
        });

        this.setState({ password });
    }


    render() {
     
       
        console.log("render  login  "   + this.props.componentId);


        const goToRegisterScreen =()=> {
            Navigation.push( this.props.componentId ,{
                component: {
                    id: 'registerStepsId',
                    name: 'RegisterSteps',
                    passProps: {
                        
                    }
                }
            });
        }
    
        return (
            <View style={styles.container}>
                <View style={styles.BeViewStyle}>
                    <Text style={styles.BStyle}>B</Text>
                    <Text style={styles.eStyle}>e</Text>
                </View>

                <Text style={{ color: 'red' }}>
                    {this.getErrorMessages()}

                </Text>

                <View style={styles.InputView}>
                    <Input
                        containerStyle={{ marginTop: 8 }}
                        autoCapitalize="none"
                        placeholder='Account'
                        onChangeText={(email) => this.EmailValidation(email)}
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
                        onChangeText={(password) => this.PasswordValidation(password)}
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
                <MyButton title="Log in" customClick={this.userLogin } ></MyButton>


                <Text style={styles.TxtStyle} onPress={goToRegisterScreen}>{'Sign Up'}</Text>

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