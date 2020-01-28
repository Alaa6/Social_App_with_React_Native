import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, ToastAndroid, ActivityIndicator, TouchableOpacity, Alert  ,Image} from 'react-native';
import { View } from 'native-base';
import MyButton from '../../Components/MyButton'
import { Input } from 'react-native-elements';
import { Navigation } from 'react-native-navigation'
import Login from '../Login/Login';
import ValidationComponent from 'react-native-form-validator';
import store from '../../store';
import { connect, Provider } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

/*Firebase */
import auth from '@react-native-firebase/auth';
import database  from '@react-native-firebase/database';

/* icons */
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ant from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';










const { width } = Dimensions.get('window');



Navigation.registerComponent('Login', () => (props) => (
    <Provider store={store}>
        <Login {...props} />
    </Provider>
), () => Login);

async function register(email, password) {
    console.log('emaaaaal' + email);
    console.log('paaas' + password);
  
  
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
        console.error(e.message);
        //alert(e)
    }
  }
  
  









async function saveUserData(email, firstName, lastName, address ,photo) {
    const uid = auth().currentUser.uid;

    const ref = database().ref(`/users/${uid}`);

    await ref.set({
        uid,
        email,
        firstName,
        lastName,
        address,
        photo

    });
}

class Register extends ValidationComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            confPassword: '' ,
            photo : ''

        }



    }
    EmailValidation(email) {

        this.validate({
            ////name: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true },
            //number: { numbers: true },
            //date: { date: 'YYYY-MM-DD' }
        });

        this.setState({ email });
    }

    PasswordValidation(password) {
        this.validate({
            ////name: { minlength: 3, maxlength: 7, required: true },
            password: { minlength: 6, required: true },
            //number: { numbers: true },
            //date: { date: 'YYYY-MM-DD' }
        });

        this.setState({ password });
    }

    handleImagePicker = () => {
        const options = {  //options
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('resposns' + response);
            if (response.uri) {
                this.setState({ photo: response });
            }
        });


    };

    handleCameraPicker = () => {
        const options = {  //options
            noData: true,
        };

        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                JSON.stringify(response);
                this.setState({
                    photo: response,
                    fileData: response.data,
                    fileUri: response.uri
                });

            }

        });
    };


    


    render() {
        const { email, password, firstName, lastName, address, confPassword ,photo} = this.state;
        console.log( 'sss'+photo.uri);
        

        const RegisterUser = () => {

            if (email) {
                if (firstName) {
                    if (lastName) {
                        if (address) {
                            if (password && password.length >= 6) {
                                if (password === confPassword) {

                                    register(this.state.email.trim(), this.state.password);
                                    saveUserData(email, firstName, lastName, address ,photo);
                                    ToastAndroid.show(' your registration is done successfully ^^', ToastAndroid.LONG);
                                    goToLoginScreen();

                                }
                                else {
                                    alert('please confirm your password to complete this registration ! ')
                                }
                            }
                            else {
                                alert('your password is empty or less than 6 characters ! ')
                            }
                        }
                        else {
                            alert('please enter your address to complete this registration ! ')
                        }
                    }
                    else {
                        alert('please enter your last name to complete this registration ! ')
                    }
                }
                else {
                    alert('please enter your first name to complete this registration ! ')
                }
            }
            else {
                alert('Your email is empty or invaild email ')
            }
        }

        const goToLoginScreen = () => {

            Navigation.push(this.props.componentId, {
                component: {
                    id: 'loginId',
                    name: 'Login',
                    passProps: {

                    }
                }

            })

        }




        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>

                    <Text style={{ color: 'red' }}> {this.getErrorMessages()}  </Text>

                    <View style={styles.InputView}>
                        <Input
                            containerStyle={{ marginTop: 8 }}
                            autoCapitalize="none"
                            placeholder='Gmail'
                            onChangeText={(email) => this.EmailValidation(email)}
                            placeholderTextColor='#9899a2'
                            inputStyle={
                                { color: '#9899a2' }
                            }
                            inputContainerStyle={
                                {
                                    borderBottomWidth: 1

                                }
                            }
                            rightIcon={
                                <MaterialIcons
                                    name='email'
                                    size={20}
                                    color='#9899a2'

                                />
                            }
                        />


                       

                        <Input
                            ref="password"
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
                            rightIcon={
                                <MaterialIcons
                                    name='lock'
                                    size={25}
                                    color='#9899a2'

                                />
                            }
                        />

                        <Input
                            placeholder='Confirm password'
                            autoCapitalize="none"
                            onChangeText={(confPassword) => this.setState({ confPassword })}
                            placeholderTextColor='#9899a2'
                            inputStyle={
                                { color: '#9899a2' }
                            }
                            inputContainerStyle={
                                {
                                    borderBottomWidth: 0
                                }
                            }
                            rightIcon={
                                <MaterialIcons
                                    name='lock'
                                    size={25}
                                    color='#9899a2'

                                />
                            }
                        />


                    </View>

                    {/* <MyButton title="Greate a new account" customClick={RegisterUser} ></MyButton> */}
                </ScrollView>



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
        color: '#f3f3f3',
        fontSize: 20,
        backgroundColor: '#f3f3f3',
        alignSelf: 'center',
        elevation: 2 ,
        marginTop :width/2


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
        fontStyle: 'italic',
        marginHorizontal: 10



    },
    ButtonView: {
        justifyContent: 'flex-end',





    },
});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Register);