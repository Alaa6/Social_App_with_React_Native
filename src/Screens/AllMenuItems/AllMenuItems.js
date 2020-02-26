import React from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Realm from 'realm';
import Swipeout from 'react-native-swipeout';
import UpdateItem from '../Item/UpdateItem'
import { Navigation } from 'react-native-navigation';
import { Provider, connect } from 'react-redux';
import Home from '../Home/Home'
import ItemDetails from '../Item/ItemDetails';
import store from '../../store';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';

import auth from '@react-native-firebase/auth';

let realm;
const uid = auth().currentUser.uid;



Navigation.registerComponent('UpdateItem', () => (props) => (
    <Provider store={store}>
        <UpdateItem {...props} />
    </Provider>
), () => UpdateItem);

Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
        <Home {...props} />
    </Provider>
), () => Home);

Navigation.registerComponent('ItemDetails', () => (props) => (
    <Provider store={store}>
        <ItemDetails {...props} />
    </Provider>
), () => ItemDetails);





class ViewAllMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],

        };
        realm = new Realm({ path: 'SocialDB.realm', schemaVersion: 6 });

        var Item_details = realm.objects('Item_Details');

        this.state = {
            FlatListItems: Item_details,
            id: Item_details.item_id,
            name: Item_details.item_Name,
            Image: Item_details.item_Image,
            Video: Item_details.item_video,


        };
    }
    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#eeeeee' }} />
        );
    };

    

    goToItemDetails = () => {
        Navigation.showModal({
            component: {
                id: 'ItemDetailsId',
                name: 'ItemDetails',
                passProps: {
                    photo: item.item_Image,
                    item_name: item.item_Name,
                    item_video: item.item_video,
                    item_id: item.item_id
                }
            }

        })


    }

    openMenu = () => {
     this.menu.open()   
    };






 componentDidMount(){
  
    
 }

    render() {

       
    
        const pushHomeScreen = () => {
            Navigation.push('homeId',{
                component: {
                    id: 'homeId',
                    name: 'Home',
                    passProps: {
                        photo: this.state.photo
                    }
                }
    
            })
        }

        const deleto =(id)=>{
            realm.write(() => {
                realm.delete(
                    realm.objects('Item_Details').filtered('post_id =' +id)
                );
            });

        }

  
        return (
            <View style={styles.container}>



                <FlatList
                    data={this.state.FlatListItems}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            {console.log('sa7b l post     '+ item.userId)}
                            {console.log('eli 3aml login    '+ uid)}
                            {/* { deleto(item.post_id)}  */}
                            
                        { <Menu ref={ref => (this.menu = ref)}>
                            <MenuTrigger text='' />
                            <MenuOptions>
                                <MenuOption onSelect={()=>{
                                        Navigation.push('homeId',{
                                        component: {
                                            id: 'ubdateItemId',
                                            name: 'UpdateItem',
                                            passProps: {
                                                photo: item.item_Image,
                                                item_name: item.item_Name,
                                                item_video: item.item_video,
                                                item_id: item.item_id,
                                                item_description:item.item_description
                                            }
                                        }
                                    });
                                }} text='Edit' />
                                <MenuOption onSelect={ () => {
                                   

                                // realm.write(() => {
                                //     realm.delete(
                                //         realm.objects('Item_Details').filtered('post_id =' + item.post_id)
                                //     );
                                // });
                                    Alert.alert(
                                        'Delete',
                                        'this Item is deleted successfully !',
                                        [

                                            {
                                                text: 'Ok', onPress: pushHomeScreen


                                            },
                                        ],
                                        { cancelable: true }
                                    );
                                } } >
                                    <Text style={{ color: 'red' }}>Delete</Text>
                                </MenuOption>
                                {/* <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                            </MenuOptions>
                        </Menu>}

                            <TouchableOpacity onLongPress={()=>{
                                if(item.userId===uid){
                                    this.menu.open();

                                }

                            }}>
                                <View style={{ backgroundColor: '#fceef8', }}>
                                    <View style={{ flexDirection: 'row' , marginTop: 7 ,marginHorizontal :7}}>
                                        <Image source={{ uri: item.userPhoto }} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 5, borderRadius: 100 }} />
                                        <View style ={{ marginHorizontal :5}}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>{item.userName}</Text>
                                            <Text style={{ fontSize: 15, marginLeft: 4 }}>{item.userEmail}</Text>
                                            <Text style={{ fontSize: 12, marginLeft: 4, color: '#82838e' }}>{item.post_date}</Text>

                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>{item.item_description}</Text>
                                    <Image source={{ uri: item.item_Image }} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 5 , marginBottom :5 }} />

                                </View>


                            </TouchableOpacity>






                            {/* <Swipeout right={[
                                {
                                    text: 'Edit',
                                    backgroundColor: 'rgb(0,128,0)',
                                    onPress: () => {
                                        Navigation.dismissAllModals();
                                        Navigation.showModal({
                                            component: {
                                                id: 'ubdateItemId',
                                                name: 'UpdateItem',
                                                passProps: {
                                                    photo: item.item_Image,
                                                    item_name: item.item_Name,
                                                    item_video: item.item_video,
                                                    item_id: item.item_id,
                                                    item_description:item.item_description
                                                }
                                            }
                                        });
                                    }
                                },
                                {
                                    text: 'Delete',
                                    backgroundColor: 'rgb(217, 80, 64)',
                                    onPress: () => {


                                        Alert.alert(
                                            'Delete',
                                            'Do you sure to delete this item ?',
                                            [
                                                {
                                                    text: 'No', onPress: () => { },//Do nothing
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Yes', onPress: () => {
                                                        realm.write(() => {

                                                            
                                                            var Item_Details = realm.objects('Item_Details');
                                                            console.log(Item_Details);
                                                            realm.delete(
                                                                realm.objects('Item_Details').filtered('post_id =' + item.post_id)
                                                            );
                                                            var Item_Details = realm.objects('Item_Details');
                                                            console.log(Item_Details);

                                                        });
                                                        Alert.alert(
                                                            'Delete',
                                                            'this Item is deleted successfully !',
                                                            [

                                                                {
                                                                    text: 'Ok', onPress: this.pushHomeScreen


                                                                },
                                                            ],
                                                            { cancelable: true }
                                                        );


                                                    }
                                                },
                                            ],
                                            { cancelable: true }
                                        );



                                    }
                                }
                            ]} autoClose={true}>

                                <TouchableOpacity onPress={() => {
                                    Navigation.showModal({
                                        component: {
                                            id: 'ItemDetailsId',
                                            name: 'ItemDetails',
                                            passProps: {
                                                photo: item.item_Image,
                                                item_name: item.item_Name,
                                                item_video: item.item_video,
                                                item_id: item.item_id,
                                                item_description:item.item_description
                                            }
                                        }

                                    })
                                }} >
                                    <View style={{ backgroundColor: '#fceef8', }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={{uri :item.userPhoto}} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 5, borderRadius: 100 }} />
                                            <View>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>{item.userName}</Text>
                                                <Text style={{ fontSize: 15, marginLeft: 4 }}>{item.userEmail}</Text>
                                                <Text style={{ fontSize: 12, marginLeft: 4 ,color:'#82838e' }}>{item.post_date}</Text>

                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>{item.item_description}</Text>
                                        <Image source={{ uri: item.item_Image }} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 5, resizeMode: 'stretch' }} />
                                        <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>video: {item.item_video}</Text>

                                    </View>
                                </TouchableOpacity>
                            </Swipeout > */}

                        </View>
                    )}
                />
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


});

const mapStateToProps = state => ({
    email: state.auth.email,
    photoUri: state.auth.photoUri

})

export default connect(mapStateToProps)(ViewAllMenuItem);