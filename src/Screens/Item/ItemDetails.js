
import React, { Component } from 'react';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, FlatList, Image, Alert } from 'react-native';
import AllMenuItems from '../AllMenuItems/AllMenuItems';
//import HomeSideMenu from '../menu/HomeSideMenu'
import { Navigation } from 'react-native-navigation';
import Header from '../../Components/header';
//import { FlatList } from 'react-native-gesture-handler';
//import realm from '../../../Database/allSchemas';
import Swipeout from 'react-native-swipeout';
import Realm from 'realm';
import Ionicons from 'react-native-vector-icons/Ionicons';

let realm;

class ItemDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],

        };
        realm = new Realm({ path: 'SocialDB.realm' ,schemaVersion:2 });

        var Item_details = realm.objects('Item_Details');

        this.state = {
            FlatListItems: Item_details,
            id: Item_details.item_id
        };

    }


    showAlert = () => {
        Alert.alert(
            'Order',
            'Do you sure to order this Item ?',
            [
                {
                    text: 'No', onPress: () => { },//Do nothing
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {

                    }
                },
            ],
            { cancelable: true }
        );
    
}



render() {

    return (
        <View style={styles.container}>
            <Header title={this.props.item_name} />
            <View style={{ backgroundColor: '#ebf7df', margin: 10, padding: 5 }}>
                <Image source={{ uri: this.props.photo }} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 5, resizeMode: 'stretch' }} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>Name: {this.props.item_name}</Text>
                <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>Video: {this.props.video}</Text>
                <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>Description: {this.props.item_description}</Text>

            </View>
            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around', backgroundColor: '#ebf7df' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 6 }}> OrderCount :</Text>
                <Text style={{ fontSize: 18, margin: 6 }} numberOfLines={2}>{'0'}</Text>
                <Ionicons
                    style={styles.menuIconStyle}
                    name='ios-add-circle'
                    color='primaryLight'
                    size={35}
                    onPress={this.showAlert}
                />

            </View>
        </View>

    );



}

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white'



    },

    ItemListStyle: {
        flex: 1,
        justifyContent: 'flex-start',



    },
    titlePageStyle: {
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 30,
        color: 'rgba(0,128,0 ,0.7)',

    },
    menuIconStyle: {

        color: 'rgba(0,128,0 ,0.7)',
        margin: 6,
        alignSelf: 'flex-end'



    },

    bellIconStyle: {
        marginHorizontal: 40,
        color: 'rgb(255,99,71) ',

    },



});

export default ItemDetails;


