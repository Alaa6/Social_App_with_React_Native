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
















class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {


        }
    }





    render() {


        return (
            <View style={Styles.container}>
             <Header  backgroundColor='#3b3c4e'   color='#fff'/>

                <View style={Styles.firstHalf}>
                    <Image source={{uri : this.props.photoUri}} style={Styles.imageProfile} />
                    <Text style={Styles.userName} > {this.props.fName + ' ' + this.props.lName}  </Text>
                </View>

                <View style ={Styles.secondHalf}>
                    <View style={Styles.row}>
                        <MaterialIcons
                            name='email'
                            size={30}
                            color='#3b3c4e'

                        />
                        <Text style={Styles.txtStyle}>{this.props.email}</Text>
                    </View>

                    <View style={Styles.row}>

                        <FontAwesome
                            name='map-marker'
                            size={40}
                            color='#3b3c4e'

                        />
                        <Text style={Styles.txtStyle}>{this.props.address}</Text>
                    </View>

                    <View style={Styles.row}>
                        <MaterialIcons
                            style={Styles.Icons}
                            name='phone-iphone'
                            size={30}
                            color='#3b3c4e' />
                        <Text style={Styles.txtStyle}>{this.props.phone}</Text>
                    </View>
                </View>
                <MyButton title="Edit Profile" customClick={null} ></MyButton>


            </View>
        );
    }
}


const mapStateToProps = state => ({
    email: state.auth.email,
    fName: state.auth.fName,
    lName: state.auth.lName,
    photoUri: state.auth.photoUri,
    address: state.auth.address,
    phone :state.auth.phone ,




})

export default connect(mapStateToProps)(Profile);