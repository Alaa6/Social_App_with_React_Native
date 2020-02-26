
import React ,{Component} from 'react';
import { TouchableOpacity, Text, StyleSheet ,Dimensions} from 'react-native';


const {width} = Dimensions.get('window');



class Mybutton extends Component {

  render() {
    const {btnWidth ,backgroundColor ,title ,customClick ,color} = this.props;
  
    return (
      <TouchableOpacity style={{
      alignItems: 'center',
      backgroundColor:  backgroundColor ? backgroundColor :'#3b3c4e',
      color: '#ffffff',
      padding: 10,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      borderRadius :5 ,
      width: btnWidth ? btnWidth : width/1.1,
      height: width/8,
      alignSelf :'center' ,
      marginBottom:20
  
      }} onPress={customClick}>
        <Text style={{
           color: color ? color :'#ffffff',
           fontSize:18
        }}>{title}</Text>
      </TouchableOpacity>
    );
 



  }

}

const styles = StyleSheet.create({


});

export default Mybutton;
