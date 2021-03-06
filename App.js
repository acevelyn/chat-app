import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import react native gesture handler
  import 'react-native-gesture-handler';

// REACT NATIVE NAVIGATION 
  // import react Navigation, needs installed first
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import screens
import Start from './components/Start';
import Chat from './components/Chat';

// create the navigator
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
 render() {
     return (
         <NavigationContainer>
             <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Welcome" component={Start} />
                <Stack.Screen name="Chat" component={Chat} />
             </Stack.Navigator>
         </NavigationContainer>
     );
 }
}