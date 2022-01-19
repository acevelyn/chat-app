// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';

// importing the Gifted Chat Library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            uid: 0,
        };

        const firebaseConfig = {
            apiKey: "AIzaSyBMiWa2nMsYsSLAXlR9eJP8UiBsVItYrQA",
            authDomain: "chat-app-268c2.firebaseapp.com",
            projectId: "chat-app-268c2",
            storageBucket: "chat-app-268c2.appspot.com",
            messagingSenderId: "1033033644099",
            appId: "1:1033033644099:web:8a37e1a8da5b15edf5bcf6",
            measurementId: "G-MRHGXG3YW4"
        }

        if(!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
        }
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.referenceChatUser = null;

    }

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
          user: data.user,
        });
      });
      this.setState({ messages, })
    };

    addMessages(){
      const message = this.state.messages[0]
      this.referenceChatMessages.add({
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt,
        user: 'userExample',
      });
    };

    componentDidMount(){
      // this.referenceChatMessages = firebase.firestore().collection('messages')

      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
          user: { _id: user.uid}
        });
        this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate)
      });

      // create a reference to the active user's documents (shopping lists)
      this.referenceChatUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
      // if (!this.referenceChatMessages) {
      //   alert('No messages available')
      // }

      // listen for collection changes for current user
      this.unsubscribeChatUser = this.referenceChatUser.onSnapshot(this.onCollectionUpdate);

      // Set the page title to be the name that was passed in Start for chat
      let { name } = this.props.route.params;

      this.props.navigation.setOptions({ title: name })
        this.setState({

            messages: [
                {
                    uid: this.state.uid,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: name,
                        avatar:'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `User has entered chat`,
                    createdAt: new Date(),
                    system: true,
                },
            ]
        })
    }
    
    componentWillUnmount(){
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribeChatUser()
    }

    // A message that a user has just sent gets appended to the state messages
    // so that it can be displayed in that chat. 
    onSend(messages = []) {
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }), () => { 
            this.addMessages();
        });
      }

      renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#000",
              },
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
                    _id: this.state._id,
                    }}
                />

                    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"
                    /> : null }
                </View>
            </View>
        )
    }
}