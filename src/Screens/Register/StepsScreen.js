import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { View, Picker, Header, Button, Title } from 'native-base';
import { Navigation } from 'react-native-navigation'
import store from '../../store';
import { connect, Provider } from 'react-redux'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ValidationComponent from 'react-native-form-validator';
import { Input } from 'react-native-elements';
import MyButton from '../../Components/MyButton'
import ImagePicker from 'react-native-image-picker';
import Login from '../Login/Login';
import Styles from './styles'
/*Firebase */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
/* icons */
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ant from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/*form  */
import ValidationSchema from './validation'
import { Formik } from "formik";
import {
  //handleTextInput,
  withNextInputAutoFocusForm,
  // withNextInputAutoFocusInput
} from "react-native-formik";




const Form = withNextInputAutoFocusForm(View);
const { width } = Dimensions.get('window');
const Item = Picker.Item;

Navigation.registerComponent('Login', () => (props) => (
  <Provider store={store}>
    <Login {...props} />
  </Provider>
), () => Login);


async function register(email, password) {

  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e.message);

  }
}



async function saveUserData(email, firstName, lastName, address, photo, phone, selectedCountry) {
  const uid = auth().currentUser.uid;

  const ref = database().ref(`/users/${uid}`);

  await ref.set({
    uid,
    email,
    firstName,
    lastName,
    address,
    photo,
    phone,
    selectedCountry

  });
}


