
import React, { Component } from 'react';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet,View,Text,TouchableOpacity,Button, Image, Alert, ScrollView,  Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';
import Header from '../../Components/header';
import Realm from 'realm';
import Home from '../Home/Home'
import { Provider ,connect } from 'react-redux';
import { Input } from 'react-native-elements';
import MyButton from '../../Components/MyButton'



Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
            <Home {...props} />
    </Provider>
), () => Home);

let realm;
const { width } = Dimensions.get('window');


class UpdateItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            new_photo: this.props.photo,
            Item_Name: this.props.item_name,
            Item_Video: this.props.item_video,
            Item_Id: this.props.item_id,
            AddPhoto: true

        };

        realm = new Realm({ path: 'SocialDB.realm' });
    }

    pushHomeScreen = () => {


        Navigation.showModal({
            component: {
                id: 'homeId',
                name: 'Home',
                passProps: {
                    photo: this.state.photo
                }
            }

        })
    }


    
    UbdateData = () => {
        var that = this;
        const { new_photo } = this.state;
        const { Item_Name } = this.state;
        const { Item_Video } = this.state;
        const { Item_Id } = this.state;
        const {photo} =this.props

        if (photo) {
            if (Item_Name) {
                if (Item_Video) {
                    realm.write(() => {
                        var ID = Item_Id;
                        console.log('ID', ID);
                         var obj = realm.objects('Item_Details')
                             .filtered('item_id =' + Item_Id);

                        console.log('obj', obj);
                        if (obj.length > 0) {
                            obj[0].item_Name = Item_Name;
                            obj[0].item_video= Item_Video;
                            obj[0].item_Image = new_photo;

                            Alert.alert(
                                'Success',
                                'Item is updated successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: ()=>{
                                            Navigation.pop('ubdateItemId')
                                        },
                                    },
                                ],
                                { cancelable: false }
                            );
                        }

                    });


                }
                else {
                    alert('Please enter item Item_Video');
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
            console.log('resposns' + response.uri);
            if (response.uri) {
                this.setState({ new_photo: response.uri });
            }
        });

        this.setState({ AddPhoto: false })


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
     console.log(this.props.componentId);
     
        
        const { AddPhoto, new_photo } = this.state;
        const { item_id, item_name, video, photo, title } = this.props;
        return (
            <View style={styles.container}>
                <Header title='Update Item' />


                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center' }}>
                    {new_photo ?
                      <Image source={{ uri: new_photo }} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 20 ,resizeMode:'stretch'}} />
                      :
                     <Image source={{ uri: photo }} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 20,resizeMode:'stretch' }} />



                    }
                    {AddPhoto ? <View style={{
                        flexDirection: 'row',
                    }}>

                        <TouchableOpacity style={styles.ubloadPhoto} onPress={this.handleImagePicker} >
                            <Icon1
                                style={styles.menuIconStyle}
                                name='addfile'
                                size={100} />
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.ubloadPhoto} onPress={this.handleCameraPicker}  >
                            <MaterialIcon
                                style={styles.menuIconStyle}
                                name='add-a-photo'
                                size={100} />
                        </TouchableOpacity>
                    </View> : null}


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
                        //  leftIcon ={
                        //    <Icon1
                        //    name ='user'
                        //    size ={25}
                        //    color ='white'
s
                        //    />
                        //  }
                        value={this.state.Item_Name}
                       />
                    <Input
                        containerStyle={styles.textInputStyle}
                        placeholder='Please enter item video'
                        onChangeText={(Item_Video) => this.setState({ Item_Video })}
                        placeholderTextColor='white'
                        inputStyle={
                            { color: 'white' }
                        }
                        inputContainerStyle={
                            { borderBottomWidth: 0 }
                        }
                        value={this.state.Item_Video}
                        //  leftIcon ={
                        //    <Icon1
                        //    name ='user'
                        //    size ={25}
                        //    color ='white'

                        //    />
                        //  }
                       
                         />


                    <MyButton title='Update' customClick={this.UbdateData} />

                </ScrollView>

            </View>

        );



    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,


    },
    ubloadPhoto: {

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



});



const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps)(UpdateItem);


