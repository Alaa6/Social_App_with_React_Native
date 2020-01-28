import React ,{Component} from 'react';
import {Navigation} from 'react-native-navigation'
import App from './App'
import {Provider} from 'react-redux';
import store from './src/store';
import SideMenu from './src/Components/SideMenu'

console.disableYellowBox = true;



Navigation.registerComponent('App',() => (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
), () => App);

Navigation.registerComponent('SideMenu',() => (props) => (
  <Provider store={store}>
    <SideMenu {...props} />
  </Provider>
), () => SideMenu);


Navigation.events().registerAppLaunchedListener(()=>{
  Navigation.setRoot ({
    root:{
      sideMenu :{
        // right:{
        //   component :{
        //     id : 'SideMenu' ,
        //     name :'SideMenu'
        //   }
        // } , // end right
        center :{
          stack :{
            children :[{
              component :{
                name : 'App' ,
                id :'appId' ,
                options: {
                  sideMenu: {
                      left: {
                          component: {

                              name: 'SideMenu',
                          },
                          visible: false,
                          enabled: false                     
                        }
                  }
                },
              
              }
            }] ,
            options :{
              topBar :{
                visible :false ,
              }
            }
          }
        } //end center
        ,left :{
          component :{
            id : 'SideMenu' ,
            name :'SideMenu' ,
          } ,
        }
    
      } // end side menu

    }
  
});
    })




