import React, {Component , useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';



function Games() {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
   
    // Handle snapshot response
    function onSnapshot(snapshot) {
      const list = [];
   
      // Create our own array of games in order
      snapshot.forEach(game => {
        list.push({
          key: game.id, // Add custom key for FlatList usage
          ...game,
        });
      });
   
      setGames(list);
      setLoading(false);
    }
   
    useEffect(() => {
      // Create reference
      const ref = database().ref(`/games`);
      ref.once('value', onSnapshot);
    }, [uid]);
   
    if (loading) {
      return <Text>Loading games...</Text>;
    }
   
    return <FlatList data={games} renderItem={({ item }) => <Text>{item.name}</Text>} />;
  }

class Friends extends Component {

   


    componentDidMount() {
        Games()

       
    }
  
  
    render() {
       

       //return Games()
  
  
    }
  
  }
  

  
  export default Friends;
  