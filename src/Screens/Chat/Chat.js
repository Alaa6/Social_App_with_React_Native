import React ,{ Component } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat'
import Fire from './firebase'
import { View, Text } from 'react-native';


  




class Chat extends Component {

   

   //static navigationOptions=({navigation}) =>({
      //  title :  navigation.getParam('name') ,
  // });

   /*________________________state : array of messages_______________________________________ */
    state ={
        messages : [] ,
        typing : false ,
        text :''
    };
 
    /*_______________________________________________________________ */
    get user ()
    {
        return ({
           
          email : this.props.navigation.getParam('Email'),
            _id :Fire.shared.uid,
        });
    }

   /*_______________________________________________________________ */
    //onSend(messages = []) {
       // this.setState(previousState => ({
         // messages: GiftedChat.append(previousState.messages, messages),
        //}))
      //}

  /*____________________________render footer___________________________________ */
     
  //onInputTextChanged = text => this.setState({ text});

      
  
  /*renderChatFooter=()=>{
    if(this.onInputTextChanged!= null)
    {
      this.setState({
        typing :true ,
      });
      return <Text> user is typing </Text>
    }
      }*/

      
  /*___________________________render____________________________________ */
    render(){
        return (
         
        
            <GiftedChat 
            messages ={this.state.messages} // the array of messages from state
            onSend ={Fire.shared.send}
            user ={this.user}
            onInputTextChanged ={this.onInputTextChanged}
            renderChatFooter ={this.renderChatFooter}
          
          />

           
            
        );
    }
 /*_______________________________________________________________ */

    componentWillMount(){

       Fire.shared.off();

    }

 /*_______________________________________________________________ */
    componentDidMount(){
    
        Fire.shared.on(NewMessage => this.setState(previousState =>({
            messages :GiftedChat.append(previousState.messages ,NewMessage)

        })));

    }
}

export default Chat ;