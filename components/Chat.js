// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Chat extends React.Component {
    render() {

        // Set the name that was entered on Start Screen to navigation title
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({title :name});

        // Set the background color to what was selected from Start Screen (state)
        const { bgColor } = this.props.route.params;

        return (
            <View style={{
                flex:1, 
                justifyContent:'center', 
                alignItems:'center',
                backgroundColor: bgColor ? bgColor : '#fff' }}>
                <Text>Chat Screen</Text>
            </View>
        )
    }
}