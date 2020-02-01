import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

const styles = {

   
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
       


    },

    BeViewStyle: {
        flexDirection: 'row',
        width: width / 4,
        height: width / 4,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: width / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BStyle: {
        color: '#3b3c4e',
        fontSize: 45,
        fontWeight: '200'





    },

    InputView: {
        width: width / 1.1,
       
        color: '#f3f3f3',
        fontSize: 20,
        backgroundColor: '#f3f3f3',
        alignSelf: 'center',
        elevation: 1


    },
    eStyle: {

        color: '#3b3c4e',
        fontSize: 45,
        fontWeight: '200',
        borderTopWidth: 3,
        borderTopColor: '#fbc563',



    },
    TxtStyle: {

        color: '#3b3c4e',
        fontSize: 20,
        marginTop: width / 10,
        alignSelf: 'center',
        fontStyle: 'italic'



    },
    ButtonView: {
        justifyContent: 'flex-end',






    },

    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center' ,
        marginTop :40
      }





}


export default styles;