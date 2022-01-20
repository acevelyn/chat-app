// The application’s main Chat component that renders the chat UI
// importing React & React Native 
import React from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform } from 'react-native';

// importing AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// importing the Gifted Chat Library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// firebase 
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMiWa2nMsYsSLAXlR9eJP8UiBsVItYrQA",
  authDomain: "chat-app-268c2.firebaseapp.com",
  projectId: "chat-app-268c2",
  storageBucket: "chat-app-268c2.appspot.com",
  messagingSenderId: "1033033644099",
  appId: "1:1033033644099:web:8a37e1a8da5b15edf5bcf6",
  measurementId: "G-MRHGXG3YW4"
}



// const firebase = require('firebase');
// require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: ''
            }
        };

        // Initalize firebase
        if(!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
        }
        // Reference to Firestone "messages" collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.refMsgsUser = null;

    }
    // when updated set the messages state with the current data 
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          // user: data.user,
          user: {
              _id: data.user._id,
              name: data.user.name,
              avatar: data.user.avatar
          }
        });
      });
      this.setState({ 
        messages: messages 
      });
    };

    addMessages(){
      const message = this.state.messages[0]
      this.referenceChatMessages.add({
        _id: message._id,
        text: message.text || '',
        createdAt: message.createdAt,
        user: this.state.user,
        // uid: this.state.uid
        // user: message.user
      });
    };

     // A message that a user has just sent gets appended to the state messages
    // so that it can be displayed in that chat. 
    onSend(messages = []) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => { 
          this.addMessages();
          this.saveMessages();
      });
    }

    // NEW saveMessages()
    async saveMessages() {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    }

    // NEW getMessages()
    async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    };


    // NEW deleteMessages()
    async deleteMessages() {
      try {
        await AsyncStorage.removeItem('messages');
        this.setState({
          messages: []
        })
      } catch (error) {
        console.log(error.message);
      }
    }
  


    componentDidMount(){
      // Set the page title to be the name that was passed in Start for chat
      let { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name })

      // this.referenceChatMessages = firebase.firestore().collection('messages')
      // this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)

      // user can sign in anonymously
      this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }
        // update user state with current active user data
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any"
          },
        });

        // listens for updates in the collection 
        this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate)

        // create a reference to the active user's documents (messages)
          this.refMsgsUser = firebase
          .firestore()
          .collection("messages")
          .where("uid", "==", this.state.uid);

           // listen for collection changes for current user
      // this.unsubscribeChatUser = this.refMsgsUser.onSnapshot(this.onCollectionUpdate);
      });
      this.getMessages(); // NEW getMessages()
    }
    
    componentWillUnmount(){
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribe()
    }

    
    // RENDERS
      renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#000",
              },
              left: {
                backgroundColor: 'pink'
              }
            }}
          />
        );
      }
    

    render() {
      
        // Get the bg color that was selected on Start Screen (state 'bgColor')
        // And then assign that bg color to the main View component below
        const { bgColor } = this.props.route.params;

        return (
            <View style={{
                flex:1, 
                backgroundColor: bgColor ? bgColor : '#fff' }}>
                {/* <Text>Chat Room</Text> */}
                <View style={{flex:1}}>
                 <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                      _id: this.state.user_id,
                      name: this.state.name,
                      avatar: this.state.user.avatar
                    }}
                />

                    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"
                    /> : null }
                </View>
            </View>
        )
    }
}