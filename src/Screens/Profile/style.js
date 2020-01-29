import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window');
const styles = {

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',



    },
    firstHalf: {

        backgroundColor: '#3b3c4e',
        width: width,
        height: width / 2,
       
        justifyContent:'center'


    },
    imageProfile: {
        width: width/3,
        height: width/3,
        alignSelf: 'center',
        marginTop: 5,
       // resizeMode: 'stretch',
        borderRadius: 100
        
    } ,
    userName :{
        color: "#fff" ,
        fontSize :25 ,
        textAlign: 'center' ,
        marginTop:4
    },

    row :{
        flexDirection:'row' ,
        marginHorizontal: width/10 ,
        marginVertical :width/20

    } ,

    txtStyle:{
        fontSize:20 ,
        color:'#2c2a2c' ,
        marginHorizontal:width/20 ,
        

    } ,
    secondHalf :{
        backgroundColor: "#d4d4d7" ,
        marginTop:width/5 ,
        width :width/1.1 ,
        alignSelf:'center' ,
        elevation:6
    }


}


export default styles;