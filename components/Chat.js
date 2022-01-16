// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Chat extends React.Component {
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
                justifyContent:'center', 
                alignItems:'center',
                backgroundColor: bgColor ? bgColor : '#fff' }}>
                <Text>Chat Screen</Text>
            </View>
        )
    }
}