class RegisterSteps extends ValidationComponent {



  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      photo: '',
      nextBtn: false,
      showCreateBtn: true,
      phone: '',
      /*  picker */
      selectedItem: undefined,
      selectedCountry: 'Choose Your city',
      results: {
        items: []
      },
      countries: [],
    }
  }




  handleImagePicker = () => {
    const options = {  //options
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('resposns' + response);
      if (response.uri) {
        this.setState({ photo: response.uri });
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


  /* picker */

  onValueChange(value) {
    this.setState({
      selectedCountry: value
    });
  }

  componentWillMount() {
    this.getDataList();
  }

  getDataList() {
    var that = this;
    var url = `https://restcountries.eu/rest/v2/all`;
    console.log("-----------url:" + url);

    fetch(url, { method: 'Get' })
      .then(function (response) {
        return response.json();
      })

      .then(function (result) {
        that.setState({ countries: result })

      })
      .catch(function (error) {
        console.log("-------- error ------- " + error);
        alert('result :' + error);
      });


  }

  countryList = () => {
    return (this.state.countries.map((x, i) => {
      return (<Item label={x.name} key={i} value={x.name} />)
    }));

  }



  render() {

    const { email, firstName, lastName, address, photo, showCreateBtn, phone, selectedCountry } = this.state;



    const RegisterUser = (values) => {

      register(values.email, values.password);
      this.setState({ nextBtn: true, showCreateBtn: false })
      Keyboard.dismiss();

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



    const saveData = () => {

      if (firstName) {
        if (lastName) {
          if (address) {

            saveUserData(email, firstName, lastName, address, photo, phone, selectedCountry);
            ToastAndroid.show(' your registration is done successfully ^^', ToastAndroid.LONG);
            Keyboard.dismiss();
            goToLoginScreen();

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





    return (
      <View style={Styles.container}>

        <ProgressSteps labelColor="#9899a2" activeLabelColor="#3b3c4e" activeStepNumColor="#3b3c4e" completedStepIconColor="#3b3c4e" activeStepIconBorderColor="#3b3c4e" completedProgressBarColor="#3b3c4e">
          <ProgressStep label="Register" nextBtnStyle={Styles.btnStyle} nextBtnText={this.state.nextBtn ? 'Next' : null} nextBtnTextStyle={{ color: '#3b3c4e' }} >
            <View style={Styles.container}>
              <ScrollView style={{ flex: 1 }}>

                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    confPassword: '',
                  }}

                  onSubmit={values => RegisterUser(values)}
                  validationSchema={ValidationSchema}
                  render={props => {
                    return (

                      <Form style={Styles.InputView}>

                        {props.errors.email ? <Text style={{ color: 'red', marginLeft: 10 }}>{props.errors.email}</Text> : null}
                        <Input
                          name="email"
                          type="email"
                          onChangeText={props.handleChange('email')}
                          containerStyle={{ marginTop: 8 }}
                          autoCapitalize="none"
                          placeholder='Gmail'
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
                        {props.errors.password ? <Text style={{ color: 'red', marginLeft: 10 }}>{props.errors.password}</Text> : null}
                        <Input
                          name="password"
                          type="password"
                          placeholder='Password'
                          autoCapitalize="none"
                          onChangeText={props.handleChange('password')}
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
                        {props.errors.confPassword ? <Text style={{ color: 'red', marginLeft: 10 }}>{props.errors.confPassword}</Text> : null}

                        <Input
                          //name="confPassword"
                          placeholder='Confirm password'
                          autoCapitalize="none"
                          onChangeText={props.handleChange('confPassword')}
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
                        {/* 
{props.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={props.handleSubmit} />
          )} */}



                        {showCreateBtn && <MyButton title="Greate a new account" customClick={props.handleSubmit} ></MyButton>}


                      </Form>
                    );

                  }}
                />


              </ScrollView>



            </View>


          </ProgressStep>
          <ProgressStep label="User Information" nextBtnStyle={Styles.btnStyle2} nextBtnText='Next' nextBtnTextStyle={{ color: '#3b3c4e' }} previousBtnText='السابق' previousBtnStyle={Styles.btnStyle1} previousBtnTextStyle={{ color: '#3b3c4e' }} onSubmit={saveData}>
            <View style={Styles.container}>


              <View style={{ alignSelf: 'center', marginTop: 10 }}>
                {!photo ? <TouchableOpacity onPress={this.handleImagePicker}  >
                  <Ant
                    //style={styles.TxtStyle}
                    name='adduser'
                    size={100}
                    color='#9899a2'
                  />
                </TouchableOpacity>
                  : <Image source={{ uri: photo }} style={{ width: width / 2, height: width / 2, alignSelf: 'center', resizeMode: 'center', borderRadius: 100 }} />
                }

              </View>




              <ScrollView style={{ flex: 1 }}>

                <View style={Styles.InputView}>

                  <Input
                    ref="name"
                    placeholder='First name'
                    onChangeText={(firstName) => this.setState({ firstName })}
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
                    rightIcon={
                      <FontAwesome5
                        name='user-alt'
                        size={20}
                        color='#9899a2'

                      />
                    }
                  />

                  <Input
                    ref="name"
                    placeholder='Last name'
                    onChangeText={(lastName) => this.setState({ lastName })}
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
                    rightIcon={
                      <FontAwesome5
                        name='user-alt'
                        size={20}
                        color='#9899a2'

                      />
                    }
                  />



                  <Input
                    placeholder='Address'
                    onChangeText={(address) => this.setState({ address })}
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
                    rightIcon={
                      <FontAwesome
                        name='map-marker'
                        size={25}
                        color='#9899a2'

                      />
                    }
                  />

                  <Input
                    placeholder='phone number'
                    keyboardType='numeric'
                    onChangeText={(phone) => this.setState({ phone })}
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
                    rightIcon={
                      <MaterialIcons

                        name='phone-iphone'
                        size={25}
                        color='#9899a2' />
                    }
                  />

                  <Picker
                    // headerComponent={
                    //   <Header>
                    //     <Button transparent>
                    //       Custom Back
                    //             </Button>
                    //     <Title>Custom Header</Title>
                    //   </Header>
                    // }
                    mode='dropdown'
                    selectedValue={this.state.selectedCountry}

                    onValueChange={this.onValueChange.bind(this)}>
                    <Item label='Choose Your city' value='Choose Your city' />
                    {this.countryList()}

                  </Picker>
                </View>


              </ScrollView>



            </View>
          </ProgressStep>

        </ProgressSteps>
      </View>
    );
  }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(RegisterSteps);


