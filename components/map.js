import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');


const handleMapPress = (event) => {
    setMarkerPosition(event.nativeEvent.coordinate);
};



function MapComponent() {
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                mapType="terrain"
                onPress={handleMapPress}
                initialRegion={{
                    latitude: 41.7250,
                    longitude: 1.8266,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};
    const styles = StyleSheet.create({
        mapContainer: {
            flex: 1,
            height: '100%',
            width: '100%',
        },
        map: {
            flex: 1,
            height: '100%',
            width: '100%',
        },
    });

export default MapComponent;
