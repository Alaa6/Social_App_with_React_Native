
import React, { Component } from 'react';
import { Text, Keyboard  ,ScrollView ,TouchableOpacity ,Image ,ToastAndroid}  from 'react-native';
import { View ,Picker} from 'native-base';
import MyButton from '../../Components/MyButton';
import {connect ,Provider } from 'react-redux'
import Styles from './styles'
import { Formik } from "formik";
import ValidationSchema from './validation'
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ant from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePickerCrop from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import {GoToLoginScreen} from './Navigation'
import database from '@react-native-firebase/database';


const Item = Picker.Item;


 class SaveUserData extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
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
    
    
    

       /* ___________________register user in firebase _________________________ */

       handleImagePicker = async () => {

        try {
          //pick image information
          let img = await ImagePickerCrop.openPicker({
            width: 200,
            height: 200,
            cropping: true,
          });
          console.log("image path: " + img.path.toString());
    
          if (img) {
            this.setState({ photo: img.path.toString() });
          }
    
    
        } catch (err) {
          console.warn("error in setImage : " + err.toString());
        }
    
        // ImagePickerCrop.openPicker({
        //   width: 300,
        //   height: 400,
        //   cropping: true
        // }).then(image => {
    
        //   console.log(image);
        //   console.log(image.path);
        //   console.log(image.data);
        //   if (image) {
        //          this.setState({ photo: image.path });
        //        }
        // });
    
    
        // const options = {  //options
        //   noData: true,
        // };
        // ImagePicker.launchImageLibrary(options, response => {
        //   console.log('resposns' + response);
        //   if (response.uri) {
        //     this.setState({ photo: response.uri });
        //   }
        // });
    
    
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
    
      getDataList = () => {
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
     
      saveUserData = async (email, firstName, lastName, address, photo, phone, selectedCountry) => {
        const uid = await auth().currentUser.uid;
        const idTokenResult = await auth().currentUser.getIdTokenResult();
        const token =idTokenResult.token ;
        const ref   = await database().ref(`/users/${uid}`);
    
        await ref.set({
          uid,
          email,
          firstName,
          lastName,
          address,
          photo,
          phone,
          selectedCountry,
          token
    
    
        });
      }
    
      saveData = () => {
        const { email, firstName, lastName, address, photo, showCreateBtn, phone, selectedCountry } = this.state;
    
    
        if (firstName) {
          if (lastName) {
            if (address) {
              this.saveUserData(email, firstName, lastName, address, photo, phone, selectedCountry);
              ToastAndroid.show(' your registration is done successfully ^^', ToastAndroid.LONG);
              Keyboard.dismiss();
              {GoToLoginScreen()}
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
    

    
    

  render() {
    const { email, firstName, lastName, address, photo, showCreateBtn, phone, selectedCountry } = this.state;

    return (
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
            : <View >
              <Image source={{ uri: photo }} style={Styles.photoStyle} />
              <Text style ={Styles.changePhotoTxt} onPress={this.handleImagePicker}> {'Change photo'}</Text>
            </View>

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
          <TouchableOpacity onPress={this.saveData}>
          <Text style={Styles.submitStyle} >{'Submit'}</Text>


          </TouchableOpacity>



        </ScrollView>



      </View>
    );
  }
}


const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(SaveUserData);
