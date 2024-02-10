// PointerComponent.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import pointer from '../img/pointer.png'


function PointerComponent() {
    return (
        <Image
            source={pointer}
            style={styles.pointer}
        />
    );

};

    const styles = StyleSheet.create({
        pointer: {
            height: '100%',
            width: '80%',
            marginLeft: '45%',
            marginTop: '50%'    
        },
    });

export default PointerComponent;
