// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';

// importing the Gifted Chat Library
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    componentDidMount(){
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar:'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'This is a system message',
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

    render() {

        // Get the name that was entered in on Start Screen (state 'name')
        let { name } = this.props.route.params;

        // Set that name to the Navigation title (state)
        this.props.navigation.setOptions({title :name});

        // Get the bg color that was selected on Start Screen (state 'bgColor')
        // And then assign that bg color to the main View component below
        const { bgColor } = this.props.route.params;

        return (
            <View style={{
                flex:1, 
                backgroundColor: bgColor ? bgColor : '#fff' }}>
                <Text>Chat Screen</Text>
                <View style={{flex:1}}>

                 <GiftedChat
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