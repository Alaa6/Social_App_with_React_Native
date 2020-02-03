
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import store from '../store';
import { Provider } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import Home from '../Screens/Home/Home'
import AddItem from '../Screens/Item/AddPost'
import Login from '../Screens/Login/Login'
import Profile from '../Screens/Profile/profile'
import Friends from '../Screens/Friends/Friends'
import MyFriends from '../Screens/MyFriends/myFriends'

const { width } = Dimensions.get('window');

Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
        <Home {...props} />
    </Provider>
), () => Home);
Navigation.registerComponent('AddItem', () => (props) => (
    <Provider store={store}>
        <AddItem {...props} />
    </Provider>
), () => AddItem);

Navigation.registerComponent('Login', () => (props) => (
    <Provider store={store}>
        <Login {...props} />
    </Provider>
), () => Login);
Navigation.registerComponent('Profile', () => (props) => (
    <Provider store={store}>
        <Profile {...props} />
    </Provider>
), () => Profile);

Navigation.registerComponent('Friends', () => (props) => (
    <Provider store={store}>
        <Friends {...props} />
    </Provider>
), () => Friends);

Navigation.registerComponent('MyFriends', () => (props) => (
    <Provider store={store}>
        <MyFriends {...props} />
    </Provider>
), () => MyFriends);





class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photo: true,

        };

    }








    render() {
        const { photo } = this.state;

        const goToLogin = () => {

            Navigation.push('homeId', {
                component: {
                    id: 'loginId',
                    name: 'Login',

                }

            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                    left: {
                        visible: false,

                    },
                },
            });
        }



        const goToAddPost = () => {

            Navigation.push('homeId', {
                component: {
                    id: 'addItemId',
                    name: 'AddItem',
                    passProps: {
                        title: 'Add Item'
                    }
                }
            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                    left: {
                        visible: false,

                    },
                },
            });

        }

        const goToHome = () => {

            Navigation.push('homeId', {
                component: {
                    id: 'homeId',
                    name: 'Home',
                    passProps: {
                        title: 'Home'
                    }
                }
            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                    left: {
                        visible: false,

                    },
                },
            });

        }

        const goToProfile = () => {

            Navigation.push('homeId', {
                component: {
                    id: 'profileId',
                    name: 'Profile',
                    passProps: {
                        title: 'My Profile',
                        photo: this.props.photoUri,
                        country: this.props.country,
                        email: this.props.email,
                        fName: this.props.fName,
                        lName: this.props.lName,
                        address: this.props.address,
                        phone: this.props.phone,
                        editBtn: true

                    }
                }
            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                    left: {
                        visible: false,

                    },
                },
            });

        }
        const goToFriends = () => {

            Navigation.push('homeId', {
                component: {
                    id: 'friendsId',
                    name: 'Friends',
                    passProps: {
                        title: 'search for Friends'
                    }
                }
            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                    left: {
                        visible: false,

                    },
                },
            });

        }

        const goToMyFriends = () => {

            Navigation.push('homeId', {
                component: {
                    id: 'myFriendsId',
                    name: 'MyFriends',
                    passProps: {
                        title: 'My Friends'
                    }
                }
            });

            Navigation.mergeOptions('homeId', {
                sideMenu: {
                    left: {
                        visible: false,

                    },
                },
            });

        }







        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {!photo ? <Image source={require('../assets/images/profile.png')} style={styles.imageHeader} />

                        : <Image source={{ uri: this.props.photoUri }} style={styles.imageHeader} />}

                    <Text style={styles.textHeader} >
                        {this.props.fName + ' ' + this.props.lName}
                    </Text>
                </View>


                <View style={styles.MenuItems}>

                    <Icon1
                        style={styles.Icons}
                        name='home'
                        size={25}
                        color='#3b3c4e' />
                    <Text style={styles.ItemsText}
                        onPress={goToHome}>{"Home"}</Text>

                </View>
                <View style={styles.MenuItems}>

                    <FontAwesome5
                        style={styles.Icons}
                        name='user-alt'
                        size={25}
                        color='#3b3c4e' />
                    <Text style={styles.ItemsText}
                        onPress={goToProfile}>{"My profile"}</Text>

                </View>
                <TouchableOpacity onPress={goToMyFriends}>
                <View style={styles.MenuItems}>

                    <FontAwesome5
                        style={styles.Icons}
                        name='users'
                        size={25}
                        color='#3b3c4e' />
                    <Text style={styles.ItemsText}>{"My friends"}</Text>

                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToFriends}>
                    <View style={styles.MenuItems} >

                        <FontAwesome5
                            style={styles.Icons}
                            name='users'
                            size={25}
                            color='#3b3c4e' />
                        <Text style={styles.ItemsText} >{"Search for friends"}</Text>

                    </View>

                </TouchableOpacity>


                <View style={styles.MenuItems}>

                    <Icon2
                        style={styles.Icons}
                        name='chat'
                        size={25}
                        color='#3b3c4e' />
                    <Text style={styles.ItemsText} onPress={goToAddPost} >{"Add Post"}</Text>

                </View>


                <TouchableWithoutFeedback >
                    <View style={styles.LogoutItem}  >
                        <Icon3
                            style={styles.logoutIcon}
                            name='logout'
                            size={30}
                            color='green' />
                        <Text style={styles.logoutText} onPress={goToLogin}>  {"Logout"} </Text>
                    </View>

                </TouchableWithoutFeedback>


            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },

    header: {

        backgroundColor: '#3b3c4e',
        height: width / 1.7,
        width: width,
        justifyContent: 'center', // vertical
        //alignContent : 'center' , // nothing
        // alignItems :'center' , //horizental


    },
    imageHeader: {
        width: width / 3,
        height: width / 3,
        marginLeft: width / 4,
        borderRadius: 100


    },
    textHeader: {
        fontSize: 25,
        color: 'white',
        marginRight: width / 6,
        textAlign: 'center',
        marginTop: 15,


    },
    MenuItems: {
        flexDirection: 'row',
        marginVertical: 10

    },
    LogoutItem: {
        flexDirection: 'row',
        marginVertical: 10,
        borderTopColor: '#d4d4d7',
        borderTopWidth: 1

    },
    Icons: {
        marginLeft: 20,
        marginTop: 2


    },
    ItemsText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 22,
        //marginTop :3 ,
        marginLeft: 10,
        textAlign: 'justify'


    },
    logoutIcon: {
        color: 'rgba(255,99,71 ,0.8) ',
        marginLeft: 20,
        paddingTop: 7


    },
    logoutText: {
        color: 'rgba(255,99,71,0.7) ',
        fontSize: 25,
        paddingTop: 7,


    }


});



const mapStateToProps = state => ({
    email: state.auth.email,
    fName: state.auth.fName,
    lName: state.auth.lName,
    photoUri: state.auth.photoUri,
    address: state.auth.address,
    country: state.auth.country,
    phone: state.auth.phone




})


export default connect(mapStateToProps)(SideMenu);



