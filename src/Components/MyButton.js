
import React from 'react';
import { TouchableOpacity, Text, StyleSheet ,Dimensions} from 'react-native';


const {width} = Dimensions.get('window');

const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#3b3c4e',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius :5 ,
    width: width/1.1,
    height: width/8,
    alignSelf :'center' ,
    marginBottom:20
    
  },
  text: {
    color: '#ffffff',
    fontSize:18
  },
});
export default Mybutton;