import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View } from 'native-base';
//import { StyleSheet } from 'react-native';
//import store from './src/store';
//import { Provider } from 'react-redux';
//import SplashScreen from 'react-native-splash-screen'
//import WelcomeScreen from './src/WelcomeScreen/WelcomeScreen'






class App extends Component {


  componentDidMount() {
    SplashScreen.hide();
  }


  render() {
    

    return (
      //  <Provider store={store}>
      //     <WelcomeScreen componentId ='appId' />
      // </Provider>

      <View>
        <Text>alaa</Text>
      </View>


    );



  }

}

const styles = StyleSheet.create({

});

export default App;
