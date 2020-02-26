import React, { Component } from 'react';
import { View} from 'native-base';
import { connect, Provider } from 'react-redux'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ValidationComponent from 'react-native-form-validator';
import CreateAccountView from './createAccount'
import SaveUserDataView from './saveUserData' 
import Styles from './styles'

class RegisterSteps extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
     
      nextBtn: false,
      showCreateBtn: true,
    
    }
  }







  

  render() {


    console.log('    ' + this.props.componentId);
    
    return (
      <View style={Styles.container}>

        <ProgressSteps labelColor="#9899a2" activeLabelColor="#3b3c4e" activeStepNumColor="#3b3c4e" completedStepIconColor="#3b3c4e" activeStepIconBorderColor="#3b3c4e" completedProgressBarColor="#3b3c4e">
          <ProgressStep label="Register" nextBtnStyle={Styles.btnStyle} nextBtnText={this.state.nextBtn ? 'Next' : null} nextBtnTextStyle={{ color: '#3b3c4e' }} >
               <CreateAccountView/>
          </ProgressStep>
          <ProgressStep label="User Information" nextBtnStyle={Styles.btnStyle2} nextBtnText='Next' nextBtnTextStyle={{ color: '#3b3c4e' }} previousBtnText='السابق' previousBtnStyle={Styles.btnStyle1} previousBtnTextStyle={{ color: '#3b3c4e' }} onSubmit={this.saveData}>
              <SaveUserDataView/>
          </ProgressStep>

        </ProgressSteps>
      </View>
    );
  }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(RegisterSteps);


