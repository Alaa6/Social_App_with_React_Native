import React, { Component, useState, useEffect } from 'react';
import { Text, FlatList, View, ActivityIndicator, ScrollView  ,Image,Dimensions, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import Styles from './styles'
import Header from '../../Components/header'
import MyButton from '../../Components/MyButton'
import { Navigation } from 'react-native-navigation';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';

const {width} = Dimensions.get('window');
const uid = auth().currentUser.uid;

async function unFollowFriend( friendId) {
    const uid = auth().currentUser.uid;
  
    const ref = database().ref(`/users/${uid}/friends/${friendId}`);
    console.log(ref);
    
  
    await ref.remove()
}

class MyFriends extends Component {

  constructor(props) {
    super(props);
    this.ref = database().ref(`/users`);
    this.unsubscribe = null;

    this.state = {
      myFriendsList: [],
      isLoading: true,

     
     
     
    }
  }

  componentDidMount() {
    console.log('test uid   ' + this.props.uid);
    
    this.unsubscribe = database().ref(`/users/${this.props.uid}/friends`).on('value', this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const myFriendsList = [];
    querySnapshot.forEach((friend) => {
      console.log(friend.child('fName').val());

      myFriendsList.push({
        key: friend.id,
        friend, // DocumentSnapshot
        fName: friend.child('fName').val(),
        lName: friend.child('lName').val(),
        photo: friend.child('photo').val(),
        email : friend.child('email').val() ,
        country :friend.child('country').val(),
        phone :friend.child('phone').val() ,
        address :friend.child('address').val() ,
        friendId : friend.child('friendId').val() ,

        

      });
    });
    this.setState({
        myFriendsList,
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
   <Header  title ='My Friends' color='#FFF' backgroundColor='#3b3c4e'   componentId={this.props.componentId }  showBack />

   <FlatList
        style ={{marginBottom :30}}
        data={this.state.myFriendsList}
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
             {<MyButton title="unfollow" customClick={()=>{
               this.setState({isFollow: true})
               unFollowFriend(item.friendId)
             }} btnWidth={width/3.1}  backgroundColor='#3b3c4e'  ></MyButton> }

            </View>

          </View>
          </TouchableOpacity>
          
        )} />


    </View>
      


    );

  }

}



const mapStateToProps = state => ({
  email: state.auth.email,
  fName: state.auth.fName,
  lName: state.auth.lName,
  photoUri: state.auth.photoUri,
  address: state.auth.address,
  country: state.auth.country,
  phone: state.auth.phone ,
  uid :state.auth.uid




})


export default connect(mapStateToProps)(MyFriends);


