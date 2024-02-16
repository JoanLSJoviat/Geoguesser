import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import StartBtn from '../img/Start.png';
import Title from '../img/title.png';
import Header from '../components/header.js';
import Pic from '../img/GamePic.png'

const StartScreen = ({ navigation }) => {
    
  const onPress = ({navigation }) => {
    navigation.navigate('Game');
    console.log('button clicked');
  };

    return (

        <View style={styles.container}>
            <Header style={styles.header} imageSource={Title}/>
            <TouchableOpacity style={styles.btnContainer} onPress={() => onPress({ navigation })}>
                <Image style={styles.btn} source={StartBtn}></Image>
            </TouchableOpacity>
            <View style={styles.picContainer}>
            <Image source={Pic} style={styles.backgroundPic}/>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#c2c2c4',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    header: {   
        zIndex: 2,
    },
    picContainer: {
        flex: 1,
        width: '100%',
        height: '50%',
       // marginEnd: '60%',
    },
    backgroundPic: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginTop: '7%',
    },   
    btnContainer: {
        height: '10%',
        width: '40%',
      // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        zIndex: 2,
        marginTop: '10%',
    },
    btn: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
    },
});

export default StartScreen