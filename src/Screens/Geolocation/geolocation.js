import React, { Component } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Header from '../../Components/header'

export default class MyLocation extends Component {
    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
    }
    watchID: ?number = null;


    componentDidMount = () => {

        Geolocation.getCurrentPosition(info => console.log(info))


        Geolocation.getCurrentPosition((position) => {
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
        },

            (error) => alert(error.message),

            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        this.watchID = Geolocation.watchPosition((position) => {
            const lastPosition = JSON.stringify(position);
            this.setState({ lastPosition });
        });

    }




    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);

    }

    render() {
        console.log( 'geo  '+this.props.componentId);
        
        return (
            <View style={styles.container}>
                <Header title='My Location' color='#FFF' backgroundColor='#3b3c4e' showMenu showBack componentId={this.props.componentId} />


                <Text style={styles.boldText}>
                    Initial position:
        </Text>
                <Text>
                    {this.state.initialPosition}
                </Text>
                <Text style={styles.boldText}>
                    Current position:
        </Text>
                <Text>
                    {this.state.lastPosition}
                </Text>
            </View>
        )
    }





}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
    },
    boldText: {
        fontSize: 30,
        color: 'red',
    }
})