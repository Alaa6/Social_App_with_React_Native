import React, { Component, useState, useEffect } from 'react';
import { Text, FlatList, View, ActivityIndicator, ScrollView  ,Image,Dimensions, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import Styles from './styles'
import Header from '../../Components/header'
import MyButton from '../../Components/MyButton'
import { Navigation } from 'react-native-navigation';


const {width} = Dimensions.get('window');

class Friends extends Component {

  constructor(props) {
    super(props);
    this.ref = database().ref(`/users`);
    this.unsubscribe = null;
    this.state = {
      usersList: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.unsubscribe = database().ref(`/users`).on('value', this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const usersList = [];
    querySnapshot.forEach((user) => {
      console.log(user.child('address').val());

      usersList.push({
        key: user.id,
        user, // DocumentSnapshot
        fName: user.child('firstName').val(),
        lName: user.child('lastName').val(),
        photo: user.child('photo').val(),
        email : user.child('email').val() ,
        country :user.child('selectedCountry').val(),
        phone :user.child('phone').val() ,
        address :user.child('address').val()

      });
    });
    this.setState({
      usersList,
      isLoading: false,
    });
  }



  render() {
    

    if (this.state.isLoading) {
      return (
        <View style={Styles.activity}>
          <ActivityIndicator size="large" color="#3b3c4e" />
        </View>
      )
    }
    return (

    <View style ={{marginBottom :30}}>
   <Header  title ='Choose friends' color='#FFF' backgroundColor='#3b3c4e'   componentId={this.props.componentId }  />

   <FlatList
        style ={{marginBottom :30}}
        data={this.state.usersList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress ={()=>{
            Navigation.push('homeId', {
              component: {
                  id: 'profileId',
                  name: 'Profile',
                  passProps: {
                      title: 'My Profile',
                      photo: item.photo,
                      country: item.country,
                      email: item.email,
                      fName: item.fName,
                      lName: item.lName,
                      address: item.address,
                      phone :item.phone ,
                      msgBtn :true
    
                  }
              }
          });
          }}>
            <View style={Styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: item.photo }} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 5, borderRadius: 100 }} />
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>{item.fName}</Text>
                <Text style={{ fontSize: 15, marginLeft: 4 }}>{item.email}</Text>
              </View>
             <MyButton title="follow" customClick={this.userLogin} btnWidth={width/3.1}  backgroundColor='#3b3c4e' ></MyButton>

            </View>

          </View>
          </TouchableOpacity>
          
        )} />


    </View>
      


    );

  }

}



export default Friends;
