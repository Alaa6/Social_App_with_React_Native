import React, { Component, useState, useEffect } from 'react';
import { Text, FlatList, View, ActivityIndicator, ScrollView  ,Image,Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Styles from './styles'
import Header from '../../Components/header'
import MyButton from '../../Components/MyButton'



const snapshot = database().ref('/users').once('value');

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
    const { uid } = auth().currentUser.uid;
    querySnapshot.forEach((doc) => {
      //  const { fName, lName, photo } = doc.data();
      console.log(doc.child('address').val());

      usersList.push({
        key: doc.id,
        doc, // DocumentSnapshot
        fName: doc.child('firstName').val(),
        lName: doc.child('lastName').val(),
        photo: doc.child('photo').val(),
        email : doc.child('email').val()
      });
    });
    this.setState({
      usersList,
      isLoading: false,
    });
  }

  //  onSnapshot =(snapshot) =>{
  //   const list = [];

  //   // Create our own array of games in order
  //   snapshot.forEach(game => {
  //     list.push({
  //       key: game.id, // Add custom key for FlatList usage
  //       ...game,
  //     });
  //   });
  //   this.setState({usersList :list})


  //   //setLoading(false);
  // }  // end onSnapshot



  Gamess = () => {
    const ref = database().ref(`/users`);
    const snapshot = ref.once('value');
    console.log('yom tlat   ' + snapshot);

    const refA = database().ref('/users').on('value', function (snapshot) {

      console.log(snapshotToArray(snapshot));

      // function snapshotToArray(snapshot) {
      var returnArr = [];

      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);

      });


      // };
    });


    // console.log('ref      '+ref);


    //const  users = ref.once('value', this.onSnapshot);



    // return <FlatList data={refA} renderItem={({ item }) => {
    //   <View>
    //     {console.log('bsm alla   '+item.fName)}

    //       <Text>{item.fName}</Text>

    //   </View>
    // }} />;
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

    <View>
   <Header  title ='Choose friends' color='#FFF' backgroundColor='#3b3c4e'   componentId={this.props.componentId }  />

   <FlatList
        data={this.state.usersList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={Styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: item.photo }} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 5, borderRadius: 100 }} />
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>{item.fName}</Text>
                <Text style={{ fontSize: 15, marginLeft: 4 }}>{item.email}</Text>
              </View>
             <MyButton title="follow" customClick={this.userLogin} btnWidth={width/3.1}></MyButton>

            </View>

          

          </View>
        )} />


    </View>
      


    );

  }

}



export default Friends;
