// The application’s Start component that renders a text input that you can type your name in

import React from 'react';
import {
    StyleSheet, 
    ImageBackground, 
    Image, 
    View, 
    Text, 
    Button, 
    TextInput,
    TouchableOpacity} from 'react-native';
import { withOrientation } from 'react-navigation';

const image = require("../assets/background-img.png")

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            bgColor: '' 
        };
    }

    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor})
    }

    colors = {
        black: '#090C08',
        purple: '#474056',
        blue: '#8A95A5',
        green: '#B9C6AE'
    }


    render() {
        return (
            <View 
                accessible={false}
                accessibilityLabel="Chat App"
                accessibilityHint="Title of the app"
                accessibilityRole="App Header"
                style={styles.container}
            >
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Ev's Chat App!</Text>
                <Text style={styles.text}>Enter your name and start chatting!</Text>
                <TextInput
                    accessible={true}
                    accessibilityLabel="Name entry"
                    accessibilityHint="Lets you enter your name"
                    accessibilityRole="Name entry" 
                    style={styles.input}
                    placeholder="Your Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}/>
                
                <View style={styles.colorSelection}>
                    <Text style={styles.chooseText}>Choose Background Color</Text>
                    <View style={styles.colorList}>

                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Color option Black"
                        accessibilityHint="Set color black as your background"
                        accessibilityRole="Color Selector"
                        onPress={() => {this.changeBgColor(this.colors.black)}}>
                        <View style={styles.color1}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                         accessible={true}
                         accessibilityLabel="Color option Purple"
                         accessibilityHint="Set color purple as your background"
                         accessibilityRole="Color Selector"
                         onPress={() => {this.changeBgColor(this.colors.purple)}}>
                        <View style={[styles.color1, styles.color2]}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                         accessible={true}
                         accessibilityLabel="Color option Gray"
                         accessibilityHint="Set color gray as your background"
                         accessibilityRole="Color Selector"
                         onPress={() => {this.changeBgColor(this.colors.blue)}}>
                        <View style={[styles.color1, styles.color3]}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                         accessible={true}
                         accessibilityLabel="Color option Light Purple"
                         accessibilityHint="Set color light purple as your background"
                         accessibilityRole="Color Selector"
                         onPress={() => {this.changeBgColor(this.colors.green)}}>
                        <View style={[styles.color1, styles.color4]}></View>
                    </TouchableOpacity>
                    </View>
                </View>


                <Button
                    style={styles.button}  
                    title="Go to Chat Screen!"
                    // the name in navigate needs to be the name handler
                    onPress={() => this.props.navigation.navigate('Chat', { 
                        name: this.state.name,
                        bgColor: this.state.bgColor 
                        })}
                    />
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 45,
        color: '#FFFFFF',
        fontWeight: '600',
        padding: 15
    },
    chooseText: {
        color:'#757083',
        fontSize: 16,
        fontWeight: '300',
        padding: 5
    },
    image: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        color: '#757085',
        opacity: 100,
        fontSize: 16,
        fontWeight: '300',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 16,
        fontWeight:'300',
        height: 35,
        width: "85%",
        opacity: 50
    },
    colorSelection: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '50%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'column'
    },
    colorList: {
        flexDirection:'row',
    },
    color1: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin:5,
        backgroundColor: '#090C08',
    },
    color2: {
        backgroundColor: '#474056',
    },
    color3: {
        backgroundColor: '#8A95A5',
    },
    color4: {
        backgroundColor: '#757083'
    },
})