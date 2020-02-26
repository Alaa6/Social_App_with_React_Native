import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { View } from 'native-base';



const { width } = Dimensions.get('window');




 class Lifecycle extends Component {

    constructor(props) {
        super(props);
        console.log(`${Date.now()} this is constractor`);
        
        this.state = {
            numberOfRefresh :0


        }
    }

    componentDidMount(){
        console.log(`${Date.now()} this is componentDidMount`);
        
    }

    componentWillMount(){
        console.log(`${Date.now()} this is componentWillMount`);
        
    }


 

  
  render() {
    console.log(`${Date.now()} this is render`);


    
    return (
      <View style={{flex :1 , marginTop:100}}>

      
      </View>
    );
  }
}

export default class LifecycleComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          


        }
    }

  
 

  
  render() {
      var lifecycle = <Lifecycle></Lifecycle>

    
    return (
      <View >
          {lifecycle}

       
       
      </View>
    );
  }
}