import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity ,Image, ToastAndroid} from 'react-native';
import { View } from 'native-base';
import { Navigation } from 'react-native-navigation'
import store from '../../store';
import { connect, Provider } from 'react-redux'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ValidationComponent from 'react-native-form-validator';
import { Input } from 'react-native-elements';
import MyButton from  '../../Components/MyButton'
import ImagePicker from 'react-native-image-picker';
import Login from '../Login/Login';


/*Firebase */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

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

  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e.message);
    //alert(e)
  }
}



async function saveUserData(email, firstName, lastName, address, photo) {
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




class RegisterSteps extends ValidationComponent {



  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      confPassword: '',
      photo: '',
      nextBtn: false ,
      showCreateBtn:true
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

    const { email, password, firstName, lastName, address, confPassword, photo  ,showCreateBtn} = this.state;
    console.log('sss' + photo.uri);


    const RegisterUser = () => {

      if (email) {
        if (password && password.length >= 6) {
          if (password === confPassword) {

            register(this.state.email.trim(), this.state.password);
            this.setState({ nextBtn: true ,showCreateBtn:false })


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


    const saveData = () => {

      if(firstName)
      {
        if(lastName)
        {
          if(address)
          {
            saveUserData(  email ,firstName, lastName, address, photo);
            ToastAndroid.show(' your registration is done successfully ^^', ToastAndroid.LONG);
            goToLoginScreen();
  
          }
          else{

            alert('please enter your address to complete this registration ! ')
          }

        }
        else{
          alert('please enter your last name to complete this registration ! ')

        }
       

      }
      else{
        alert('please enter your first name to complete this registration ! ')

      }

     

    }





    return (
      <View style={styles.container}>

        <ProgressSteps labelColor="#9899a2" activeLabelColor="#3b3c4e" activeStepNumColor="#3b3c4e" completedStepIconColor="#3b3c4e" activeStepIconBorderColor="#3b3c4e" completedProgressBarColor="#3b3c4e">
          <ProgressStep label="Register" nextBtnStyle={styles.btnStyle} nextBtnText={this.state.nextBtn ? 'التالي' : null} nextBtnTextStyle={{ color: '#3b3c4e' }} >
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

                {showCreateBtn && <MyButton title="Greate a new account" customClick={RegisterUser} ></MyButton>}
              </ScrollView>



            </View>


          </ProgressStep>
          <ProgressStep label="User Information" nextBtnStyle={styles.btnStyle2} nextBtnText='التالي' nextBtnTextStyle={{ color: '#3b3c4e' }} previousBtnText='السابق' previousBtnStyle={styles.btnStyle1} previousBtnTextStyle={{ color: '#3b3c4e' }} onSubmit={saveData}>
          <View style={styles.container}>

            
<View style={{ alignSelf: 'center', marginTop: 10 }}>
{!photo ?  <TouchableOpacity onPress={this.handleImagePicker}  >
        <Ant
            //style={styles.TxtStyle}
            name='adduser'
            size={100}
            color='#9899a2'
        />
    </TouchableOpacity>
: <Image source={{ uri: photo.uri }} style={{  width: width / 2, height: width / 2, alignSelf: 'center' ,resizeMode:'center' ,borderRadius:100 }} />
    }

</View>


<ScrollView style={{ flex: 1 }}>

    <Text style={{ color: 'red' }}> {this.getErrorMessages()}  </Text>

    <View style={styles.InputView}>
       
        <Input
            ref="name"
            placeholder='First name'
            autoCapitalize="none"
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
            autoCapitalize="none"
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
            ref="name"
            placeholder='Address'
            autoCapitalize="none"
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

        


    </View>

    
</ScrollView>



</View>
          </ProgressStep>

        </ProgressSteps>
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
    alignSelf: 'center',
    fontStyle: 'italic'




  },
  ButtonView: {
    justifyContent: 'flex-end',
    marginVertical: width / .9




  },
  InputView: {
    width: width / 1.1,
    color: '#f3f3f3',
    fontSize: 20,
    backgroundColor: '#f3f3f3',
    alignSelf: 'center',
    elevation: 2,
    marginTop: width / 2


  },





});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(RegisterSteps);