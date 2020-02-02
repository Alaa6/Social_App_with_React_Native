
import React, { Component } from 'react';
import Icon3 from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ScrollView, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';
import Header from '../../Components/header';
import Realm from 'realm';
import Home from '../Home/Home'
import { Provider, connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MyButton from '../../Components/MyButton';
import store from '../../store';





Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
        <Home {...props} />
    </Provider>
), () => Home);

let realm;
const { width } = Dimensions.get('window');


class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photo: '',
            Item_Name: '',
            Item_Video: '',
            UserName: '',
            UserPhoto: '',
            Item_description: '',
            date: 'hhh',

        };
       

        realm = new Realm({ path: 'SocialDB.realm', schemaVersion: 6 });
    }

    componentDidMount() {
        var that = this;
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
            //Setting the value of the date time
            date:
           
                hours + ':' + min + ':' + sec,
        });
       
        
    }

    goToHome = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'addItemId',
                name: 'AddItem',
                passProps: {
                    title: 'Add Item'
                }
            }
        });
    }

   

    handleImagePicker = () => {
        const options = {  //options
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('resposns' + response);
            if (response.uri) {
                this.setState({ photo: response.uri });
            }
        });


    };

    handleCameraPicker = () => {
        const options = {  //options
            noData: true,
        };

        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                JSON.stringify(response);
                this.setState({
                    photo: response,
                    fileData: response.data,
                    fileUri: response.uri
                });

            }

        });
    };

     SaveData = () => {
        var that = this;
        const { photo } = this.state;
        const { Item_Name } = this.state;
        const { Item_Video } = this.state;
        const { Item_description } = this.state;
        const { UserPhoto } = this.state;
        const { UserName } = this.state;
        const { date} = this.state ;
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

    //     this.setState({
    //         //Setting the value of the date time
    //         date:
           
    //         date + '/'+hours + ':' + min + ':' + sec,
    //     });

    //    console.log('date                '+hours);



        if (photo) {
            if (Item_Video) {
                realm.write(() => {
                    var ID =
                        realm.objects('Item_Details').sorted('post_id', true).length > 0
                            ? realm.objects('Item_Details').sorted('post_id', true)[0]
                                .post_id + 1
                            : 1;
                    realm.create('Item_Details', {
                        post_id: ID,
                        userId :this.props.uid ,
                        item_Image: photo,
                        item_video: Item_Video,
                        item_description: Item_description,
                        userPhoto: this.props.photoUri,
                        userName: this.props.fName,
                        userEmail: this.props.email ,
                        post_date :date

                    });

                    Alert.alert(
                        'Success',
                        'Item is saved successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    Navigation.push('addItemId', {
                                        component: {
                                            id: 'homeId',
                                            name: 'Home',
                                            passProps: {
                                                title: 'Home'
                                            }
                                        }
                                    });
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                });


            } else {
                alert('Please enter item video');

            }

        } else {
            alert('Please Add item image');
        }
    };









    render() {
     
        console.log('jjjjj          '+this.props.uid);
        
        
        const { photo } = this.state;
        return (
            <View style={styles.container}>
                <Header title='Add post' color='#FFF' backgroundColor='#3b3c4e' showBack showMenu componentId={this.props.componentId} />

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', marginTop: 5, }}>
                    {photo ? <Image source={{ uri: photo }} style={{ width: 300, height: 300, alignSelf: 'center', resizeMode: 'stretch' }} />
                        : <Image source={require('../../assets/images/noImage.png')} style={{ width: 300, height: 300, alignSelf: 'center', resizeMode: 'stretch' }} />
                    }

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-around'
                    }}>

                        <TouchableOpacity style={styles.ubloadPhoto} onPress={this.handleImagePicker} >

                            <FontAwesome
                                style={styles.menuIconStyle}
                                name='photo'
                                color='primaryLight'
                                size={90} />

                        </TouchableOpacity>

                        <Text style={styles.text}>{'- OR - '}</Text>




                        <TouchableOpacity style={styles.ubloadPhoto} onPress={this.handleCameraPicker}  >
                            <MaterialIcon
                                style={styles.menuIconStyle}
                                name='add-a-photo'
                                size={100} />
                        </TouchableOpacity>
                    </View>



                    <Input
                        containerStyle={styles.textInputStyle}
                        placeholder='Please enter item Video'
                        onChangeText={(Item_Video) => this.setState({ Item_Video })}
                        placeholderTextColor='white'
                        inputStyle={
                            { color: 'white' }
                        }
                        inputContainerStyle={
                            { borderBottomWidth: 0 }
                        }

                        name='userName' />
                    <Input
                        containerStyle={styles.textAreaStyle}
                        placeholder='Enter post here ..'
                        onChangeText={(Item_description) => this.setState({ Item_description })}
                        placeholderTextColor='white'
                        inputStyle={
                            { color: 'white' }
                        }
                        inputContainerStyle={
                            { borderBottomWidth: 0 }
                        }

                        name='Description' />


                    <MyButton title='Save' customClick={this.SaveData}  backgroundColor='#3b3c4e' btnWidth={width/1.1}/>

                </ScrollView>

            </View>

        );



    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,


    },


    text: {
        fontSize: 25,
        color: 'rgba(0,128,0 ,0.7)',
        marginTop: width / 5

    },
    titlePageStyle: {
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 30,
        color: 'rgba(0,128,0 ,0.7)',


    },
    menuIconStyle: {
        marginHorizontal: 40,
        color: 'gray',
        marginVertical: 40



    },

    bellIconStyle: {
        marginHorizontal: 40,
        color: 'rgb(255,99,71) ',

    },
    textInputStyle: {

        width: width / 1.1,
        height: width / 8,
        borderWidth: 1.5,
        marginHorizontal: 20,
        marginVertical: 7,
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        borderStyle: 'solid',
        fontSize: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',



    },
    textAreaStyle: {

        width: width / 1.1,
        height: width / 2,
        borderWidth: 1.5,
        marginHorizontal: 20,
        marginVertical: 7,
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        borderStyle: 'solid',
        fontSize: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',


    }



});

const mapStateToProps = state => ({
    email: state.auth.email,
    fName: state.auth.fName,
    lName: state.auth.lName,
    photoUri: state.auth.photoUri,
    address: state.auth.address,
    uid :state.auth.uid


})

export default connect(mapStateToProps)(AddItem);


