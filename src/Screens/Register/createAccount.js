
import React, { Component } from 'react';
import { Text, Keyboard  ,ScrollView}  from 'react-native';
import { View } from 'native-base';
import MyButton from '../../Components/MyButton';
import {connect ,Provider } from 'react-redux'
import Styles from './styles'
import { Formik } from "formik";
import ValidationSchema from './validation'
import { Input ,Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import {
    //handleTextInput,
     withNextInputAutoFocusForm,
    // withNextInputAutoFocusInput
  } from "react-native-formik";


const Form = withNextInputAutoFocusForm(View);


 class CreateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          loading: false,
          showCreateBtn: true,
       
        }
      }

      changeLoading =()=>{
        this.setState ({
          loading :true
        })
      }  

       /* ___________________register user in firebase _________________________ */

  register = async (values) => {


    try {
      this.changeLoading()
      await auth().createUserWithEmailAndPassword(values.email, values.password);
      this.setState({ showCreateBtn: false, email: values.email ,loading :false })
      this.props.changeState();
      Keyboard.dismiss();
    } catch (e) {
      this.setState({
        showCreateBtn: true,
        loading :false
      })
      await alert(e.message)
     
    }
  }



    

  render() {
    const {  showCreateBtn } = this.state;
    return (
        <View style={Styles.container}>
        <ScrollView style={{ flex: 1 }}>
        
          <Formik
            initialValues={{
              email: '',
              password: '',
              confPassword: '',
            }}
        
            onSubmit={values => this.register(values)}
            validationSchema={ValidationSchema}
            render={props => {
              return (
        
                <Form style={Styles.InputView}>
        
                  {props.errors.email ? <Text style={{ color: 'red', marginLeft: 10 }}>{props.errors.email}</Text> : null}
                  <Input
                    name="email"
                    type="email"
                    onChangeText={props.handleChange('email')}
                    containerStyle={{ marginTop: 8 }}
                    autoCapitalize="none"
                    placeholder='Gmail'
                    placeholderTextColor='#9899a2'
                    inputStyle={
                      { color: '#9899a2' }
                    }
                    inputContainerStyle={
                      {
                        borderBottomWidth: 1
        
                      }
                    }
                    rightIcon={
                      <MaterialIcons
                        name='email'
                        size={20}
                        color='#9899a2'
        
                      />
                    }
                  />
                  {props.errors.password ? <Text style={{ color: 'red', marginLeft: 10 }}>{props.errors.password}</Text> : null}
                  <Input
                    name="password"
                    type="password"
                    placeholder='Password'
                    autoCapitalize="none"
                    onChangeText={props.handleChange('password')}
                    placeholderTextColor='#9899a2'
                    inputStyle={
                      { color: '#9899a2' }
                    }
                    inputContainerStyle={
                      {
                        borderBottomWidth: 0
                      }
                    }
                    rightIcon={
                      <MaterialIcons
                        name='lock'
                        size={25}
                        color='#9899a2'
        
                      />
                    }
                  />
                  {props.errors.confPassword ? <Text style={{ color: 'red', marginLeft: 10 }}>{props.errors.confPassword}</Text> : null}
        
                  <Input
                    //name="confPassword"
                    placeholder='Confirm password'
                    autoCapitalize="none"
                    onChangeText={props.handleChange('confPassword')}
                    placeholderTextColor='#9899a2'
                    inputStyle={
                      { color: '#9899a2' }
                    }
                    inputContainerStyle={
                      {
                        borderBottomWidth: 0
                      }
                    }
                    rightIcon={
                      <MaterialIcons
                        name='lock'
                        size={25}
                        color='#9899a2'
        
                      />
                    }
                  />
                  {/* 
        {props.isSubmitting ? (
        <ActivityIndicator />
        ) : (
        <Button title="Submit" onPress={props.handleSubmit} />
        )} */}
        
        
        
                  {showCreateBtn && <Button title="Greate a new account" onPress={props.handleSubmit} buttonStyle ={{ backgroundColor :'#3b3c4e'}} loading={this.state.loading} />}
        
                </Form>
              );
        
            }}
          />
        
        
        </ScrollView>
        
        
        
        </View>
    );
  }
}


const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(CreateAccount);
