import firebase from 'firebase'


class Fire {

  /*___________________________constructor____________________________________ */
    constructor(){
        this.init();
        this.observeAuth();
    }
 /*________________________init method : to connect Firebase_______________________________________ */

    init =() =>{
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyB4uckNKxaG2fkNbhYj2lb_-TGcziMb7q4",
                authDomain: "peppy-flame-217301.firebaseapp.com",
                databaseURL: "https://peppy-flame-217301.firebaseio.com",
                projectId: "peppy-flame-217301",
                storageBucket: "peppy-flame-217301.appspot.com",
                messagingSenderId: "556814022993",
            });

        }
    }
  /*_______________________________________________________________ */
    observeAuth =() =>{
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    }
   /*_______________________________________________________________ */
    onAuthStateChanged = user => {
        if(!user)
        {
            try {
                firebase.auth().signInAnonymously();

            }
            catch ({message})
            {
              alert(message);  
            }

        }
    }

    /*_______________________return current user________________________________________ */

    get uid(){
        return(firebase.auth().currentUser || {}).uid; // ayh m3na || {} ??????????
    }

  /*_______________________________the database reference________________________________ */
    get ref (){
        return firebase.database().ref('messages');
    }

  /*________________________to return data(message)_______________________________________ */

    parse =snapshot => {
        const {timestamp : numberStamp , text ,user} =snapshot.val();
        const {key : _id} =snapshot ;
        const timestamp =new Date(numberStamp);
        const message ={
            _id ,
            timestamp ,
            text,
            user
        };
        return message ;

    }
  /*_____________________________call parse method__________________________________ */
    on = callback =>{
        this.ref
        .limitToLast(20)
        .on('child_added' ,snapshot => callback(this.parse(snapshot)));

    }
  /*________________________return timestamp_______________________________________ */
     get timestamp (){
         return firebase.database.ServerValue.TIMESTAMP;
     }
    /* ________________________send the message to backend __________________________*/

    send = messages =>{

        for(let i =0 ; i<messages.length ; i++){

            const { text , user} =messages[i];
            const message ={
                text ,
                user,
                timestamp :this.timestamp


            };
           firebase.database().ref('messages').push(message);
           
        }

    };
   // append= message=>  this.ref.push(message);

    /*______________________close the connection to the  backend ___________________ */

    off(){
        this.ref.off();
    }


}

Fire.shared =new Fire();
export default Fire;