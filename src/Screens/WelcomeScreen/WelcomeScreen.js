import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { View } from 'native-base';
import MyButton from '../../Components/MyButton';
import Login from '../../Screens/Login/Login'
import { Navigation } from 'react-native-navigation'
import store from '../../store';
import {connect ,Provider } from 'react-redux'


const { width } = Dimensions.get('window');


Navigation.registerComponent('Login', () => (props) => (
  <Provider store={store}>
          <Login {...props} />
  </Provider>
), () => Login);


 class WelcomeScreen extends Component {

  
  render() {

     const goToLoginScreen =() =>{
       console.log(this.props.componentId);
       

      Navigation.push( this.props.componentId ,{
        component: {
          id: 'loginId',
          name: 'Login',
          passProps: {
  
          },
          options: {
           // topBar: { visible: false, drawBehind: true },
            sideMenu: {
              left: {
                visible: false,
                enabled: false
                }
            }
            
          },
        }
  
      })
    }

    
    return (
      <View style={styles.container}>

        <View style={styles.BeViewStyle}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.BStyle}>B</Text>
            <Text style={styles.eStyle}>e</Text>
          </View>

        </View>
        <Text style={styles.TxtStyle}>{'Showcase&Discover creative work'}</Text>
        <View style={styles.ButtonView}>
          <MyButton title="Get Started" customClick={goToLoginScreen}  btnWidth={width/1.1}  backgroundColor='#3b3c4e' ></MyButton>


        </View>
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
    alignSelf: 'center' ,
    fontStyle:'italic'
    



  },
  ButtonView: {
    justifyContent: 'flex-end',
    marginVertical: width / .9 




  },





});

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(WelcomeScreen);