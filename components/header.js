import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = ({ imageSource }) => {
    return (
        <View style={styles.header}>
            <Image
                style={styles.image}
                source={imageSource}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
       //s marginBottom: '100%',

    },
    image: {
        marginTop: '30%',
      //  marginLeft: '55%',
        width: '80%',
        height: '90%',
       // transform:[{ scaleX: -1 }, { scaleY: 1 }, { rotate: '-15deg' }],
        zIndex: 1,
       
    },
});

export default Header;
