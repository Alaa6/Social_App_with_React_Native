import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Keyboard, Image } from 'react-native';
import { View } from 'native-base';
import MyButton from '../../Components/MyButton'
import Styles from './style'
import { Navigation } from 'react-native-navigation'
import { connect, Provider } from 'react-redux'
import store from '../../store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/header';
import Chat from '../../Screens/Chat/Chat'





const {width} = Dimensions.get('window');

Navigation.registerComponent('Chat', () => (props) => (
    <Provider store={store}>
        <Chat {...props} />
    </Provider>
), () => Chat);











class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {


        }
    }


 


    render() {
     const {fName ,lName ,phone ,photo,country ,address ,email ,msgBtn ,editBtn ,componentId}  =this.props

     const goToChat =()=>{
        Navigation.push('profileId', {
            component: {
                id: 'chatId',
                name: 'Chat',
                passProps: {
                    title: 'Chat'
                }
            }
        });
     }

        return (
            <View style={Styles.container}>
             <Header  backgroundColor='#3b3c4e'   color='#fff' showBack componentId= {componentId}/>

                <View style={Styles.firstHalf}>
                    <Image source={{uri : photo}} style={Styles.imageProfile} />
                    <Text style={Styles.userName} > { fName + ' ' + lName}  </Text>
                   { msgBtn && <MyButton title="Send message" customClick={goToChat} backgroundColor='#d4d4d7' color='#3b3c4e' btnWidth={width/2}></MyButton> }

                </View>

                <View style ={Styles.secondHalf}>
                    <View style={Styles.row}>
                        <MaterialIcons
                            name='email'
                            size={30}
                            color='#3b3c4e'

                        />
                        <Text style={Styles.txtStyle}>{email}</Text>
                    </View>

                    <View style={Styles.row}>

                        <FontAwesome
                            name='map-marker'
                            size={40}
                            color='#3b3c4e'

                        />
                        <Text style={Styles.txtStyle}>{address + ' / '+ country}</Text>
                    </View>

                    <View style={Styles.row}>
                        <MaterialIcons
                            style={Styles.Icons}
                            name='phone-iphone'
                            size={30}
                            color='#3b3c4e' />
                        <Text style={Styles.txtStyle}>{phone}</Text>
                    </View>
                </View>
               { editBtn && <MyButton title="Edit Profile" customClick={null} backgroundColor='#3b3c4e' btnWidth={width/1.1} ></MyButton>}


            </View>
        );
    }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Profile);