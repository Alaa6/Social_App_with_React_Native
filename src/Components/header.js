
import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { Navigation } from 'react-native-navigation';
Navigation.registerComponent('Guide.menu', () => RestaurantScreen);
Navigation.registerComponent('Guide.header', () => Header);
Navigation.registerComponent('Guide.sidemenu', () => HomeSideMenu);



const {width} = Dimensions.get('window');
class Header extends Component {



  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
  
    if (buttonId === 'sideMenu') {
      Navigation.mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  }
  

  MenuBtnOnClick() {
    const { componentId } = this.props;
  
    Navigation.mergeOptions(componentId , {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }

 


  render() {
    const {title , color ,backgroundColor ,showMenu ,showBack ,componentId } = this.props
     const back =()=>{
      Navigation.pop(componentId);
     }
    
    return (
      <View style={{ flexDirection: 'row',height :width/4.5 ,backgroundColor :backgroundColor ,alignItems:'center' ,justifyContent:'center'  }}>
       { showMenu ? <Feather
          style={{color :color , paddingRight:10 ,flex :0.39 }}
          name='menu'
          size={25} 
          onPress={()=>{
            Navigation.mergeOptions( componentId , {
              sideMenu: {
                left: {
                  visible: true,
                
                }
              }
            });
          }}/> :null}
            <Text 
              style={{color: color, fontSize: 20, fontStyle: 'italic' ,flex:0.42 }}>
              {title}
              </Text>
        { showBack && <Ant
          style={{color :color ,flex:0.15 }}
          name='arrowright'
          size={25} 
          onPress={back}/>}
       

      </View>

    );



  }

}

const styles = StyleSheet.create({


});

export default Header;


