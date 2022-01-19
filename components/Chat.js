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
        // this.referenceChatUser = null;

    }

    componentDidMount(){
      // Set the page title to be the name that was passed in Start for chat
      let { name } = this.props.route.params;

      this.props.navigation.setOptions({ title: name })
        this.setState({

            messages: [
                {
                    _id: 1,
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
    

    // A message that a user has just sent gets appended to the state messages
    // so that it can be displayed in that chat. 
    onSend(messages = []) {
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
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
                    _id: 1,
                    }}
                />

                    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"
                    /> : null }
                </View>
            </View>
        )
    }
}