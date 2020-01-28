
import React, { Component } from 'react';
import Icon3 from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet , View, Text,TouchableOpacity, Image, Alert, ScrollView, Dimensions  } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';
import Header from '../../Components/header';
import Realm from 'realm';
import Home from '../Home/Home'
import { Provider  ,connect} from 'react-redux';
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
            photo: null,
            Item_Name: '',
            Item_Video: '' ,
            UserName :'',
            UserPhoto :'',
            Item_description :''

        };

        realm = new Realm({ path: 'SocialDB.realm' });
    }

     goToHome=()=> {
        Navigation.push( this.props.componentId ,{
            component: {
                id: 'addItemId',
                name: 'AddItem',
                passProps: {
                    title: 'Add Item'
                }
            }
        });
    }

    SaveData = () => {
        var that = this;
        const { photo } = this.state;
        const { Item_Name } = this.state;
        const { Item_Video } = this.state;
        const  {Item_description} = this.state;
        const  {UserPhoto} = this.state;
        const  {UserName} = this.state;



        if (photo) {
            if (Item_Name) {
                if (Item_Video) {
                    realm.write(() => {
                        var ID =
                            realm.objects('Item_Details').sorted('item_id', true).length > 0
                                ? realm.objects('Item_Details').sorted('item_id', true)[0]
                                    .item_id + 1
                                : 1;
                        realm.create('Item_Details', {
                            item_id: ID,
                            item_Name: Item_Name,
                            item_Image: photo.uri,
                            item_video: Item_Video ,
                            item_description :Item_description ,
                            userPhoto : UserPhoto,
                            userName : UserName ,
                            userEmail :this.props.email

                        });

                        Alert.alert(
                            'Success',
                            'Item is saved successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: ()=>{
                                            Navigation.push( 'addItemId' ,{
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
                alert('Please enter item name');
            }
        } else {
            alert('Please Add item image');
        }
    };




    handleImagePicker = () => {
        const options = {  //options
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('resposns' + response);
            if (response.uri) {
                this.setState({ photo: response });
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






    render() {
        const { photo } = this.state;
        console.log(this.props.componentId );
        
        return (
            <View style={styles.container}>
                <Header title='Add Item'  color='#FFF' backgroundColor='#3b3c4e' showBack showMenu  componentId={this.props.componentId } />

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', marginTop :5 ,}}>
                    {photo ? <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300, alignSelf: 'center' ,resizeMode:'stretch' }} />
                        : <Image source={require('../../assets/images/noImage.png')} style={{ width: 300, height: 300, alignSelf: 'center',resizeMode:'stretch' }} />
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
                        placeholder='Please enter item name'
                        onChangeText={(Item_Name) => this.setState({ Item_Name })}
                        placeholderTextColor='white'
                        inputStyle={
                            { color: 'white' }
                        }
                        inputContainerStyle={
                            { borderBottomWidth: 0 }
                        }
                     
                        name='userName' />

                    <Input
                        containerStyle={styles.textInputStyle}
                        placeholder='Please enter item price'
                        onChangeText={(Item_Price) => this.setState({ Item_Price })}
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
                        placeholder='Please enter item description ..'
                        onChangeText={(Item_description) => this.setState({ Item_description })}
                        placeholderTextColor='white'
                        inputStyle={
                            { color: 'white' }
                        }
                        inputContainerStyle={
                            { borderBottomWidth: 0 }
                        }
                        
                        name='Description' />


                    <MyButton title='Save' customClick={this.SaveData} />

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
    textAreaStyle :{

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
    email : state.auth.email
    
})

export default connect(mapStateToProps)(AddItem);


