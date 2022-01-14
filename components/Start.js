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
        blue: 'blue',
        pink: 'pink',
        orange: 'orange'
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Welcome to My Chat App!</Text>
                <Text style={styles.text}>Enter your name and start chatting!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}/>
                
                <View style={styles.colorSelection}>
                    <Text>Choose Background Color</Text>
                    <View style={styles.colorList}>

                    <TouchableOpacity
                        onPress={() => {this.changeBgColor(this.colors.blue)}}>
                        <View style={styles.color1}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.changeBgColor(this.colors.pink)}}>
                        <View style={[styles.color1, styles.color2]}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.changeBgColor(this.colors.orange)}}>
                        <View style={[styles.color1, styles.color3]}></View>
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
        fontSize: 25,
        fontWeight: 'bold',
        padding: 15
    },
    text: {
        fontSize: 17,
        padding:5
    },
    image: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        fontSize: 30
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 17,
        height: 35,
        width: "85%",
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
        backgroundColor: 'blue'
    },
    color2: {
        backgroundColor: 'pink',
    },
    color3: {
        backgroundColor: 'orange',
    }
})