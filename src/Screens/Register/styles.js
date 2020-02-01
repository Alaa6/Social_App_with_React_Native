import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

const styles = {

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
    
    TxtStyle: {
      color: '#3b3c4e',
      fontSize: 17,
      marginTop: width / 10,
      alignSelf: 'center',
      fontStyle: 'italic'
 
  
    },
    ButtonView: {
      justifyContent: 'flex-end',
      marginVertical: width / .9

  
    },
    InputView: {
      width: width / 1.1,
      color: '#f3f3f3',
      fontSize: 20,
      backgroundColor: '#f3f3f3',
      alignSelf: 'center',
      elevation: 2,
      marginTop: width / 2 ,
      marginBottom : 20
    },
  
  
  
  
  
  }
  export default styles ;